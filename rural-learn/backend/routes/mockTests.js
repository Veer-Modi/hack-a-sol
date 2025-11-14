const express = require('express');
const router = express.Router();
const MockTest = require('../models/MockTest');
const geminiAI = require('../utils/geminiAI');

// Generate mock test with AI prediction
router.post('/generate', async (req, res) => {
  try {
    const { examType, subjects, questionCount, difficulty } = req.body;
    
    const mockTestData = await geminiAI.generateMockTest(
      examType, 
      subjects, 
      questionCount || 50
    );
    
    const mockTest = new MockTest({
      title: `${examType} Mock Test - ${new Date().toLocaleDateString()}`,
      examType,
      duration: mockTestData.duration || 180, // 3 hours default
      totalMarks: mockTestData.totalMarks || questionCount || 50,
      questions: mockTestData.questions,
      aiPrediction: {
        accuracyRate: 0.5, // 50% prediction accuracy
        similarityScore: mockTestData.prediction?.similarity || 0.8,
        confidenceLevel: mockTestData.prediction?.confidence || 0.75
      }
    });
    
    await mockTest.save();
    
    res.json({
      success: true,
      mockTest: {
        id: mockTest._id,
        title: mockTest.title,
        examType: mockTest.examType,
        duration: mockTest.duration,
        totalMarks: mockTest.totalMarks,
        questionCount: mockTest.questions.length,
        aiPrediction: mockTest.aiPrediction
      }
    });
  } catch (error) {
    console.error('Mock test generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate mock test'
    });
  }
});

// Get mock test for attempt
router.get('/:id', async (req, res) => {
  try {
    const mockTest = await MockTest.findById(req.params.id)
      .select('-attempts -analytics');
    
    if (!mockTest) {
      return res.status(404).json({
        success: false,
        message: 'Mock test not found'
      });
    }
    
    res.json({
      success: true,
      mockTest
    });
  } catch (error) {
    console.error('Mock test fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mock test'
    });
  }
});

// Submit mock test attempt
router.post('/:id/submit', async (req, res) => {
  try {
    const { answers, timeTaken, tabSwitches, studentId } = req.body;
    
    const mockTest = await MockTest.findById(req.params.id);
    if (!mockTest) {
      return res.status(404).json({
        success: false,
        message: 'Mock test not found'
      });
    }
    
    // Calculate score
    let score = 0;
    const results = [];
    
    mockTest.questions.forEach((question, index) => {
      const studentAnswer = answers[index];
      const isCorrect = studentAnswer === question.correctAnswer;
      
      if (isCorrect) {
        score += question.marks;
      } else if (studentAnswer !== -1) { // -1 means not attempted
        score -= question.negativeMarks || 0;
      }
      
      results.push({
        questionIndex: index,
        studentAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        marks: isCorrect ? question.marks : (studentAnswer !== -1 ? -question.negativeMarks : 0),
        timeTaken: timeTaken[index] || 0
      });
    });
    
    // Detect cheating
    const cheatingDetected = tabSwitches > 3;
    
    // Add attempt to mock test
    const attempt = {
      student: studentId,
      answers,
      score: Math.max(0, score), // Ensure score is not negative
      timeTaken: timeTaken.reduce((a, b) => a + b, 0),
      cheatingDetected,
      tabSwitches,
      completedAt: new Date()
    };
    
    mockTest.attempts.push(attempt);
    await mockTest.save();
    
    // Generate AI analysis
    const analysis = await geminiAI.analyzePerformance(
      { score, results, timeTaken, totalQuestions: mockTest.questions.length },
      { studentId } // Add more student profile data as needed
    );
    
    res.json({
      success: true,
      result: {
        score,
        totalMarks: mockTest.totalMarks,
        percentage: (score / mockTest.totalMarks) * 100,
        results,
        cheatingDetected,
        tabSwitches,
        analysis,
        aiPrediction: mockTest.aiPrediction
      }
    });
  } catch (error) {
    console.error('Mock test submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit mock test'
    });
  }
});

// Get available mock tests
router.get('/', async (req, res) => {
  try {
    const { examType, page = 1, limit = 10 } = req.query;
    
    const query = examType ? { examType } : {};
    const mockTests = await MockTest.find(query)
      .select('title examType duration totalMarks aiPrediction createdAt')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await MockTest.countDocuments(query);
    
    res.json({
      success: true,
      mockTests,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Mock tests fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mock tests'
    });
  }
});

// Get student's mock test history
router.get('/student/:studentId/history', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const mockTests = await MockTest.find({
      'attempts.student': studentId
    }).select('title examType attempts.$');
    
    const history = mockTests.map(test => ({
      testId: test._id,
      title: test.title,
      examType: test.examType,
      attempt: test.attempts[0] // Only the student's attempt due to positional operator
    }));
    
    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Mock test history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test history'
    });
  }
});

module.exports = router;
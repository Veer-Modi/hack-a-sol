const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const ExamAttempt = require('../models/ExamAttempt');
const geminiAI = require('../utils/geminiAI');

// List exams (optional institute filter)
router.get('/', async (req, res) => {
  try {
    const { instituteId } = req.query;
    const query = instituteId ? { instituteId } : {};
    const exams = await Exam.find(query).sort({ createdAt: -1 });
    res.json({ success: true, exams });
  } catch (error) {
    console.error('Institute exam list error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch exams' });
  }
});

// Create exam
router.post('/create', async (req, res) => {
  try {
    const { instituteId, name, examType, subjects, testId, markingScheme, proctoringEnabled, maxTabSwitch, cameraChecks } = req.body;

    const exam = new Exam({
      instituteId,
      name,
      examType,
      subjects,
      testId,
      markingScheme,
      proctoringEnabled,
      maxTabSwitch,
      cameraChecks,
    });

    await exam.save();
    res.status(201).json({ success: true, exam });
  } catch (error) {
    console.error('Institute exam create error:', error);
    res.status(500).json({ success: false, message: 'Failed to create exam' });
  }
});

// Start exam (mark ongoing)
router.post('/:id/start', async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, { status: 'ongoing' }, { new: true });
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.json({ success: true, exam });
  } catch (error) {
    console.error('Institute exam start error:', error);
    res.status(500).json({ success: false, message: 'Failed to start exam' });
  }
});

// Submit exam attempt
router.post('/:id/submit', async (req, res) => {
  try {
    const { studentId, answers, tabSwitches } = req.body;
    const examId = req.params.id;

    const attempt = new ExamAttempt({
      examId,
      studentId,
      answers,
      tabSwitches,
      cheatingDetected: tabSwitches > 3,
    });

    await attempt.save();
    res.status(201).json({ success: true, attemptId: attempt._id });
  } catch (error) {
    console.error('Institute exam submit error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit exam' });
  }
});

// AI evaluation for subjective answers
router.post('/:id/subjective/check', async (req, res) => {
  try {
    const { attemptId } = req.body;
    const attempt = await ExamAttempt.findById(attemptId);
    if (!attempt) return res.status(404).json({ success: false, message: 'Attempt not found' });

    const evaluation = await geminiAI.evaluateSubjectiveExam(attempt);

    attempt.aiScoreSuggestion = evaluation.totalSuggestedScore;
    attempt.aiExplanation = evaluation.overallExplanation;
    await attempt.save();

    res.json({ success: true, evaluation });
  } catch (error) {
    console.error('Institute exam subjective check error:', error);
    res.status(500).json({ success: false, message: 'Failed to evaluate subjective answers' });
  }
});

module.exports = router;

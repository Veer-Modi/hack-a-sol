const express = require('express');
const router = express.Router();
const geminiAI = require('../utils/geminiAI');
const youtubeSearch = require('../utils/youtubeSearch');
const Course = require('../models/Course');

// Generate course content with AI
router.post('/generate-course', async (req, res) => {
  try {
    const { subject, level, teachingStyle } = req.body;
    
    // Generate course structure with Gemini
    const courseContent = await geminiAI.generateCourseContent(subject, level);
    
    // For each module, find relevant YouTube videos
    for (let module of courseContent.modules) {
      const videos = await youtubeSearch.searchEducationalContent(
        `${subject} ${module.title}`, 
        level
      );
      module.content = {
        ...module.content,
        videos: videos.slice(0, 3) // Top 3 videos per module
      };
      
      // Generate notes for the module
      const notes = await geminiAI.generateNotes(
        `${module.title}: ${module.description}`,
        teachingStyle || 'visual'
      );
      module.content.notes = notes;
      
      // Generate quiz for the module
      const quiz = await geminiAI.generateQuiz(module.title, level, 5);
      module.quiz = quiz;
    }
    
    // Generate learning roadmap
    const roadmap = await geminiAI.generateCareerRoadmap(subject, level);
    courseContent.roadmap = roadmap.roadmap;
    
    res.json({
      success: true,
      course: courseContent
    });
  } catch (error) {
    console.error('Course generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate course content'
    });
  }
});

// Generate personalized content based on teacher's style
router.post('/adapt-content', async (req, res) => {
  try {
    const { content, teachingStyle, teacherId } = req.body;
    
    const adaptedContent = await geminiAI.adaptToTeachingStyle(content, teachingStyle);
    
    res.json({
      success: true,
      adaptedContent
    });
  } catch (error) {
    console.error('Content adaptation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to adapt content'
    });
  }
});

// Ask AI questions
router.post('/ask', async (req, res) => {
  try {
    const { question, context } = req.body;
    
    const prompt = `Answer this educational question with clear explanation and examples:
    Question: ${question}
    Context: ${context || 'General education'}
    
    Provide:
    1. Clear, simple answer
    2. Step-by-step explanation if applicable
    3. Real-world examples
    4. Related concepts to explore`;
    
    const answer = await geminiAI.model.generateContent(prompt);
    const response = await answer.response;
    
    res.json({
      success: true,
      answer: response.text()
    });
  } catch (error) {
    console.error('AI question error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get AI response'
    });
  }
});

// Generate study notes from video content
router.post('/generate-notes', async (req, res) => {
  try {
    const { videoUrl, topic, teachingStyle } = req.body;
    
    // In a real implementation, you'd extract video transcript
    // For now, we'll generate notes based on topic
    const notes = await geminiAI.generateNotes(
      `Educational content about ${topic}`,
      teachingStyle || 'comprehensive'
    );
    
    res.json({
      success: true,
      notes,
      downloadUrl: `/api/ai/download-notes/${Date.now()}`
    });
  } catch (error) {
    console.error('Notes generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate notes'
    });
  }
});

// Search educational videos
router.get('/search-videos', async (req, res) => {
  try {
    const { query, level } = req.query;
    
    const videos = await youtubeSearch.searchEducationalContent(query, level);
    
    res.json({
      success: true,
      videos
    });
  } catch (error) {
    console.error('Video search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search videos'
    });
  }
});

module.exports = router;
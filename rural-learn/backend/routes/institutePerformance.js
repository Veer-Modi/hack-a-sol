const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance');
const ExamAttempt = require('../models/ExamAttempt');
const geminiAI = require('../utils/geminiAI');

// Get student performance summary
router.get('/student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const perf = await Performance.findOne({ studentId: id });

    res.json({ success: true, performance: perf || null });
  } catch (error) {
    console.error('Institute performance student error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch student performance' });
  }
});

// Generate / refresh AI insights for a student
router.post('/student/:id/ai', async (req, res) => {
  try {
    const { id } = req.params;

    // Basic aggregation: pull last few exam attempts
    const attempts = await ExamAttempt.find({ studentId: id }).sort({ createdAt: -1 }).limit(5);

    const testResults = attempts.map(a => ({
      examId: a.examId,
      score: a.score,
      tabSwitches: a.tabSwitches,
      cheatingDetected: a.cheatingDetected,
    }));

    const aiInsights = await geminiAI.analyzeInstitutePerformance({ attempts: testResults });

    const perf = await Performance.findOneAndUpdate(
      { studentId: id },
      { aiInsights, updatedAt: new Date() },
      { new: true, upsert: true },
    );

    res.json({ success: true, performance: perf });
  } catch (error) {
    console.error('Institute performance AI error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate AI insights' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const InstituteTest = require('../models/InstituteTest');
const GeneratedPaper = require('../models/GeneratedPaper');
const geminiAI = require('../utils/geminiAI');

// Create institute test (metadata only)
router.post('/create', async (req, res) => {
  try {
    const {
      instituteId,
      name,
      examType,
      class: className,
      subjects,
      startTime,
      endTime,
      durationMinutes,
      mode,
      proctorRules,
    } = req.body;

    const test = new InstituteTest({
      instituteId,
      name,
      examType,
      class: className,
      subjects,
      startTime,
      endTime,
      durationMinutes,
      mode,
      proctorRules,
    });

    await test.save();
    res.status(201).json({ success: true, test });
  } catch (error) {
    console.error('Institute test create error:', error);
    res.status(500).json({ success: false, message: 'Failed to create test' });
  }
});

// List tests for an institute
router.get('/', async (req, res) => {
  try {
    const { instituteId, status, class: classFilter } = req.query;
    const query = {};
    if (instituteId) query.instituteId = instituteId;
    if (status) query.status = status;
    if (classFilter) query.class = classFilter;

    const tests = await InstituteTest.find(query).sort({ createdAt: -1 });
    res.json({ success: true, tests });
  } catch (error) {
    console.error('Institute tests list error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tests' });
  }
});

// Generate questions for a test using AI and create a GeneratedPaper
router.post('/generate-paper', async (req, res) => {
  try {
    const { instituteId, class: className, subject, chapters = [], difficultyMix, questionCount = 50, examType } = req.body;

    const paperData = await geminiAI.generatePaper({
      class: className,
      subject,
      chapters,
      difficultyMix,
      questionConfig: { count: questionCount },
    });

    const paper = new GeneratedPaper({
      instituteId,
      class: className,
      subject,
      chapters,
      examType,
      totalMarks: paperData.totalMarks || questionCount,
      durationMinutes: paperData.durationMinutes || 180,
      difficultyMix,
      questions: paperData.questions || [],
      difficultyStats: paperData.difficultyStats || {},
    });

    await paper.save();
    res.status(201).json({ success: true, paper });
  } catch (error) {
    console.error('Institute paper generation error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate paper' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const StudyMaterial = require('../models/StudyMaterial');
const geminiAI = require('../utils/geminiAI');

// Upload / register study material (expects fileUrl or linkUrl from frontend upload service)
router.post('/upload', async (req, res) => {
  try {
    const {
      instituteId,
      teacherId,
      materialType,
      title,
      fileUrl,
      linkUrl,
      class: className,
      subject,
      chapter,
      tags,
      rawTextForSummary,
    } = req.body;

    let aiSummary;
    if (rawTextForSummary) {
      aiSummary = await geminiAI.summarizeMaterial(rawTextForSummary).catch(() => undefined);
    }

    const material = new StudyMaterial({
      instituteId,
      teacherId,
      materialType,
      title,
      fileUrl,
      linkUrl,
      class: className,
      subject,
      chapter,
      tags,
      aiSummary,
    });

    await material.save();
    res.status(201).json({ success: true, material });
  } catch (error) {
    console.error('Institute material upload error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload material' });
  }
});

// List materials
router.get('/', async (req, res) => {
  try {
    const { instituteId, class: classFilter, subject, chapter } = req.query;
    const query = {};
    if (instituteId) query.instituteId = instituteId;
    if (classFilter) query.class = classFilter;
    if (subject) query.subject = subject;
    if (chapter) query.chapter = chapter;

    const materials = await StudyMaterial.find(query).sort({ createdAt: -1 });
    res.json({ success: true, materials });
  } catch (error) {
    console.error('Institute material list error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch materials' });
  }
});

module.exports = router;

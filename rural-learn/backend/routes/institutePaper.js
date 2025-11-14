const express = require('express');
const router = express.Router();
const GeneratedPaper = require('../models/GeneratedPaper');

// List generated papers for an institute
router.get('/', async (req, res) => {
  try {
    const { instituteId, class: classFilter, subject } = req.query;
    const query = {};
    if (instituteId) query.instituteId = instituteId;
    if (classFilter) query.class = classFilter;
    if (subject) query.subject = subject;

    const papers = await GeneratedPaper.find(query).sort({ createdAt: -1 });
    res.json({ success: true, papers });
  } catch (error) {
    console.error('Institute papers list error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch papers' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const geminiAI = require('../utils/geminiAI');

// Generate notes via AI
router.post('/generate', async (req, res) => {
  try {
    const {
      instituteId,
      teacherId,
      sourceType,
      sourceRef,
      class: className,
      subject,
      style = 'simple',
      rawContent,
    } = req.body;

    if (!rawContent) {
      return res.status(400).json({ success: false, message: 'rawContent is required for notes generation' });
    }

    const notesText = await geminiAI.generateNotesWithStyle({
      content: rawContent,
      style,
    });

    const notes = new Notes({
      instituteId,
      teacherId,
      sourceType,
      sourceRef,
      class: className,
      subject,
      styleUsed: style,
      notesText,
    });

    await notes.save();
    res.status(201).json({ success: true, notes });
  } catch (error) {
    console.error('Institute notes generate error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate notes' });
  }
});

// Get notes by id
router.get('/:id', async (req, res) => {
  try {
    const notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).json({ success: false, message: 'Notes not found' });
    }
    res.json({ success: true, notes });
  } catch (error) {
    console.error('Institute notes fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notes' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a single student under an institute
router.post('/add', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      instituteId,
      batchId,
      rollNo,
      parentContact,
      assignedSubjects,
      grade,
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Student name is required' });
    }

    // Allow frontend to omit email/password; generate simple defaults for demo purposes
    let finalEmail = email;
    if (!finalEmail) {
      finalEmail = `student+${Date.now()}@demo.rurallearn.local`;
    }
    let finalPassword = password || Math.random().toString(36).slice(2, 10);

    // Basic duplicate check on email actually used
    const existing = await User.findOne({ email: finalEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Student with this email already exists' });
    }

    const student = new User({
      name,
      email: finalEmail,
      password: finalPassword,
      role: 'student',
      institute: instituteId,
      batch: batchId,
      rollNo,
      parentContact,
      assignedSubjects: assignedSubjects || [],
      profile: {
        grade,
      },
    });

    await student.save();

    res.status(201).json({ success: true, student: { id: student._id, name: student.name, email: student.email } });
  } catch (error) {
    console.error('Institute student add error:', error);
    res.status(500).json({ success: false, message: 'Failed to create student' });
  }
});

// List students for an institute with optional filters
router.get('/', async (req, res) => {
  try {
    const { instituteId, batchId, class: classFilter, status } = req.query;

    const query = {};
    if (instituteId) query.institute = instituteId;
    if (batchId) query.batch = batchId;
    if (status) query.activeStatus = status;
    if (classFilter) query['profile.grade'] = classFilter;

    const students = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, students });
  } catch (error) {
    console.error('Institute students list error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
});

module.exports = router;

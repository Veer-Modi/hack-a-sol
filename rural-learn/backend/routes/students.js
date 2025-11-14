const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// Get student profile
router.get('/:id/profile', async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .populate('progress.completedCourses')
      .select('-password');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student profile'
    });
  }
});

// Update student progress
router.post('/:id/progress', async (req, res) => {
  try {
    const { courseId, moduleId, points } = req.body;
    
    const student = await User.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Update progress
    student.progress.totalPoints += points || 10;
    student.progress.currentStreak += 1;
    
    if (courseId && !student.progress.completedCourses.includes(courseId)) {
      student.progress.completedCourses.push(courseId);
    }
    
    await student.save();
    
    res.json({
      success: true,
      progress: student.progress
    });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress'
    });
  }
});

module.exports = router;
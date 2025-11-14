const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const geminiAI = require('../utils/geminiAI');

// Create course by teacher
router.post('/:id/courses', async (req, res) => {
  try {
    const { title, description, subject, level, modules, teachingStyle } = req.body;
    
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(403).json({
        success: false,
        message: 'Only teachers can create courses'
      });
    }
    
    // Adapt content to teacher's style
    let adaptedModules = modules;
    if (teachingStyle) {
      adaptedModules = await Promise.all(
        modules.map(async (module) => {
          const adaptedContent = await geminiAI.adaptToTeachingStyle(
            module.content.text,
            teachingStyle
          );
          return {
            ...module,
            content: {
              ...module.content,
              text: adaptedContent
            }
          };
        })
      );
    }
    
    const course = new Course({
      title,
      description,
      subject,
      level,
      teacher: req.params.id,
      modules: adaptedModules,
      isAIGenerated: false
    });
    
    await course.save();
    
    res.status(201).json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Course creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course'
    });
  }
});

// Get teacher's courses
router.get('/:id/courses', async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.params.id })
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Teacher courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch teacher courses'
    });
  }
});

module.exports = router;
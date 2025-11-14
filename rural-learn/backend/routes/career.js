const express = require('express');
const router = express.Router();
const geminiAI = require('../utils/geminiAI');

// Generate career roadmap
router.post('/roadmap', async (req, res) => {
  try {
    const { careerPath, currentLevel, interests, skills } = req.body;
    
    const roadmap = await geminiAI.generateCareerRoadmap(careerPath, currentLevel);
    
    res.json({
      success: true,
      roadmap
    });
  } catch (error) {
    console.error('Career roadmap error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate career roadmap'
    });
  }
});

// Get popular career paths
router.get('/paths', async (req, res) => {
  try {
    const careerPaths = [
      {
        title: 'Frontend Developer',
        description: 'Build user interfaces and web experiences',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue'],
        averageSalary: '₹4-12 LPA',
        demandLevel: 'High'
      },
      {
        title: 'Backend Developer',
        description: 'Build server-side applications and APIs',
        skills: ['Node.js', 'Python', 'Java', 'Databases', 'Cloud'],
        averageSalary: '₹5-15 LPA',
        demandLevel: 'High'
      },
      {
        title: 'Data Scientist',
        description: 'Analyze data and build ML models',
        skills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
        averageSalary: '₹6-20 LPA',
        demandLevel: 'Very High'
      },
      {
        title: 'Mobile App Developer',
        description: 'Build mobile applications',
        skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        averageSalary: '₹4-14 LPA',
        demandLevel: 'High'
      }
    ];
    
    res.json({
      success: true,
      careerPaths
    });
  } catch (error) {
    console.error('Career paths error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch career paths'
    });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subject: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isAIGenerated: { type: Boolean, default: false },
  
  modules: [{
    title: String,
    description: String,
    order: Number,
    content: {
      text: String,
      videos: [{
        title: String,
        url: String,
        duration: String,
        source: String
      }],
      notes: String,
      resources: [String]
    },
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }]
  }],
  
  roadmap: [{
    step: Number,
    title: String,
    description: String,
    estimatedTime: String,
    prerequisites: [String],
    resources: [String]
  }],
  
  metadata: {
    duration: String,
    difficulty: String,
    tags: [String],
    rating: { type: Number, default: 0 },
    enrollments: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
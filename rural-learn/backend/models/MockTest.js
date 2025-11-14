const mongoose = require('mongoose');

const mockTestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  examType: { type: String, required: true }, // JEE, NEET, CLAT, CAT, etc.
  duration: { type: Number, required: true }, // in minutes
  totalMarks: { type: Number, required: true },
  
  questions: [{
    question: { type: String, required: true },
    options: [String],
    correctAnswer: { type: Number, required: true },
    marks: { type: Number, default: 1 },
    negativeMarks: { type: Number, default: 0 },
    subject: String,
    topic: String,
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    explanation: String
  }],
  
  aiPrediction: {
    accuracyRate: Number,
    similarityScore: Number,
    predictedScore: Number,
    confidenceLevel: Number
  },
  
  attempts: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: [Number],
    score: Number,
    timeTaken: Number,
    cheatingDetected: { type: Boolean, default: false },
    tabSwitches: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now }
  }],
  
  analytics: {
    averageScore: Number,
    passRate: Number,
    topicWiseAnalysis: [{
      topic: String,
      averageScore: Number,
      difficulty: Number
    }]
  }
}, { timestamps: true });

module.exports = mongoose.model('MockTest', mockTestSchema);
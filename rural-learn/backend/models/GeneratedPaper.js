const mongoose = require('mongoose');

const generatedPaperSchema = new mongoose.Schema({
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  class: String,
  subject: String,
  chapters: [String],
  examType: String,
  totalMarks: Number,
  durationMinutes: Number,
  difficultyMix: {
    easy: Number,
    medium: Number,
    hard: Number,
  },
  questions: [{
    text: String,
    options: [String],          // for MCQ
    correctAnswer: String,
    marks: Number,
    type: { type: String, enum: ['mcq', 'short', 'long'], default: 'mcq' },
    topic: String,
    difficulty: String,
    solution: String,
  }],
  difficultyStats: {
    easyCount: Number,
    mediumCount: Number,
    hardCount: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('GeneratedPaper', generatedPaperSchema);

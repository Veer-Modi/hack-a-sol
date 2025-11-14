const mongoose = require('mongoose');

const examAttemptSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    questionId: String,      // can be index or id from GeneratedPaper
    type: String,            // mcq/short/long
    mcqAnswer: String,
    textAnswer: String,
    imageUrl: String,
    timeTakenSec: Number,
  }],
  score: Number,
  aiScoreSuggestion: Number,
  aiExplanation: String,
  checkedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkedAt: Date,
  cheatingDetected: Boolean,
  tabSwitches: Number,
}, { timestamps: true });

module.exports = mongoose.model('ExamAttempt', examAttemptSchema);

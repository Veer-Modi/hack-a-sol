const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  accuracyByTopic: Object,
  speedByTopic: Object,
  attemptHistory: [{
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteTest' },
    score: Number,
    totalMarks: Number,
    date: Date,
  }],
  aiInsights: String,
}, { timestamps: true });

module.exports = mongoose.model('Performance', performanceSchema);

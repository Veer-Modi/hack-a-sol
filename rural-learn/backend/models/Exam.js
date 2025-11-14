const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  name: String,
  examType: { type: String, enum: ['mcq', 'subjective', 'mixed'], default: 'mixed' },
  subjects: [String],
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteTest' },
  markingScheme: Object,
  proctoringEnabled: { type: Boolean, default: true },
  maxTabSwitch: { type: Number, default: 3 },
  cameraChecks: { type: Boolean, default: false },
  status: { type: String, enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled' },
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);

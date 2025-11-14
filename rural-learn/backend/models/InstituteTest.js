const mongoose = require('mongoose');

const instituteTestSchema = new mongoose.Schema({
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  name: { type: String, required: true },
  examType: String,                   // e.g. "Unit Test", "Monthly"
  class: String,                      // e.g. "10"
  subjects: [String],
  assignedBatchIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
  assignedStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startTime: Date,
  endTime: Date,
  durationMinutes: Number,
  mode: { type: String, enum: ['offline', 'online', 'mixed'], default: 'online' },
  proctorRules: {
    tabSwitchLimit: { type: Number, default: 3 },
    webcamRequired: { type: Boolean, default: false },
  },
  status: { type: String, enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled' },
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'GeneratedPaper' },
}, { timestamps: true });

module.exports = mongoose.model('InstituteTest', instituteTestSchema);

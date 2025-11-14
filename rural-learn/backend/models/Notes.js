const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceType: { type: String, enum: ['file', 'video', 'topic'], required: true },
  sourceRef: String,
  class: String,
  subject: String,
  styleUsed: { type: String, enum: ['simple', 'detailed', 'exam', 'teacherStyle'], default: 'simple' },
  notesText: String,
  notesPdfUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Notes', notesSchema);

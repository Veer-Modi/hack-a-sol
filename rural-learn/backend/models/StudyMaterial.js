const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materialType: { type: String, enum: ['pdf', 'ppt', 'video', 'link'], required: true },
  title: String,
  fileUrl: String,
  linkUrl: String,
  class: String,
  subject: String,
  chapter: String,
  tags: [String],
  aiSummary: String,
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);

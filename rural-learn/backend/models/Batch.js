const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  name: { type: String, required: true }, // e.g. "Class 10 - A"
  academicYear: String,                   // e.g. "2024-25"
  classes: [String],                      // e.g. ["10"]
  subjects: [String],                     // e.g. ["Maths", "Science"]
  teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);

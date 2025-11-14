const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  state: String,
  district: String,
  contactEmail: String,
  contactPhone: String,
  adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  settings: {
    defaultLanguage: { type: String, default: 'english' },
    timezone: { type: String, default: 'Asia/Kolkata' },
    antiCheat: {
      maxTabSwitch: { type: Number, default: 3 },
      autoSubmitOnCheat: { type: Boolean, default: true },
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Institute', instituteSchema);

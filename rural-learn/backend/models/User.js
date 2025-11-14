const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  profile: {
    avatar: String,
    bio: String,
    grade: String,
    subjects: [String],
    learningStyle: String
  },
  progress: {
    completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    currentStreak: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    achievements: [String]
  },
  preferences: {
    language: { type: String, default: 'english' },
    difficulty: { type: String, default: 'beginner' },
    studyTime: String
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/mock-tests', require('./routes/mockTests'));
app.use('/api/career', require('./routes/career'));

// Institute module routes
app.use('/api/institute/students', require('./routes/instituteStudents'));
app.use('/api/institute/tests', require('./routes/instituteTests'));
app.use('/api/institute/performance', require('./routes/institutePerformance'));
app.use('/api/institute/paper', require('./routes/institutePaper'));
app.use('/api/institute/material', require('./routes/instituteMaterial'));
app.use('/api/institute/notes', require('./routes/instituteNotes'));
app.use('/api/institute/exam', require('./routes/instituteExam'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
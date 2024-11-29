const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of strings for the options
    required: true,
    validate: {
      validator: (arr) => arr.length === 4,
      message: 'Each question must have exactly 4 options',
    },
  },
  correctOption: {
    type: Number, // Index of the correct option (0-based)
    required: true,
    validate: {
      validator: (num) => num >= 0 && num <= 3,
      message: 'correctOption must be between 0 and 3',
    },
  },
});

module.exports = mongoose.model('Quiz', quizSchema);

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'Pending' },
});

// Use `mongoose.models` to check if the model already exists
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

module.exports = Course;

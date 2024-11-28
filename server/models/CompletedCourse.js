// models/CompletedCourse.js
const mongoose = require("mongoose");

const completedCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completionTime: { type: String, required: true },
  recipients: { type: [String], required: true },
});

module.exports = mongoose.model("CompletedCourse", completedCourseSchema);

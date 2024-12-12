const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  weekIndex: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("quizattened", QuizSchema);

const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    feedbackType: {
      type: [String], // Array of strings
      required: false,
      default: [],
    },
    comment: {
      type: String,
      required: false,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    courseId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);

const mongoose = require("mongoose");

const VideoTimingSchema = new mongoose.Schema(
  {
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
    videoId: {
      type: String,
      required: true,
    },
    timeSpent: {
      type: Number, // Time in seconds
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VideoTiming", VideoTimingSchema);

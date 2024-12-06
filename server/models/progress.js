const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
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
    completedVideos: {
      type: [String],
      default: [],
      required: false,
      set: (videos) => [...new Set(videos)],
    },
    progressPercentage: {
      type: Number,
      default: 0, 
    },
    isCompleted: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,
  }
);
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
module.exports =
  mongoose.models.Progress || mongoose.model("Progress", progressSchema);

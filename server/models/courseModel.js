const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    learnPoints: [{ type: String }],
    requirements: [{ type: String }],
    weeks: [{
      weekNumber: Number,
      videos: [{
        title: String,
        description: String,
        videoId: mongoose.Schema.Types.ObjectId,  // Reference to the video file stored in GridFS
        thumbnailId: mongoose.Schema.Types.ObjectId,  // Reference to the thumbnail file stored in GridFS
        resourceId: mongoose.Schema.Types.ObjectId,  // Reference to the resource file stored in GridFS
      }],
    }],
    quizzes: [{
      quizTitle: String,
      questions: [{
        question: String,
        choices: [String],
        correctAnswer: String,
      }],
    }],
    files: [{
      type: String,  // 'trailer', 'thumbnail', 'video', 'resource'
      fileId: mongoose.Schema.Types.ObjectId,  // GridFS file id
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);

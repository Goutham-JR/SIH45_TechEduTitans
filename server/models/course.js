const mongoose = require("mongoose");

// Define Quiz Schema
const quizSchema = new mongoose.Schema({
  questions: [
    {
      question: { type: String, required: true },
      choices: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});

// Define Video Schema
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true }, // Path to thumbnail file
  video: { type: String, required: true },  // Path to video file
  resource: { type: String }, // Path to additional resource file
});

// Define Week Schema
const weekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true }, // Week number for ordering
  videos: [videoSchema], // Videos for the week
  quiz: { type: quizSchema, required: false }, // Each week has one quiz
});

// Define Course Schema
const courseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    learnPoints: { type: [String], required: true },
    requirements: { type: [String], required: true },
    weeks: { 
      type: [weekSchema],      
      required:false,
    },
    finalQuiz: { type: quizSchema, required: false }, // Final quiz for the course
    trailerId: { type: String, required: false },
    thumbnailtrailer: { type: String, required: false }, // Path to trailer file
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create Mongoose Model
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

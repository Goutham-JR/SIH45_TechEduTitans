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
  video: { type: String, required: true }, // Path to video file
  resource: { type: String }, // Path to additional resource file
});

// Define Week Schema
const weekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true }, // Week number for ordering
  videos: [videoSchema], // Videos for the week
  quiz: { type: quizSchema, required: true }, // Each week has one quiz
});

// Define Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    learnPoints: { type: [String], required: true },
    requirements: { type: [String], required: true },
    weeks: { 
      type: [weekSchema], 
      validate: {
        validator: (weeks) => weeks.length > 0, // Ensure at least one week exists
        message: "A course must have at least one week."
      },
    },
    finalQuiz: { type: quizSchema, required: true }, // Final quiz for the course
    trailer: { type: String }, // Path to trailer file
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create Mongoose Model
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

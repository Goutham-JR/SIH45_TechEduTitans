const mongoose = require("mongoose");


const quizSchema = new mongoose.Schema({
  questions: [
    {
      question: { type: String, required: true },
      choices: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});


module.exports = mongoose.model("quize", quizSchema);

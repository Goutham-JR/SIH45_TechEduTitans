const Course = require('../models/course');
const mongoose = require("mongoose");

exports.getQuizzesByCourseId = async (req, res) => {
  try {
    const weekNumber = parseInt(req.params.weekNumber);
    const quizData = await Course.findOne(
      { "weeks.weekNumber": weekNumber },
      { "weeks.$": 1 }
    );

    if (!quizData || !quizData.weeks) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const quiz = quizData.weeks[0].quiz.questions;
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

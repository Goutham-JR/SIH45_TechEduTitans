const Course = require('../models/course');
const mongoose = require("mongoose");

exports.getQuizzesByCourseId = async (req, res) => {
  try {
    // Extract courseId from request params
    const { courseId } = req.params;

    // Find the course by its ID
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Extract quizzes from all weeks
    const quizzes = course.weeks.map(week => ({
      weekNumber: week.weekNumber,
      weekTitle: week.weekTitle,
      quiz: week.quiz.questions.map(question => ({
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer
      }))
    }));

    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Failed to load quizzes. Please try again later.' });
  }
};

const Quiz = require('../models/quizsample');
const mongoose = require("mongoose");

exports.getQuestionsByQuizId = async (req, res) => {
    try {
      const quizId = '6752ac3bc09817e66d22aabb'; // Get quiz ID from route params
      // Find the quiz by its ID
      const quiz = await Quiz.findById({_id: quizId});
      console.log(quiz);
  
      // If quiz not found, return a 404 error
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      // Send the questions as the response
      res.status(200).json(quiz.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Failed to load questions. Please try again later.' });
    }
  };
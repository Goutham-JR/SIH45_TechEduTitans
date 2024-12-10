const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizmaincontroller'); // Import the controller

// Route to fetch questions for a specific quiz
router.get('/questions', quizController.getQuestionsByQuizId);

module.exports = router;

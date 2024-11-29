const express = require('express');
const router = express.Router();
const { getAllQuestions, addQuestion, deleteQuestion } = require('../controllers/quizController');

// Route to fetch all quiz questions
router.get('/', getAllQuestions);

// Route to add a new quiz question
router.post('/', addQuestion);

// Route to delete a quiz question
router.delete('/:id', deleteQuestion);

module.exports = router;

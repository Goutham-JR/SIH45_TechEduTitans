const Quiz = require('../models/quizModel');

// Fetch all quiz questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Failed to fetch quiz questions' });
  }
};

// Add a new quiz question
const addQuestion = async (req, res) => {
  const { question, options, correctOption } = req.body;

  if (!question || !options || correctOption === undefined) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const newQuestion = new Quiz({ question, options, correctOption });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Failed to add quiz question' });
  }
};

// Delete a quiz question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Quiz.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Failed to delete quiz question' });
  }
};

module.exports = {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
};

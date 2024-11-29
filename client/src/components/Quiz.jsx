import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
  Box,
} from '@mui/material';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch quiz questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quiz');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle selecting an answer
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Submit the quiz and evaluate the score
  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctOption.toString()) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  // Reset the quiz
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quiz Page
      </Typography>

      {!submitted ? (
        questions.map((question) => (
          <Paper key={question._id} style={{ padding: '15px', marginBottom: '20px' }}>
            <Typography variant="h6">{question.question}</Typography>
            <RadioGroup
              value={answers[question._id] || ''}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Paper>
        ))
      ) : (
        <Box>
          {questions.map((question) => (
            <Paper key={question._id} style={{ padding: '15px', marginBottom: '20px' }}>
              <Typography variant="h6">{question.question}</Typography>
              <Typography
                style={{
                  color:
                    answers[question._id] === question.correctOption.toString()
                      ? 'green'
                      : 'red',
                }}
              >
                Your Answer: {question.options[answers[question._id]] || 'Not Answered'}
              </Typography>
              <Typography>Correct Answer: {question.options[question.correctOption]}</Typography>
            </Paper>
          ))}
          <Typography variant="h5">Your Score: {score} / {questions.length}</Typography>
          <Button variant="contained" color="primary" onClick={handleReset} style={{ marginTop: '20px' }}>
            Try Again
          </Button>
        </Box>
      )}

      {!submitted && questions.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      )}
    </Container>
  );
};

export default QuizPage;

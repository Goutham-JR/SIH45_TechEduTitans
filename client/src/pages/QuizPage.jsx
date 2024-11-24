import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

const QuizPage = () => {
  // Dummy data for quiz questions
  const dummyQuestions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5"],
      correctAnswer: "4",
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which programming language is used for web development?",
      options: ["Python", "JavaScript", "C++"],
      correctAnswer: "JavaScript",
    },
  ];

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Simulate fetching data with dummy questions
  useEffect(() => {
    setTimeout(() => {
      setQuestions(dummyQuestions);
      setLoading(false);
    }, 1000); // Simulated delay
  }, []);

  // Handle answer selection
  const handleAnswerChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestion]: event.target.value,
    });
  };

  // Submit quiz and calculate score
  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  // Render loading spinner
  if (loading) return <CircularProgress />;

  // Render results
  if (submitted)
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h4">Your Score: {score} / {questions.length}</Typography>
      </Box>
    );

  // Render questions
  const current = questions[currentQuestion];
  return (
    <Box maxWidth={600} margin="auto" p={4}>
      <Typography variant="h5" gutterBottom>
        {`Question ${currentQuestion + 1}/${questions.length}`}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {current.question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={answers[currentQuestion] || ""} onChange={handleAnswerChange}>
          {current.options.map((option, index) => (
            <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </FormControl>
      <Box mt={4}>
        {currentQuestion < questions.length - 1 && (
          <Button variant="contained" onClick={() => setCurrentQuestion((prev) => prev + 1)}>
            Next
          </Button>
        )}
        {currentQuestion === questions.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuizPage;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const AddQuizzes = ({ onBack, onNext, initialData, totalWeeks }) => {
  const [quizzes, setQuizzes] = useState(
    initialData || Array.from({ length: totalWeeks }, () => ({ questions: [], time: 0 }))
  );
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setQuizzes(initialData);
    }
  }, [initialData]);

  const addQuiz = () => {
    setQuizzes([...quizzes, { questions: [], time: 0 }]);
  };

  const removeQuiz = (index) => {
    setQuizzes(quizzes.filter((_, i) => i !== index));
  };

  const addQuestion = (quizIndex) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].questions.push({
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: "",
      points: 1,
    });
    setQuizzes(updatedQuizzes);
  };

  const removeQuestion = (quizIndex, questionIndex) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].questions = updatedQuizzes[quizIndex].questions.filter(
      (_, i) => i !== questionIndex
    );
    setQuizzes(updatedQuizzes);
  };

  const handleQuestionChange = (quizIndex, questionIndex, field, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].questions[questionIndex][field] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleChoiceChange = (quizIndex, questionIndex, choiceIndex, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].questions[questionIndex].choices[choiceIndex] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleQuizTimeChange = (quizIndex, value) => {
    // Ensure value is a number and valid for quiz time
    if (!isNaN(value) && value >= 1) {
      const updatedQuizzes = [...quizzes];
      updatedQuizzes[quizIndex].time = value;
      setQuizzes(updatedQuizzes);
    }
  };

  const handleNext = () => {
    console.log("Quizzes Data:", quizzes);
    onNext({ quizzes });
  };

  return (
    <Box
      sx={{
        padding: "30px",
        maxWidth: "900px",
        margin: "40px auto",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add Quizzes
      </Typography>

      {quizzes.map((quiz, quizIndex) => (
        <Box
          key={quizIndex}
          sx={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Quiz for Week {quizIndex + 1}
          </Typography>

          <TextField
            label="Quiz Time (minutes)"
            variant="outlined"
            type="number"
            fullWidth
            value={quiz.time}
            onChange={(e) => handleQuizTimeChange(quizIndex, e.target.value)}
            sx={{ marginBottom: "20px" }}
            inputProps={{ min: 1, step: 1 }}
          />

          {quiz.questions.map((question, questionIndex) => (
            <Box
              key={questionIndex}
              sx={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px dashed #ccc",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Question {questionIndex + 1}
              </Typography>

              <TextField
                label="Question Text"
                variant="outlined"
                fullWidth
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(quizIndex, questionIndex, "question", e.target.value)
                }
                sx={{ marginBottom: "10px" }}
              />

              {question.choices.map((choice, choiceIndex) => (
                <TextField
                  key={choiceIndex}
                  label={`Choice ${choiceIndex + 1}`}
                  variant="outlined"
                  fullWidth
                  value={choice}
                  onChange={(e) =>
                    handleChoiceChange(
                      quizIndex,
                      questionIndex,
                      choiceIndex,
                      e.target.value
                    )
                  }
                  sx={{ marginBottom: "10px" }}
                />
              ))}

              <Select
                fullWidth
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(
                    quizIndex,
                    questionIndex,
                    "correctAnswer",
                    e.target.value
                  )
                }
                displayEmpty
                sx={{ marginBottom: "10px" }}
              >
                <MenuItem value="" disabled>
                  Select Correct Answer
                </MenuItem>
                {question.choices.map((choice, choiceIndex) => (
                  <MenuItem key={choiceIndex} value={choice}>
                    {`Choice ${choiceIndex + 1}`}
                  </MenuItem>
                ))}
              </Select>

              <IconButton
                color="error"
                onClick={() => removeQuestion(quizIndex, questionIndex)}
              >
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => addQuestion(quizIndex)}
          >
            Add Question
          </Button>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={addQuiz}
        sx={{ marginBottom: "20px" }}
      >
        Add Quiz for New Week
      </Button>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddQuizzes;

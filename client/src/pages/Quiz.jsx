import React, { useState } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";

const QuizzerPage = () => {
  // Quiz data
  const questions = [
    {
      id: 1,
      question: "Which of the following is not a programming language?",
      options: ["Python", "HTML", "Java", "C++"],
      correctAnswer: "HTML",
    },
    {
      id: 2,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: 3,
      question: "Which of these is a JavaScript framework?",
      options: ["Django", "React", "Angular", "Flask"],
      correctAnswer: "React",
    },
    {
      id: 4,
      question: "Which one is used for styling web pages?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      correctAnswer: "CSS",
    },
  ];

  // State for current question, score, and answer feedback
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // To store answers
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(10);
  React.useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizCompleted]);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle answer selection
  const handleAnswerClick = (answer) => {
    if (!quizCompleted) {
      // Store answer without showing correct or incorrect colors
      const correct = answer === currentQuestion.correctAnswer;
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: currentQuestion.id, answer, isCorrect: correct },
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true); // Quiz is completed
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score after the quiz is completed
    const totalScore = answers.reduce(
      (acc, curr) =>
        questions.find((q) => q.id === curr.questionId).correctAnswer ===
        curr.answer
          ? acc + 1
          : acc,
      0
    );
    setScore(totalScore);
    setQuizCompleted(true);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        quizCompleted ? "bg-gray-700" : "bg-gray-100"
      } transition-all duration-300`}
    >
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {/* Timer */}
        <div className="flex items-center space-x-2 mb-4">
          <Timer className="text-red-500 w-6 h-6" />
          <p className="text-lg font-medium text-gray-600">
            Time Left:{" "}
            <span className="font-semibold text-red-500">{timeLeft}s</span>
          </p>
        </div>

        {/* Questions */}
        {!quizCompleted && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const answerData = answers.find(
                  (ans) => ans.questionId === currentQuestion.id
                );
                const isSelected = answerData?.answer === option;
                const isAnswered = answerData !== undefined;

                return (
                  <motion.button
                    key={index}
                    className={`w-full py-3 px-4 text-left border rounded-lg font-medium ${
                      isAnswered
                        ? "bg-blue-700 text-white"
                        : isSelected
                        ? "bg-gray-700 text-white"
                        : "bg-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleAnswerClick(option)}
                    disabled={isAnswered} // Disable after answer is selected
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {/* Next Question Button */}
            {answers.find((ans) => ans.questionId === currentQuestion.id) && (
              <motion.button
                onClick={handleNextQuestion}
                className="mt-6 w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-100 transition"
                whileTap={{ scale: 0.95 }}
              >
                Next Question
              </motion.button>
            )}

            {/* Submit Quiz Button */}
            {currentQuestionIndex === questions.length - 1 && (
              <motion.button
                onClick={handleSubmitQuiz}
                className="mt-6 w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                whileTap={{ scale: 0.95 }}
              >
                Submit Quiz
              </motion.button>
            )}
          </>
        )}

        {/* Quiz Summary */}
        {quizCompleted && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Quiz Completed!</h3>
            <p className="text-lg text-gray-600">
              You got {score} out of {questions.length} questions correct.
            </p>
            <div className="mt-4 space-y-4">
              {questions.map((question) => {
                const userAnswer = answers.find(
                  (ans) => ans.questionId === question.id
                )?.answer;
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <div
                    key={question.id}
                    className={`space-y-2 ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <p className="font-medium text-gray-800">{question.question}</p>
                    <div className="space-x-2">
                      <span
                        className={`inline-block py-1 px-3 rounded-md text-sm ${
                          isCorrect ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        Your Answer: {userAnswer}
                      </span>
                      <span className="text-sm text-gray-500">
                        Correct Answer: {question.correctAnswer}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzerPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5-minute timer
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { courseId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quiz/questions/${courseId}`
        );

        if (Array.isArray(response.data)) {
          const allQuestions = response.data.flatMap((week) => week.quiz);
          setQuestions(allQuestions);
        } else {
          setError('Failed to load questions. Please try again later.');
        }
      } catch (err) {
        console.error('API Error:', err.response || err.message);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [courseId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setTimeLeft(300);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Quiz Page</h1>
        <div className="flex items-center gap-2">
          <Timer className="text-gray-500" />
          <span className="text-lg font-semibold">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>
      </div>

      {loading && (
        <div className="text-center text-blue-500">Loading questions...</div>
      )}

      {error && (
        <div className="text-red-600 text-center mb-5">{error}</div>
      )}

      {!submitted && questions.length > 0 && !loading && (
        <div>
          {questions.map((question) => (
            <motion.div
              key={question._id}
              className="bg-gray-700 shadow-md rounded-md p-4 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold">{question.question}</h2>
              <div className="mt-3">
                {question.choices.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition ${
                      answers[question._id] === option
                        ? 'bg-blue-500 border border-blue-500'
                        : 'bg-gray-700 hover:bg-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      className="hidden"
                      onChange={() =>
                        handleAnswerChange(question._id, option)
                      }
                    />
                    <div
                      className={`w-5 h-5 border rounded-full ${
                        answers[question._id] === option
                          ? 'bg-blue-500'
                          : 'border-gray-400'
                      }`}
                    ></div>
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {submitted && (
        <div>
          {questions.map((question) => (
            <motion.div
              key={question._id}
              className="bg-gray-700 shadow-md rounded-md p-4 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold">{question.question}</h2>
              <p
                className={`mt-2 ${
                  answers[question._id] === question.correctAnswer
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                Your Answer: {answers[question._id] || 'Not Answered'}
              </p>
              <p className="text-gray-100">
                Correct Answer: {question.correctAnswer}
              </p>
            </motion.div>
          ))}
          <h3 className="text-2xl font-semibold">
            Your Score: {score} / {questions.length}
          </h3>
          <button
            className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            onClick={handleReset}
          >
            Try Again
          </button>
        </div>
      )}

      {!submitted && questions.length > 0 && !loading && (
        <button
          className="mt-5 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}

      {timeLeft === 0 && !submitted && (
        <div className="text-red-600 mt-5 text-center">
          Time is up! Please submit the quiz.
        </div>
      )}
    </div>
  );
};

export default Quiz;

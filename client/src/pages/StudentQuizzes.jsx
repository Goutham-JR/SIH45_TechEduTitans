import { React } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
const quizDetails = [
  {
    title: "AI Basics Quiz",
    course: "Introduction to AI",
    date: "2024-12-05",
    status: "Not Attempted",
    results: null,
  },
  {
    title: "Machine Learning Quiz",
    course: "Machine Learning 101",
    date: "2024-11-25",
    status: "Completed",
    results: { grade: "B+", feedback: "Good work, but could improve on neural networks." },
  },
  {
    title: "Deep Learning Quiz",
    course: "Deep Learning Fundamentals",
    date: "2024-12-10",
    status: "Not Attempted",
    results: null,
  },
];

const QuizList = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-white">Quizzes</h1>

      {/* Upcoming Quizzes Section */}
      <div>
        <h2 className="text-xl font-medium text-white">Upcoming Quizzes</h2>
        <ul className="space-y-4 mt-4">
          {quizDetails
            .filter((quiz) => quiz.status === "Not Attempted")
            .map((quiz, index) => (
              <li
                key={index}
                className="p-3 bg-gray-700 rounded-md flex justify-between items-center"
              >
                <div className="text-gray-100">
                  <p className="font-semibold">{quiz.title}</p>
                  <p className="text-gray-400">{quiz.course}</p>
                  <p className="text-sm text-gray-500">Scheduled on: {quiz.date}</p>
                </div>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                  onClick={() => setActiveQuiz(index)}
                >
                  Attempt Now
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Completed Quizzes Section */}
      <div>
        <h2 className="text-xl font-medium text-white">Completed Quizzes</h2>
        <ul className="space-y-4 mt-4">
          {quizDetails
            .filter((quiz) => quiz.status === "Completed")
            .map((quiz, index) => (
              <li
                key={index}
                className="p-3 bg-gray-700 rounded-md flex justify-between items-center"
              >
                <div className="text-gray-100">
                  <p className="font-semibold">{quiz.title}</p>
                  <p className="text-gray-400">{quiz.course}</p>
                  <p className="text-sm text-gray-500">Completed on: {quiz.date}</p>
                </div>
                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
                  onClick={() => setActiveQuiz(index)}
                >
                  View Results
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Active Quiz Details (If any) */}
      {activeQuiz !== null && (
        <div className="space-y-4 bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-white">
            {quizDetails[activeQuiz].title} - Details
          </h3>
          {quizDetails[activeQuiz].status === "Not Attempted" ? (
            <p className="text-gray-300">You can start the quiz now.</p>
          ) : (
            <div>
              <p className="text-gray-300">Grade: {quizDetails[activeQuiz].results.grade}</p>
              <p className="text-gray-300">Feedback: {quizDetails[activeQuiz].results.feedback}</p>
            </div>
          )}
          <button
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
            onClick={() => setActiveQuiz(null)}
          >
            Close
          </button>
        </div>
      )}
    </motion.div>
  );
};

const quizQuestions = [
  {
    question: "What is the capital of France?",
    type: "multiple-choice",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
    userAnswer: null,
  },
  {
    question: "The Earth is flat.",
    type: "true/false",
    correctAnswer: "false",
    userAnswer: null,
  },
  {
    question: "Describe the process of photosynthesis in one sentence.",
    type: "short-answer",
    correctAnswer: "Photosynthesis is the process by which plants convert light energy into chemical energy.",
    userAnswer: "",
  },
];

const QuizAttempt = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(quizQuestions);

  // Handle multiple choice answer selection
  const handleMultipleChoiceAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex].userAnswer = answer;
    setAnswers(updatedAnswers);
  };

  // Handle short answer input
  const handleShortAnswer = (event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex].userAnswer = event.target.value;
    setAnswers(updatedAnswers);
  };

  // Navigate to the next or previous question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit the quiz and show feedback
  const submitQuiz = () => {
    const score = answers.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;
    alert(`You scored ${score} out of ${quizQuestions.length}`);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-white">Quiz: General Knowledge</h1>

      {/* Question Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white">{`Question ${
          currentQuestionIndex + 1
        }: ${quizQuestions[currentQuestionIndex].question}`}</h2>

        {/* Question Type - Multiple Choice */}
        {quizQuestions[currentQuestionIndex].type === "multiple-choice" && (
          <div className="space-y-2">
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="multiple-choice"
                  value={option}
                  checked={answers[currentQuestionIndex].userAnswer === option}
                  onChange={() => handleMultipleChoiceAnswer(option)}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`} className="text-gray-100">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Question Type - True/False */}
        {quizQuestions[currentQuestionIndex].type === "true/false" && (
          <div className="space-x-4">
            <button
              className={`px-4 py-2 ${
                answers[currentQuestionIndex].userAnswer === "true"
                  ? "bg-green-600"
                  : "bg-gray-600"
              } hover:bg-green-700 text-white rounded-md`}
              onClick={() => handleMultipleChoiceAnswer("true")}
            >
              True
            </button>
            <button
              className={`px-4 py-2 ${
                answers[currentQuestionIndex].userAnswer === "false"
                  ? "bg-red-600"
                  : "bg-gray-600"
              } hover:bg-red-700 text-white rounded-md`}
              onClick={() => handleMultipleChoiceAnswer("false")}
            >
              False
            </button>
          </div>
        )}

        {/* Question Type - Short Answer */}
        {quizQuestions[currentQuestionIndex].type === "short-answer" && (
          <textarea
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            value={answers[currentQuestionIndex].userAnswer}
            onChange={handleShortAnswer}
            rows="4"
            placeholder="Type your answer here..."
          />
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="bg-gray-700 rounded-full w-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {currentQuestionIndex + 1} of {quizQuestions.length} questions
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
          onClick={goToPreviousQuestion}
        >
          Previous
        </button>
        {currentQuestionIndex < quizQuestions.length - 1 ? (
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            onClick={goToNextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            onClick={submitQuiz}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </motion.div>
  );
};

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

// Sample data: For illustration purposes, you can dynamically generate this data based on the quiz results.
const quizResults = [
  { question: "What is the capital of France?", userAnswer: "Paris", correctAnswer: "Paris", isCorrect: true },
  { question: "The Earth is flat.", userAnswer: "false", correctAnswer: "false", isCorrect: true },
  { question: "Describe the process of photosynthesis in one sentence.", userAnswer: "Photosynthesis is the process by which plants convert light energy into chemical energy.", correctAnswer: "Photosynthesis is the process by which plants convert light energy into chemical energy.", isCorrect: true },
];

const totalQuestions = quizResults.length;
const correctAnswers = quizResults.filter((result) => result.isCorrect).length;
const score = `${correctAnswers}/${totalQuestions}`;
const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

// Performance data for chart (you can modify this data dynamically as needed)
const performanceData = [
  { name: "Correct", value: correctAnswers },
  { name: "Incorrect", value: totalQuestions - correctAnswers },
];

const QuizResults = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white">Quiz Results</h2>

      {/* Score Summary */}
      <div className="text-white space-y-2">
        <p className="text-lg">Score: {score}</p>
        <p className="text-lg">Percentage: {percentage}%</p>
      </div>

      {/* Detailed Feedback */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Detailed Feedback</h3>
        {quizResults.map((result, index) => (
          <div key={index} className="text-white">
            <p>
              <strong>{result.question}</strong>
            </p>
            <p>Your Answer: {result.userAnswer}</p>
            <p>
              Correct Answer: <span className="text-green-400">{result.correctAnswer}</span>
            </p>
            <p className={result.isCorrect ? "text-green-500" : "text-red-500"}>
              {result.isCorrect ? "Correct" : "Incorrect"}
            </p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const OverviewPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gray-800 shadow-lg">
          <Header />
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex-1 overflow-auto relative z-10">

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
              {/* STATS */}
              <motion.div
                className="grid grid-cols-1 
			   gap-5 
			   sm:grid-cols-2 
			   lg:grid-cols-4 
			   mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <StatCard
                  name="Total Courses Enrolled"
                  icon={Zap}
                  value="10"
                  color="#6366F1"
                />
                <StatCard
                  name="Total Lessons Completed"
                  icon={Users}
                  value="123"
                  color="#8B5CF6"
                />
                <StatCard
                  name="Badges"
                  icon={ShoppingBag}
                  value="5"
                  color="#EC4899"
                />
                <StatCard
                  name="Total Learning Hours"
                  icon={BarChart2}
                  value="45 hrs"
                  color="#10B981"
                />
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
                <QuizList />
                <QuizAttempt />
                <QuizResults />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;

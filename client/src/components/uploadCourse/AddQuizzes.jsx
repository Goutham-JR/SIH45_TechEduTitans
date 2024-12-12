import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddQuizzes = () => {
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState({ week: '', questions: [], timeSpent: '' });
    const [currentQuestion, setCurrentQuestion] = useState({
        questionText: '',
        choices: ['', '', '', ''],
        correctAnswer: '',
    });
    const [currentTime, setCurrentTime] = useState('');

    const handleAddQuestion = () => {
        const { questionText, choices, correctAnswer } = currentQuestion;

        // Validation
        if (!questionText.trim()) {
            alert('Question text is required!');
            return;
        }
        if (choices.some((choice) => choice.trim() === '')) {
            alert('All four choices are required!');
            return;
        }
        if (!choices.includes(correctAnswer)) {
            alert('Correct answer must match one of the choices!');
            return;
        }

        // Add the validated question
        setCurrentQuiz((prev) => ({
            ...prev,
            questions: [...prev.questions, currentQuestion],
        }));

        // Reset the question form
        setCurrentQuestion({
            questionText: '',
            choices: ['', '', '', ''],
            correctAnswer: '',
        });
    };

    const handleAddTime = () => {
        if (currentTime.trim()) {
            setCurrentQuiz((prev) => ({
                ...prev,
                timeSpent: currentTime, // Save only one time value
            }));
            setCurrentTime('');
        } else {
            alert('Please enter a valid time!');
        }
    };

    const handleAddQuiz = () => {
        if (!currentQuiz.week.trim()) {
            alert('Week number is required!');
            return;
        }
        if (currentQuiz.questions.length === 0) {
            alert('Please add at least one question to the quiz!');
            return;
        }

        // Add the current quiz
        setQuizzes([...quizzes, currentQuiz]);
        setCurrentQuiz({ week: '', questions: [], timeSpent: '' });
    };

    const handleDeleteQuestion = (questionIndex) => {
        setCurrentQuiz((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, index) => index !== questionIndex),
        }));
    };

    const handleDeleteQuiz = (quizIndex) => {
        setQuizzes(quizzes.filter((_, index) => index !== quizIndex));
    };

    const handleNext = () => {
        if (quizzes.length === 0) {
            alert('Please add at least one quiz.');
            return;
        }

        // Navigate to the next page
        navigate('/review-course-data'); // Replace with the actual route
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto p-6 shadow-md bg-gray-800 rounded-lg"
        >
            <h1 className="text-2xl font-semibold text-center mb-4 text-white">Add Quizzes</h1>

            {/* Add Quiz Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Quiz for Week</label>
                <input
                    type="text"
                    placeholder="Enter Week Number"
                    value={currentQuiz.week}
                    onChange={(e) =>
                        setCurrentQuiz((prev) => ({ ...prev, week: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>

            {/* Add Question Section */}
            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-300 mb-4">Add Question</h2>
                <div className="space-y-4">
                    {/* Question Text */}
                    <input
                        type="text"
                        placeholder="Enter Question Text"
                        value={currentQuestion.questionText}
                        onChange={(e) =>
                            setCurrentQuestion((prev) => ({
                                ...prev,
                                questionText: e.target.value,
                            }))
                        }
                        className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />

                    {/* Choices */}
                    {currentQuestion.choices.map((choice, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Choice ${index + 1}`}
                            value={choice}
                            onChange={(e) => {
                                const newChoices = [...currentQuestion.choices];
                                newChoices[index] = e.target.value;
                                setCurrentQuestion((prev) => ({
                                    ...prev,
                                    choices: newChoices,
                                }));
                            }}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    ))}

                    {/* Correct Answer */}
                    <input
                        type="text"
                        placeholder="Enter Correct Answer"
                        value={currentQuestion.correctAnswer}
                        onChange={(e) =>
                            setCurrentQuestion((prev) => ({
                                ...prev,
                                correctAnswer: e.target.value,
                            }))
                        }
                        className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    />

                    {/* Add Question Button */}
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
                    >
                        <PlusCircle className="w-5 h-5 inline-block mr-2" />
                        Add Question
                    </button>
                </div>
            </div>

            {/* Add Time Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Time Spent (in minutes)</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Enter Time"
                        value={currentTime}
                        onChange={(e) => setCurrentTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        onClick={handleAddTime}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Save Time
                    </button>
                </div>
                <div className="mt-2 text-gray-400">
                    <p>Time Spent: {currentQuiz.timeSpent}</p>
                </div>
            </div>

            {/* Add Quiz Button */}
            <button
                type="button"
                onClick={handleAddQuiz}
                className="w-full mb-6 px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none"
            >
                Add Quiz for New Week
            </button>

            {/* Display Quizzes */}
            <div className="space-y-6">
                {quizzes.map((quiz, i) => (
                    <div key={i} className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-white">Quiz for Week {quiz.week}</h3>
                        <ul className="space-y-2 mt-2">
                            {quiz.questions.map((question, j) => (
                                <li
                                    key={j}
                                    className="flex justify-between items-center px-3 py-2 bg-gray-600 rounded-md text-white"
                                >
                                    <div>
                                        <p>{question.questionText}</p>
                                        <p className="text-sm text-gray-400">
                                            Correct Answer: {question.correctAnswer}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteQuestion(j)}
                                        className="text-red-400 hover:text-red-600"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-400 mt-2">Time Spent: {quiz.timeSpent}</p>
                        <button
                            onClick={() => handleDeleteQuiz(i)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 focus:outline-none"
                        >
                            Delete Quiz
                        </button>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-2 mt-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow hover:bg-gray-600 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default AddQuizzes;

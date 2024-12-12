import Header from "../../components/common/Header";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Save,
  Trash2,
  Home,
  Book,
  Lightbulb,
  FileSignature,
  Library,
  Settings,
} from "lucide-react";
import Sidebar from "../../components/common/Sidebar";

const QuizPage = () => {
  const SIDEBAR_ITEMS = [
    {
      name: "Home",
      icon: Home,
      color: "#6366f1",
      href: "/",
    },
    {
      name: "My Courses",
      icon: Book,
      color: "#8B5CF6",
      href: "/courses",
    },
    {
      name: "Learning Path",
      icon: Lightbulb,
      color: "#EC4899",
      href: "/learningpath",
    },
    {
      name: "Quiz",
      icon: FileSignature,
      color: "#10B981",
      href: "/quiz",
    },
    {
      name: "Content Library",
      icon: Library,
      color: "#FF5722",
      href: "/contentlibrary",
    },
    {
      name: "Settings",
      icon: Settings,
      color: "#6EE7B7",
      href: "/settings",
    },
  ];

  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [sampleAnswer, setSampleAnswer] = useState("");
  const [editMode, setEditMode] = useState(true); // Controls whether quiz is editable
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null); // Tracks the index of the question being edited

  const addQuestion = () => {
    if (!newQuestion.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (
      questionType === "mcq" &&
      (options.some((opt) => opt.trim() === "") || correctAnswerIndex === null)
    ) {
      alert("Please complete all options and select the correct answer.");
      return;
    }

    if (questionType === "long" && !sampleAnswer.trim()) {
      alert("Please provide a sample answer for the long answer question.");
      return;
    }

    const newQuestionObj = {
      text: newQuestion,
      type: questionType,
      options: questionType === "mcq" ? options : null,
      correctAnswerIndex: questionType === "mcq" ? correctAnswerIndex : null,
      sampleAnswer: questionType === "long" ? sampleAnswer : null,
    };

    if (editingQuestionIndex !== null) {
      // Update the existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editingQuestionIndex] = newQuestionObj;
      setQuestions(updatedQuestions);
      setEditingQuestionIndex(null);
    } else {
      // Add a new question
      setQuestions([...questions, newQuestionObj]);
    }

    // Reset fields for the next question
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswerIndex(null);
    setSampleAnswer("");
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const saveQuiz = () => {
    if (!quizName.trim() || !quizDescription.trim()) {
      alert("Please provide a quiz name and description.");
      return;
    }

    if (questions.length === 0) {
      alert("Please add at least one question to the quiz.");
      return;
    }

    setEditMode(false);
  };

  const resetQuiz = () => {
    setQuizName("");
    setQuizDescription("");
    setQuestions([]);
    setEditMode(true);
    setEditingQuestionIndex(null); // Reset editing state
  };

  const editQuestion = (index) => {
    const questionToEdit = questions[index];
    setNewQuestion(questionToEdit.text);
    setQuestionType(questionToEdit.type);
    setOptions(questionToEdit.options || ["", "", "", ""]);
    setCorrectAnswerIndex(questionToEdit.correctAnswerIndex);
    setSampleAnswer(questionToEdit.sampleAnswer || "");
    setEditingQuestionIndex(index);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} collapsed={false} />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Quiz Page" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="min-h-screen bg-gray-700 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>

              {/* Quiz Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Quiz Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-gray-600 text-white border border-gray-500"
                  placeholder="Enter quiz name"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  disabled={!editMode}
                />
              </div>

              {/* Quiz Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-2 rounded-md bg-gray-600 text-white border border-gray-500"
                  placeholder="Enter description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  disabled={!editMode}
                ></textarea>
              </div>

              {editMode && (
                <>
                  {/* Add/Edit Question Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-md bg-gray-600 text-white border border-gray-500 mb-4"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Type your question here"
                    />

                    {/* Question Type */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Question Type
                      </label>
                      <select
                        className="w-full p-2 rounded-md bg-gray-600 text-white border border-gray-500"
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                      >
                        <option value="mcq">Multiple Choice</option>
                        <option value="long">Long Answer</option>
                      </select>
                    </div>

                    {/* MCQ Options */}
                    {questionType === "mcq" && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Options</h3>
                        {options.map((option, index) => (
                          <div key={index} className="flex items-center mb-3">
                            <input
                              type="text"
                              className="flex-grow p-2 rounded-md bg-gray-600 text-white border border-gray-500 mr-4"
                              value={option}
                              onChange={(e) =>
                                updateOption(index, e.target.value)
                              }
                              placeholder={`Option ${index + 1}`}
                            />
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={correctAnswerIndex === index}
                              onChange={() => setCorrectAnswerIndex(index)}
                              className="form-radio h-5 w-5 text-blue-500"
                            />
                            <label className="ml-2">Correct</label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Long Answer Input */}
                    {questionType === "long" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Sample Answer
                        </label>
                        <textarea
                          className="w-full p-2 rounded-md bg-gray-600 text-white border border-gray-500"
                          value={sampleAnswer}
                          onChange={(e) => setSampleAnswer(e.target.value)}
                          placeholder="Provide a sample answer"
                        ></textarea>
                      </div>
                    )}

                    {/* Add/Edit Question Button */}
                    <div className="flex justify-end mt-4">
                      <button
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center"
                        onClick={addQuestion}
                      >
                        <Plus className="w-5 h-5 mr-1" />
                        {editingQuestionIndex !== null
                          ? "Update Question"
                          : "Add Question"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Questions List */}
              <div>
                <h2 className="text-xl font-medium mb-4">Questions</h2>
                <ul className="space-y-4">
                  {questions.map((q, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-600 p-4 rounded-md"
                    >
                      <h3 className="font-medium mb-2">
                        {index + 1}. {q.text}
                      </h3>
                      {q.type === "mcq" ? (
                        <ul className="space-y-2">
                          {q.options.map((option, idx) => (
                            <li
                              key={idx}
                              className={`p-2 rounded-md ${
                                idx === q.correctAnswerIndex
                                  ? "bg-green-500"
                                  : "bg-gray-700"
                              }`}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="italic">
                          Sample Answer: {q.sampleAnswer}
                        </p>
                      )}
                      <div className="flex justify-between mt-2">
                        <button
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-md flex items-center"
                          onClick={() => editQuestion(index)}
                        >
                          <Edit className="w-5 h-5 mr-1" />
                          Edit
                        </button>
                        <button
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-md flex items-center"
                          onClick={() => deleteQuestion(index)}
                        >
                          <Trash2 className="w-5 h-5 mr-1" />
                          Delete
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Save/Reset Buttons */}
              <div className="flex justify-end mt-6 space-x-4">
                {editMode ? (
                  <button
                    className="p-2 bg-green-500 hover:bg-green-600 rounded-md flex items-center"
                    onClick={saveQuiz}
                  >
                    <Save className="w-5 h-5 mr-1" />
                    Save Quiz
                  </button>
                ) : (
                  <button
                    className="p-2 bg-gray-500 hover:bg-gray-600 rounded-md flex items-center"
                    onClick={resetQuiz}
                  >
                    <Trash2 className="w-5 h-5 mr-1" />
                    Reset Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default QuizPage;

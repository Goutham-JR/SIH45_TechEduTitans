import { React } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState } from "react";

const assignments = [
  { title: "Assignment 1", course: "Introduction to AI", dueDate: "2024-12-10", status: "Pending" },
  { title: "Assignment 2", course: "Introduction to AI", dueDate: "2024-11-30", status: "Completed" },
  { title: "Assignment 3", course: "Machine Learning", dueDate: "2024-12-15", status: "Pending" },
  { title: "Assignment 4", course: "Deep Learning", dueDate: "2024-12-20", status: "Graded" },
];

const AssignmentList = () => {
  const [activeAssignment, setActiveAssignment] = useState(null);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <h1 className="text-2xl font-bold text-white">Assignment List</h1>
      <p className="text-gray-300">Your pending, completed, and graded assignments</p>

      {/* Pending and Completed Assignments */}
      <div className="space-y-4">
        {/* Pending Assignments */}
        <div>
          <h2 className="text-lg font-medium text-white">Pending</h2>
          <ul className="space-y-2">
            {assignments
              .filter((assignment) => assignment.status === "Pending")
              .map((assignment, index) => (
                <li
                  key={index}
                  className="p-3 rounded-md bg-gray-700 flex justify-between items-center"
                >
                  <span className="text-gray-100">{assignment.title}</span>
                  <div>
                    <span className="text-sm text-gray-400">{assignment.dueDate}</span>
                    <button
                      className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                      onClick={() => setActiveAssignment(assignment)}
                    >
                      Submit
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Completed Assignments */}
        <div>
          <h2 className="text-lg font-medium text-white">Completed</h2>
          <ul className="space-y-2">
            {assignments
              .filter((assignment) => assignment.status === "Completed")
              .map((assignment, index) => (
                <li
                  key={index}
                  className="p-3 rounded-md bg-green-700 flex justify-between items-center"
                >
                  <span className="text-gray-100">{assignment.title}</span>
                  <button
                    className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                    onClick={() => setActiveAssignment(assignment)}
                  >
                    View Details
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Graded Assignments */}
        <div>
          <h2 className="text-lg font-medium text-white">Graded</h2>
          <ul className="space-y-2">
            {assignments
              .filter((assignment) => assignment.status === "Graded")
              .map((assignment, index) => (
                <li
                  key={index}
                  className="p-3 rounded-md bg-gray-500 flex justify-between items-center"
                >
                  <span className="text-gray-100">{assignment.title}</span>
                  <span className="text-sm text-gray-300">Grade: A+</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Active Assignment (if any) */}
      {activeAssignment && (
        <div className="space-y-4 bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-white">{activeAssignment.title}</h3>
          <p className="text-gray-300">Course: {activeAssignment.course}</p>
          <p className="text-gray-300">Due Date: {activeAssignment.dueDate}</p>
          {activeAssignment.status === "Pending" && (
            <button
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
              onClick={() => {
                activeAssignment.status = "Completed";
                setActiveAssignment(null);
              }}
            >
              Mark as Completed
            </button>
          )}
          {activeAssignment.status === "Completed" && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              onClick={() => {
                activeAssignment.status = "Graded";
                setActiveAssignment(null);
              }}
            >
              View Feedback
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

const AssignmentSubmission = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("AI Assignment");
  const [instructions, setInstructions] = useState("Submit your solutions in a PDF or Word document.");
  const [dueDate, setDueDate] = useState("2024-12-10");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (file) {
      setIsSubmitted(true);
      alert("Assignment Submitted Successfully!");
    } else {
      alert("Please upload a file before submitting.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setIsSubmitted(false);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <h1 className="text-2xl font-bold text-white">Assignment Submission</h1>

      {/* Assignment Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white">Assignment Title</h2>
        <p className="text-gray-300">{title}</p>

        <h3 className="text-lg font-medium text-white">Instructions</h3>
        <p className="text-gray-300">{instructions}</p>

        <h3 className="text-lg font-medium text-white">Due Date</h3>
        <p className="text-gray-300">{dueDate}</p>
      </div>

      {/* File Upload Section */}
      <div>
        <h2 className="text-lg font-medium text-white">Upload Your Assignment</h2>
        <input
          type="file"
          accept=".pdf, .docx"
          onChange={handleFileChange}
          className="block w-full text-gray-100 bg-gray-700 p-2 rounded-md"
        />
        {file && (
          <div className="mt-2 text-gray-300">
            <p>Selected File: {file.name}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-x-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
        >
          Submit Assignment
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
        >
          Reset
        </button>
      </div>

      {/* Success Message after Submission */}
      {isSubmitted && (
        <div className="bg-green-700 text-white p-4 rounded-md mt-4">
          <h3 className="font-medium">Your assignment has been submitted!</h3>
        </div>
      )}
    </motion.div>
  );
};

const AssignmentFeedback = () => {
  const [feedback] = useState({
    title: "AI Assignment 1",
    grade: "A+",
    comments: "Excellent work! Your solution is well-researched and implemented with great attention to detail.",
    file: {
      name: "Grading Rubric.pdf",
      link: "#",
    },
  });

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <h1 className="text-2xl font-bold text-white">Assignment Feedback</h1>

      {/* Feedback Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white">Assignment Title</h2>
        <p className="text-gray-300">{feedback.title}</p>

        <h3 className="text-lg font-medium text-white">Grade</h3>
        <p className="text-green-300 text-xl font-semibold">{feedback.grade}</p>

        <h3 className="text-lg font-medium text-white">Instructor's Comments</h3>
        <p className="text-gray-300">{feedback.comments}</p>
      </div>

      {/* Attachments Section */}
      {feedback.file && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white">Download Instructor's Feedback</h2>
          <a
            href={feedback.file.link}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 block"
          >
            Download {feedback.file.name}
          </a>
        </div>
      )}
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
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AssignmentList />
                <AssignmentSubmission />
                <AssignmentFeedback />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;

import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "../components/StatCard";
import axios from "axios";
import { Tooltip, ResponsiveContainer } from "recharts";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const quizData = [
  { quiz: "Quiz 1", score: 85 },
  { quiz: "Quiz 2", score: 70 },
  { quiz: "Quiz 3", score: 90 },
  { quiz: "Quiz 4", score: 65 },
];

const targetScore = 65; // Example target score

const QuizPerformanceChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Your Quiz Performance
      </h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart
            data={quizData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quiz" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#3B82F6" />
            <line
              x1="0"
              x2="100%"
              y1={`${100 - targetScore}%`}
              y2={`${100 - targetScore}%`}
              stroke="red"
              strokeWidth="2"
              opacity="0.7"
              strokeDasharray="5 5"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const CurrentLearningActivity = ({ course, progress }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Current Learning Activity
      </h2>
      <div className="space-y-4">
        <p className="text-gray-300">
          Course:{" "}
          <span className="font-semibold text-white">{course.title}</span>
        </p>
        <div className="bg-gray-700 rounded-full w-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress?.progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400">
          Progress: {progress?.progressPercentage}% completed
        </p>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          onClick={() =>
            navigate("/coursevideo", { state: { query: course._id } })
          }
        >
          Resume
        </button>
      </div>
    </motion.div>
  );
};

const Dashboard = ({ course, progress }) => {
  return (
    <div className="space-y-6">
      <CurrentLearningActivity course={course} progress={progress} />
    </div>
  );
};

const OverviewPage = () => {
  const [userId, setUserId] = useState(null); // User state
  const [totalEnrolled, setTotalEnrolled] = useState(0); // Enrollment count
  const [totalLessonsCompleted, setTotalLessonsCompleted] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [latestCourseId, setLatestCourseId] = useState("");
  const [course, setCourse] = useState("");
  const [progress, setProgress] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTotalTimeSpent = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(
          `http://localhost:5000/api/student/videotimings/time-spent/${userId.id}`
        );
        setTotalTimeSpent(response.data.totalTimeSpent);
      } catch (error) {
        console.error("Error fetching total time spent:", error);
      }
    };

    fetchTotalTimeSpent();
  }, [userId]);

  // Fetch user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/protected/check-auth",
          { withCredentials: true } // Include cookies
        );
        setUserId(response.data.user); // Set user data
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserId(null);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch user-specific enrollments count
  useEffect(() => {
    const fetchUserEnrolledCount = async () => {
      try {
        if (!userId?.id) return; // Only fetch if userId exists

        const response = await axios.get(
          `http://localhost:5000/api/student/enrollments/enrollcount/${userId?.id}`
        );
        setTotalEnrolled(response.data.count); // Set total enrollment count
        console.log("Enrollment Count:", response.data.count);
      } catch (error) {
        console.error("Error fetching user enrollment count:", error);
      }
    };

    fetchUserEnrolledCount();
  }, [userId]);

  useEffect(() => {
    const fetchLessonsCompleted = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(
          `http://localhost:5000/api/student/progress/lessons-completed/${userId.id}`
        );
        setTotalLessonsCompleted(response.data.totalLessonsCompleted);
      } catch (error) {
        console.error("Error fetching lessons completed:", error);
      }
    };

    fetchLessonsCompleted();
  }, [userId]);

  useEffect(() => {
    const fetchLatestCourseId = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(
          `http://localhost:5000/api/student/videotimings/latest-course/${userId.id}`
        );
        setLatestCourseId(response.data.latestCourseId);
      } catch (error) {
        console.error("Error fetching latest courseId:", error);
      }
    };

    fetchLatestCourseId();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latestCourseId) {
          const response = await fetch(
            `http://localhost:5000/api/course/courses/${latestCourseId}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCourse(data);
        } else {
          console.warn("Query is undefined. Skipping fetch.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [latestCourseId]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Ensure both userId and latestCourseId are available before making the request
        if (userId && latestCourseId) {
          const response = await axios.get(
            "http://localhost:5000/api/student/getprogress",
            {
              params: { userId: userId.id, courseId: latestCourseId }, // Pass query parameters
              withCredentials: true, // Send cookies with the request
            }
          );
          setProgress(response.data); // Set progress state with response data
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchProgress();
  }, [userId, latestCourseId]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Layers */}

      {/* Sidebar */}
      <Sidebar />



        {/* Dashboard Content */}

        <div className="flex-1 overflow-auto relative z-10">
          <Header />
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
                value={totalEnrolled}
                color="#6366F1"
              />
              <StatCard
                name="Total Lessons Completed"
                icon={Users}
                value={totalLessonsCompleted}
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
                value={totalTimeSpent + " Hours"}
                color="#10B981"
              />
            </motion.div>

            {/* CHARTS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* <SalesOverviewChart/> */}
              <QuizPerformanceChart />
              <Dashboard course={course} progress={progress} />
            </div>
          </main>
        </div>
      </div>

  );
};

export default OverviewPage;

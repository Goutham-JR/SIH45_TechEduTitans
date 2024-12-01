import { React } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "../components/StatCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const quizPerformanceData = [
  { name: "Excellent (80-100%)", value: 50 },
  { name: "Good (50-79%)", value: 30 },
  { name: "Needs Improvement (0-49%)", value: 20 },
];

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const QuizPerformanceChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Quiz Performance Distribution
      </h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={quizPerformanceData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {quizPerformanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const CurrentLearningActivity = () => {
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
          Module:{" "}
          <span className="font-semibold text-white">Introduction to AI</span>
        </p>
        <div className="bg-gray-700 rounded-full w-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-400">Progress: 50% completed</p>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200">
          Resume
        </button>
      </div>
    </motion.div>
  );
};

const QuickLinks = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Quick Links</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>
          <a
            href="#assignments"
            className="hover:text-white transition-colors duration-200"
          >
            Assignments
          </a>
        </li>
        <li>
          <a
            href="#quizzes"
            className="hover:text-white transition-colors duration-200"
          >
            Quizzes
          </a>
        </li>
        <li>
          <a
            href="#resources"
            className="hover:text-white transition-colors duration-200"
          >
            Resources
          </a>
        </li>
      </ul>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <CurrentLearningActivity />
      <QuickLinks />
    </div>
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

              {/* CHARTS */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* <SalesOverviewChart/> */}
                <QuizPerformanceChart />
                <Dashboard />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;

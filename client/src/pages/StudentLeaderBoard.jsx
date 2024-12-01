import { React } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState } from "react";

const leaderboardData = [
  { rank: 1, name: "John Doe", score: 950, badges: 5 },
  { rank: 2, name: "Jane Smith", score: 900, badges: 4 },
  { rank: 3, name: "Sam Wilson", score: 850, badges: 2 },
];

const LeaderboardTable = () => {
  const [selectedLearner, setSelectedLearner] = useState(null); // Tracks the selected learner

  const handleRowClick = (learnerName) => {
    setSelectedLearner(learnerName);
  };

  const closeShowcase = () => {
    setSelectedLearner(null);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      {selectedLearner ? (
        <BadgeShowcase selectedLearner={selectedLearner} onClose={closeShowcase} />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-white mb-4">Leaderboard</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-900 text-gray-100">
                <th className="px-4 py-2 border border-gray-600 text-left">Rank</th>
                <th className="px-4 py-2 border border-gray-600 text-left">Learner Name</th>
                <th className="px-4 py-2 border border-gray-600 text-left">Total Score</th>
                <th className="px-4 py-2 border border-gray-600 text-left">Badges Earned</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((learner, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  }`}
                  onClick={() => handleRowClick(learner.name)}
                >
                  <td className="px-4 py-2 border border-gray-600">{learner.rank}</td>
                  <td className="px-4 py-2 border border-gray-600">{learner.name}</td>
                  <td className="px-4 py-2 border border-gray-600">{learner.score}</td>
                  <td className="px-4 py-2 border border-gray-600">{learner.badges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LeaderboardTable />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;

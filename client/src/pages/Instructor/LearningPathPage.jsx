import React, { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Home, Book, FileSignature, Library, Settings, LightbulbIcon } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import { Footer } from "../../components/common/Footer";

const LearnigPathPage = () => {
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
      icon: LightbulbIcon,
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
      icon:Library,
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

	const [learningPaths, setLearningPaths] = useState([
    {
      id: 1,
      title: "Introduction to React",
      status: "Published",
      type: "Web Development",
      lastUpdated: "2024-11-25",
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      status: "Draft",
      type: "Design",
      lastUpdated: "2024-11-20",
    },
    {
      id: 3,
      title: "Cybersecurity Basics",
      status: "Retired",
      type: "Security",
      lastUpdated: "2024-10-10",
    },
  ]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(null);

  // Filtered Learning Paths
  const filteredPaths = learningPaths.filter((path) => {
    const matchesStatus = activeTab === "All" || path.status === activeTab;
    const matchesSearch = path.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || path.type === typeFilter;
    return matchesStatus && matchesSearch && matchesType;
  });
  const handleClick = () => {
  navigate("/addlearningpath")
}

    return (
    
    <>
      <Sidebar items={SIDEBAR_ITEMS} collapsed={false} />
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Learning Path" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="min-h-screen bg-gray-700 text-white p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Learning Paths</h1>
            <button
              onClick={handleClick}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add
            </button>
          </div>
          <p className="text-gray-300 mb-6">
            A Learning Path is a bundle of Courses that complement each other or
            are built on a common theme. Use Learning Paths to drive a larger
            learning goal that spans across individual Courses.
          </p>

          {/* Tabs */}
          <div className="flex items-center space-x-4 border-b border-gray-600 pb-3 mb-6">
            {["All", "Published", "Draft", "Retired"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 rounded-md transition-all ${
                  activeTab === tab
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 text-gray-300 rounded-md px-3 py-2 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  className="bg-gray-800 text-gray-300 rounded-md px-3 py-2 focus:outline-none"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Design">Design</option>
                  <option value="Security">Security</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          {filteredPaths.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg shadow-md p-4"
            >
              <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Type</th>
                    <th className="py-2 px-4">Last Updated</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPaths.map((path) => (
                    <tr key={path.id} className="hover:bg-gray-700">
                      <td className="py-2 px-4">{path.title}</td>
                      <td className="py-2 px-4">{path.status}</td>
                      <td className="py-2 px-4">{path.type}</td>
                      <td className="py-2 px-4">{path.lastUpdated}</td>
                      <td className="py-2 px-4 relative">
                        <button
                          className="text-gray-300 hover:text-white"
                          onClick={() =>
                            setShowActionsDropdown(
                              showActionsDropdown === path.id ? null : path.id
                            )
                          }
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        {showActionsDropdown === path.id && (
                          <div className="absolute bg-gray-900 text-gray-300 rounded-lg shadow-lg p-2">
                            <button className="block w-full text-left hover:bg-gray-800 px-2 py-1">
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-400 mt-16"
            >
              <p>No learning paths match your criteria.</p>
            </motion.div>
          )}

          {/* Add Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">
                  Add Learning Path
                </h2>
                <input
                  type="text"
                  placeholder="Title"
                  className="bg-gray-700 text-gray-300 w-full rounded-md px-3 py-2 mb-4 focus:outline-none"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      alert("New Learning Path Added!");
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
          </main>
          <Footer/>
        </div>
        </>
  );
};
export default LearnigPathPage;

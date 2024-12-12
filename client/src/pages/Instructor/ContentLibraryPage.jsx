import React, { useState } from "react";
import {
  ChevronDown,
  Plus,
  Search,
  Home,
  Book,
  Lightbulb,
  FileSignature,
  Library,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";

const ContentLibraryPage = () => {
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

  const initialData = [
    {
      id: 1,
      name: "Mastering Illustrator: 10 Tips & Tricks",
      status: "Published",
      type: "Video",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
    {
      id: 2,
      name: "Enrolling learners",
      status: "Published",
      type: "Document",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
    {
      id: 3,
      name: "Uploading modules and components",
      status: "Retired",
      type: "Document",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
    {
      id: 4,
      name: "Bulk upload process",
      status: "Drafts",
      type: "Document",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
    {
      id: 5,
      name: "Gamification",
      status: "Published",
      type: "Video",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
    {
      id: 6,
      name: "Reporting",
      status: "Drafts",
      type: "Document",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
    {
      id: 7,
      name: "Instance and course settings",
      status: "Published",
      type: "Document",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
    {
      id: 8,
      name: "Edit users",
      status: "Retired",
      type: "Video",
      availability: "Available in 1 language(s)",
      lastModified: "Oct 29, 2024",
      version: 1,
    },
  ];

  // States for managing data
  const [contentData, setContentData] = useState(initialData); // Current data displayed
  const [activeTab, setActiveTab] = useState("Published"); // Active tab
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [typeFilter, setTypeFilter] = useState(""); // Type filter
  const [showActions, setShowActions] = useState(false); // Toggle Actions dropdown

  // Handle tab click
  const handleTabClick = (status) => {
    setActiveTab(status);
    setSearchQuery(""); // Clear search when switching tabs
    setTypeFilter(""); // Clear type filter
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered data based on tabs, search, and type
  const filteredData = contentData.filter((item) => {
    const matchesStatus = item.status === activeTab;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? item.type === typeFilter : true;
    return matchesStatus && matchesSearch && matchesType;
  });

  // Handle type filter click
  const handleTypeFilter = (type) => {
    setTypeFilter(type);
  };

  // Handle "Add" button click
  const handleAddContent = () => {
    alert("Add Content functionality triggered!");
  };

  // Handle "Actions" dropdown click
  const handleActionClick = () => {
    setShowActions(!showActions);
  };

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} collapsed={false} />

      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Content Library" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="bg-gray-700 text-white min-h-screen p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Content Library</h1>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button
                    onClick={handleActionClick}
                    className="bg-gray-600 px-4 py-2 rounded-lg flex items-center"
                  >
                    Actions
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </button>
                  {showActions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bg-gray-800 mt-2 right-0 w-32 rounded-lg shadow-lg text-sm"
                    >
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-600">
                        Edit Content
                      </button>
                    </motion.div>
                  )}
                </div>
                <button
                  onClick={handleAddContent}
                  className="bg-blue-600 px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="mr-2 w-4 h-4" /> Add
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-4">
              Create a library of content that can be used as Modules to create
              Courses. You can create content in multiple languages. To know
              more about the supported file formats,{" "}
              <a href="#" className="text-blue-400 underline">
                Click here.
              </a>
            </p>

            {/* Tabs */}
            <div className="flex space-x-6 mb-6 border-b border-gray-500">
              {["Published", "Retired", "Drafts"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 ${
                    activeTab === tab
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-1/3">
                <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="w-full bg-gray-600 text-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => handleTypeFilter(typeFilter ? "" : "Video")}
                  className="flex items-center text-gray-300"
                >
                  {typeFilter || "Type"}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-gray-600 text-gray-400 uppercase">
                  <tr>
                    <th className="p-3">
                      <input type="checkbox" className="accent-blue-500" />
                    </th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Last Modified</th>
                    <th className="p-3">Version</th>
                    <th className="p-3">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-gray-800 border-b border-gray-600 hover:bg-gray-700"
                    >
                      <td className="p-3">
                        <input type="checkbox" className="accent-blue-500" />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-500 text-white rounded-full p-1">
                            {item.type === "Video" ? "▶" : "Cp"}
                          </span>
                          <div>
                            <p>{item.name}</p>
                            <p className="text-xs text-gray-400">
                              {item.availability}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{item.lastModified}</td>
                      <td className="p-3">{item.version}</td>
                      <td className="p-3">-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default ContentLibraryPage;

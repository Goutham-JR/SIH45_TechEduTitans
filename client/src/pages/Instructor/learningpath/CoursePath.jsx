import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckSquare } from "lucide-react";
import Header from "../../../components/common/Header";
import Sidebar from "../../../components/common/Sidebar";
import {
  Home,
  Book,
  FileSignature,
  Library,
  Settings,
  LightbulbIcon,
} from "lucide-react";
import { Footer } from "../../../components/common/Footer";
const items = [
  {
    id: 1,
    title: "The Art of Animation: How to Create Lifelike Movement",
    image: "https://via.placeholder.com/400x200",
    type: "Course",
    status: "Published",
    instructor: "John Doe",
    profilePicture: "https://via.placeholder.com/100",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Vector Illustration: Drawing with the Pen Tool",
    image: "https://via.placeholder.com/400x200",
    type: "Course",
    status: "Draft",
    instructor: "Jane Smith",
    profilePicture: "https://via.placeholder.com/100",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Digital Poster Design: Combining Images & Type",
    image: "https://via.placeholder.com/400x200",
    type: "Course",
    status: "Draft",
    instructor: "Emily Johnson",
    profilePicture: "https://via.placeholder.com/100",
    rating: 4.3,
  },
];


function CoursePath() {
  const SIDEBAR_ITEMS = [
    { name: "Home", icon: Home, color: "#6366f1", href: "/" },
    { name: "My Courses", icon: Book, color: "#8B5CF6", href: "/courses" },
    {
      name: "Learning Path",
      icon: LightbulbIcon,
      color: "#EC4899",
      href: "/addlearningpath",
    },
    { name: "Quiz", icon: FileSignature, color: "#10B981", href: "/quiz" },
    {
      name: "Content Library",
      icon: Library,
      color: "#FF5722",
      href: "/contentlibrary",
    },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
    ];
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Toggle selection of an item
    const toggleSelectItem = (id) => {
      setSelectedItems((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    };

    // Filter items by search text and restrict to Courses
    const filteredItems = items.filter(
      (item) =>
        item.type === "Course" &&
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );


  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} collapsed={false} />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Learning Path" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0 relative z-20">
            <div>
              <h1 className="text-2xl font-semibold">Select Courses</h1>
              <p className="text-sm text-gray-300">
                To be added to the Learning Path
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-auto z-20">
                {/* Search Bar */}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-30" />
                <input
                  type="text"
                  placeholder="Search Courses"
                  className="bg-gray-600 text-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none w-full md:w-64 z-20"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button
                className="bg-green-600 px-6 py-2 rounded-md hover:bg-green-500 transition"
                onClick={() =>
                  alert(`Selected courses: ${selectedItems.join(", ")}`)
                }
              >
                Add to Learning Path
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition relative z-20 ${
                    selectedItems.includes(item.id)
                      ? "border-4 border-green-500"
                      : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.profilePicture}
                        alt={item.instructor}
                        className="h-10 w-10 rounded-full"
                      />
                      <p className="text-sm text-gray-400">
                        Instructor: {item.instructor}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      Rating: ⭐ {item.rating}/5
                    </p>
                  </div>
                  {/* Select Checkbox */}
                  <button
                    className="absolute top-3 right-3 bg-gray-700 p-2 rounded-full hover:bg-green-600 transition z-30"
                    onClick={() => toggleSelectItem(item.id)}
                  >
                    {selectedItems.includes(item.id) ? (
                      <CheckSquare className="text-green-400" />
                    ) : (
                      <CheckSquare className="text-gray-400" />
                    )}
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-300">No courses match your search.</p>
            )}
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}

export default CoursePath;

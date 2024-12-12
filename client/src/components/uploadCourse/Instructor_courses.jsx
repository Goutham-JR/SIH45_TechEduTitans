import React, { useState } from "react";
import { BookOpen, Search, Edit, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { motion } from "framer-motion";

// Dummy course data
const coursesData = [
  {
    id: "C001",
    name: "React Basics",
    image: "https://via.placeholder.com/150",
    enrollments: 120,
    rating: 4,
  },
  {
    id: "C002",
    name: "JavaScript Fundamentals",
    image: "https://via.placeholder.com/150",
    enrollments: 95,
    rating: 4.5,
  },
  {
    id: "C003",
    name: "Python for Data Science",
    image: "https://via.placeholder.com/150",
    enrollments: 150,
    rating: 5,
  },
  // Add more courses as needed
];

const Instructor_courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [sortedCourses, setSortedCourses] = useState(coursesData);
  const [sortCriteria, setSortCriteria] = useState("name"); // Default sorting by course name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending

  // Filter courses based on search query
  const filteredCourses = sortedCourses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting function
  const sortCourses = (criteria, order) => {
    const sorted = [...coursesData];
    sorted.sort((a, b) => {
      let comparison = 0;

      if (criteria === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (criteria === "enrollments") {
        comparison = a.enrollments - b.enrollments;
      } else if (criteria === "rating") {
        comparison = a.rating - b.rating;
      }

      return order === "asc" ? comparison : -comparison;
    });

    setSortedCourses(sorted);
  };

  // Handle sorting criteria change
  const handleSortChange = (e) => {
    const [criteria, order] = e.target.value.split("-");
    setSortCriteria(criteria);
    setSortOrder(order);
    sortCourses(criteria, order);
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center p-2 border border-gray-300 rounded-lg">
          <Search size={20} />
          <input
            type="text"
            className="ml-2 p-2 w-full outline-none"
            placeholder="Search courses by name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-700">Sort By:</label>
          <select
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-lg"
            value={`${sortCriteria}-${sortOrder}`}
          >
            <option value="name-asc">Course Name (A-Z)</option>
            <option value="name-desc">Course Name (Z-A)</option>
            <option value="enrollments-asc">Enrollments (Lowest to Highest)</option>
            <option value="enrollments-desc">Enrollments (Highest to Lowest)</option>
            <option value="rating-asc">Rating (Lowest to Highest)</option>
            <option value="rating-desc">Rating (Highest to Lowest)</option>
          </select>
        </div>
      </div>

      {/* Carousel of Courses */}
      <div className="relative">
        <motion.div
          className="flex space-x-4 overflow-x-auto pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCourses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="w-64 bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-gray-500 text-sm">{course.id}</p>
                <p className="text-gray-500">Enrollments: {course.enrollments}</p>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={index < course.rating ? "text-yellow-500" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button className="mt-2 text-blue-600 flex items-center space-x-1">
                  <Edit size={16} />
                  <span>Edit Course</span>
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* View All Courses Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAllCourses(!showAllCourses)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full"
          >
            {showAllCourses ? "Hide Courses" : "View All Courses"}
          </button>
        </div>
      </div>

      {/* Display All Courses in Grid Layout if View All is clicked */}
      {showAllCourses && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="w-full bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-gray-500 text-sm">{course.id}</p>
                <p className="text-gray-500">Enrollments: {course.enrollments}</p>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={index < course.rating ? "text-yellow-500" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button className="mt-2 text-blue-600 flex items-center space-x-1">
                  <Edit size={16} />
                  <span>Edit Course</span>
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Add New Course Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full"
          onClick={() => console.log("Create New Course")}
        >
          Create New Course
        </button>
      </div>
    </div>
  );
};

export default Instructor_courses;

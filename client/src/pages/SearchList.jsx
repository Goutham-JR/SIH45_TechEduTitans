import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import {
  School,
  Search,
  Clock,
  List,
  DollarSign,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MultiActionAreaCard = ({ course }) => {
  const navigate = useNavigate();
  const [isWished, setIsWished] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const toggleWishList = () => setIsWished((prev) => !prev);

  // Function to render stars as a progress bar
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex items-center gap-1">
        {/* Render full stars */}
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <Star
              key={`full-${index}`}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
            />
          ))}
        {/* Render half star */}
        {halfStars > 0 && (
          <Star
            key="half-star"
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            style={{
              clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              overflow: "hidden",
            }}
          />
        )}
        {/* Render empty stars */}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <Star
              key={`empty-${index}`}
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
            />
          ))}
      </div>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/protected/username/${course.userId}`,
          {
            withCredentials: true,
          }
        );
        setInstructorName(response.data.name || "Unknown");
      } catch (error) {
        console.error("Error fetching instructor data:", error);
        setInstructorName("Unknown");
      }
    };

    fetchData();
  }, [course.userId]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
      className="flex flex-row max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      {/* Left Section: Image */}
      <motion.img
        src={`http://localhost:5000/api/course/media/${course.thumbnailtrailer}`}
        alt="Course Thumbnail"
        className="w-60 object-cover "
      />

      {/* Right Section: Details */}
      <div className="flex flex-col flex-1 p-4">
        {/* Course Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">{course.title}</h2>
          <button
            onClick={toggleWishList}
            className={`p-1 rounded-full ${
              isWished ? "text-red-500" : "text-gray-400"
            } hover:bg-gray-700`}
          >
            <Heart
              className="w-5 h-5"
              fill={isWished ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Course Details */}
        <p className="text-gray-400 text-sm mb-2">{course.description}</p>
        <p className="text-gray-400 text-sm">
          <strong>Instructor:</strong> {instructorName}
        </p>

        {/* Dynamic Rating Section */}
        <div className="flex items-center gap-2 mt-2">
          {renderStars(course.rating || 4.5)}
          <span className="text-xs text-gray-300">
            {course.rating || "4.5"} / 5.0
          </span>
        </div>

        {/* Actions Section */}
        <motion.div
          className="mt-auto flex justify-between items-center"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <div className="flex gap-2 mt-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
              onClick={() => navigate("/CoursePage", { state: { query: course._id} })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Learn More
            </motion.button>
          </div>

          {/* Hidden Hover Actions */}
          <motion.div
            className="hidden gap-2 hover:flex"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1, display: "flex" }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="border border-gray-500 text-gray-300 px-3 py-1 rounded-md hover:bg-gray-700 text-sm"
            >
              <ShoppingCart
                className="inline-block w-4 h-4 mr-1"
                fill="currentColor"
              />
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CourseFilters = ({ query, setQuery, fetchCourses }) => {
  const [filters, setFilters] = useState({
    categories: [],
    duration: [],
    priceRange: [],
    ratings: [],
  });

  const categories = [
    { id: "engineering", label: "Engineering" },
    { id: "management", label: "Management" },
    { id: "arts", label: "Arts" },
    { id: "science", label: "Science" },
  ];

  const durations = [
    { id: "6months", label: "6 Months" },
    { id: "1year", label: "1 Year" },
    { id: "2years", label: "2 Years" },
    { id: "4years", label: "4 Years" },
  ];

  const priceRanges = [
    { id: "range1", label: "₹10,000 - ₹25,000" },
    { id: "range2", label: "₹25,000 - ₹50,000" },
    { id: "range3", label: "₹50,000 - ₹1,00,000" },
    { id: "range4", label: "Above ₹1,00,000" },
  ];

  const ratings = [
    { id: "5stars", label: "5 Stars" },
    { id: "4stars", label: "4 Stars & Up" },
    { id: "3stars", label: "3 Stars & Up" },
    { id: "2stars", label: "2 Stars & Up" },
  ];

  const handleFilterChange = (section, id) => {
    setFilters((prev) => ({
      ...prev,
      [section]: prev[section].includes(id)
        ? prev[section].filter((item) => item !== id)
        : [...prev[section], id],
    }));
  };

  const FilterSection = ({ title, items, section, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-gray-800"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-blue-500" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={item.id}
              className="peer"
              checked={filters[section].includes(item.id)}
              onChange={() => handleFilterChange(section, item.id)}
            />
            <label
              htmlFor={item.id}
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 w-80 bg-gray-800 shadow-lg rounded-lg"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <School className="text-blue-500" />
          Course Filters
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Seach Course"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              fetchCourses(e.target.value);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
          />
        </div>


        <FilterSection
          title="Duration"
          items={durations}
          section="duration"
          icon={Clock}
        />


        <FilterSection
          title="Course Ratings"
          items={ratings}
          section="ratings"
          icon={Star}
        />
      </div>
    </motion.div>
  );
};

const SearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || "");
  const [courses, setCourses] = useState([]); // State for fetched courses
  const [isLoading, setIsLoading] = useState(false);
  const fetchCourses = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setCourses([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/course/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setCourses(data || []); // Store full course data
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(courses);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main>
        <div className="flex ">
          <div className="flex-none w-30 fixed pr-5">
            <CourseFilters
              query={query}
              setQuery={setQuery}
              fetchCourses={fetchCourses}
            />
          </div>
          <div className="flex-auto w-70 ml-40">
            {isLoading ? (
              <p className="text-gray-400">Loading courses...</p>
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="p-5 pl-15">
                  <MultiActionAreaCard course={course} />
                </div>
              ))
            ) : (
              <div className="relative p-0 ml-80">
                <p className="text-gray-400 ml-60 mt-80">No courses found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
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
          <SearchPage />
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;

import React, { useState } from "react";
import { BookOpen, Search, Filter, ChevronDown, X } from "lucide-react";
import { motion } from "framer-motion";

const coursesData = [
  {
    name: "React Basics",
    image: "https://via.placeholder.com/150",
    enrollments: 120,
    rating: 4,
    status: "Approved",
    students: [
      {
        name: "John Doe",
        gmail: "john.doe@gmail.com",
        progress: 80,
        quizzes: 4,
        avgTime: "3h 15m",
      },
      {
        name: "Jane Smith",
        gmail: "jane.smith@gmail.com",
        progress: 90,
        quizzes: 5,
        avgTime: "2h 45m",
      },
      {
        name: "Emily Wong",
        gmail: "emily.wong@gmail.com",
        progress: 45,
        quizzes: 2,
        avgTime: "1h 30m",
      },
      {
        name: "Michael Lee",
        gmail: "michael.lee@gmail.com",
        progress: 0,
        quizzes: 0,
        avgTime: "0h",
      },
      {
        name: "Sarah Brown",
        gmail: "sarah.brown@gmail.com",
        progress: 100,
        quizzes: 5,
        avgTime: "4h",
      },
      {
        name: "David Kim",
        gmail: "david.kim@gmail.com",
        progress: 60,
        quizzes: 3,
        avgTime: "2h",
      },
      {
        name: "Rachel Green",
        gmail: "rachel.green@gmail.com",
        progress: 30,
        quizzes: 1,
        avgTime: "1h 15m",
      },
      {
        name: "Tom Harris",
        gmail: "tom.harris@gmail.com",
        progress: 75,
        quizzes: 4,
        avgTime: "2h 45m",
      },
      {
        name: "Lisa Wong",
        gmail: "lisa.wong@gmail.com",
        progress: 95,
        quizzes: 5,
        avgTime: "3h 30m",
      },
      {
        name: "Chris Taylor",
        gmail: "chris.taylor@gmail.com",
        progress: 55,
        quizzes: 3,
        avgTime: "2h 15m",
      }
    ],
  },
  {
    name: "JavaScript Fundamentals",
    image: "https://via.placeholder.com/150",
    enrollments: 0,
    rating: 0,
    status: "Pending",
    students: [],
  },
  {
    name: "Python for Beginners",
    image: "https://via.placeholder.com/150",
    enrollments: 0,
    rating: 0,
    status: "Rejected",
    students: [],
  },
];

const InstructorCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  const getStudentStatus = (progress) => {
    if (progress === 0) return 'yet to start';
    if (progress === 100) return 'completed';
    return 'in progress';
  };

  const sortedCourses = [...coursesData].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortCriteria === "enrollments") {
      return b.enrollments - a.enrollments;
    }
    if (sortCriteria === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const filteredCourses = sortedCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === null || selectedStatus === "All"
        ? true
        : course.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredStudents = selectedCourse
    ? selectedCourse.students.filter(
        (student) =>
          student.name.toLowerCase().includes(studentSearchQuery.toLowerCase())
      )
    : [];

  const closeModal = () => setSelectedCourse(null);

  return (
    <div className="p-6 bg-gray-700 min-h-screen text-white">
      {/* Search and Filter Section */}
      <div className="mb-6">
        <div className="flex items-center p-2 border border-gray-500 rounded-lg bg-gray-800">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            className="ml-2 p-2 w-full outline-none bg-transparent text-white"
            placeholder="Search courses by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="relative ml-4">
            <Filter
              size={20}
              className="cursor-pointer text-gray-400"
              onClick={() => setShowFilters(!showFilters)}
            />
            {showFilters && (
              <div className="absolute right-0 bg-white text-black border mt-2 rounded-md shadow-lg w-48">
                <button
                  onClick={() => setSortCriteria("name")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sort by Name
                </button>
                <button
                  onClick={() => setSortCriteria("enrollments")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sort by Enrollments
                </button>
                <button
                  onClick={() => setSortCriteria("rating")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sort by Rating
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-gray-100"
                  >
                    Sort by Approval Status
                    <ChevronDown
                      size={16}
                      className="ml-2 text-gray-500"
                      style={{
                        transform: showStatusDropdown ? "rotate(180deg)" : "none",
                      }}
                    />
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute left-0 bg-white text-black border mt-1 rounded-md shadow-lg w-full">
                      <button
                        onClick={() => setSelectedStatus("All")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedStatus("Approved")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => setSelectedStatus("Pending")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => setSelectedStatus("Rejected")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Rejected
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredCourses.map((course) => (
          <div
            key={course.name}
            className="w-full bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition relative"
          >
            <div
              className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${course.status === "Approved" ? "bg-green-600" : course.status === "Rejected" ? "bg-red-600" : "bg-yellow-600"}`}
            >
              {course.status}
            </div>
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="mt-2">
              <h3 className="text-xl font-semibold">{course.name}</h3>
              {["Approved", "Pending", "Rejected"].includes(course.status) && (
                <>
                  <p className="text-gray-400">Enrollments: {course.enrollments}</p>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={index < course.rating ? "text-yellow-500" : "text-gray-400"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </>
              )}
              {course.status === "Approved" && (
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="mt-2 py-1 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View Student Enrollment
                </button>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modal for Viewing Student Enrollment */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-3xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Student Enrollment - {selectedCourse.name}</h2>
              <X
                size={20}
                className="cursor-pointer text-gray-400"
                onClick={closeModal}
              />
            </div>
            <div className="mt-4">
              <div className="sticky top-0 bg-gray-900 z-10">
                <input
                  type="text"
                  className="w-full p-2 mb-4 bg-gray-800 text-white rounded-lg"
                  placeholder="Search students by name"
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="sticky top-0 bg-gray-900">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Name</th>
                      <th className="px-4 py-2 border-b text-left">Gmail</th>
                      <th className="px-4 py-2 border-b text-left">Progress (%)</th>
                      <th className="px-4 py-2 border-b text-left">Quizzes</th>
                      <th className="px-4 py-2 border-b text-left">Average Time</th>
                      <th className="px-4 py-2 border-b text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.name} className="hover:bg-gray-800">
                        <td className="px-4 py-2 border-b">{student.name}</td>
                        <td className="px-4 py-2 border-b">{student.gmail}</td>
                        <td className="px-4 py-2 border-b">{student.progress}</td>
                        <td className="px-4 py-2 border-b">{student.quizzes}</td>
                        <td className="px-4 py-2 border-b">{student.avgTime}</td>
                        <td className="px-4 py-2 border-b">{getStudentStatus(student.progress)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
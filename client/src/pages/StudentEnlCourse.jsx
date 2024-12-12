import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InstructorCourses = () => {
  const navigate = useNavigate();
  const [courses, setCoursesData] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/protected/check-auth",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchEnrolledCoursesIds = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/student/enrollments/details/${user.id}`
        );
        setCourseIds(response.data.enrollments || []);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        setCourseIds([]);
      }
    };

    fetchEnrolledCoursesIds();
  }, [user]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!courseIds.length) return;

      try {
        const coursesData = await Promise.all(
          courseIds.map(async (courseId) => {
            const response = await axios.get(
              `http://localhost:5000/api/course/courses/${courseId._id}`
            );
            return response.data;
          })
        );
        setCoursesData(coursesData);
        console.log(response.data); 
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCoursesData([]);
      }
    };

    fetchCourses();
  }, [courseIds]);

  return (
    <div className="p-6 bg-gray-700 min-h-screen text-white">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="w-full bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition relative"
            >
              <img
                src={course.thumbnail || "https://via.placeholder.com/150"}
                alt={course.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-gray-400">
                  Enrollments: {course.enrollments || 0}
                </p>
                <button
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="mt-2 py-1 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View Student Enrollment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No courses available.</p>
        )}
      </motion.div>
    </div>
  );
};

export default InstructorCourses;

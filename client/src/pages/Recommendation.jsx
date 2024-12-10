import React, { useEffect, useState } from "react";
import CourseCards from "./Coursecard";
import axios from "axios";

const Recommended_Courses = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatchedCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses/matchedcourses');
        console.log(response); // Log the response to see the data structure
        setCourses(response.data.matchedCourses); // Set the courses in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching matched courses:", err);
        setError(err.response?.data?.message || "Failed to fetch courses.");
        setLoading(false);
      }
    };

    fetchMatchedCourses();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Error message rendering
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  // Loading message rendering
  if (loading) {
    return <div className="text-white text-center">Loading courses...</div>;
  }

  // Rendering courses
  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Recommended Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCards
              key={course._id}
              courseImage={course.thumbnailtrailer || "image"}
              courseName={course.title}
              courseRating={course.rating || 4} // Default rating if not available
              instructorName={course.instructorName || "Unknown Instructor"}
              courseDescription={course.description || "No description available."}
              
              onViewDetails={() =>
                alert(`Viewing details for ${course.title}`)
              }
              onInstructorClick={() =>
                alert(`Viewing instructor profile for ${course.instructorName}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center">
          No courses matched your skills.
        </div>
      )}
    </div>
  );
};

export default Recommended_Courses;

import React, { useEffect, useState } from "react";
import CourseCards from "./Coursecard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Recommended_Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userDetail, setUserDetail] = useState(null);
  const [userIds, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/protected/check-auth",
          {
            withCredentials: true, 
          }
        );
        const user = response.data.user;
        if (user) {
          setUser(user);
        } else {
          throw new Error("User authentication failed");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to authenticate user.");
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchInstructorName = async () => {
      if (courses.length > 0 && courses[0]?.userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/protected/username/${courses[0].userId}`,
            {
              withCredentials: true,
            }
          );
          setUserDetail(response.data || { name: "Unknown" });
        } catch (error) {
          console.error("Error fetching instructor data:", error);
        }
      }
    };

    fetchInstructorName();
  }, [courses]);

  useEffect(() => {
    const fetchMatchedCourses = async () => {
      if (userIds && userIds.id) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/api/courses/matchedcourses/${userIds.id}`
          );
          setCourses(response.data.matchedCourses || []);
        } catch (err) {
          console.error("Error fetching matched courses:", err);
          setError(err.response?.data?.message || "Failed to fetch courses.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMatchedCourses();
  }, [userIds]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (loading) {
    return <div className="text-white text-center">Loading courses...</div>;
  }

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Recommended Courses
      </h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCards
              key={course._id}
              courseImage={course.thumbnailtrailer || "image"}
              courseName={course.title}
              courseRating={course.rating || 4}
              instructorName={userDetail?.name || "Unknown Instructor"}
              courseDescription={
                course.description || "No description available."
              }
              instructorImage={`http://localhost:5000/api/auth/photo/${course?.userId}`}
              onViewDetails={() =>
                navigate("/CoursePage", { state: { query: course._id} })
              }
              onInstructorClick={() =>
                navigate(`/instructor/${course.instructorId}`)
              }
              onClick={() => navigate("/CoursePage", { state: { query: course._id} })}
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

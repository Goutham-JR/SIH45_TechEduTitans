import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";
import moment from "moment";

const CourseCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(location.state?.query || "");
  const [course, setCourse] = useState(null);
  const [instructorName, setInstructorName] = useState("");
  const [courseDuration, setcourseDuration] = useState(null);
  const [courseresource, setcourseresource] = useState(null);
  const [userId, setUserId] = useState();
  const [isEnrolled, setIsEnrolled] = useState(null); // null indicates the status hasn't been checked yet
  const [loading, setLoading] = useState(true); // For loading state
  const [showCelebration, setShowCelebration] = useState(false); // Celebration popup state
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(
            `http://localhost:5000/api/course/getcourseduration/${query}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setcourseDuration(data);
          console.log(data);
        } else {
          console.warn("Query is undefined. Skipping fetch.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    const fetchEnrollmentCount = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `http://localhost:5000/api/student/enrollments/count/${query}`
        );
        setEnrollmentCount(response.data.count || 0); // Update state with count
      } catch (error) {
        console.error("Error fetching enrollment count:", error);
        setEnrollmentCount(0); // Set count to 0 on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (query) {
      fetchEnrollmentCount();
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(
            `http://localhost:5000/api/course/courses/${query}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCourse(data);
          console.log(data);
        } else {
          console.warn("Query is undefined. Skipping fetch.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(
            `http://localhost:5000/api/course/getCourseresource/${query}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setcourseresource(data);
          console.log(data);
        } else {
          console.warn("Query is undefined. Skipping fetch.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    const fetchInstructorName = async () => {
      try {
        if (course?.userId) {
          const response = await axios.get(
            `http://localhost:5000/api/protected/username/${course.userId}`,
            {
              withCredentials: true,
            }
          );
          setInstructorName(response.data.name || "Unknown");
        } else {
          console.warn("User ID is undefined. Skipping fetch.");
          setInstructorName("Unknown");
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
        setInstructorName("Unknown");
      }
    };

    fetchInstructorName();
  }, [course?.userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/protected/check-auth",
          {
            withCredentials: true, // Send cookies with the request
          }
        );
        setUserId(response.data.user); // Set user data
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `http://localhost:5000/api/student/enrollments/check/${query}/${userId.id}`
        );
        setIsEnrolled(response.data.isEnrolled); // Set enrollment status
      } catch (error) {
        console.error("Error checking enrollment status:", error);
        setIsEnrolled(false); // Default to not enrolled if there's an error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (query && userId) {
      checkEnrollmentStatus();
    }
  }, [query, userId]);

  const handleEnrollRequest = async () => {
    if (isEnrolled) {
      navigate("/coursevideo", { state: { query: course._id } });
    } else {
      try {
        // Call the API to enroll the user
        const response = await axios.post(
          `http://localhost:5000/api/student/enrollments/enroll`,
          {
            courseId: query,
            userId: userId.id,
          },
          { withCredentials: true } // Send cookies if needed
        );

        if (response.data.success) {
          setShowCelebration(true);
          setIsEnrolled(true); // Update the state to reflect enrollment
        } else {
          alert("Failed to enroll. Please try again.");
        }
      } catch (error) {
        console.error("Error enrolling in the course:", error);
        alert("Something went wrong while enrolling. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Content */}
        <div className="lg:w-2/3 space-y-6">
          <h1 className="text-4xl font-bold">{course?.title}</h1>
          <p className="text-gray-300">{course?.description}</p>

          {/* Badge, Ratings, and Creator Info */}
          <div className="flex items-center space-x-4">
            <span className="bg-yellow-500 text-black px-2 py-1 text-sm font-bold">
              Bestseller
            </span>
            <p>
              <span className="text-yellow-400 font-semibold">4.6</span>{" "}
              <span className="text-gray-400">(124,490 ratings)</span>{" "}
              <span className="text-gray-400">18,451 students</span>
            </p>
          </div>
          <p className="text-gray-500">Created by {instructorName}</p>
          <p className="text-gray-500">
            Last updated {moment(course?.updatedAt).format("DD/MM/YYYY")}
          </p>
          {/* What You'll Learn Section in a Box */}
          <div className="mt-10 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
            <ul className="list-disc pl-6 text-gray-300">
              {course?.learnPoints ? (
                // Parse learnPoints if it's a stringified array
                typeof course.learnPoints === "string" ? (
                  JSON.parse(course.learnPoints).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))
                ) : (
                  // Handle it directly if it's already an array
                  course.learnPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))
                )
              ) : (
                <li>No points available</li>
              )}
            </ul>
          </div>

          {/* Course Includes Section */}
          <div className="mt-6 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              This course includes:
            </h2>
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <p>
                📹{" "}
                {(() => {
                  const totalSeconds = courseDuration?.totalduration || 0; // Default to 0 if undefined
                  const hours = Math.floor(totalSeconds / 3600); // Calculate hours
                  const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
                  const seconds = totalSeconds % 60; // Calculate remaining seconds
                  return `${hours} hrs ${minutes} mins ${seconds} sec`; // Format the result
                })()}{" "}
                on-demand video
              </p>

              <p>📂 {courseresource?.totalResources} downloadable resources</p>
              <p>🏆 Certificate of completion</p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/3 space-y-6">
          {/* Video Section */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <video
              className="w-full h-auto rounded-md"
              controls
              disablePictureInPicture
              controlsList="nodownload"
              src={`http://localhost:5000/api/course/media/${course?.trailerId}`}
              poster={`http://localhost:5000/api/course/media/${course?.thumbnailtrailer}`}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Course Info Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-green-400">Free</h3>
            <div className="space-y-4 text-gray-300 mt-4">
              <p>
                <span className="font-bold">⏱ Course Duration:</span>{" "}
                {(() => {
                  const totalSeconds = courseDuration?.totalduration || 0;
                  const hours = Math.floor(totalSeconds / 3600);
                  const minutes = Math.floor((totalSeconds % 3600) / 60);
                  const seconds = totalSeconds % 60;
                  return `${hours} hrs ${minutes} mins ${seconds} sec`;
                })()}{" "}
              </p>
              <p>
                <span className="font-bold">📊 Course Level:</span>{" "}
                {course?.level}
              </p>
              <p>
                <span className="font-bold">👥 Student Enrolled:</span>{" "}
                {enrollmentCount}
              </p>
              <p>
                <span className="font-bold">🌍 Language:</span>{" "}
                {course?.language}
              </p>
            </div>
            <button
              className="bg-purple-600 w-full py-3 mt-6 rounded-md text-white font-semibold"
              onClick={handleEnrollRequest}
              disabled={loading}
            >
              {loading
                ? "Checking Enrollment..." // Loading state
                : isEnrolled
                ? "Start Course →" // If enrolled
                : "Enroll the Course →"}{" "}
            </button>
            <div className="flex justify-between mt-4 space-x-2">
              <button className="bg-gray-700 w-1/2 py-2 rounded-md text-gray-300">
                ❤️ Add to Wishlist
              </button>
              <button className="bg-gray-700 w-1/2 py-2 rounded-md text-gray-300">
                ↗️ Share Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Requirements:</h2>
        <ul className="list-disc pl-6 text-gray-300">
          {course?.requirements ? (
            // Parse learnPoints if it's a stringified array
            typeof course.requirements === "string" ? (
              JSON.parse(course.requirements).map((point, index) => (
                <li key={index}>{point}</li>
              ))
            ) : (
              // Handle it directly if it's already an array
              course.requirements.map((point, index) => (
                <li key={index}>{point}</li>
              ))
            )
          ) : (
            <li>No points available</li>
          )}
        </ul>
      </div>
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          {/* Full-Screen Confetti */}
          <div className="fixed inset-0 pointer-events-none">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200} // Fewer pieces for a slower effect
              gravity={0.05} // Slower fall
              wind={0.01} // Gentle horizontal motion
              colors={[
                "#FFC700",
                "#FF5733",
                "#33D9FF",
                "#8E44AD",
                "#28B463",
                "#FFB6C1",
              ]}
              recycle={true} // Continuous confetti shower
            />
          </div>

          {/* Celebration Popup */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            {/* Success Icon */}
            <div className="flex items-center justify-center bg-green-100 w-20 h-20 rounded-full mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Successfully Enrolled!
            </h2>
            <p className="text-gray-600 mb-6">
              You have successfully enrolled in the course. Get ready to explore
              the content and start learning!
            </p>

            {/* Action Button */}
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => {
                setShowCelebration(false); // Stop confetti
                navigate("/coursevideo", { state: { query: course._id } }); // Navigate to the course
              }}
            >
              Go to Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;

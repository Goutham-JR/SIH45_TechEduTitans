import { React, useState, useEffect } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
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
              <span className="text-gray-400">405,091 students</span>
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
              <p>📜 63 articles</p>
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
                <span className="font-bold">👥 Student Enrolled:</span> 441
              </p>
              <p>
                <span className="font-bold">🌍 Language:</span>{" "}
                {course?.language}
              </p>
            </div>
            <button className="bg-purple-600 w-full py-3 mt-6 rounded-md text-white font-semibold" onClick={() => navigate("/coursevideo", { state: { query: course._id} })}>
              Enroll the Course →
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
    </div>
  );
};

export default CourseCard;

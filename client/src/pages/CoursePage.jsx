import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const CourseCard = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || "");
  const [course, setCourse] = useState(null);
  const [instructorName, setInstructorName] = useState("");

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
        const response = await axios.get(
          `http://localhost:5000/api/protected/username/${course?.userId}`,
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
              {course?.learnPoints && Array.isArray(course.learnPoints) ? (
                course.learnPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))
              ) : (
                <li>No points available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/3 space-y-6">
          {/* Video Section */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <video
              className="w-full h-auto rounded-md"
              controls
              src="https://www.example.com/video.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Course Info Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-green-400">Free</h3>
            <div className="space-y-4 text-gray-300 mt-4">
              <p>
                <span className="font-bold">⏱ Course Duration:</span> 32 h 17 m
                5 s
              </p>
              <p>
                <span className="font-bold">📊 Course Level:</span> Intermediate
              </p>
              <p>
                <span className="font-bold">👥 Student Enrolled:</span> 441
              </p>
              <p>
                <span className="font-bold">🌍 Language:</span> English
              </p>
            </div>
            <button className="bg-purple-600 w-full py-3 mt-6 rounded-md text-white font-semibold">
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

      {/* Course Includes Section */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">This course includes:</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <p>📹 55 hours on-demand video</p>
          <p>📂 138 downloadable resources</p>
          <p>💻 Access on mobile and TV</p>
          <p>🏆 Certificate of completion</p>
          <p>📜 63 articles</p>
          <p>💡 2 coding exercises</p>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Requirements:</h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>
            You need NOT have java coding experience to start this course.
          </li>
          <li>Life Time instructor support to get all your queries solved.</li>
          <li>All installation setup included.</li>
          <li>
            Course includes real-time projects with practical solutions for the
            Selenium framework.
          </li>
          <li>
            Theoretical material, code dumps, and interview guides are available
            for download.
          </li>
        </ul>
      </div>

      {/* Description Section */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Description:</h2>
        <p className="text-gray-300">
          Course last updated on Nov 7th with the latest Selenium TestNG
          Framework Interview Questions. Have a passion for learning Selenium
          but have no coding knowledge? This course fulfills your wish with easy
          teaching and lifetime query support.
        </p>
      </div>
    </div>
  );
};

export default CourseCard;

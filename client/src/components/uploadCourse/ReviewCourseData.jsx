import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ReviewCourseData = ({ courseData = {} }) => {
  const navigate = useNavigate();

  // Destructure properties with default values
  const {
    title = "N/A",
    description = "N/A",
    trailer = null,
    learnings = [],
    requirements = [],
    weeks = [],
  } = courseData;

  const handleEdit = () => {
    navigate(-1); // Navigate to the previous page for editing
  };

  const handleSubmit = () => {
    console.log("Course Submitted:", courseData);
    alert("Course has been submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 shadow-md bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4 text-white">
        Review Your Course Data
      </h1>

      {/* Course Title and Description */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-300">Course Title</h2>
        <p className="text-white bg-gray-700 p-3 rounded-md">{title}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-300">
          Course Description
        </h2>
        <p className="text-white bg-gray-700 p-3 rounded-md">{description}</p>
      </div>

      {/* Trailer Video */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-300">Trailer Video</h2>
        {trailer ? (
          <video controls className="w-full rounded-md">
            <source src={trailer} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-gray-400">No trailer video uploaded.</p>
        )}
      </div>

      {/* What You'll Learn */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-300">What You'll Learn</h2>
        <ul className="list-disc list-inside text-white">
          {learnings.length > 0 ? (
            learnings.map((learning, index) => <li key={index}>{learning}</li>)
          ) : (
            <li className="text-gray-400">No learnings added.</li>
          )}
        </ul>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-300">Requirements</h2>
        <ul className="list-disc list-inside text-white">
          {requirements.length > 0 ? (
            requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))
          ) : (
            <li className="text-gray-400">No requirements added.</li>
          )}
        </ul>
      </div>

      {/* Weeks and Videos */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-300">Weeks and Videos</h2>
        {weeks.length > 0 ? (
          weeks.map((week, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-md mb-4 space-y-3"
            >
              <h3 className="text-lg font-medium text-white">
                Week {index + 1}
              </h3>
              {week.videos.map((video, videoIndex) => (
                <div
                  key={videoIndex}
                  className="border border-gray-600 p-3 rounded-md"
                >
                  <p>
                    <strong>Video Title:</strong> {video.title}
                  </p>
                  {video.thumbnail && (
                    <img
                      src={video.thumbnail}
                      alt="Thumbnail"
                      className="w-24 h-16 mt-2 rounded-md"
                    />
                  )}
                  {video.resource && (
                    <a
                      href={video.resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Download Resource
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No weeks and videos added yet.</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-2 mt-6">
        <button
          type="button"
          onClick={handleEdit}
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

ReviewCourseData.propTypes = {
  courseData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    trailer: PropTypes.string,
    learnings: PropTypes.arrayOf(PropTypes.string),
    requirements: PropTypes.arrayOf(PropTypes.string),
    weeks: PropTypes.arrayOf(
      PropTypes.shape({
        videos: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            thumbnail: PropTypes.string,
            resource: PropTypes.string,
          })
        ),
      })
    ),
  }),
};

export default ReviewCourseData;

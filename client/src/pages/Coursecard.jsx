import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const CourseCards = ({
  courseImage,
  courseName,
  courseRating,
  instructorName,
  instructorImage,
  onInstructorClick,
  courseDescription,
  onViewDetails,
}) => {
  // Generate stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "text-yellow-500" : "text-gray-400"
          }`}
          fill={i <= rating ? "currentColor" : "none"} // Fill stars based on rating
        />
      );
    }
    return stars;
  };

  return (
    <motion.div
      className="bg-gray-700 text-white rounded-lg shadow-lg p-4 flex flex-col space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Course Thumbnail */}
      <div className="h-40 w-full rounded-lg overflow-hidden">
        <img
          src={`http://localhost:5000/api/course/media/${courseImage}`}
          alt={courseName}
          className="w-full  h-auto object-cover"
        />
      </div>

      {/* Course Details */}
      <div className="space-y-2">
        {/* Course Name */}
        <h2 className="text-xl font-semibold text-indigo-400">{courseName}</h2>

        {/* Course Rating */}
        <div className="flex items-center">
          {renderStars(courseRating)}
          <span className="ml-2 text-gray-300">{courseRating} / 5</span>
        </div>

        {/* Instructor Name with Image */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-indigo-400">
            <img
              src={instructorImage}
              alt={instructorName}
              className="w-full h-full object-cover"
            />
          </div>
          <p
            className="text-sm text-indigo-400 hover:underline cursor-pointer"
            onClick={onInstructorClick} // Trigger the function when clicked
          >
            {instructorName}
          </p>
        </div>

        {/* Course Description */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {courseDescription}
        </p>
      </div>

      {/* View Details Button */}
      <div className="flex justify-center">
        <button
          onClick={onViewDetails}
          className="bg-indigo-500 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg w-full"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCards;

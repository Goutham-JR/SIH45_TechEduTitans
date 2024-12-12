import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const CourseList = () => {
  // Course Data
  const course = {
    title: "Introduction to AI",
    description:
      "Learn the fundamentals of Artificial Intelligence, including machine learning and neural networks.",
    image: "https://via.placeholder.com/300", // Placeholder for course image
    creationDate: "Fri Sep 15 2023",
    rating: 4.2, // Dynamic rating out of 5
    instructor: {
      name: "John Doe",
      image: "https://via.placeholder.com/50", // Placeholder for instructor image
    },
  };

  // Generate 5 Stars Based on the Rating
  const getStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Fully filled star
        stars.push(
          <Star
            key={`full-${i}`}
            size={16}
            className="text-yellow-400 fill-current"
          />
        );
      } else if (rating > i - 1 && rating < i) {
        // Half-filled star (using opacity to indicate partially filled)
        stars.push(
          <Star
            key={`half-${i}`}
            size={16}
            className="text-yellow-400 fill-current opacity-50"
          />
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={`empty-${i}`}
            size={16}
            className="text-gray-500 fill-current"
          />
        );
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white rounded-md p-4 shadow-lg max-w-xs mx-auto"
    >
      {/* Course Image */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      {/* Course Details */}
      <h2 className="text-lg font-bold mb-1 truncate">{course.title}</h2>
      <p className="text-gray-300 text-sm mb-3 truncate">
        {course.description}
      </p>

      {/* Instructor Details */}
      <div className="flex items-center mb-3">
        <img
          src={course.instructor.image}
          alt={course.instructor.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-sm text-gray-400">{course.instructor.name}</span>
      </div>

      {/* Creation Date */}
      <p className="text-xs text-gray-500 mb-3">
        Created on: <span className="font-semibold">{course.creationDate}</span>
      </p>

      {/* Star Rating */}
      <div className="flex items-center">
        {getStars(course.rating)}
        <span className="ml-2 text-gray-400 text-xs">
          {course.rating.toFixed(1)} / 5.0
        </span>
      </div>
    </motion.div>
  );
};

export default CourseList;

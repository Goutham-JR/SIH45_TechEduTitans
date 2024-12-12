import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Info, Heart, Star } from 'lucide-react';

const MultiActionAreaCard = ({ course }) => {
  const [isWished, setIsWished] = useState(false);

  const toggleWishList = () => setIsWished((prev) => !prev);

  // Function to render stars as a progress bar
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex items-center gap-1">
        {/* Render full stars */}
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <Star key={`full-${index}`} className="w-5 h-5 text-yellow-400" />
          ))}
        {/* Render half star */}
        {halfStars > 0 && (
          <Star
            key="half-star"
            className="w-5 h-5 text-yellow-400"
            style={{
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              overflow: 'hidden',
            }}
          />
        )}
        {/* Render empty stars */}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <Star key={`empty-${index}`} className="w-5 h-5 text-gray-500" />
          ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
      className="flex flex-row max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      {/* Left Section: Image */}
      <motion.img
        src={course.image || '/static/images/default-course.jpg'}
        alt="Course Thumbnail"
        className="w-80 object-cover"
        whileHover={{ scale: 1.05 }}
      />

      {/* Right Section: Details */}
      <div className="flex flex-col flex-1 p-8">
        {/* Course Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{course.title || 'Course Title'}</h2>
          <button
            onClick={toggleWishList}
            className={`p-2 rounded-full ${
              isWished ? 'text-red-500' : 'text-gray-400'
            } hover:bg-gray-700`}
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>

        {/* Course Details */}
        <p className="text-gray-400 text-sm mb-4">
          {course.description ||
            'This course provides comprehensive insights into [topic]. Enhance your skills with practical knowledge.'}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Instructor:</strong> {course.instructor || 'John Doe'}
        </p>

        {/* Dynamic Rating Section */}
        <div className="flex items-center gap-2 mt-4">
          {renderStars(course.rating || 4.5)}
          <span className="text-sm text-gray-300">{course.rating || '4.5'} / 5.0</span>
        </div>

        {/* Actions Section */}
        <motion.div
          className="mt-auto flex justify-between items-center"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          {/* Static Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Info className="inline-block w-5 h-5 mr-2 p-1" />
              Learn More
            </motion.button>
          </div>

          {/* Hidden Hover Actions */}
          <motion.div
            className="hidden gap-4 hover:flex"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1, display: 'flex' }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="border border-gray-500 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-700"
            >
              <ShoppingCart className="inline-block w-5 h-5 mr-2" />
              Add to Cart
            </motion.button>
            <span className="text-sm text-gray-500">
              Click "Add to Cart" to purchase the course.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MultiActionAreaCard;

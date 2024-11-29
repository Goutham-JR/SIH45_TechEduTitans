const Course = require('../models/admincourseModel');

// Fetch all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course status
const updateCourseStatus = async (req, res) => {
    const { id } = req.params; // Course ID from URL
    const { status } = req.body; // New status from request body
  
    try {
      // Find and update the course by ID
      const course = await Course.findByIdAndUpdate(
        id,
        { status }, // Update status field
        { new: true } // Return the updated document
      );
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json(course); // Send updated course back
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses, updateCourseStatus, deleteCourse };

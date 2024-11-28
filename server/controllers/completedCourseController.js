// controllers/completedCourseController.js
const CompletedCourse = require("../models/CompletedCourse");

// Get all completed courses
exports.getAllCompletedCourses = async (req, res) => {
  try {
    const courses = await CompletedCourse.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching completed courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new completed course
exports.addCompletedCourse = async (req, res) => {
  try {
    const { title, completionTime, recipients } = req.body;
    const newCourse = new CompletedCourse({ title, completionTime, recipients });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding completed course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a completed course (optional)
exports.deleteCompletedCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await CompletedCourse.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting completed course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

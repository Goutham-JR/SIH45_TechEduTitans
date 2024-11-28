// routes/completedCourseRouter.js
const express = require("express");
const router = express.Router();
const completedCourseController = require("../controllers/completedCourseController");

// Route to get all completed courses
router.get("/", completedCourseController.getAllCompletedCourses);

// Route to add a new completed course
router.post("/", completedCourseController.addCompletedCourse);

// Route to delete a completed course (optional)
router.delete("/:id", completedCourseController.deleteCompletedCourse);

module.exports = router;

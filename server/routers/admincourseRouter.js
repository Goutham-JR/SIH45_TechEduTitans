const express = require('express');
const { getCourses, updateCourseStatus, deleteCourse } = require('../controllers/admincourseController');

const router = express.Router();

router.get('/courses', getCourses); // Get all courses
router.put('/courses/:id', updateCourseStatus); // Update course status
router.delete('/courses/:id', deleteCourse); // Delete a course

module.exports = router;

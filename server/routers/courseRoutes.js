const express = require('express');
const { createCourse } = require('../controllers/coursecontroller');
const upload = require('../middlewares/upload'); // Ensure you have middleware to handle file uploads

const router = express.Router();

// Route to create a course with files
router.post('/create', upload.fields([
  { name: 'trailer', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'resource', maxCount: 1 },
]), createCourse);

module.exports = router;

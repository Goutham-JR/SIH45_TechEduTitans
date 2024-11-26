const mongoose = require('mongoose');
const { gridfsBucket } = require('../config/db'); // Import GridFS and DB connection
const Course = require('../models/courseModel.js'); // Import the Course model

// Function to create a course
const createCourse = async (req, res) => {
  try {
    const { title, description, learnPoints, requirements, weeks, quizzes } = req.body;
    const { trailer, thumbnail, video, resource } = req.files;

    // Prepare course data
    const courseData = {
      title,
      description,
      learnPoints: learnPoints ? JSON.parse(learnPoints) : [],
      requirements: requirements ? JSON.parse(requirements) : [],
      weeks: weeks ? JSON.parse(weeks) : [],
      quizzes: quizzes ? JSON.parse(quizzes) : [],
    };

    // Store files using GridFS for videos, images, etc.
    const fileData = [];
    
    // Handle trailer video
    if (trailer && trailer[0]) {
      const trailerFile = await storeFile(trailer[0]);
      fileData.push({ type: 'trailer', fileId: trailerFile._id });
    }

    // Handle thumbnail image
    if (thumbnail && thumbnail[0]) {
      const thumbnailFile = await storeFile(thumbnail[0]);
      fileData.push({ type: 'thumbnail', fileId: thumbnailFile._id });
    }

    // Handle course video
    if (video && video[0]) {
      const videoFile = await storeFile(video[0]);
      fileData.push({ type: 'video', fileId: videoFile._id });
    }

    // Handle resource file
    if (resource && resource[0]) {
      const resourceFile = await storeFile(resource[0]);
      fileData.push({ type: 'resource', fileId: resourceFile._id });
    }

    // Save the course data along with file references in MongoDB
    const course = new Course({
      ...courseData,
      files: fileData,
    });

    await course.save();

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to store file in GridFS
const storeFile = async (file) => {
  const uploadStream = gridfsBucket.openUploadStream(file.originalname, {
    contentType: file.mimetype,
  });

  const fileStream = file.stream;
  fileStream.pipe(uploadStream);

  return new Promise((resolve, reject) => {
    uploadStream.on('finish', () => {
      resolve(uploadStream); // Return the uploaded file's stream (contains file id)
    });

    uploadStream.on('error', (err) => {
      reject(err);
    });
  });
};

// Export functions
module.exports = {
  createCourse,
};

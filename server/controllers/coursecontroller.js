const gfs = require("../config/db"); // Import gfs instance from server
const mongoose = require("mongoose");
const Course = require("../models/course");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, learnPoints, requirements, weeks, finalQuiz } = req.body;

    // Map uploaded video files from GridFS
    const mappedWeeks = JSON.parse(weeks).map((week, weekIndex) => {
      const mappedVideos = week.videos.map((video, videoIndex) => ({
        title: video.title,
        description: video.description,
        video: req.files[`video-week${weekIndex}-video${videoIndex}`][0].id, // Store ObjectId of the video
      }));

      return {
        weekNumber: week.weekNumber,
        videos: mappedVideos,
        quiz: week.quiz,
      };
    });

    // Create and save course
    const newCourse = new Course({
      title,
      description,
      learnPoints: JSON.parse(learnPoints),
      requirements: JSON.parse(requirements),
      weeks: mappedWeeks,
      finalQuiz: JSON.parse(finalQuiz),
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create course" });
  }
};

// Stream video from GridFS
exports.getVideo = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.status(404).json({ error: "File not found" });

    // Stream video content
    const readStream = gfs.createReadStream(file._id);
    res.set("Content-Type", file.contentType);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

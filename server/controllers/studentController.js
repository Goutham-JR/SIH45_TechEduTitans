const Progress = require("../models/progress");
const Course = require("../models/course");

exports.updateProgress = async (req, res) => {
  try {
    const { userId, courseId, videoId } = req.body;

    if (!userId || !courseId || !videoId) {
      return res
        .status(400)
        .json({ message: "userId, courseId, and videoId are required." });
    }

    // Fetch the course to calculate the total videos
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const totalVideos = calculateTotalVideos(course);

    // Find or create a progress document for the user and course
    let progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      progress = await Progress.create({
        userId,
        courseId,
        completedVideos: [],
        progressPercentage: 0,
        isCompleted: false,
      });
    }

    // Update the completedVideos field and progress percentage
    if (!progress.completedVideos.includes(videoId)) {
      progress.completedVideos.push(videoId);
    }

    // Calculate the progress percentage
    const completedCount = progress.completedVideos.length;
    progress.progressPercentage = Math.round(
      (completedCount / totalVideos) * 100
    );

    // Check if the course is completed
    progress.isCompleted = progress.progressPercentage === 100;

    // Save the updated progress
    await progress.save();

    res.status(200).json({
      message: "Progress updated successfully.",
      progress,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getProgress = async (req, res) => {
    try {
      const { userId, courseId } = req.query; // Use query parameters
  
      if (!userId || !courseId) {
        return res.status(400).json({ message: "userId and courseId are required." });
      }
  
      const progress = await Progress.findOne({ userId, courseId });
  
      if (!progress) {
        return res.status(404).json({ message: "Progress not found." });
      }
  
      res.status(200).json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  

const calculateTotalVideos = (course) => {
  if (!course || !course.weeks || !Array.isArray(course.weeks)) {
    return 0; // Return 0 if no weeks or invalid structure
  }

  // Reduce to calculate the total number of videos
  const totalVideos = course.weeks.reduce((total, week) => {
    return total + (Array.isArray(week.videos) ? week.videos.length : 0);
  }, 0);

  return totalVideos;
};

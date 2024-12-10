const Progress = require("../models/progress");
const Course = require("../models/course");
const Enrollment = require("../models/Enrollment");
const VideoTiming = require("../models/VideoTimingSchema");

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
      return res
        .status(400)
        .json({ message: "userId and courseId are required." });
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

exports.checkEnrollment = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    // Validate input
    if (!courseId || !userId) {
      return res
        .status(400)
        .json({ message: "Course ID and User ID are required." });
    }

    // Check if the user is enrolled in the course
    const isEnrolled = await Enrollment.exists({ courseId, userId });

    return res.status(200).json({ isEnrolled: Boolean(isEnrolled) });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};

exports.enrollUserInCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // Validate input
    if (!courseId || !userId) {
      return res
        .status(400)
        .json({ message: "Course ID and User ID are required." });
    }

    // Check if the user is already enrolled
    const isAlreadyEnrolled = await Enrollment.exists({ courseId, userId });
    if (isAlreadyEnrolled) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this course." });
    }

    // Create a new enrollment
    const newEnrollment = new Enrollment({ courseId, userId });
    await newEnrollment.save();

    res.status(201).json({ success: true, message: "Enrollment successful." });
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getEnrollmentCount = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate input
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    // Get the count of enrollments for the course
    const count = await Enrollment.countDocuments({ courseId });

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching enrollment count:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.getTotalLessonsCompleted = async (req, res) => {
  const { userId } = req.params;

  try {
    // Query progresses where userId matches the provided userId
    const progresses = await Progress.find({ userId: userId });

    // Sum up the completed videos count
    const totalLessonsCompleted = progresses.reduce(
      (total, progress) => total + progress.completedVideos.length,
      0
    );

    res.json({ totalLessonsCompleted });
  } catch (error) {
    console.error("Error fetching lessons completed:", error);
    res.status(500).json({ error: "Error fetching lessons completed" });
  }
};

exports.getTotalTimeSpent = async (req, res) => {
  const { userId } = req.params;

  try {
    // Query the videotimings collection for documents matching userId
    const timings = await VideoTiming.find({ userId:userId });

    // Sum up the timeSpent field for all documents
    const totalTimeSpentInSeconds = timings.reduce((total, timing) => total + timing.timeSpent, 0);

    // Convert total time spent to hours
    const totalTimeSpentInHours = totalTimeSpentInSeconds / 3600;

    res.json({ totalTimeSpent: totalTimeSpentInHours.toFixed(2) }); // Return hours with 2 decimal points
  } catch (error) {
    console.error("Error fetching total time spent:", error);
    res.status(500).json({ error: "Error fetching total time spent" });
  }
};

exports.getLatestCourseId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the latest record for the given userId, sorted by updatedAt
    const latestTiming = await VideoTiming.findOne({ userId: userId })
      .sort({ updatedAt: -1 }); // Sort by updatedAt descending

    if (!latestTiming) {
      return res.status(404).json({ message: "No records found for the user" });
    }

    res.json({ latestCourseId: latestTiming.courseId });
  } catch (error) {
    console.error("Error fetching latest courseId by updatedAt:", error);
    res.status(500).json({ error: "Error fetching latest courseId" });
  }
};

exports.updatevideotiming = async (req, res) => {
  const { userId, courseId, videoId, timeSpent } = req.body;

  try {
    // Check if timing data for this user and video already exists
    const existingEntry = await VideoTiming.findOne({
      userId,
      courseId,
      videoId,
    });

    if (existingEntry) {
      existingEntry.timeSpent += timeSpent;
      await existingEntry.save();
    } else {
      const newTiming = new VideoTiming({
        userId,
        courseId,
        videoId,
        timeSpent,
      });
      await newTiming.save();
    }

    res.status(200).json({ success: true, message: "Timing data saved" });
  } catch (error) {
    console.error("Error saving timing data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


exports.getCountofEnrolled = async (req, res) => {
  const { userId } = req.params;

  console.log("Received userId:", req.params);

  try {
    const count = await Enrollment.countDocuments({
      userId: userId,
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user enrollment count' });
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

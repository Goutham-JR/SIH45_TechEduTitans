const Feedback = require("../models/Feedback");

// Create Feedback
exports.createFeedback = async (req, res) => {
  try {
    const { userId, rating, feedbackType, comment,  courseId } = req.body;


    console.log(req.body);

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 0 and 5." });
    }

    const newFeedback = new Feedback({
      rating,
      feedbackType,
      comment,
      courseId,
      userId,
    });

    await newFeedback.save();

    return res.status(201).json({ message: "Feedback submitted successfully.", feedback: newFeedback });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};


exports.hasUserGivenFeedback = async (req, res) => {
    try {
      const { courseId, userId } = req.params;
  
      // Validate input
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required." });
      }
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      // Check if feedback exists
      const feedbackExists = await Feedback.exists({ courseId, userId });
  
      // Return true or false
      return res.status(200).json({ hasGivenFeedback: Boolean(feedbackExists) });
    } catch (error) {
      console.error("Error checking feedback:", error);
      res.status(500).json({ message: "Internal server error.", error });
    }
  };
  
  
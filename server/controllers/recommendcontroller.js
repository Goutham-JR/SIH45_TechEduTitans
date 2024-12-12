const Account = require("../models/user");
const Course = require("../models/course");
const Resume = require("../models/resume");

exports.getCoursesBySkillsAndKeywords = async (req, res) => {
  try {
    const { userId } = req.params; // Correctly retrieve userId from req.params

    console.log(userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the resume keywords for the user
    const resume = await Resume.findOne({ userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found for the user" });
    }

    const resumeKeywords = resume.keywords || [];

    // Fetch the user by ID
    const user = await Account.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSkills = user.skills || [];
    if (userSkills.length === 0 && resumeKeywords.length === 0) {
      return res.status(400).json({ message: "No skills or keywords to match with courses." });
    }

    console.log("User Skills:", userSkills);
    console.log("Resume Keywords:", resumeKeywords);

    // Combine user skills and resume keywords for matching
    const searchKeywords = [...userSkills, ...resumeKeywords].map(keyword => new RegExp(keyword, 'i'));

    // Case-insensitive search for matching courses
    const matchedCourses = await Course.find({
      keywords: { $in: searchKeywords },
    });

    console.log("Matched Courses:", matchedCourses);

    if (matchedCourses.length === 0) {
      return res.status(200).json({ message: "No courses match the user's skills or keywords." });
    }

    res.status(200).json({
      message: "Matched courses fetched successfully",
      matchedCourses,
    });
  } catch (error) {
    console.error("Error fetching matched courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

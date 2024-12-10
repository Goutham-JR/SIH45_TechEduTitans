const Account = require("../models/user");
const Course = require("../models/course");

exports.getCoursesBySkillsAndKeywords = async (req, res) => {
  try {
    const userId = req.query.userId || '67582f845e94d9f75c135f0b'; // Retrieve userId from the query parameter

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await Account.findById({_id: userId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSkills = user.skills || [];
    if (userSkills.length === 0) {
      return res
        .status(400)
        .json({ message: "User has no skills to match with courses." });
    }

    console.log("User Skills:", userSkills);

    // Case-insensitive search for matching courses
    const matchedCourses = await Course.find({
      keywords: { $in: userSkills.map(skill => new RegExp(skill, 'i')) },
    });

    console.log("Matched Courses:", matchedCourses);

    if (matchedCourses.length === 0) {
      return res.status(200).json({ message: "No courses match the user's skills." });
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

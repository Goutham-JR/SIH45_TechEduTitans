const Skill = require("../models/user");

exports.getSkills = async (req, res) => {
  const { sessionemail } = req.query;

  try {
    const userSkills = await Skill.findOne({ sessionemail });
    if (!userSkills) {
      return res.status(200).json({ skills: [] });
    }
    res.status(200).json({ skills: userSkills.skills });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skills." });
  }
};

exports.addSkill = async (req, res) => {
  const { sessionemail, skill } = req.body;
  
  try {
    // Find the user by sessionemail
    let userSkills = await Skill.findOne({ email: sessionemail });
    
    
    if (!userSkills) {
      return res.status(404).json({ error: "User not found." });
    }

    // If the skill already exists in the user's skills, return an error
    if (userSkills.skills.includes(skill)) {
      return res.status(400).json({ error: "Skill already exists." });
    }

    // Update the skills array by adding the new skill
    userSkills.skills.push(skill);

    // Save the updated user skills
    await userSkills.save();

    res.status(200).json({ message: "Skill added successfully.", skills: userSkills.skills });
  } catch (err) {
    console.log("Error:", err); // Debugging log
    res.status(500).json({ error: "Failed to add skill." });
  }
};

  
exports.removeSkill = async (req, res) => {
  const { sessionemail, skill } = req.body;

  try {
    const userSkills = await Skill.findOne({ email: sessionemail });

    if (!userSkills) {
      return res.status(404).json({ error: "No skills found for this user." });
    }

    userSkills.skills = userSkills.skills.filter((item) => item !== skill);
    await userSkills.save();

    res.status(200).json({ message: "Skill removed successfully.", skills: userSkills.skills });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove skill." });
  }
};

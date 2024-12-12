const express = require("express");
const { getCoursesBySkillsAndKeywords } = require("../controllers/recommendcontroller");

const router = express.Router();

router.get("/matchedcourses/:userId", getCoursesBySkillsAndKeywords);

module.exports = router;

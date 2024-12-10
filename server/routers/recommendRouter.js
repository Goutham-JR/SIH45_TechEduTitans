const express = require("express");
const { getCoursesBySkillsAndKeywords } = require("../controllers/recommendcontroller");

const router = express.Router();

router.get("/matchedcourses", getCoursesBySkillsAndKeywords);

module.exports = router;

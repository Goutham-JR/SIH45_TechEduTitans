const express = require("express");
const router = express.Router();
const {getSkills, addSkill, removeSkill} = require("../controllers/skillController");

router.get("/get-skills", getSkills);

router.post("/add-skill", addSkill);

router.post("/remove-skill", removeSkill);

module.exports = router;
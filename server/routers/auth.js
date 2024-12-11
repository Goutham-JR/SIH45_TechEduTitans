const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  logout,
  forgotpassword,
} = require("../controllers/authcontroller");

const {
  uploadProfilePhoto,
  getProfilePhoto,
  uploadResume,
  getResume,
} = require("../controllers/profilecontroller");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout", logout);

router.post("/forgotpassword", forgotpassword);

router.post("/upload", uploadProfilePhoto);

router.get("/photo/:id", getProfilePhoto);

router.post("/uploadresume", uploadResume);

router.get("/resume/:id", getResume);

module.exports = router;

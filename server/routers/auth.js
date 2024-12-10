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
} = require("../controllers/profilecontroller");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout", logout);

router.post("/forgotpassword", forgotpassword);

router.post("/upload", uploadProfilePhoto);

router.get("/photo/:id", getProfilePhoto);

module.exports = router;

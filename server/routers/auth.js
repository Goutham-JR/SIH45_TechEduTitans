const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  logout,
  forgotpassword,
} = require("../controllers/authcontroller");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout", logout);

router.post("/forgotpassword", forgotpassword);

module.exports = router;

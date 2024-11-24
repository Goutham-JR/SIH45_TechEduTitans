const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken'); // Middleware to verify token


router.get('/check-auth', verifyToken, (req, res) => {
  res.status(200).json({ user: req.user }); // Send user details
});
module.exports = router;

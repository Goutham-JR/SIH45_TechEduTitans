const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken'); // Middleware to verify token
const {userdetail} = require('../controllers/getUserDetail');



router.get('/check-auth', verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});


router.get('/fetchuserdetail', verifyToken ,userdetail);
module.exports = router;

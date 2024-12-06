const express = require('express');
const router = express.Router();
const {updateProgress, getProgress} = require('../controllers/studentController');

router.post('/progress', updateProgress);
router.get('/getprogress', getProgress);
module.exports = router;

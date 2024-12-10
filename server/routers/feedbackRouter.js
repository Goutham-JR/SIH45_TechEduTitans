const express = require('express');
const router = express.Router();
const {createFeedback, hasUserGivenFeedback} = require('../controllers/feedbackController');

router.post('/create', createFeedback);
router.get('/exists/:courseId/:userId', hasUserGivenFeedback);
module.exports = router;

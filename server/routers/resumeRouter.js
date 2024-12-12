const express = require('express');
const router = express.Router();
const {getResume} = require('../controllers/profilecontroller');

router.post('/resume', getResume);

module.exports = router;

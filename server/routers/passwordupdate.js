const express = require('express');
const router = express.Router();
const { passwordUpdate } = require('../controllers/passwordupdatecontroller'); 


router.post('/update-password',passwordUpdate);

module.exports = router;

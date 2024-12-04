const express = require('express');
const router = express.Router();
const { updatePassword } = require('../controllers/passwordupdatecontroller'); 


router.post('/update-password',updatePassword);

module.exports = router;

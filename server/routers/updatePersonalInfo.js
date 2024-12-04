const express = require('express');
const router = express.Router();
const userController = require('../controllers/updatePersonalInfocontroller'); // Adjust path if needed

// Route for getting user info
//router.get('/get-info', userController.getUserInfo);

// Route for updating user info
router.post('/update-info', userController.updateUserInfo);

module.exports = router;

const express = require('express');
const router = express.Router();
const {deleteAccount} = require('../controllers/deleteController');

router.post('/delete', deleteAccount);

module.exports = router;

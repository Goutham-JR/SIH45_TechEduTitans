const express = require('express');
const router = express.Router();

const { signUp, signIn, logout} = require('../controllers/authcontroller');

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/logout', logout);

module.exports = router;
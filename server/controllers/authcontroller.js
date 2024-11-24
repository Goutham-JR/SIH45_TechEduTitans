const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Joi schemas for validation
const signUpSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z\s]+$/) // Allows only alphabets and spaces
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters.',
      'string.max': 'Name must not exceed 30 characters.',
      'string.pattern.base': 'Name should only contain letters and spaces.',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please enter a valid email address.',
    }),

  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$')) // 8 chars, alphanumeric, special char
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.pattern.base': 'Password must be at least 8 characters, alphanumeric, and include at least one special character.',
    }),
});

const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please enter a valid email address.',
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
    }),
});

// Sign Up Function
exports.signUp = async (req, res) => {
  try {
    // Validate input
    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists!' });

    // Generate a salt
    const saltRounds = 10; // Salt rounds, you can adjust this as needed
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

// Sign In Function
exports.signIn = async (req, res) => {
  try {
    // Validate input
    const { error } = signInSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User does not exist!' });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password!' });

    // Generate a JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'defaultsecret', // use your own secret key here
      { expiresIn: '1d' }
    );

    // Set token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Lax', // Adjust based on frontend/backend domains
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });    

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logged out successfully!' });
};

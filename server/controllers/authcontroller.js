const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const nodemailer = require("nodemailer");


// Joi schemas for validation

// Joi schema for SignUp validation
const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(/^[a-zA-Z\s]+$/).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters.',
    'string.max': 'Name cannot exceed 30 characters.',
    'string.pattern.base': 'Name must only contain alphabets.',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please enter a valid email.',
  }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.pattern.base':
        'Password must be at least 8 characters, include alphanumeric characters, and at least one special character.',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords must match.',
      'string.empty': 'Confirm Password is required.',
    }),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.empty': 'Phone Number is required.',
      'string.pattern.base': 'Phone Number must be exactly 10 digits.',
    }),
}).with('password', 'confirmPassword'); // This ensures both password and confirmPassword are used together


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
    console.log('Request Body:', req.body);

    const { name, email, password, confirmPassword, phoneNumber } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists!' });

    // Generate a salt
    const saltRounds = 10; // Salt rounds, you can adjust this as needed
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = new User({ name, email, password: hashedPassword, phoneNumber });
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

// Define validation schema for the email input
const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Configure nodemailer for SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'teachedu2024@gmail.com',
      pass: 'mfly lzzp vthg crzi'
  }
});


exports.forgotpassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    // Email Validation Schema
    const emailSchema = Joi.string().email({ tlds: { allow: false } }).required();
    const { error: emailError } = emailSchema.validate(email);
    if (emailError) return res.status(400).json({ error: "Invalid email address." });

    // Password Validation Schema
    const passwordSchema = Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
      .required();
    if (password) {
      const { error: passwordError } = passwordSchema.validate(password);
      if (passwordError) {
        return res.status(400).json({
          error: "Password must be at least 8 characters and contain at least one special character.",
        });
      }
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    // If OTP is provided, verify OTP
    if (otp) {
      if (user.resetOtp !== otp || Date.now() > user.resetOtpExpires) {
        return res.status(400).json({ error: "Invalid OTP." });
      }

      // Hash the new password
      const saltRounds = 10; // Adjust as needed
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update user's password and clear OTP fields
      user.password = hashedPassword;
      user.resetOtp = undefined;
      user.resetOtpExpires = undefined;
      await user.save();

      return res.status(200).json({ message: "Password reset successfully." });
    }

    // Generate OTP for the first step
    const otpGenerated = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Update user with OTP and expiration
    user.resetOtp = otpGenerated;
    user.resetOtpExpires = otpExpires;
    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      from: "teachedu2024@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Hello,\n\nYour OTP for resetting your password is: ${otpGenerated}\n\nThis OTP is valid for 10 minutes.`,
    });

    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

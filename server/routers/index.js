const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const protectedRoutes = require('../routers/protected');
const authRoutes = require('../routers/auth');
const courseRoutes = require('../routers/course');
const completedCourseRouter = require('../routers/completedCourseRouter');
const courseRouter = require('../routers/admincourseRouter');
const quizRoutes = require('../routers/quizRoutes');
const passupdate = require('../routers/passwordupdate');
const updatePersonalInfoRouter = require('../routers/updatePersonalInfo');
const skillRouter = require("../routers/skillRouter");
const addressRouter = require("../routers/addressRouter");
const deleteRouter = require('../routers/deleteRouter');

const { connectDB } = require('../config/db');

// Initialize app and connect to DB
const app = express();
connectDB();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow frontend origin
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

app.use(cookieParser());
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser

// Logging middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Middleware to handle multipart/form-data only
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(400).json({ error: 'Invalid form data' });
      }
      req.fields = fields;
      req.files = files;
      next();
    });
  } else {
    next();
  }
});

// Handle OPTIONS preflight requests
app.options('*', cors());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/course', courseRoutes);
app.use('/api', courseRouter);
app.use('/api/quiz', quizRoutes);
app.use('/api/completed-courses', completedCourseRouter);
app.use('/api/users', passupdate);
app.use('/api/info', updatePersonalInfoRouter);
app.use("/api/skills", skillRouter);
app.use("/api/address", addressRouter);
app.use('/api/account', deleteRouter);



// Catch-all middleware for unhandled routes
app.use((req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Route not found');
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

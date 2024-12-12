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
const studentRouter = require('../routers/studentRouter');
const feedbackRouter = require('../routers/feedbackRouter');
const quizmainRouter = require('../routers/quizsampleRouter');
const recommendcourseRouter = require("../routers/recommendRouter");
const resumeRouter = require("../routers/resumeRouter");


// const fs = require('fs');
// const pdfparse = require('pdf-parse');
// const keywordExtractor = require('keyword-extractor');

// function isSkillRelated(word) {
//   const commonWords = [
//     'the', 'and', 'for', 'with', 'from', 'this', 'that',
//     'are', 'you', 'your', 'all', 'can', 'any', 'has',
//     'have', 'will', 'not', 'but', 'use', 'was', 'had', 'added','cpga','held','time','good'
//   ];
//   return word.length > 2 && !/\d/.test(word) && !commonWords.includes(word);
// }

// const pdffile = fs.readFileSync('./routers/kiran_resume.pdf');

// pdfparse(pdffile)
//   .then(function (data) {
//     const textContent = data.text;

//     // Extract keywords using the keyword extractor
//     const extractedKeywords = keywordExtractor.extract(textContent, {
//       language: 'english',
//       remove_digits: false, // Keep digits for initial extraction
//       return_changed_case: true,
//       remove_duplicates: true,
//     });

//     // Dynamically filter out non-skill-related keywords
//     const skillRelatedKeywords = extractedKeywords.filter(isSkillRelated);

//     console.log('Extracted Skill-Related Keywords:');
//     console.log(skillRelatedKeywords);
//   })
//   .catch(function (err) {
//     console.error('Error parsing PDF:', err.message);
//   });



const { connectDB } = require('../config/db');

const app = express();
connectDB();

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
app.use('/api/student', studentRouter);
app.use('/api/quiz', quizRoutes);
app.use('/api/completed-courses', completedCourseRouter);
app.use('/api/users', passupdate);
app.use('/api/info', updatePersonalInfoRouter);
app.use("/api/skills", skillRouter);
app.use("/api/address", addressRouter);
app.use('/api/account', deleteRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/quiz', quizmainRouter);
app.use("/api/courses", recommendcourseRouter);
app.use('/api/upload', resumeRouter);





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

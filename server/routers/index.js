const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const protectedRoutes = require('../routers/protected'); // Import the protected routes
const authRoutes = require('../routers/auth');
const courseRoutes = require('../routers/course'); // Import auth routes
const { connectDB } = require('../config/db'); // Correct way if exported as an object
const completedCourseRouter = require("../routers/completedCourseRouter");
const courseRouter = require('../routers/admincourseRouter');
const quizRoutes = require('../routers/quizRoutes');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');

const app = express();
connectDB();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow your frontend origin
    credentials: true, // Allow cookies
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(formidable());

app.use(bodyParser.json());  // This will handle JSON body parsing
app.use(bodyParser.urlencoded({ extended: true }));  // For URL-encoded bodies
 // Parse URL-encoded bodies


// Register routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/protected', protectedRoutes);
app.use('/api/course', courseRoutes);
app.use('/api', courseRouter);
app.use('/api/quiz', quizRoutes);
app.use("/api/completed-courses", completedCourseRouter);


app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});




// Catch-all middleware for unhandled routes
app.use((req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Route not found');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

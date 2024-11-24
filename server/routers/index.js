const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db');
const protectedRoutes = require('../routers/protected'); // Import the protected routes
const authRoutes = require('../routers/auth'); // Import auth routes

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

// Register routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/protected', protectedRoutes);


// Catch-all middleware for unhandled routes
app.use((req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Route not found');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

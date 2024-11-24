import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  LinearProgress,
  Button,
  CircularProgress,
  CardActions,
} from "@mui/material";

// Dummy data for courses
const dummyCourses = [
  { id: 1, title: "React Basics", progress: 75, status: "In Progress" },
  { id: 2, title: "JavaScript Fundamentals", progress: 100, status: "Completed" },
  { id: 3, title: "CSS Mastery", progress: 50, status: "In Progress" },
  { id: 4, title: "HTML5 & Web Development", progress: 100, status: "Completed" },
];

const ResultsAndProgressPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching courses data
  useEffect(() => {
    setTimeout(() => {
      setCourses(dummyCourses);
      setLoading(false);
    }, 1000); // Simulate data fetching delay
  }, []);

  // Render loading spinner
  if (loading) return <CircularProgress />;

  // Split courses into completed and in-progress
  const inProgressCourses = courses.filter(course => course.status === "In Progress");
  const completedCourses = courses.filter(course => course.status === "Completed");

  return (
    <Box maxWidth={1200} margin="auto" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Course Progress & Results
      </Typography>

      {/* In Progress Courses */}
      <Typography variant="h5" gutterBottom>
        In Progress Courses
      </Typography>
      <Grid container spacing={4}>
        {inProgressCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <LinearProgress variant="determinate" value={course.progress} sx={{ mt: 2 }} />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Progress: {course.progress}%
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Resume Course
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Completed Courses */}
      <Typography variant="h5" gutterBottom mt={6}>
        Completed Courses
      </Typography>
      <Grid container spacing={4}>
        {completedCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">{course.title}</Typography>
              <LinearProgress variant="determinate" value={course.progress} sx={{ mt: 2 }} />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Completed: {course.progress}%
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResultsAndProgressPage;

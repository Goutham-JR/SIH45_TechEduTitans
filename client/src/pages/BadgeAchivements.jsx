import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";

// Dummy data for badges and achievements
const dummyBadges = [
  { id: 1, name: "Quiz Master", description: "Complete all quiz questions", image: "/path/to/quiz_master_badge.png" },
  { id: 2, name: "Fast Learner", description: "Finish a course in less than 1 day", image: "/path/to/fast_learner_badge.png" },
  { id: 3, name: "Top Scorer", description: "Achieve a score above 80% in all quizzes", image: "/path/to/top_scorer_badge.png" },
];

const dummyAchievements = [
  { id: 1, name: "First Quiz Completed", description: "Complete your first quiz", date: "2024-11-23" },
  { id: 2, name: "Course Completed", description: "Finish the 'React Basics' course", date: "2024-11-22" },
  { id: 3, name: "Perfect Score", description: "Achieve a perfect score in a quiz", date: "2024-11-21" },
];

const BadgesAndAchievementsPage = () => {
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching badges and achievements data
  useEffect(() => {
    setTimeout(() => {
      setBadges(dummyBadges);
      setAchievements(dummyAchievements);
      setLoading(false);
    }, 1000); // Simulate loading data
  }, []);

  // Render loading spinner
  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth={1200} margin="auto" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Badges & Achievements
      </Typography>

      {/* Badges Section */}
      <Typography variant="h5" gutterBottom>
        Badges
      </Typography>
      <Grid container spacing={4}>
        {badges.map((badge) => (
          <Grid item xs={12} sm={6} md={4} key={badge.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={badge.image}
                alt={badge.name}
              />
              <CardContent>
                <Typography variant="h6">{badge.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {badge.description}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Earn Badge
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Achievements Section */}
      <Typography variant="h5" gutterBottom mt={6}>
        Achievements
      </Typography>
      <Grid container spacing={4}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{achievement.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {achievement.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Achieved on: {achievement.date}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BadgesAndAchievementsPage;

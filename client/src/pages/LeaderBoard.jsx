import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

const LeaderboardPage = () => {
  // Dummy leaderboard data
  const dummyLeaderboard = [
    { username: "Alice", score: 10 },
    { username: "Bob", score: 9 },
    { username: "Charlie", score: 8 },
    { username: "Dave", score: 7 },
    { username: "Eve", score: 6 },
  ];

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data with dummy leaderboard
  useEffect(() => {
    setTimeout(() => {
      setLeaderboard(dummyLeaderboard);
      setLoading(false);
    }, 1000); // Simulated delay
  }, []);

  // Render loading spinner
  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth={800} margin="auto" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((player, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{player.username}</TableCell>
                <TableCell align="center">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaderboardPage;

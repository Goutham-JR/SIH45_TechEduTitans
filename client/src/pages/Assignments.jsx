import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Snackbar,
} from "@mui/material";

// Dummy data for assignments
const dummyAssignments = [
  {
    id: 1,
    title: "React Project",
    description: "Build a simple React app with components and state management.",
    dueDate: "2024-12-05",
    status: "Pending",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals Quiz",
    description: "Complete the quiz covering the basics of JavaScript.",
    dueDate: "2024-11-30",
    status: "Submitted",
    submissionDate: "2024-11-25",
    file: "quiz_submission.pdf",
  },
  {
    id: 3,
    title: "CSS Styling Challenge",
    description: "Style a webpage using CSS flexbox and grid.",
    dueDate: "2024-12-10",
    status: "Pending",
  },
];

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Simulate fetching assignments data
  useEffect(() => {
    setTimeout(() => {
      setAssignments(dummyAssignments);
      setLoading(false);
    }, 1000); // Simulate data fetching delay
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle assignment submission
  const handleSubmitAssignment = (assignmentId) => {
    if (file) {
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment.id === assignmentId
            ? { ...assignment, status: "Submitted", submissionDate: new Date().toISOString(), file: file.name }
            : assignment
        )
      );
      setSnackbarMessage("Assignment submitted successfully!");
      setSnackbarOpen(true);
      setFile(null);
    } else {
      setSnackbarMessage("Please select a file to submit.");
      setSnackbarOpen(true);
    }
  };

  // Render loading spinner
  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth={1200} margin="auto" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Assignments
      </Typography>

      {/* Assignment List */}
      <Grid container spacing={4}>
        {assignments.map((assignment) => (
          <Grid item xs={12} sm={6} md={4} key={assignment.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{assignment.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Due Date: {assignment.dueDate}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  {assignment.status === "Submitted" ? `Submitted on ${assignment.submissionDate}` : "Status: Pending"}
                </Typography>
              </CardContent>
              <CardActions>
                {assignment.status === "Pending" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    Submit Assignment
                  </Button>
                ) : (
                  <Button variant="outlined" color="primary" onClick={() => setSelectedAssignment(assignment)}>
                    View Submission
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Assignment Submission Modal */}
      {selectedAssignment && selectedAssignment.status === "Pending" && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6">{selectedAssignment.title}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {selectedAssignment.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Due Date: {selectedAssignment.dueDate}
          </Typography>
          <TextField
            type="file"
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleFileChange}
            label="Select File to Submit"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => handleSubmitAssignment(selectedAssignment.id)}
          >
            Submit Assignment
          </Button>
        </Paper>
      )}

      {/* View Submitted Assignment Modal */}
      {selectedAssignment && selectedAssignment.status === "Submitted" && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6">{selectedAssignment.title}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {selectedAssignment.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Submitted on: {selectedAssignment.submissionDate}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            File Submitted: {selectedAssignment.file}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => setSelectedAssignment(null)}
          >
            Close
          </Button>
        </Paper>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AssignmentsPage;

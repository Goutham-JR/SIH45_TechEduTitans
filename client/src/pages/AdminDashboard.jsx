import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
} from "@mui/material";

// Dummy data for students and instructors
const dummyStudents = [
  { id: 1, name: "John Doe", email: "john@example.com", enrolledCourses: 3 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", enrolledCourses: 5 },
  { id: 3, name: "Mark Lee", email: "mark@example.com", enrolledCourses: 2 },
];

const dummyInstructors = [
  { id: 1, name: "Alice Brown", email: "alice@example.com", courses: 2 },
  { id: 2, name: "Bob White", email: "bob@example.com", courses: 1 },
];

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate fetching data with dummy students and instructors
  useEffect(() => {
    setTimeout(() => {
      setStudents(dummyStudents);
      setInstructors(dummyInstructors);
      setLoading(false);
    }, 1000); // Simulated delay
  }, []);

  // Filter users by search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render loading spinner
  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth={1200} margin="auto" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Admin Dashboard
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Instructors Section */}
      <Typography variant="h5" gutterBottom>
        Instructors
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Instructor
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell>{instructor.courses}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Students Section */}
      <Typography variant="h5" gutterBottom mt={6}>
        Students
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Student
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Enrolled Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.enrolledCourses}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;

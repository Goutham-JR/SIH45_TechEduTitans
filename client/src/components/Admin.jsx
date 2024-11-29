import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';

const AdminCoursePage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the database
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Update course status
  const updateStatus = async (id, newStatus) => {
    try {
      // Send PUT request to update the status
      const response = await axios.put(`http://localhost:5000/api/courses/${id}`, { status: newStatus });
  
      if (response.status === 200) {
        fetchCourses(); // Refresh the course list
      } else {
        console.error('Failed to update course status');
      }
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };
  

  // Delete a course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      fetchCourses(); // Refresh the course list
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Admin - Manage Courses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => updateStatus(course._id, 'Accepted')}
                    style={{ marginRight: '10px' }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteCourse(course._id)}
                    style={{ marginRight: '10px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => updateStatus(course._id, 'Not Updated')}
                  >
                    Not Updated
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminCoursePage;

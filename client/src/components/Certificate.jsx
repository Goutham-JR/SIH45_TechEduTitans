import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const CompletedCourses = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch completed courses from the backend
  useEffect(() => {
    axios
      .get("/api/completed-courses")
      .then((response) => {
        console.log("Response Data:", response.data); // Log the response to debug
        const courses = Array.isArray(response.data) ? response.data : [response.data];
        setCompletedCourses(courses);
      })
      .catch((error) => {
        console.error("Error fetching completed courses:", error);
      });
  }, []);

  const handleViewCertificate = (course, recipient) => {
    setSelectedCourse(course);
    setSelectedRecipient(recipient);
    setIsModalOpen(true);
  };

  const handleDownloadCertificate = (course, recipient) => {
    const tempCertificate = document.createElement("div");
    tempCertificate.style.width = "1123px"; // A4 width in pixels at 96 DPI
    tempCertificate.style.height = "794px"; // A4 height in pixels at 96 DPI
    tempCertificate.style.margin = "0";
    tempCertificate.style.padding = "0";
    tempCertificate.style.textAlign = "center";
    tempCertificate.style.background = "#fff";
    tempCertificate.style.border = "10px solid #007BFF";
    tempCertificate.style.fontFamily = "'Roboto', sans-serif";
    tempCertificate.style.boxSizing = "border-box";
    tempCertificate.style.position = "absolute";
    tempCertificate.style.top = "-10000px";

    tempCertificate.innerHTML = `
      <div style="width: 1000px; height: 700px; margin: 50px auto; padding: 30px; background: linear-gradient(to bottom, #ffffff, #f9f9f9); border: 15px solid #2c3e50; border-radius: 10px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3); position: relative;">
          <div style="text-align: center; color: #34495e;">
              <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Certificate of Completion</h1>
              <h3 style="font-size: 22px; margin-top: 0; color: #7f8c8d; font-style: italic;">This is proudly awarded to</h3>
          </div>
          <p style="font-size: 30px; color: #2980b9; font-weight: bold; text-align: center; margin: 30px 0;">${recipient}</p>
          <p style="font-size: 20px; line-height: 1.8; color: #2c3e50; text-align: center;">
              for successfully completing the course<br>
              <strong>${course.title}</strong><br>
              on <strong>${course.completionTime}</strong> with exemplary performance.
          </p>
          <div style="display: flex; justify-content: space-between; margin-top: 60px; padding: 0 50px;">
              <div style="text-align: center;">
                  <div style="border-top: 2px solid #34495e; width: 250px; margin: 10px auto;"></div>
                  <p style="font-size: 16px; font-weight: bold; color: #34495e;">Course Instructor</p>
              </div>
              <div style="text-align: center;">
                  <div style="border-top: 2px solid #34495e; width: 250px; margin: 10px auto;"></div>
                  <p style="font-size: 16px; font-weight: bold; color: #34495e;">Director</p>
              </div>
          </div>
          <div style="text-align: center; position: absolute; bottom: 10px; width: 100%; font-size: 14px; color: #7f8c8d;">
              © Your Institution Name. All Rights Reserved.
          </div>
      </div>
    `;
    document.body.appendChild(tempCertificate);

    html2canvas(tempCertificate, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210); // Exact A4 fit
      pdf.save(`${recipient}-${course.title}-Certificate.pdf`);
      document.body.removeChild(tempCertificate);
    });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Completed Courses
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#007BFF" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Course Title</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Completion Time</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Recipient</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedCourses?.length > 0 ? (
              completedCourses.map((course, courseIndex) =>
                course.recipients?.map((recipient, recipientIndex) => (
                  <TableRow
                    key={`${course._id}-${recipientIndex}`}
                    sx={{ backgroundColor: recipientIndex % 2 === 0 ? "#E3F2FD" : "#fff" }}
                  >
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.completionTime}</TableCell>
                    <TableCell>{recipient}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        sx={{ color: "#007BFF", borderColor: "#007BFF", marginRight: "10px" }}
                        onClick={() => handleViewCertificate(course, recipient)}
                      >
                        View Certificate
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#007BFF", color: "#fff" }}
                        onClick={() => handleDownloadCertificate(course, recipient)}
                      >
                        Download Certificate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No completed courses found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompletedCourses;

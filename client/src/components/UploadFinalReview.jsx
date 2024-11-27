import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  Paper,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import axios from "axios";

const FinalReview = ({ data, onBack, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true);

    try {
      // Create a FormData object to send data and files
      const formData = new FormData();

      // Add course data to the form
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("learnPoints", JSON.stringify(data.learnPoints));
      formData.append("requirements", JSON.stringify(data.requirements));
      formData.append("weeks", JSON.stringify(data.weeks));
      formData.append("quizzes", JSON.stringify(data.quizzes));

      // Append files to the form if they exist
      if (data.trailer) {
        formData.append("trailer", data.trailer);
      }

      // Append files for each week
      data.weeks.forEach((week, weekIndex) => {
        week.videos.forEach((video, videoIndex) => {
          if (video.thumbnail) {
            formData.append(`thumbnail-week${weekIndex}-video${videoIndex}`, video.thumbnail);
          }
          if (video.video) {
            formData.append(`video-week${weekIndex}-video${videoIndex}`, video.video);
          }
          if (video.resource) {
            formData.append(`resource-week${weekIndex}-video${videoIndex}`, video.resource);
          }
        });
      });

      console.log("Logging FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      // Send data to the backend via POST request
      const response = await axios.post("http://localhost:5000/api/courses/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Log the response
      alert("Course created successfully!");
      onSubmit(); // Call onSubmit to navigate or handle success
    } catch (error) {
      console.error("Error submitting course:", error);
      alert("Failed to create course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "30px",
        maxWidth: "900px",
        margin: "40px auto",
        borderRadius: "15px",
        backgroundColor: "#ffffff",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Review Your Course Data
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />

        {/* Course Title */}
        <Card elevation={1} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Course Title:
            </Typography>
            <Typography variant="body1">{data.title || "N/A"}</Typography>
          </CardContent>
        </Card>

        {/* Course Description */}
        <Card elevation={1} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Course Description:
            </Typography>
            <Typography variant="body1">{data.description || "N/A"}</Typography>
          </CardContent>
        </Card>

        {/* Trailer Video */}
        <Card elevation={1} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Trailer Video:
            </Typography>
            {data.trailer ? (
              <video
                width="100%"
                controls
                style={{ borderRadius: "10px", marginTop: "10px" }}
              >
                <source src={URL.createObjectURL(data.trailer)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Typography>No Trailer Uploaded</Typography>
            )}
          </CardContent>
        </Card>

        {/* What You'll Learn */}
        <Card elevation={1} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              What You'll Learn:
            </Typography>
            <List>
              {data.learnPoints.map((point, index) => (
                <ListItem key={index} sx={{ padding: 0 }}>
                  • {point}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card elevation={1} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Requirements:
            </Typography>
            <List>
              {data.requirements.map((requirement, index) => (
                <ListItem key={index} sx={{ padding: 0 }}>
                  • {requirement}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Weeks and Videos */}
        <Card elevation={1} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Weeks and Videos:
            </Typography>
            {data.weeks.length > 0 ? (
              data.weeks.map((week, weekIndex) => (
                <Box key={weekIndex} sx={{ marginBottom: "20px" }}>
                  <Typography variant="subtitle1" color="secondary">
                    Week {weekIndex + 1}:
                  </Typography>
                  {week.videos.map((video, videoIndex) => (
                    <Box key={videoIndex} sx={{ marginLeft: "20px", marginTop: "10px" }}>
                      <Typography>
                        • <strong>{video.title || "No Title"}</strong> -{" "}
                        {video.description || "No Description"}
                      </Typography>
                      {video.thumbnail && (
                        <img
                          src={URL.createObjectURL(video.thumbnail)}
                          alt="Thumbnail"
                          style={{
                            width: "150px",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                      {video.video && (
                        <video
                          width="300"
                          controls
                          style={{
                            borderRadius: "8px",
                            marginTop: "10px",
                          }}
                        >
                          <source src={URL.createObjectURL(video.video)} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {video.resource && (
                        <a
                          href={URL.createObjectURL(video.resource)}
                          download
                          style={{
                            display: "block",
                            marginTop: "10px",
                            textDecoration: "none",
                            color: "#1976d2",
                            fontWeight: "bold",
                          }}
                        >
                          Download Resource
                        </a>
                      )}
                    </Box>
                  ))}
                </Box>
              ))
            ) : (
              <Typography>No Weeks and Videos Added</Typography>
            )}
          </CardContent>
        </Card>

        {/* Quizzes */}
        <Card elevation={1} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Quizzes:
            </Typography>
            {data.quizzes.length > 0 ? (
              data.quizzes.map((quiz, quizIndex) => (
                <Box key={quizIndex} sx={{ marginBottom: "10px" }}>
                  <Typography variant="subtitle1" color="secondary">
                    Quiz {quizIndex + 1}:
                  </Typography>
                  {quiz.questions.map((question, questionIndex) => (
                    <Box key={questionIndex} sx={{ marginLeft: "20px", marginTop: "10px" }}>
                      <Typography>
                        Q{questionIndex + 1}: {question.question}
                      </Typography>
                      <Typography>
                        Choices: {question.choices.join(", ")} (Correct: {question.correctAnswer})
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ))
            ) : (
              <Typography>No Quizzes Added</Typography>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button variant="outlined" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
          >
            {"Submit"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default FinalReview;

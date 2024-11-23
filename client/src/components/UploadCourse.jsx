import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";

const CourseUpload = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    whatYouWillLearn: [""],
    requirements: [""],
    weeks: [],
  });

  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [currentWeekIndex, setCurrentWeekIndex] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  // General Handlers
  const handleCourseChange = (field, value) => {
    setCourseDetails({ ...courseDetails, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...courseDetails[field]];
    updatedArray[index] = value;
    setCourseDetails({ ...courseDetails, [field]: updatedArray });
  };

  const addPoint = (field) => {
    setCourseDetails({
      ...courseDetails,
      [field]: [...courseDetails[field], ""],
    });
  };

  const deletePoint = (field, index) => {
    const updatedArray = [...courseDetails[field]];
    updatedArray.splice(index, 1);
    setCourseDetails({ ...courseDetails, [field]: updatedArray });
  };

  // Week and Video Handlers
  const addWeek = () => {
    setCourseDetails({
      ...courseDetails,
      weeks: [
        ...courseDetails.weeks,
        { weekNumber: courseDetails.weeks.length + 1, videos: [], quiz: [] },
      ],
    });
  };

  const deleteWeek = (weekIndex) => {
    const updatedWeeks = [...courseDetails.weeks];
    updatedWeeks.splice(weekIndex, 1);
    setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
  };

  const addVideoToWeek = (weekIndex) => {
    const updatedWeeks = [...courseDetails.weeks];
    updatedWeeks[weekIndex].videos.push({
      title: "",
      description: "",
      thumbnail: null,
      video: null,
      resource: null,
    });
    setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
  };

  const deleteVideo = (weekIndex, videoIndex) => {
    const updatedWeeks = [...courseDetails.weeks];
    updatedWeeks[weekIndex].videos.splice(videoIndex, 1);
    setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
  };

  const handleVideoChange = (weekIndex, videoIndex, field, value) => {
    const updatedWeeks = [...courseDetails.weeks];
    updatedWeeks[weekIndex].videos[videoIndex][field] = value;
    setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
  };

  const openUploadDialog = (type, weekIndex, videoIndex) => {
    setUploadType(type);
    setCurrentWeekIndex(weekIndex);
    setCurrentVideoIndex(videoIndex);
    setUploadDialogOpen(true);
  };

  const handleDrop = (acceptedFiles) => {
    if (currentWeekIndex !== null && currentVideoIndex !== null) {
      const updatedWeeks = [...courseDetails.weeks];
      updatedWeeks[currentWeekIndex].videos[currentVideoIndex][uploadType] =
        acceptedFiles[0];
      setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
    }
    setUploadDialogOpen(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
  });

  const openQuizDialog = (weekIndex) => {
    setCurrentWeekIndex(weekIndex);
    setQuizzes(courseDetails.weeks[weekIndex].quiz || []);
    setQuizDialogOpen(true);
  };

  const addQuestionToQuiz = () => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes.push({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setQuizzes(updatedQuizzes);
  };

  const deleteQuestionFromQuiz = (index) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes.splice(index, 1);
    setQuizzes(updatedQuizzes);
  };

  const handleQuizChange = (index, field, value) => {
    const updatedQuizzes = [...quizzes];
    if (field === "question") {
      updatedQuizzes[index].question = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("_")[1], 10);
      updatedQuizzes[index].options[optionIndex] = value;
    } else if (field === "correctAnswer") {
      updatedQuizzes[index].correctAnswer = value;
    }
    setQuizzes(updatedQuizzes);
  };

  const saveQuiz = () => {
    const updatedWeeks = [...courseDetails.weeks];
    updatedWeeks[currentWeekIndex].quiz = quizzes;
    setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
    setQuizDialogOpen(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Upload Your Course
      </Typography>

      {/* Course Title and Description */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Course Details</Typography>
        <TextField
          fullWidth
          label="Course Title"
          variant="outlined"
          margin="normal"
          value={courseDetails.title}
          onChange={(e) => handleCourseChange("title", e.target.value)}
        />
        <TextField
          fullWidth
          label="Course Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={courseDetails.description}
          onChange={(e) => handleCourseChange("description", e.target.value)}
        />
      </Paper>

      {/* What You'll Learn Section */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">What You'll Learn</Typography>
        {courseDetails.whatYouWillLearn.map((point, index) => (
          <Box display="flex" alignItems="center" key={index} sx={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              label={`Point ${index + 1}`}
              variant="outlined"
              value={point}
              onChange={(e) =>
                handleArrayChange("whatYouWillLearn", index, e.target.value)
              }
            />
            <IconButton
              color="error"
              onClick={() => deletePoint("whatYouWillLearn", index)}
              title="Delete Point"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => addPoint("whatYouWillLearn")}
        >
          Add Point
        </Button>
      </Paper>

      {/* Requirements Section */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Requirements</Typography>
        {courseDetails.requirements.map((requirement, index) => (
          <Box display="flex" alignItems="center" key={index} sx={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              label={`Requirement ${index + 1}`}
              variant="outlined"
              value={requirement}
              onChange={(e) =>
                handleArrayChange("requirements", index, e.target.value)
              }
            />
            <IconButton
              color="error"
              onClick={() => deletePoint("requirements", index)}
              title="Delete Requirement"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => addPoint("requirements")}
        >
          Add Requirement
        </Button>
      </Paper>

      {/* Weeks Section */}
      {courseDetails.weeks.map((week, weekIndex) => (
        <Paper key={weekIndex} sx={{ padding: "20px", marginBottom: "20px" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Week {weekIndex + 1}</Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => addVideoToWeek(weekIndex)}
                sx={{ marginRight: "10px" }}
              >
                Add Video
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => openQuizDialog(weekIndex)}
              >
                Add Quizzes
              </Button>
            </Box>
          </Box>
          <Divider sx={{ marginY: "10px" }} />

          {/* Videos Section */}
          {week.videos.map((video, videoIndex) => (
            <Paper
              key={videoIndex}
              sx={{ padding: "10px", marginBottom: "10px", backgroundColor: "#f9f9f9" }}
            >
              <TextField
                fullWidth
                label="Video Title"
                variant="outlined"
                margin="normal"
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(weekIndex, videoIndex, "title", e.target.value)
                }
              />
              <TextField
                fullWidth
                label="Video Description"
                variant="outlined"
                margin="normal"
                value={video.description}
                onChange={(e) =>
                  handleVideoChange(weekIndex, videoIndex, "description", e.target.value)
                }
              />
              <Button
                variant="outlined"
                onClick={() => openUploadDialog("thumbnail", weekIndex, videoIndex)}
                sx={{ marginRight: "10px" }}
              >
                Upload Thumbnail
              </Button>
              <Button
                variant="outlined"
                onClick={() => openUploadDialog("video", weekIndex, videoIndex)}
                sx={{ marginRight: "10px" }}
              >
                Upload Video
              </Button>
              <Button
                variant="outlined"
                onClick={() => openUploadDialog("resource", weekIndex, videoIndex)}
              >
                Upload Resource (Optional)
              </Button>
            </Paper>
          ))}
        </Paper>
      ))}

      {/* Add Week Button */}
      <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  sx={{ marginTop: "20px" }}
>
  <Button
    variant="contained"
    startIcon={<AddCircleOutlineIcon />}
    sx={{ marginRight: "10px" }} // Add spacing between buttons
    onClick={addWeek}
  >
    Add Week
  </Button>

  <Button
    variant="contained"
    color="success"
    onClick={() => console.log("Course Details Submitted:", courseDetails)}
  >
    Submit Course
  </Button>
</Box>


      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <Paper
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              backgroundColor: isDragActive ? "#f0f8ff" : "transparent",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="body1" sx={{ color: "#007bff" }}>
                Drop the file here...
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ color: "#888" }}>
                Drag and drop a file here, or click to select one
              </Typography>
            )}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog
        open={quizDialogOpen}
        onClose={() => setQuizDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Quizzes for Week {currentWeekIndex + 1}</DialogTitle>
        <DialogContent>
          {quizzes.map((quiz, index) => (
            <Paper
              key={index}
              sx={{ padding: "15px", marginBottom: "15px", backgroundColor: "#f9f9f9" }}
            >
              <TextField
                fullWidth
                label="Question"
                variant="outlined"
                margin="normal"
                value={quiz.question}
                onChange={(e) => handleQuizChange(index, "question", e.target.value)}
              />
              {quiz.options.map((option, optionIndex) => (
                <TextField
                  fullWidth
                  key={optionIndex}
                  label={`Option ${optionIndex + 1}`}
                  variant="outlined"
                  margin="normal"
                  value={option}
                  onChange={(e) =>
                    handleQuizChange(index, `option_${optionIndex}`, e.target.value)
                  }
                />
              ))}
              <Select
                fullWidth
                variant="outlined"
                margin="normal"
                value={quiz.correctAnswer}
                onChange={(e) => handleQuizChange(index, "correctAnswer", e.target.value)}
              >
                <MenuItem value="" disabled>
                  Select Correct Answer
                </MenuItem>
                {quiz.options.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option}>
                    Option {optionIndex + 1}
                  </MenuItem>
                ))}
              </Select>
              <IconButton
                color="error"
                onClick={() => deleteQuestionFromQuiz(index)}
                title="Delete Question"
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addQuestionToQuiz}
            fullWidth
          >
            Add Question
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuizDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveQuiz} color="primary" variant="contained">
            Save Quizzes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseUpload;

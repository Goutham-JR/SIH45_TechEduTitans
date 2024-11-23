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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";

const CourseUpload = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    weeks: [], // Initially no weeks
  });

  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  const addWeek = () => {
    setCourseDetails({
      ...courseDetails,
      weeks: [
        ...courseDetails.weeks,
        { weekNumber: courseDetails.weeks.length + 1, videos: [] },
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

  const handleCourseChange = (field, value) => {
    setCourseDetails({ ...courseDetails, [field]: value });
  };

  const handleVideoChange = (weekIndex, videoIndex, field, value) => {
    const updatedWeeks = [...courseDetails.weeks];
    updatedWeeks[weekIndex].videos[videoIndex][field] = value;
    setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
  };

  const openUploadPopup = (type, weekIndex, videoIndex) => {
    setUploadType(type);
    setCurrentWeekIndex(weekIndex);
    setCurrentVideoIndex(videoIndex);
    setOpenUploadDialog(true);
  };

  const handleDrop = (acceptedFiles) => {
    if (currentWeekIndex !== null && currentVideoIndex !== null) {
      const updatedWeeks = [...courseDetails.weeks];
      updatedWeeks[currentWeekIndex].videos[currentVideoIndex][uploadType] =
        acceptedFiles[0];
      setCourseDetails({ ...courseDetails, weeks: updatedWeeks });
    }
    setOpenUploadDialog(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
  });

  const handleSubmit = () => {
    console.log("Course Details Submitted:", courseDetails);
    alert("Course uploaded successfully!");
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
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ marginTop: "10px" }}
          onClick={addWeek}
        >
          Add Week
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
              <IconButton
                color="error"
                onClick={() => deleteWeek(weekIndex)}
                title="Delete Week"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider sx={{ marginY: "10px" }} />
          {/* Videos Section */}
          {week.videos.map((video, videoIndex) => (
            <Paper
              key={videoIndex}
              sx={{
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Video {videoIndex + 1}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => deleteVideo(weekIndex, videoIndex)}
                  title="Delete Video"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
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
                multiline
                rows={2}
                value={video.description}
                onChange={(e) =>
                  handleVideoChange(
                    weekIndex,
                    videoIndex,
                    "description",
                    e.target.value
                  )
                }
              />
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => openUploadPopup("thumbnail", weekIndex, videoIndex)}
                sx={{ marginRight: "10px" }}
              >
                Upload Thumbnail
              </Button>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => openUploadPopup("video", weekIndex, videoIndex)}
                sx={{ marginRight: "10px" }}
              >
                Upload Video
              </Button>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => openUploadPopup("resource", weekIndex, videoIndex)}
              >
                Upload Resource (Optional)
              </Button>
            </Paper>
          ))}
        </Paper>
      ))}

      {/* Submit Button */}
      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: "20px" }}
        onClick={handleSubmit}
      >
        Submit Course
      </Button>

      {/* Drag-and-Drop Dialog */}
      <Dialog
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            Drag and Drop Your File
          </Typography>
        </DialogTitle>
        <Divider />
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
          <Button
            onClick={() => setOpenUploadDialog(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseUpload;

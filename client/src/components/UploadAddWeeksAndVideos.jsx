import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const AddWeeksAndVideos = ({ onBack, onNext, initialData }) => {
  const [weeks, setWeeks] = useState(initialData || [{ videos: [] }]);
  const [showDropzone, setShowDropzone] = useState(false);
  const [currentUpload, setCurrentUpload] = useState({
    weekIndex: null,
    videoIndex: null,
    field: null,
  });
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setWeeks(initialData); // Restore state if navigating back
    }
  }, [initialData]);

  const addWeek = () => {
    setWeeks([...weeks, { videos: [] }]);
  };

  const removeWeek = (index) => {
    setWeeks(weeks.filter((_, i) => i !== index));
  };

  const addVideo = (weekIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].videos.push({
      title: "",
      description: "",
      thumbnail: null,
      video: null,
      resource: null,
    });
    setWeeks(updatedWeeks);
  };

  const removeVideo = (weekIndex, videoIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].videos = updatedWeeks[weekIndex].videos.filter(
      (_, i) => i !== videoIndex
    );
    setWeeks(updatedWeeks);
  };

  const handleVideoChange = (weekIndex, videoIndex, field, value) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].videos[videoIndex][field] = value;
    setWeeks(updatedWeeks);
  };

  const openDropzone = (weekIndex, videoIndex, field) => {
    setCurrentUpload({ weekIndex, videoIndex, field });
    setShowDropzone(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const updatedWeeks = [...weeks];
        const { weekIndex, videoIndex, field } = currentUpload;
        updatedWeeks[weekIndex].videos[videoIndex][field] = acceptedFiles[0];
        setWeeks(updatedWeeks);
      }
      setShowDropzone(false);
    },
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "video/*": [".mp4", ".mkv", ".avi"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
  });

  const validateFields = () => {
    let validationError = "";

    // Ensure there are at least 3 weeks
    if (weeks.length < 2) {
      validationError = "You must add at least 2 weeks.";
    }

    // Ensure at least one week has at least 3 videos
    const weekWithAtLeastThreeVideos = weeks.some((week) => week.videos.length >= 1);
    if (!weekWithAtLeastThreeVideos) {
      validationError = "At least one week must have 1 videos.";
    }

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];

      // Validate each video in the week
      for (let j = 0; j < week.videos.length; j++) {
        const video = week.videos[j];

        // Validate Title (must not be empty and contain only characters)
        if (!video.title) {
          validationError = `Video title in Week ${i + 1}, Video ${j + 1} cannot be empty.`;
        } else if (/\d/.test(video.title)) {
          validationError = `Video title in Week ${i + 1}, Video ${j + 1} cannot contain numbers.`;
        }

        // Validate Description (must not be empty and contain only characters)
        if (!video.description) {
          validationError = `Video description in Week ${i + 1}, Video ${j + 1} cannot be empty.`;
        } else if (/\d/.test(video.description)) {
          validationError = `Video description in Week ${i + 1}, Video ${j + 1} cannot contain numbers.`;
        }

        // File validations
        if (!video.thumbnail || !video.thumbnail.type.startsWith("image")) {
          validationError = `Thumbnail in Week ${i + 1}, Video ${j + 1} must be an image.`;
        }
        if (!video.video || !video.video.type.startsWith("video")) {
          validationError = `Video in Week ${i + 1}, Video ${j + 1} must be a video file.`;
        }
        if (video.resource && !["application/pdf", "application/msword"].includes(video.resource.type)) {
          validationError = `Resource in Week ${i + 1}, Video ${j + 1} must be a PDF or Word file.`;
        }
      }
    }

    if (validationError) {
      setError(validationError);
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext({ weeks });
    }
  };

  return (
    <Box sx={{ padding: "30px", maxWidth: "900px", margin: "40px auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Weeks and Videos
      </Typography>

      {weeks.map((week, weekIndex) => (
        <Box
          key={weekIndex}
          sx={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd" }}
        >
          <Typography variant="h6">Week {weekIndex + 1}</Typography>

          {week.videos.map((video, videoIndex) => (
            <Box
              key={videoIndex}
              sx={{ marginBottom: "20px", border: "1px dashed #ccc", padding: "10px" }}
            >
              <TextField
                label="Video Title"
                variant="outlined"
                fullWidth
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(weekIndex, videoIndex, "title", e.target.value)
                }
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Video Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={video.description}
                onChange={(e) =>
                  handleVideoChange(weekIndex, videoIndex, "description", e.target.value)
                }
                sx={{ marginBottom: "10px" }}
              />

              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  onClick={() => openDropzone(weekIndex, videoIndex, "thumbnail")}
                >
                  Upload Thumbnail
                </Button>
                <Button
                  variant="contained"
                  onClick={() => openDropzone(weekIndex, videoIndex, "video")}
                >
                  Upload Video
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => openDropzone(weekIndex, videoIndex, "resource")}
                >
                  Upload Resource (Optional)
                </Button>
              </Box>
              <IconButton
                color="error"
                onClick={() => removeVideo(weekIndex, videoIndex)}
              >
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={() => addVideo(weekIndex)}
          >
            Add Video
          </Button>
          <IconButton color="error" onClick={() => removeWeek(weekIndex)}>
            <RemoveCircleOutline />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={addWeek}
        sx={{ marginBottom: "20px" }}
      >
        Add Week
      </Button>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="success" onClick={handleNext}>
          Next
        </Button>
      </Box>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {error}
        </Alert>
      </Snackbar>

      {/* Modal for Dropzone */}
      <Modal
        open={showDropzone}
        onClose={() => setShowDropzone(false)}
        aria-labelledby="dropzone-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Typography id="dropzone-modal" variant="h6" gutterBottom>
            Upload File
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <input {...getInputProps()} />
            <Typography>
              {isDragActive ? "Drop your file here..." : "Drag and drop a file or click"}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddWeeksAndVideos;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Modal,
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
    },
  });

  const handleNext = () => {
    onNext({ weeks });
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

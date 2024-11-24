import React, { useState } from "react";
import { TextField, Button, Box, Typography, Modal, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";

const CourseUpload = ({ onNext }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setTrailer(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*", // Accept only video files
    maxSize: 100 * 1024 * 1024, // Limit to 100MB
  });

  const handleNext = () => {
    if (!title || !description || !trailer) {
      alert("Please fill all fields and upload a trailer.");
      return;
    }
    onNext({ title, description, trailer });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "30px",
        maxWidth: "600px",
        margin: "40px auto",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Upload Course
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Course Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Course Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{ marginRight: "10px" }}
          >
            Upload Trailer
          </Button>
          {trailer && (
            <Typography variant="body1" color="success.main">
              Uploaded: {trailer.name}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>

      {/* Modal for Dropzone */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography id="modal-title" variant="h6" align="center" gutterBottom>
            Upload Trailer
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            {trailer ? (
              <Typography variant="body1" color="success.main">
                {trailer.name} uploaded successfully
              </Typography>
            ) : (
              <Typography variant="body2">
                Drag and drop the trailer here, or click to select a file
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
            {trailer && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowModal(false)}
              >
                Save Trailer
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default CourseUpload;

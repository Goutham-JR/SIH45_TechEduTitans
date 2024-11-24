import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const LearnAndRequirements = ({ onBack, onNext, initialData }) => {
  const [learnPoints, setLearnPoints] = useState(initialData.learnPoints || [""]);
  const [requirements, setRequirements] = useState(initialData.requirements || [""]);

  const handleAddPoint = (setter, points) => {
    setter([...points, ""]);
  };

  const handleRemovePoint = (setter, points, index) => {
    const updatedPoints = points.filter((_, i) => i !== index);
    setter(updatedPoints);
  };

  const handlePointChange = (setter, points, index, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = value;
    setter(updatedPoints);
  };

  const handleNext = () => {
    if (!learnPoints.length || !requirements.length) {
      alert("Please add at least one point in both sections.");
      return;
    }
    onNext({ learnPoints, requirements });
  };

  return (
    <Box
      sx={{
        padding: "30px",
        maxWidth: "800px",
        margin: "40px auto",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add Course Details
      </Typography>

      {/* What You'll Learn Section */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          What You'll Learn
        </Typography>
        {learnPoints.map((point, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={`Point ${index + 1}`}
              value={point}
              onChange={(e) =>
                handlePointChange(setLearnPoints, learnPoints, index, e.target.value)
              }
            />
            <IconButton
              color="error"
              onClick={() => handleRemovePoint(setLearnPoints, learnPoints, index)}
              disabled={learnPoints.length === 1}
              sx={{ marginLeft: "10px" }}
            >
              <RemoveCircleOutline />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={() => handleAddPoint(setLearnPoints, learnPoints)}
        >
          Add Point
        </Button>
      </Box>

      {/* Requirements Section */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Requirements
        </Typography>
        {requirements.map((point, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={`Requirement ${index + 1}`}
              value={point}
              onChange={(e) =>
                handlePointChange(setRequirements, requirements, index, e.target.value)
              }
            />
            <IconButton
              color="error"
              onClick={() => handleRemovePoint(setRequirements, requirements, index)}
              disabled={requirements.length === 1}
              sx={{ marginLeft: "10px" }}
            >
              <RemoveCircleOutline />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={() => handleAddPoint(setRequirements, requirements)}
        >
          Add Requirement
        </Button>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="success" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default LearnAndRequirements;

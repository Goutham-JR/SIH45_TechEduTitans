import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import SideBar from "../components/SideBar";

const EditableAvatar = styled(Box)({
  position: "relative",
  "&:hover .avatar-overlay": {
    opacity: 1,
  },
});

const AvatarOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  cursor: "pointer",
});

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
    gender: "Male",
    dob: "1995-08-15",
    phoneno: "+1 234 567 890",
    profilePic: "https://via.placeholder.com/150", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: imageUrl });
    }
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <>
    <SideBar></SideBar>
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Page Heading */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Profile
      </Typography>

      {/* Profile Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        <EditableAvatar>
          <Avatar
            src={formData.profilePic}
            alt={`${formData.name}'s Profile Picture`}
            sx={{ width: 120, height: 120 }}
          />
          <AvatarOverlay className="avatar-overlay">
            <Typography
              variant="body2"
              color="white"
              textAlign="center"
              sx={{ pointerEvents: "none" }}
            >
              Update Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
              onChange={handleAvatarChange}
            />
          </AvatarOverlay>
        </EditableAvatar>
      </Box>

      {/* Editable Form */}
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
        <Typography variant="body1" sx={{ mb: 1 }}>
          Gender
        </Typography>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
        <TextField
          fullWidth
          type="date"
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneno"
          value={formData.phoneno}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Container>
    </>
  );
};

export default Profile;

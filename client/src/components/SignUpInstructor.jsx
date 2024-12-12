import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

function SignUpInstructor() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (signupFormData.password !== signupFormData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form submitted:", signupFormData);
    navigate("/otp"); // Navigate to OTP page after sign-up
  };

  const handleCloseSignUp = () => setOpenSignUp(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleOpenSignIn = () => console.log("Open Sign In Modal"); // Placeholder for opening Sign-In modal

  return (
    <>
      <Button variant="contained" onClick={handleOpenSignUp}>
        Open Sign-Up Modal
      </Button>

      <Modal open={openSignUp} onClose={handleCloseSignUp}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#f4f4f4",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="h6"
              color="#356bcc"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Sign Up
            </Typography>
            <IconButton
              onClick={handleCloseSignUp}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleSignupSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              variant="outlined"
              margin="normal"
              value={signupFormData.name}
              onChange={handleSignupChange}
              placeholder="Enter your name"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={signupFormData.email}
              onChange={handleSignupChange}
              placeholder="Enter your email"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={signupFormData.password}
              onChange={handleSignupChange}
              placeholder="Enter your password"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={signupFormData.confirmPassword}
              onChange={handleSignupChange}
              placeholder="Confirm your password"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              margin="normal"
              value={signupFormData.phoneNumber}
              onChange={handleSignupChange}
              placeholder="Enter your phone number"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#478eff",
                "&:hover": { backgroundColor: "#356bcc" },
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
          >
            Already have an account?{" "}
            <span
              style={{ color: "#6200ea", cursor: "pointer" }}
              onClick={() => {
                handleCloseSignUp();
                handleOpenSignIn();
              }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default SignUpInstructor;

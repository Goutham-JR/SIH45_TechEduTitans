import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Joi from "joi";
import axios from "axios"; // Import axios for API requests

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // 1 for email, 2 for OTP and password
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const emailSchema = Joi.string().email({ tlds: { allow: false } }).required();
  const passwordSchema = Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
    .required();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const { error } = emailSchema.validate(email);

    if (error) {
      setErrorMessage("Please enter a valid email.");
      setSnackbarOpen(true);
    } else {
      try {
        // Make API call to backend to send OTP to the user's email
        const response = await axios.post("http://localhost:5000/api/auth/forgotpassword", { email });
        if (response.status === 200) {
          setStep(2); // Move to OTP verification step
          setErrorMessage("");
        }
      } catch (err) {
        setErrorMessage("Failed to send OTP. Please try again.");
        setSnackbarOpen(true);
      }
    }
  };

  const handleOtpSubmit = async () => {
    const { error: passwordError } = passwordSchema.validate(password);
    if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
      setErrorMessage("Please enter a valid 4-digit OTP.");
      setSnackbarOpen(true);
    } else if (passwordError) {
      setErrorMessage(
        "Password must be at least 8 characters and contain at least one special character."
      );
      setSnackbarOpen(true);
    } else {
      try {
        // Send OTP and password to the backend
        const response = await axios.post("http://localhost:5000/api/auth/forgotpassword", {
          email,
          otp,
          password,
        });
        if (response.status === 200) {
          alert("Password reset successful!");
          navigate("/login");
        }
      } catch (err) {
        setErrorMessage("Invalid OTP");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 4, textAlign: "center" }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        {step === 1 && (
          <>
            <Typography variant="body2" gutterBottom>
              Please enter your email to reset the password
            </Typography>
            <form onSubmit={handleEmailSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Your Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <Button fullWidth variant="contained" color="primary" type="submit">
                Reset Password
              </Button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <Typography variant="body2" gutterBottom>
              Please enter the 4-digit OTP sent to your email and set a new password.
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Enter OTP"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 4 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleOtpSubmit}>
              Submit OTP and Reset Password
            </Button>
          </>
        )}
      </Card>

      {/* Snackbar for validation errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;

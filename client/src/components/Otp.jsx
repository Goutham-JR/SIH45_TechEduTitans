import React, { useState } from "react";
import { Card, TextField, Button, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
  

const CheckEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Ensure only numeric input
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
      setError(""); // Clear error if the input is valid
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
      setErrorMessage("Please enter a valid 4-digit OTP.");
      setSnackbarOpen(true);
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/otp", {
          otp,
        });

        console.log(response);
        if (response.status === 200) {
            setErrorMessage("");
          }
      } catch (err) {
        setErrorMessage("Invalid OTP");
        setSnackbarOpen(true);
      }
    }
  };

//   const handleVerify = () => {
//     if (otp.length !== 4) {
//         setErrorMessage("OTP must be of the length 4.");
//         setSnackbarOpen(true);
//         return;
//     }
//   };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card style={{ padding: "20px", width: "350px", textAlign: "center" }}>
        <IconButton style={{ float: "left" }} onClick={() => navigate("/forgot-password")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>Check Your Email</Typography>
        <Typography variant="body2" gutterBottom>
          Enter the OTP code mentioned in the email.
        </Typography>
        <TextField
          fullWidth
          label="Enter Code"
          margin="normal"
          value={otp}
          onChange={handleOtpChange}
          error={!!error}
          helperText={error}
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleOtpSubmit}>
          Verify Code
        </Button>
        {/* <Typography variant="body2" style={{ marginTop: "10px" }}>
          Haven’t got the email yet? <span style={{ color: "blue", cursor: "pointer" }}>Resend email</span>
        </Typography> */}
      </Card>
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
    </div>
  );
};

export default CheckEmail;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 4, textAlign: 'center' }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Typography variant="h5" gutterBottom>Forgot Password</Typography>
        <Typography variant="body2" gutterBottom>
          Please enter your email to reset the password
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Your Email"
          defaultValue="contact@dscodetech.com"
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate('/check-email')}
        >
          Reset Password
        </Button>
      </Card>
    </Box>
  );
};

export default ForgotPassword;

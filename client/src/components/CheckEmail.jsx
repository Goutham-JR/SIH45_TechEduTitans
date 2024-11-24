import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography, TextField, Button, IconButton, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CheckEmail = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 4, textAlign: 'center' }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Typography variant="h5" gutterBottom>Check Your Email</Typography>
        <Typography variant="body2" gutterBottom>
          We sent a reset link to contact@dscodetech.com
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the 5-digit code mentioned in the email
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Enter 5-digit code"
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate('/set-new-password')}
        >
          Verify Code
        </Button>
        <Link href="#" underline="none" variant="body2">
          Haven’t got the email yet? Resend email
        </Link>
      </Card>
    </Box>
  );
};

export default CheckEmail;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SetNewPassword = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 4, textAlign: 'center' }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Typography variant="h5" gutterBottom>Set a New Password</Typography>
        <Typography variant="body2" gutterBottom>
          Create a new password. Ensure it differs from previous ones for security.
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate('/password-reset')}
        >
          Update Password
        </Button>
      </Card>
    </Box>
  );
};

export default SetNewPassword;

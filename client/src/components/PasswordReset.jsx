import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PasswordReset = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 4, textAlign: 'center' }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Typography variant="h5" gutterBottom>Password Reset</Typography>
        <Typography variant="body2" gutterBottom>
          Your password has been successfully reset.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => alert('Password reset completed!')}
        >
          Confirm
        </Button>
      </Card>
    </Box>
  );
};

export default PasswordReset;

import React from 'react';
import { Card, CardContent, Typography, TextField, Button, } from '@mui/material';

const SignUp = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          width: '100%',
          padding: '20px',
          backgroundColor: '#1976d2',
          color: '#fff',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Sign Up
          </Typography>
          <form>
            <TextField
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginTop: '20px', backgroundColor: '#ffffff', color: '#1976d2' }}
            >
              Sign Up
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

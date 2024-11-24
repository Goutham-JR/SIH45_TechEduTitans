import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';

// Joi schema for SignIn validation
const signInSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please enter a valid email.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
  }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { error: validationError } = signInSchema.validate(formData);
    if (validationError) {
      setSnackbar({ open: true, message: validationError.details[0].message, severity: 'error' });
      return;
    }
  
    try {
      // Call the backend API to check the credentials
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData, {
        withCredentials: true, // Include cookies with the request
      });
  
      // Redirect on successful login
      setSnackbar({ open: true, message: 'Login successful! Redirecting...', severity: 'success' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Something went wrong. Please try again.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };
  

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
      <Card style={{ maxWidth: 400, padding: 20, backgroundColor: '#091057', color: '#fff' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Sign In
          </Typography>
          {error && (
            <Typography color="error" align="center" style={{ marginBottom: '10px' }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{ color: '#ffffff' }}>
              Email
            </label>
            <TextField
              id="email"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              InputProps={{
                inputProps: {
                  style: { color: formData.email ? '#000' : '#aaa' },
                },
              }}
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />

            <label htmlFor="password" style={{ color: '#ffffff' }}>
              Password
            </label>
            <TextField
              id="password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              InputProps={{
                inputProps: {
                  style: { color: formData.password ? '#000' : '#aaa' },
                },
              }}
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                marginTop: '20px',
                backgroundColor: '#ffffff',
                color: '#1976d2',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1976d2';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = '#1976d2';
              }}
            >
              Sign In
            </Button>
          </form>
          <Typography
            align="center"
            style={{
              marginTop: '20px',
              cursor: 'pointer',
              color: '#ffffff',
              textDecoration: 'underline',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#1976d2';
              e.target.style.textDecoration = 'none';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.textDecoration = 'underline';
            }}
          >
            <span onClick={() => navigate('/signup')}>Don't have an account? Sign Up</span>
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '', severity: '' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Top center alignment
      >
        <Alert onClose={() => setSnackbar({ open: false, message: '', severity: '' })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;

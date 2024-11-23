import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';

// Joi schema for SignUp validation
const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(/^[a-zA-Z\s]+$/).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters.',
    'string.max': 'Name cannot exceed 30 characters.',
    'string.pattern.base': 'Name must only contain alphabets.',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please enter a valid email.',
  }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.pattern.base':
        'Password must be at least 8 characters, include alphanumeric characters, and at least one special character.',
    }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error: validationError } = signUpSchema.validate(formData);
    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      setSnackbar({ open: true, message: 'Sign up successful! Redirecting to Sign In page.', severity: 'success' });
      setTimeout(() => navigate('/signin'), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Something went wrong. Please try again.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ maxWidth: 400, padding: 20, backgroundColor: '#091057', color: '#fff' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">Sign Up</Typography>
          {error && (
            <Typography color="error" align="center" style={{ marginBottom: '10px' }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <Button type="submit" variant="contained" fullWidth style={{ marginTop: '20px', backgroundColor: '#ffffff', color: '#1976d2' }}>
              Sign Up
            </Button>
          </form>
          <Typography align="center" style={{ marginTop: '20px', cursor: 'pointer' }}>
            <span onClick={() => navigate('/signin')} style={{ color: '#ffffff', textDecoration: 'underline' }}>Already have an account? Sign In</span>
          </Typography>
        </CardContent>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false, message: '', severity: '' })} message={snackbar.message} />
    </div>
  );
};

export default SignUp;

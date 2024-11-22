import {React, useState} from 'react';
import { Card, CardContent, Typography, TextField, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5000/api/auth/signup', {name, email, password});
      const {token} = response.data;

      localStorage.setItem('token',token);
      navigate('/signin');
    }catch(err)
    {
      console.log(err?.message)
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
      <Card
        style={{
          maxWidth: 400,
          width: '100%',
          padding: '20px',
          backgroundColor: '#091057',
          color: '#fff',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: '#fff', borderRadius: '5px' }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
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

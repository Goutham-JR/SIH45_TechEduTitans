import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/protected/check-auth', {
          withCredentials: true, // Send cookies with the request
        });
        setUser(response.data.user); // Set user data
      } catch (err) {
        console.error('Error:', err.response?.data?.error || err.message);
        setError('Session expired or unauthorized. Redirecting to login...');
        setTimeout(() => navigate('/signin'), 2000); 
      }
    };

    fetchUser();
  }, [navigate]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Welcome to the Dashboard</h1>
      <p>User ID: {user.id}</p>
      <p>Issued At: {new Date(user.iat * 1000).toLocaleString()}</p>
      <p>Expires At: {new Date(user.exp * 1000).toLocaleString()}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

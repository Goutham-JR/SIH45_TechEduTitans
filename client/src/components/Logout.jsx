import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call the backend logout API
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });

        // Redirect to the login page
        navigate('/');
      } catch (err) {
        console.error('Logout failed:', err.message);
        navigate('/'); // Redirect even if logout fails
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logging you out...</p>
    </div>
  );
};

export default Logout;

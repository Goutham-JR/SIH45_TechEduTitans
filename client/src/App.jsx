import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Course from './pages/Course';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CertificateGenerator from './components/Certificate';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import CourseUpload from './pages/UploadCourse';


function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      {/* Define the application routes */}
      <Routes>
        {/* Root path "/" will render the Home page */}
        <Route path="/" element={<CourseUpload />} />
        {/* Additional routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/course" element={<Course />} />
        <Route path="/courseupload" element={<CourseUpload />} />
        <Route path="/certificate" element={<CertificateGenerator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

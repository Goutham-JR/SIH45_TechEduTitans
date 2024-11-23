import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Course from './pages/Course';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CourseUpload from './components/UploadCourse';

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

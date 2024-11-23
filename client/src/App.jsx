import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Course from './pages/Course';
import CourseUpload from './pages/UploadCourse';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/course" element={<Course />} />
        <Route path="/courseupload" element={<CourseUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

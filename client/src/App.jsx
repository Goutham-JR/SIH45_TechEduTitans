import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import Course from './pages/Course';
import Home from './pages/Home';
import Profile from './pages/Profile';
<<<<<<< Updated upstream
=======
import PaymentsPage from './pages/Payments';
import CourseUpload from './components/UploadCourse';
import AssignmentsPage from './pages/Assignments';
>>>>>>> Stashed changes
import CertificateGenerator from './components/Certificate';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import ResultsAndProgressPage from './pages/ResultsProgress';
import Logout from './components/Logout';
<<<<<<< Updated upstream
import CourseUpload from './pages/UploadCourse';
=======
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderBoard';
import BadgesAndAchievementsPage from './pages/BadgeAchivements';
import SupportPage from './pages/SupportHelp';
>>>>>>> Stashed changes


function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      {/* Define the application routes */}
      <Routes>
        {/* Root path "/" will render the Home page */}
        <Route path="/" element={<SupportPage />} />
        {/* Additional routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<AdminDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course" element={<PaymentsPage />} />
        <Route path="/course" element={<AssignmentsPage />} />
        <Route path="/course" element={<ResultsAndProgressPage />} />
        <Route path="/courseupload" element={<CourseUpload />} />
        <Route path="/home" element={<QuizPage />} />
        <Route path="/certificate" element={<LeaderboardPage />} />
        <Route path="/certificate" element={<BadgesAndAchievementsPage />} />
        <Route path="/certificate" element={<CertificateGenerator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<SupportPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Course from './pages/Course';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PaymentsPage from './pages/Payments';
import CourseUpload from './pages/UploadCourse';
import AssignmentsPage from './pages/Assignments';
import CertificateGenerator from './components/Certificate';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import ResultsAndProgressPage from './pages/ResultsProgress';
import Logout from './components/Logout';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderBoard';
import BadgesAndAchievementsPage from './pages/BadgeAchivements';
import SupportPage from './pages/SupportHelp';
import Testing from './components/Testing';
import ForgotPassword from './components/ForgotPassword';
import Admin from './components/admin';


function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      {/* Define the application routes */}
      <Routes>
        {/* Root path "/" will render the Home page */}
        <Route path="/" element={<Testing />} />
        {/* Additional routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Admindashboard" element={<AdminDashboard />} />
        <Route path="/coursepload" element={<CourseUpload />} />
        <Route path="/coursevideo" element={<Course />} />
        <Route path="/payment" element={<PaymentsPage />} />
        <Route path="/assignment" element={<AssignmentsPage />} />
        <Route path="/result" element={<ResultsAndProgressPage />} />
        <Route path="/courseupload" element={<CourseUpload />} />
        <Route path="/home" element={<QuizPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/badges" element={<BadgesAndAchievementsPage />} />
        <Route path="/certificate" element={<CertificateGenerator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<SupportPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ForgotPassword" element={< ForgotPassword/>} />
        <Route path="/admin" element={< Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

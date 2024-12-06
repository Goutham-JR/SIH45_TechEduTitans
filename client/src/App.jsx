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
import Dashboard from './pages/Dashboard';
import ResultsAndProgressPage from './pages/ResultsProgress';
import Logout from './components/Logout';
import QuizPage from './pages/QuizPage';
import BadgesAndAchievementsPage from './pages/BadgeAchivements';
import Testing from './components/Testing';
import ForgotPassword from './components/ForgotPassword';
import Admin from './components/admin';
import Quiz from './components/quiz';
import ViewResource from './pages/ViewResource';
import StudentCourse from './pages/StudentCourse'
import StudentResource from './pages/StudentResource'
import StudentAssignment from './pages/StudentAssignment'
import StudentQuizzes from './pages/StudentQuizzes'
import StudentLeaderBoard from './pages/StudentLeaderBoard';
import StudentCalender from './pages/StudentCalender';
import UploadCourse from './pages/CourseUpload';
import Setting from './components/setting';
import SearchList from './pages/SearchList';
import CoursePage from './pages/CoursePage'
import CourseVideoPage from './pages/VideoPage';
import InstructorProfile from './components/InstructorProfile';
import Quizmain from './pages/Quiz';


function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Routes>
        {/* Root path "/" will render the Home page */}
        <Route path="/" element={<Testing />} />
        {/* Additional routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Admindashboard" element={<AdminDashboard />} />
        <Route path="/coursepload" element={<CourseUpload />} />
        <Route path="/payment" element={<PaymentsPage />} />
        <Route path="/assignment" element={<AssignmentsPage />} />
        <Route path="/result" element={<ResultsAndProgressPage />} />
        <Route path="/courseupload" element={<UploadCourse />} />
        <Route path="/home" element={<QuizPage />} />
        <Route path="/badges" element={<BadgesAndAchievementsPage />} />
        <Route path="/certificate" element={<CertificateGenerator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ForgotPassword" element={< ForgotPassword/>} />
        <Route path="/admin" element={< Admin/>} />
        <Route path="/quiz" element={< Quiz/>} />
        <Route path="/ViewResourse" element={< ViewResource/>} />
        <Route path="/StudentCourse" element={< StudentCourse/>} />
        <Route path="/StudentResource" element={< StudentResource/>} />
        <Route path="/StudentAssignment" element={< StudentAssignment/>} />
        <Route path="/StudentQuizzes" element={< StudentQuizzes/>} />
        <Route path="/StudentLeaderBoard" element={< StudentLeaderBoard/>} />
        <Route path="/StudentCalender" element={< StudentCalender/>} />
        <Route path="/Setting" element={< Setting/>} />
        <Route path="/SearchList" element={< SearchList/>} />
        <Route path="/CoursePage" element={< CoursePage/>} />
        <Route path="/CourseVideo" element={< CourseVideoPage/>} />
        <Route path="/InstructorProfile" element={< InstructorProfile/>} />
        <Route path="/quizmain" element={< Quizmain/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

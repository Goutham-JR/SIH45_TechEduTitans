import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Course from './pages/Course';
import Home from './pages/LandingPage';
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
import Setting from './pages/SettingPage';
import SearchList from './pages/SearchList';
import CoursePage from './pages/CoursePage'
import CourseVideoPage from './pages/VideoPage';
import InstructorProfile from './components/InstructorProfile';
import Quizmain from './pages/Quiz';
import Recommendation from './pages/StudentRecommendation';
import Otp from './components/otp';
import SignUpInstructor from './components/SignUpInstructor';
import SearchLearning from './pages/StudentLearning'
import InstructorOverviewPage from "./pages/instructor/InstructorOverviewPage";
import CoursesPage from "./pages/instructor/CoursesPage";
import LearningPathPage from "./pages/instructor/LearningPathPage";
import SettingsPage from "./pages/instructor/SettingsPage";
import UploadCoursePage from "./pages/instructor/UploadCoursePage";
import ContentLibraryPage from "./pages/instructor/ContentLibraryPage";
import AddLearningPathPage from "./pages/instructor/learningpath/AddLearningPathPage";
import { Footer } from "./components/common/Footer";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Routes>
        {/* Root path "/" will render the Home page */}
        <Route path="/" element={<Home />} />
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
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/ViewResourse" element={<ViewResource />} />
        <Route path="/StudentCourse" element={<StudentCourse />} />
        <Route path="/StudentResource" element={<StudentResource />} />
        <Route path="/StudentAssignment" element={<StudentAssignment />} />
        <Route path="/StudentQuizzes" element={<StudentQuizzes />} />
        <Route path="/StudentLeaderBoard" element={<StudentLeaderBoard />} />
        <Route path="/StudentCalender" element={<StudentCalender />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/SearchList" element={<SearchList />} />
        <Route path="/CoursePage" element={<CoursePage />} />
        <Route path="/CourseVideo" element={<CourseVideoPage />} />
        <Route path="/InstructorProfile" element={<InstructorProfile />} />
        <Route path="/quizmain" element={<Quizmain />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/signup-instructor" element={<SignUpInstructor />} />




        <Route path="/instructor-dashboard" element={<InstructorOverviewPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/overview" element={<InstructorOverviewPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/learningpath" element={<LearningPathPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/uploadCourse" element={<UploadCoursePage />} />
        <Route path="/contentlibrary" element={<ContentLibraryPage />} />
        <Route path="/addlearningpath" element={<AddLearningPathPage />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

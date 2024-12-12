const express = require("express");
const router = express.Router();
const {
  updateProgress,
  getProgress,
  checkEnrollment,
  enrollUserInCourse,
  getEnrollmentCount,
  updatevideotiming,
  getCountofEnrolled,
  getTotalLessonsCompleted,
  getTotalTimeSpent,
  getLatestCourseId,
  checkQuizStatus,
  getEnrolledDetails,
} = require("../controllers/studentController");

router.post("/progress", updateProgress);
router.get("/getprogress", getProgress);
router.post("/video-timing", updatevideotiming);
router.get("/enrollments/check/:courseId/:userId", checkEnrollment);
router.post("/enrollments/enroll", enrollUserInCourse);
router.get("/enrollments/count/:courseId", getEnrollmentCount);
router.get("/enrollments/enrollcount/:userId", getCountofEnrolled);
router.get("/progress/lessons-completed/:userId", getTotalLessonsCompleted);
router.get("/videotimings/time-spent/:userId", getTotalTimeSpent);
router.get("/videotimings/latest-course/:userId", getLatestCourseId);
router.get("/quiz-status", checkQuizStatus);
router.get("/enrollments/details/:userId", getEnrolledDetails);
module.exports = router;

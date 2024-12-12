import Header from "../../components/common/Header";
import UploadCourse from "../../components/uploadCourse/UploadCourse";
import AddCourseDetails from "../../components/uploadCourse/AddCourseDetails";
import AddWeeksAndVideos from "../../components/uploadCourse/AddWeeksAndVideos";
import AddQuizzes from "../../components/uploadCourse/AddQuizzes";
import ReviewCourseData from "../../components/uploadCourse/ReviewCourseData";

const UploadCoursePage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      Header and Stats
      <Header title="Resources" />
      {/* Stats Section
				<motion.div
				className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				>
				<StatCard name="Total Courses Enrolled" icon={Zap} value="10" color="#6366F1" />
				<StatCard name="Total Lessons Completed" icon={Users} value="123" color="#8B5CF6" />
					<StatCard name="Badges" icon={ShoppingBag} value="5" color="#EC4899" />
					<StatCard name="Total Learning Hours" icon={BarChart2} value="45 hrs" color="#10B981" />
					</motion.div> */}
      <AddWeeksAndVideos />
      {/* Uncomment the components below as needed */}
      <UploadCourse />
      <AddQuizzes />
      <ReviewCourseData />
      <main>
        <div class="flex ">
          <div class="flex-none w-30 ">{/* <CourseFilters/> */}</div>
          <div class="flex-auto w-70 ">
            {/* <MultiActionAreaCard course={courseData} />
  <MultiActionAreaCard course={courseData} /> */}
            {/* <Instructor_courses/> */}
            <AddCourseDetails />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadCoursePage;

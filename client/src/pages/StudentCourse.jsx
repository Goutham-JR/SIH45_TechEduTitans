import { React } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState } from "react";


const courseDetails = {
	name: "Introduction to AI",
	description: "Learn the fundamentals of Artificial Intelligence, including machine learning and neural networks.",
	syllabus: [
		{ title: "Introduction to AI", completed: true },
		{ title: "History and Applications of AI", completed: true },
		{ title: "Machine Learning Basics", completed: false },
		{ title: "Deep Learning Overview", completed: false },
		{ title: "AI Ethics and Future Directions", completed: false },
	],
	resources: [
		{ type: "PDF", title: "AI Fundamentals", link: "#" },
		{ type: "Video", title: "Machine Learning Basics", link: "#" },
		{ type: "Link", title: "AI Ethics Article", link: "#" },
	],
};

const DetailedCourseView = () => {
	const [activeLesson, setActiveLesson] = useState(null);

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			{/* Header */}
			<h1 className="text-2xl font-bold text-white">{courseDetails.name}</h1>
			<p className="text-gray-300">{courseDetails.description}</p>

			{/* Syllabus Section */}
			<div className="space-y-4">
				<h2 className="text-lg font-medium text-white">Syllabus</h2>
				<ul className="space-y-2">
					{courseDetails.syllabus.map((lesson, index) => (
						<li
							key={index}
							className={`p-3 rounded-md ${
								lesson.completed ? "bg-green-700" : "bg-gray-700"
							} flex justify-between items-center`}
						>
							<span className="text-gray-100">{lesson.title}</span>
							{lesson.completed && (
								<span className="text-sm text-green-300">Completed</span>
							)}
							{!lesson.completed && (
								<button
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
									onClick={() => setActiveLesson(index)}
								>
									Start Lesson
								</button>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Progress Section */}
			<div>
				<h2 className="text-lg font-medium text-white">Progress</h2>
				<div className="bg-gray-700 rounded-full w-full h-4 mt-2">
					<div
						className="bg-green-500 h-4 rounded-full"
						style={{
							width: `${
								(courseDetails.syllabus.filter((lesson) => lesson.completed)
									.length /
									courseDetails.syllabus.length) *
								100
							}%`,
						}}
					></div>
				</div>
				<p className="text-sm text-gray-400 mt-1">
					{
						courseDetails.syllabus.filter((lesson) => lesson.completed).length
					}{" "}
					out of {courseDetails.syllabus.length} lessons completed.
				</p>
			</div>

			{/* Resources Section */}
			<div className="space-y-4">
				<h2 className="text-lg font-medium text-white">Resources</h2>
				<ul className="space-y-2">
					{courseDetails.resources.map((resource, index) => (
						<li
							key={index}
							className="flex justify-between items-center p-3 bg-gray-700 rounded-md"
						>
							<div className="text-gray-100">
								<span className="font-semibold">{resource.type}:</span>{" "}
								{resource.title}
							</div>
							<a
								href={resource.link}
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
							>
								Open
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Active Lesson (if any) */}
			{activeLesson !== null && (
				<div className="space-y-4 bg-gray-700 p-4 rounded-md">
					<h3 className="text-lg font-medium text-white">
						{courseDetails.syllabus[activeLesson].title}
					</h3>
					<p className="text-gray-300">
						Lesson content for "{courseDetails.syllabus[activeLesson].title}" goes here.
					</p>
					<button
						className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
						onClick={() => {
							courseDetails.syllabus[activeLesson].completed = true;
							setActiveLesson(null);
						}}
					>
						Mark as Completed
					</button>
				</div>
			)}
		</motion.div>
	);
};

const courses = [
	{
		name: "Introduction to AI",
		description: "Learn the fundamentals of Artificial Intelligence, including machine learning and neural networks.",
		progress: 50,
		enrollmentDate: new Date(2023, 8, 15),
	},
	{
		name: "Web Development Bootcamp",
		description: "Master full-stack web development with hands-on projects and modern tools like React and Node.js.",
		progress: 75,
		enrollmentDate: new Date(2023, 5, 10),
	},
	{
		name: "Data Science Essentials",
		description: "Explore data analysis, visualization, and machine learning techniques with Python.",
		progress: 30,
		enrollmentDate: new Date(2023, 10, 1),
	},
	{
		name: "Introduction to Cloud Computing",
		description: "Dive into cloud architecture, services, and deployment models with hands-on practice.",
		progress: 0,
		enrollmentDate: new Date(2023, 2, 20),
	},
];

const FiltersAndSorting = ({ onFilterChange, onSortChange }) => {
	return (
		<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-4">
			<h2 className="text-lg font-medium text-white">Filters and Sorting</h2>

			{/* Filter Options */}
			<div className="space-y-2">
				<label className="text-gray-300">Filter by Progress:</label>
				<select
					onChange={(e) => onFilterChange(e.target.value)}
					className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
				>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="inProgress">In Progress</option>
					<option value="notStarted">Not Started</option>
				</select>
			</div>

			{/* Sorting Options */}
			<div className="space-y-2">
				<label className="text-gray-300">Sort by:</label>
				<select
					onChange={(e) => onSortChange(e.target.value)}
					className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
				>
					<option value="name">Course Name (A-Z)</option>
					<option value="dateNewest">Enrollment Date (Newest First)</option>
					<option value="dateOldest">Enrollment Date (Oldest First)</option>
				</select>
			</div>
		</div>
	);
};

const CourseCard = ({ course }) => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-4"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h3 className="text-xl font-semibold text-white">{course.name}</h3>
			<p className="text-gray-300">{course.description}</p>
			<div className="space-y-2">
				<div className="bg-gray-700 rounded-full w-full h-4">
					<div
						className="bg-green-500 h-4 rounded-full"
						style={{ width: `${course.progress}%` }}
					></div>
				</div>
				<p className="text-sm text-gray-400">Progress: {course.progress}%</p>
			</div>
		</motion.div>
	);
};

const CourseList = () => {
	const [filter, setFilter] = useState("all");
	const [sort, setSort] = useState("name");

	// Filter courses based on progress
	const filteredCourses = courses.filter((course) => {
		if (filter === "completed") return course.progress === 100;
		if (filter === "inProgress") return course.progress > 0 && course.progress < 100;
		if (filter === "notStarted") return course.progress === 0;
		return true; // "all"
	});

	// Sort courses based on selected criteria
	const sortedCourses = [...filteredCourses].sort((a, b) => {
		if (sort === "name") return a.name.localeCompare(b.name);
		if (sort === "dateNewest") return b.enrollmentDate - a.enrollmentDate;
		if (sort === "dateOldest") return a.enrollmentDate - b.enrollmentDate;
		return 0;
	});

	return (
		<div className="space-y-6">
			{/* Filters and Sorting Component */}
			<FiltersAndSorting onFilterChange={setFilter} onSortChange={setSort} />

			{/* Course Cards */}
			{sortedCourses.map((course, index) => (
				<CourseCard key={index} course={course} />
			))}
		</div>
	);
};

const Dashboard = () => {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-white">My Courses</h1>
			<CourseList />
		</div>
	);
};


const OverviewPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gray-800 shadow-lg">
          <Header />
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
              {/* STATS */}
              <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <StatCard
                  name="Total Courses Enrolled"
                  icon={Zap}
                  value="10"
                  color="#6366F1"
                />
                <StatCard
                  name="Total Lessons Completed"
                  icon={Users}
                  value="123"
                  color="#8B5CF6"
                />
                <StatCard
                  name="Badges"
                  icon={ShoppingBag}
                  value="5"
                  color="#EC4899"
                />
                <StatCard
                  name="Total Learning Hours"
                  icon={BarChart2}
                  value="45 hrs"
                  color="#10B981"
                />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Dashboard />
                <DetailedCourseView />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;

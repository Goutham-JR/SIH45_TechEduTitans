import {
  Award,
  BarChart2,
  Book,
  FileSignature,
  Home,
  Library,
  Lightbulb,
  Settings,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import CourseList from "../../components/courses/CourseList";
import Sidebar from "../../components/common/Sidebar";
import { Footer } from "../../components/common/Footer";

const CoursesPage = () => {
  const SIDEBAR_ITEMS = [
    {
      name: "Home",
      icon: Home,
      color: "#6366f1",
      href: "/",
    },
    {
      name: "My Courses",
      icon: Book,
      color: "#8B5CF6",
      href: "/courses",
    },
    {
      name: "Learning Path",
      icon: Lightbulb,
      color: "#EC4899",
      href: "/learningpath",
    },
    {
      name: "Quiz",
      icon: FileSignature,
      color: "#10B981",
      href: "/quiz",
    },
    {
      name: "Content Library",
      icon: Library,
      color: "#FF5722",
      href: "/contentlibrary",
    },
    {
      name: "Settings",
      icon: Settings,
      color: "#6EE7B7",
      href: "/settings",
    },
  ];

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} collapsed={false} />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="My Courses" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="My Courses "
              icon={Book}
              value="10"
              color="#6366F1"
            />
            <StatCard
              name="Total Lessons Completed"
              icon={Users}
              value="123"
              color="#8B5CF6"
            />
            <StatCard name="Badges" icon={Award} value="5" color="#EC4899" />
            <StatCard
              name="Total Learning Hours"
              icon={BarChart2}
              value="45 hrs"
              color="#10B981"
            />
          </motion.div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">My Courses</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Course
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CourseList />
            <CourseList />
            <CourseList />
            <CourseList />
            <CourseList />
            <CourseList />
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};
export default CoursesPage;

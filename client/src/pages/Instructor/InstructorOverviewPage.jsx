import {
  BadgeCheck,
  Book,
  BookCheck,
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

import QuizPerformanceChart from "../../components/overviewinstructor/StudentsQuizPerformanceChart";
import QuickLinks from "../../components/overviewinstructor/InstructorQuickLinks";
import { Footer } from "../../components/common/Footer";
import Sidebar from "../../components/common/Sidebar";
import ColumnChart from "../../components/overviewinstructor/ColumnChart";
import LineChart from "../../components/overviewinstructor/LineChart";

const InstructorOverviewPage = () => {
  const SIDEBAR_ITEMS = [
    {
      name: "Dashboard",
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
        <Header title="Welcome Instructor ,  [Name ]" />

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
              name=" Completion Rate"
              icon={BookCheck}
              value="123"
              color="#8B5CF6"
            />
            <StatCard
              name="Enrolled Students"
              icon={Users}
              value="5"
              color="#EC4899"
            />
            <StatCard
              name="Certificate Issued"
              icon={BadgeCheck}
              value="5"
              color="#EC4899"
            />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuizPerformanceChart />
            <LineChart />
            <ColumnChart />
            <QuickLinks />
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};
export default InstructorOverviewPage;

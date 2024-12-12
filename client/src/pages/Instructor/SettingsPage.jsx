import Header from "../../components/common/Header";
import ConnectedAccounts from "../../components/settings/ConnectedAccounts";
import DangerZone from "../../components/settings/DangerZone";
import Notifications from "../../components/settings/Notifications";
import Profile from "../../components/settings/Profile";
import Security from "../../components/settings/Security";
import Sidebar from "../../components/common/Sidebar";
import {
  Book,
  FileSignature,
  Home,
  Library,
  Lightbulb,
  Settings,
} from "lucide-react";

const SettingsPage = () => {
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
      <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
        <Header title="Settings" />
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
          <Profile />
          <Notifications />
          <Security />
          <ConnectedAccounts />
          <DangerZone />
        </main>
      </div>
    </>
  );
};
export default SettingsPage;

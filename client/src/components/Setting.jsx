import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell, Shield, Trash2, HelpCircle, Plus } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative bg-gray-900">
      <Header title="Settings" />
      <div className="flex" sticky top-0 z-10>
        {/* Sidebar Menu */}
        <div className="flex-none w-1/4 bg-gray-800 p-4">
          <ProfileSettingsMenu />
        </div>

        {/* Main Content */}
        <div className="w-3/4 max-w-3xl mx-auto py-12 px-4 lg:px-8">
          <Profile />
          <SkillsInput />
          <Notifications />
          <Security />
          <ConnectedAccounts />
          <DangerZone />
        </div>
      </div>
    </div>
  );
};

const ConnectedAccounts = () => {
  const [connectedItems, setConnectedItems] = useState([
    {
      id: 1,
      type: "Email",
      value: "user@example.com",
      connected: true,
    },
    {
      id: 2,
      type: "Phone",
      value: "+1234567890",
      connected: false,
    },
  ]);

  return (
    <SettingSection icon={HelpCircle} title={"Connected Accounts"}>
      {connectedItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-3">
          <div className="flex flex-col">
            <span className="text-gray-300">{item.type}</span>
            <span className="text-gray-400 text-sm">{item.value}</span>
          </div>
          <button
            className={`px-3 py-1 rounded ${
              item.connected ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
            } transition duration-200`}
            onClick={() => {
              setConnectedItems(
                connectedItems.map((acc) => {
                  if (acc.id === item.id) {
                    return {
                      ...acc,
                      connected: !acc.connected,
                    };
                  }
                  return acc;
                })
              );
            }}
          >
            {item.connected ? "Connected" : "Connect"}
          </button>
        </div>
      ))}
    </SettingSection>
  );
};

const DangerZone = () => {
  return (
    <motion.div
      className="bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <Trash2 className="text-red-400 mr-3" size={24} />
        <h2 className="text-xl font-semibold text-gray-100">Danger Zone</h2>
      </div>
      <p className="text-gray-300 mb-4">Permanently delete your account and all of your content.</p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded 
        transition duration-200"
      >
        Delete Account
      </button>
    </motion.div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
  });

  return (
    <SettingSection icon={Bell} title={"Notifications"}>
      <ToggleSwitch
        label={"Push Notifications"}
        isOn={notifications.push}
        onToggle={() => setNotifications({ ...notifications, push: !notifications.push })}
      />
      <ToggleSwitch
        label={"Email Notifications"}
        isOn={notifications.email}
        onToggle={() => setNotifications({ ...notifications, email: !notifications.email })}
      />
      <ToggleSwitch
        label={"SMS Notifications"}
        isOn={notifications.sms}
        onToggle={() => setNotifications({ ...notifications, sms: !notifications.sms })}
      />
    </SettingSection>
  );
};

const ProfileSettingsMenu = () => {
  const [activeSection, setActiveSection] = useState("Profile");

  return (
    <div className="flex-auto flex-col gap-6 p-6">
      <h2 className="text-lg font-semibold text-gray-100 mb-5">Settings Menu</h2>
      <div className="flex flex-col gap-5">
        <button
          onClick={() => setActiveSection("Profile")}
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            activeSection === "Profile" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"
          } transition`}
        >
          <User size={18} /> Profile
        </button>
        <button
          onClick={() => setActiveSection("Password")}
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            activeSection === "Password" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"
          } transition`}
        >
          <Lock size={18} /> Password
        </button>
        <button
          onClick={() => setActiveSection("Notifications")}
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            activeSection === "Notifications" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"
          } transition`}
        >
          <Bell size={18} /> Notifications
        </button>
      </div>
    </div>
  );
};

export { SettingsPage, ConnectedAccounts, DangerZone, Notifications, ProfileSettingsMenu };

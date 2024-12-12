
import { User, Lock, Bell } from "lucide-react";
import SettingSection from "./SettingSection";
import { useState } from "react";

// Profile Information Component
const ProfileInformation = ({ user, onSave, onCancel }) => (
  <div className="profile-information">
    <h3 className="text-lg font-semibold text-gray-100">Profile Information</h3>
    <div className="flex flex-col sm:flex-row items-center mb-6">
      <img
        src={user.avatar}
        alt="Profile"
        className="rounded-full w-20 h-20 object-cover mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-100">{user.name}</h3>
        <p className="text-gray-400">{user.email}</p>
      </div>
    </div>
    <div className="flex gap-4">
      <button
        onClick={() => onSave(user)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Save Changes
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Cancel
      </button>
    </div>
  </div>
);

// Password Update Component
const PasswordUpdate = ({ onChangePassword, onCancel }) => (
  <div className="password-update mt-8">
    <h3 className="text-lg font-semibold text-gray-100">Change Password</h3>
    <div className="mb-4">
      <label className="block text-gray-400">Current Password</label>
      <input
        type="password"
        placeholder="Enter current password"
        className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-400">New Password</label>
      <input
        type="password"
        placeholder="Enter new password"
        className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-400">Confirm New Password</label>
      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
      />
    </div>
    <div className="flex gap-4">
      <button
        onClick={onChangePassword}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Save New Password
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Cancel
      </button>
    </div>
  </div>
);

// Notification Preferences Component
const NotificationPreferences = ({ preferences, onSave, onReset }) => (
  <div className="notification-preferences mt-8">
    <h3 className="text-lg font-semibold text-gray-100">Notification Preferences</h3>
    <label className="flex items-center mb-4 text-gray-400">
      <input
        type="checkbox"
        checked={preferences.assignmentsDue}
        onChange={(e) => preferences.setAssignmentsDue(e.target.checked)}
        className="mr-2"
      />
      Notify me about assignments due
    </label>
    <label className="flex items-center mb-4 text-gray-400">
      <input
        type="checkbox"
        checked={preferences.courseUpdates}
        onChange={(e) => preferences.setCourseUpdates(e.target.checked)}
        className="mr-2"
      />
      Notify me about course updates
    </label>
    <label className="flex items-center mb-4 text-gray-400">
      <input
        type="checkbox"
        checked={preferences.quizReminders}
        onChange={(e) => preferences.setQuizReminders(e.target.checked)}
        className="mr-2"
      />
      Notify me about upcoming quizzes
    </label>
    <div className="flex gap-4">
      <button
        onClick={() => onSave(preferences)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Save Preferences
      </button>
      <button
        onClick={onReset}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Reset to Default
      </button>
    </div>
  </div>
);

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  });

  const [preferences, setPreferences] = useState({
    assignmentsDue: true,
    courseUpdates: false,
    quizReminders: true,
    setAssignmentsDue: (value) => setPreferences((prev) => ({ ...prev, assignmentsDue: value })),
    setCourseUpdates: (value) => setPreferences((prev) => ({ ...prev, courseUpdates: value })),
    setQuizReminders: (value) => setPreferences((prev) => ({ ...prev, quizReminders: value })),
  });

  const handleSaveProfile = (user) => {
    console.log("Profile Updated:", user);
  };

  const handleChangePassword = () => {
    console.log("Password Updated");
  };

  const handleSavePreferences = (preferences) => {
    console.log("Preferences Saved:", preferences);
  };

  const handleResetPreferences = () => {
    console.log("Preferences Reset to Default");
  };

  return (
    <div>
      <SettingSection icon={User} title="Profile">
        <ProfileInformation user={user} onSave={handleSaveProfile} onCancel={() => console.log("Profile Edit Cancelled")} />
      </SettingSection>

      <SettingSection icon={Lock} title="Change Password">
        <PasswordUpdate onChangePassword={handleChangePassword} onCancel={() => console.log("Password Change Cancelled")} />
      </SettingSection>


    </div>
  );
};

export default Profile;
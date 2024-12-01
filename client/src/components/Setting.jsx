import { useState } from "react";
import { Lock, Bell, Shield, User, HelpCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotificationPreferences = ({ preferences, onSave, onReset }) => (
  <div className="notification-preferences mt-8">
    <h3 className="text-lg font-semibold text-gray-100">
      Notification Preferences
    </h3>
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

const PasswordUpdate = ({ onChangePassword, onCancel }) => (
  <div className="password-update mt-8 z-0">
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

const ProfileInformation = ({ user, onSave, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  // Use React Router's useNavigate hook for navigation
  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(file.type)
    ) {
      if (file.size <= 1048576) {
        // File size check (1MB)
        setNewPhoto(URL.createObjectURL(file));
      } else {
        alert("File size must be less than 1MB");
      }
    } else {
      alert(
        "Unsupported file format. Please upload a PNG, JPG, JPEG, or GIF image."
      );
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeletePhoto = () => {
    setNewPhoto(null); // Remove the uploaded photo
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1); // This is equivalent to window.history.back() in React Router
  };

  return (
    <div className="profile-information">
      <h3 className="text-lg font-semibold text-gray-100">
        Profile Information
      </h3>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mr-4 flex justify-center items-center">
          <img
            src={newPhoto || user.avatar}
            alt="Profile"
            className="rounded-full w-full h-full object-cover cursor-pointer"
            onClick={handleModalToggle}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{user.name}</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Modal for Profile Photo Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 z-9999">
          <div className="bg-black rounded-lg p-6 w-80 sm:w-96 z-9999">
            <h4 className="text-xl font-semibold text-white">
              Profile Photo Upload
            </h4>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={handlePhotoUpload}
              className="mt-4 p-2 border border-gray-300 rounded"
            />
            {newPhoto && (
              <div className="mt-4">
                <img
                  src={newPhoto}
                  alt="Preview"
                  className="rounded-full w-24 h-24 object-cover mb-2"
                />
                <button
                  onClick={handleDeletePhoto}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
                >
                  Delete Photo
                </button>
              </div>
            )}
            <p className="text-sm text-white-500 mt-4">
              Supported file formats: PNG, JPG, JPEG, GIF (up to 1MB)
            </p>
            {/* <p className="text-sm text-white-500 mt-1">
          By uploading your photograph, you certify that the uploaded file complies with the Terms of Services and can be displayed to recruiters.
        </p> */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => onSave(user)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal when clicked
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save and Cancel Buttons */}
      <div className="flex gap-4 mt-6">
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
};

const SettingSection = ({ icon: Icon, title, children }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <Icon className="text-indigo-400 mr-4" size="24" />
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};

const SkillInput = () => {
  const [skills, setSkills] = useState([]); // Stores the list of skills
  const [newSkill, setNewSkill] = useState(""); // Stores the skill currently being added

  // Function to add a skill to the list
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill(""); // Clear the input after adding
    } else {
      alert("Please enter a valid skill.");
    }
  };

  // Function to remove a skill from the list
  const removeSkill = (skill) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  return (
    <div className="pb-10">
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6 pb-8" // Fixed bottom padding (pb-8)
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-white">Skill Input</h2>
        <p className="text-gray-300">Enter and manage your skills below.</p>

        {/* Skill Input Section */}
        <div className="flex space-x-4 items-center mt-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="p-2 w-full rounded-md text-gray-900"
            placeholder="Enter a skill"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Add
          </button>
        </div>

        {/* Skill List */}
        <div className="space-y-2 mt-4 pb-1">
          {skills.length === 0 ? (
            <p className="text-gray-300">No skills added yet.</p>
          ) : (
            skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700 p-2 rounded-md"
              >
                <span className="text-white">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ToggleSwitch = ({ label, isOn, onToggle }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300">{label}</span>
      <button
        className={`
        relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
        ${isOn ? "bg-indigo-600" : "bg-gray-600"}
        `}
        onClick={onToggle}
      >
        <span
          className={`inline-block size-4 transform transition-transform bg-white rounded-full 
            ${isOn ? "translate-x-6" : "translate-x-1"}
            `}
        />
      </button>
    </div>
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
        onToggle={() =>
          setNotifications({ ...notifications, push: !notifications.push })
        }
      />
      <ToggleSwitch
        label={"Email Notifications"}
        isOn={notifications.email}
        onToggle={() =>
          setNotifications({ ...notifications, email: !notifications.email })
        }
      />
      <ToggleSwitch
        label={"SMS Notifications"}
        isOn={notifications.sms}
        onToggle={() =>
          setNotifications({ ...notifications, sms: !notifications.sms })
        }
      />
    </SettingSection>
  );
};

const Security = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <SettingSection icon={Lock} title={"Security"}>
      <ToggleSwitch
        label={"Two-Factor Authentication"}
        isOn={twoFactor}
        onToggle={() => setTwoFactor(!twoFactor)}
      />
      <div className="mt-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
        transition duration-200
        "
        >
          Change Password
        </button>
      </div>
    </SettingSection>
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
              item.connected
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
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
      <p className="text-gray-300 mb-4">
        Permanently delete your account and all of your content.
      </p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded 
      transition duration-200"
      >
        Delete Account
      </button>
    </motion.div>
  );
};

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  });

  const [preferences, setPreferences] = useState({
    assignmentsDue: true,
    courseUpdates: false,
    quizReminders: true,
    setAssignmentsDue: (value) =>
      setPreferences((prev) => ({ ...prev, assignmentsDue: value })),
    setCourseUpdates: (value) =>
      setPreferences((prev) => ({ ...prev, courseUpdates: value })),
    setQuizReminders: (value) =>
      setPreferences((prev) => ({ ...prev, quizReminders: value })),
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
    <div className="flex-1 overflow-auto relative bg-gray-900">
      <div className="flex" sticky top-0 z-10>
        {/* Sidebar Menu */}
        <div className="flex-none w-1/4 bg-gray-800 p-4 ">
          <div className="flex-auto flex-col gap-6 p-6">
            {/* Sidebar Menu */}
            <div>
              <h2 className="text-lg font-semibold text-gray-100 mb-5">
                Settings Menu
              </h2>
              <div className="flex flex-col gap-5">
                <button
                  onClick={() => setActiveSection("Profile")}
                  className={`flex items-center gap-2 px-3 py-2 rounded ${
                    activeSection === "Profile"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  } transition`}
                >
                  <User size={18} /> Profile
                </button>
                <button
                  onClick={() => setActiveSection("Password")}
                  className={`flex items-center gap-2 px-3 py-2 rounded ${
                    activeSection === "Password"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  } transition`}
                >
                  <Lock size={18} /> Password
                </button>
                <button
                  onClick={() => setActiveSection("Notifications")}
                  className={`flex items-center gap-2 px-3 py-2 rounded ${
                    activeSection === "Notifications"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  } transition`}
                >
                  <Bell size={18} /> Notifications
                </button>
                <button
                  onClick={() => setActiveSection("Verification")}
                  className={`flex items-center gap-2 px-3 py-2 rounded ${
                    activeSection === "Verification"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  } transition`}
                >
                  <Shield size={18} /> Verification
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 max-w-3xl mx-auto py-12 px-4 lg:px-8">
          <SettingSection icon={User} title="Profile">
            <ProfileInformation
              user={user}
              onSave={handleSaveProfile}
              onCancel={() => console.log("Profile Edit Cancelled")}
            />
          </SettingSection>

          <SettingSection icon={Lock} title="Change Password">
            <PasswordUpdate
              onChangePassword={handleChangePassword}
              onCancel={() => console.log("Password Change Cancelled")}
            />
          </SettingSection>

          <SettingSection icon={Bell} title="Notification Preferences">
            <NotificationPreferences
              preferences={preferences}
              onSave={handleSavePreferences}
              onReset={handleResetPreferences}
            />
          </SettingSection>
          <SkillInput />
          <Notifications />
          <Security />
          <ConnectedAccounts />
          <DangerZone />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

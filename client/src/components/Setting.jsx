import { useState, useEffect } from "react";
import { Lock, Bell, Shield, User, HelpCircle, Trash2} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Joi from 'joi';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import LocationOn from '@mui/icons-material/LocationOn'; 
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";



let sessionemail = null, sessionname = null, sessionphone = null;


const PersonalInformation = ({ defaultName, defaultPhone, onUpdateInfo, onCancel }) => {
  const [name, setName] = useState(defaultName || "");
  const [phone, setPhone] = useState(defaultPhone || "");
  const [gender, setGender] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [userDetail, setUserDetail] = useState(null);

  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name cannot be empty.",
    }),
    gender: Joi.string().valid("male", "female", "other").required().messages({
      "string.empty": "Please select a gender.",
      "any.only": "Please select a valid gender.",
    }),
    collegeName: Joi.string().required().messages({
      "string.empty": "College name cannot be empty.",
    }),
    dob: Joi.date().required().messages({
      "date.base": "Please select a valid date.",
      "any.required": "Date of Birth is required.",
    }),
  });

  const fetchUser = async () => {
    try {
      const isLogged = true; // Replace with your actual logic for checking login status
      if (isLogged) {
        const res = await axios.get(
          "http://localhost:5000/api/protected/fetchuserdetail",
          {
            withCredentials: true,
          }
        );
        setUserDetail(res.data.user);
        setGender(res.data.user.gender); // Set gender from user details
        setDob(res.data.user.dob); // Set dob from user details
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  // Format the date of birth (if present) into a more readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // returns the date in "YYYY-MM-DD" format
  };

  // useEffect runs only once on mount
  useEffect(() => {
    fetchUser(); // Fetch user details on mount
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = schema.validate(
      { name, gender, collegeName, dob },
      { abortEarly: false }
    );

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      setSnackbar({ open: true, message: errorMessages, severity: "error" });
      setLoading(false);
      return;
    }

    try {
      console.log(sessionemail);
      const response = await axios.post(
        "http://localhost:5000/api/info/update-info",
        { sessionemail, name, phone, gender, collegeName, dob },
        { withCredentials: true }
      );

      setSnackbar({ open: true, message: response.data.message, severity: "success" });
      //onUpdateInfo();
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred while updating.";
      console.log(err);
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="personal-information mt-8 z-0">
      <h3 className="text-lg font-semibold text-gray-100">Update Personal Information</h3>
      <div className="mb-4">
        <label className="block text-gray-400">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300 cursor-not-allowed"
          value={userDetail?.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">Phone Number</label>
        <input
          type="text"
          placeholder="Enter your phone number"
          className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300 cursor-not-allowed"
          value={userDetail?.phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center text-gray-400">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-3"
            />
            Male
          </label>
          <label className="flex items-center text-gray-400">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-3"
            />
            Female
          </label>
          <label className="flex items-center text-gray-400">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-3"
            />
            Other
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">College Name</label>
        <input
          type="text"
          placeholder="Enter your college name"
          className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
          value={userDetail?.collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">Date of Birth</label>
        <input
          type="date"
          className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
          value={formatDate(userDetail?.dob)} // Format the dob before displaying
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};



const PasswordUpdate = ({  onChangePassword, onCancel }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false); // Loading state

  const schema = Joi.object({
    currentPassword: Joi.string().required().messages({
      'string.empty': 'Current password cannot be empty.',
    }),
    newPassword: Joi.string()
      .min(8)
      .pattern(/[\W_]/) // Ensures at least one special character
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base': 'Password must include at least one special character.',
        'string.empty': 'New password cannot be empty.',
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': 'Passwords do not match.',
        'string.empty': 'Confirm password cannot be empty.',
      }),
  });

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = schema.validate(
      { currentPassword, newPassword, confirmPassword },
      { abortEarly: false }
    );

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(', ');
      setSnackbar({ open: true, message: errorMessages, severity: 'error' });
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/update-password',
        { sessionemail, currentPassword, newPassword }, // Include sessionemail in the payload
        { withCredentials: true }
      );

      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      onChangePassword();
    } catch (err) {
      const status = err.response?.status;
  const errorMessage =
    status === 400 && err.response?.data?.error === 'Current password is incorrect.'
      ? 'Current password is incorrect.'
      : status === 401
      ? 'Unauthorized. Please log in again.'
      : err.response?.data?.error || 'An error occurred';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="password-update mt-8 z-0">
      <h3 className="text-lg font-semibold text-gray-100">Change Password</h3>
      <div className="mb-4">
        <label className="block text-gray-400">Current Password</label>
        <input
          type="password"
          placeholder="Enter current password"
          className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full sm:w-96 p-2 mt-2 rounded bg-gray-700 text-gray-300"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto`}
        >
          {loading ? 'Saving...' : 'Save New Password'}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '', severity: '' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: '', severity: '' })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};




const ProfileInformation = ({ user, onSave, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(file.type)
    ) {
      if (file.size <= 1048576) {
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
          <h3 className="text-lg font-semibold text-gray-100">{sessionname}</h3>
          <p className="text-gray-400">{sessionemail}</p>
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
                onClick={() => setIsModalOpen(false)} 
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
  const [skills, setSkills] = useState([]); // Initialize as empty array
  const [newSkill, setNewSkill] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const skillSchema = Joi.string()
  .pattern(/^[A-Za-z][A-Za-z0-9\s!@#$%^&*(),.?":{}|<>_\-+]*$/) // Updated to allow plus (+) and hyphen (-) and other special characters
  .required()
  .messages({
    "string.empty": "Skill cannot be empty.",
    "any.required": "Skill is required.",
    "string.pattern.base": "Skill must start with a letter and can contain letters, numbers, and special characters like !@#$%^&*()."
  });


  // Show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar({ open: false, message: "", severity: "" }), 3000);
  };

  // Fetch User and Skills on Component Mount
  const fetchUser = async () => {
    try {
      const isLogged = true; // Replace with your actual logic for checking login status
      if (isLogged) {
        const res = await axios.get(
          "http://localhost:5000/api/protected/fetchuserdetail",
          {
            withCredentials: true,
          }
        );
        // Ensure 'skills' is always an array to prevent undefined errors
        setSkills(res.data.skills || []); // Fallback to empty array if no skills
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setSkills([]); // Fallback to empty array in case of error
    }
  };

  // useEffect runs only once on mount
  useEffect(() => {
    fetchUser(); // Fetch user details and skills on mount
  }, []);

  // Add Skill
  const addSkill = async () => {
    const skillToAdd = newSkill.trim().toLowerCase(); // Convert the skill to lowercase

    const { error } = skillSchema.validate(skillToAdd);

    if (error) {
      showSnackbar(error.message, "error");
      return;
    }

    // Check if the skill already exists (case-insensitive check)
    if (skills.map(skill => skill.toLowerCase()).includes(skillToAdd)) {
      showSnackbar("Skill already exists.", "error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/skills/add-skill", {
        sessionemail,
        skill: skillToAdd,
      });
      setSkills(response.data.skills);
      setNewSkill("");
      showSnackbar("Skill added successfully!", "success");
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to add skill.", "error");
    }
  };

  // Remove Skill
  const removeSkill = async (skill) => {
    try {
      const response = await axios.post("http://localhost:5000/api/skills/remove-skill", {
        sessionemail,
        skill,
      });
      setSkills(response.data.skills);
      showSnackbar("Skill removed successfully.", "success");
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to remove skill.", "error");
    }
  };

  return (
    <div className="pb-10">
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6 pb-8"
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
                <span className="text-white">{skill.toUpperCase()}</span> {/* Convert to uppercase for display */}
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



const Address = () => {
  const [line1, setLine1] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const addressSchema = Joi.object({
    line1: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Address Line 1 cannot be empty.",
      "any.required": "Address Line 1 is required.",
      "string.min": "Address Line 1 must be at least 3 characters long.",
    }),
    state: Joi.string().valid(...states).required().messages({
      "any.only": "Please select a valid state.",
      "any.required": "State is required.",
    }),
    city: Joi.string().regex(/^[A-Za-z\s]+$/).min(3).required().messages({
      "string.pattern.base": "City name must contain only alphabets.",
      "string.empty": "City cannot be empty.",
      "any.required": "City is required.",
      "string.min": "City name must be at least 3 characters long.",
    }),
    pincode: Joi.string().length(6).pattern(/^\d+$/).required().messages({
      "string.length": "Pincode must have 6 digits.",
      "string.pattern.base": "Pincode must contain only numbers.",
      "any.required": "Pincode is required.",
    }),
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar({ open: false, message: "", severity: "" }), 3000);
  };

  // Fetch user details
  const fetchUser = async () => {
    try {
      const isLogged = true; // Replace with actual logic to check login status
      if (isLogged) {
        const res = await axios.get(
          "http://localhost:5000/api/protected/fetchuserdetail",
          { withCredentials: true }
        );
        const { address } = res.data;
        setLine1(address.line1 || "");
        setState(address.state || "");
        setCity(address.city || "");
        setPincode(address.pincode || "");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Save address to backend
  const handleSubmit = async () => {
    const { error } = addressSchema.validate({ line1, state, city, pincode });
    if (error) {
      showSnackbar(error.message, "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/address", // Endpoint for updating address
        { sessionemail, line1, state, city, pincode}, // Replace with session email
        { withCredentials: true }
      );

      if (response.status === 200) {
        showSnackbar(response.data.message, "success");
      } else {
        showSnackbar(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      showSnackbar(error.response?.data?.message || "Error updating address.", "error");
    }
  };

  return (
    <div className="pb-10">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6 pb-8">
        <h2 className="text-2xl font-bold text-white flex items-center">Address Information</h2>

        {/* Address Line 1 */}
        <div className="flex flex-col">
          <label className="text-white">Address Line 1</label>
          <input
            type="text"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            className="p-2 w-full rounded-md text-gray-900"
            placeholder="Enter address line 1"
          />
        </div>

        {/* Country (India, non-editable) */}
        <div className="flex flex-col mt-4">
          <label className="text-white">Country</label>
          <input
            type="text"
            value="India"
            readOnly
            className="p-2 w-full rounded-md text-gray-900 bg-gray-300 cursor-not-allowed"
          />
        </div>

        {/* State Dropdown */}
        <div className="flex flex-col mt-4">
          <label className="text-white">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="p-2 w-full rounded-md text-gray-900"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City Input */}
        <div className="flex flex-col mt-4">
          <label className="text-white">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 w-full rounded-md text-gray-900"
            placeholder="Enter city"
          />
        </div>

        {/* Pincode Input */}
        <div className="flex flex-col mt-4">
          <label className="text-white">Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="p-2 w-full rounded-md text-gray-900"
            placeholder="Enter pincode"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};




const DangerZone = () => {
  const [showConfirm, setShowConfirm] = useState(false); 
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [sessionEmail, setSessionEmail] = useState(localStorage.getItem('sessionEmail')); // Assuming you store session email in localStorage

  const handleDeleteAccount = async (confirm) => {
    if (confirm) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/account/delete",
          { sessionemail}, // Replace with session email
        { withCredentials: true }
        );
        setSnackbar({ open: true, message: response.data.message, severity: "success" });
      } catch (error) {
        setSnackbar({ open: true, message: error.response.data.message || "Error deleting account.", severity: "error" });
      }
    } else {
      setSnackbar({ open: true, message: "Account deletion canceled.", severity: "info" });
    }
    setShowConfirm(false); 
  };

  return (
    <motion.div
      className="bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <Trash2 className="text-red-400 mr-3" size={24} />
        <h2 className="text-xl font-semibold text-gray-100">Delete Account</h2>
      </div>
      <p className="text-gray-300 mb-4">
        Permanently delete your account and all of your content.
      </p>

      {/* Button to trigger the confirmation modal */}
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Delete Account
      </button>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
          }
        }}
      >
        <DialogTitle className="text-center text-xl text-gray-700">Confirm Account Deletion</DialogTitle>
        <DialogContent className="text-center">
          <p className="text-gray-700 mb-4">
            Are you sure you want to permanently delete your account? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions className="flex justify-center space-x-4 pb-4">
          <Button
            onClick={() => handleDeleteAccount(true)}
            color="primary"
            variant="outlined"
            className="px-6 py-2"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleDeleteAccount(false)}
            color="secondary"
            variant="contained"
            className="px-6 py-2"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};


const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  

  const [userDetail, setUserDetail] = useState(null);
  const fetchUser = async () => {
    try {
      const isLogged = true; // Replace with your actual logic for checking login status
      if (isLogged) {
        const res = await axios.get(
          "http://localhost:5000/api/protected/fetchuserdetail",
          {
            withCredentials: true,
          }
        );
        setUserDetail(res.data.user);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  // useEffect runs only once on mount
  useEffect(() => {
    fetchUser(); // Fetch user details on mount
  }, []);

  sessionemail = userDetail?.email || 'no email';
  sessionname = userDetail?.name || 'no name';
  sessionphone = userDetail?.phone || 'no phone';


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
              user={sessionemail}
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

          <SettingSection icon={User} title="Personal information">
          <PersonalInformation 
            defaultName={sessionname}
            defaultPhone={sessionphone}
            onSave={(data) => console.log('Saved Data:', data)} 
          />
          </SettingSection>
          <SkillInput />
          <Address />
          <DangerZone />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../../../components/common/Header";
import Sidebar from "../../../components/common/Sidebar";
import {
  Home,
  Book,
  FileSignature,
  Library,
  Settings,
  LightbulbIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../../components/common/Footer";

const AddLearningPathPage = () => {
  const SIDEBAR_ITEMS = [
    { name: "Home", icon: Home, color: "#6366f1", href: "/" },
    { name: "My Courses", icon: Book, color: "#8B5CF6", href: "/courses" },
    {
      name: "Learning Path",
      icon: LightbulbIcon,
      color: "#EC4899",
      href: "/addlearningpath",
    },
    { name: "Quiz", icon: FileSignature, color: "#10B981", href: "/quiz" },
    {
      name: "Content Library",
      icon: Library,
      color: "#FF5722",
      href: "/contentlibrary",
    },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
  ];

  const [formData, setFormData] = useState({
    courseName: "",
    courseOverview: "",
    enrollmentType: "Self Enroll",
    canUnenroll: false,
  });
  const [benefits, setBenefits] = useState([""]);
  const [tags, setTags] = useState([""]);

  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();
  // Benefits management
  const addBenefit = () => {
    if (benefits.length < 10) setBenefits([...benefits, ""]);
    else alert("You can only add up to 10 benefits.");
  };

  const removeBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const updateBenefit = (index, value) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    setBenefits(updatedBenefits);
  };

  // Tags management
  const addTag = () => {
    if (tags.length < 10) setTags([...tags, ""]);
    else alert("You can only add up to 10 tags.");
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const updateTag = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  // Dropzone Handlers
  const handleDropzoneOpen = () => setIsDropzoneOpen(true);
  const handleDropzoneClose = () => setIsDropzoneOpen(false);

  const handleImageDrop = (acceptedFiles) => {
    setUploadedImage(acceptedFiles[0]);
    console.log("Uploaded image:", acceptedFiles[0]);
    setIsDropzoneOpen(false); // Close the modal
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleImageDrop,
  });

  const handleSave = () => {
navigate('add-course')
  };

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} collapsed={false} />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Learning Path" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="p-8 bg-gray-700 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Add New Learning Path</h1>

            <div className="space-y-6">
              {/* Course Name */}
              <div>
                <label className="block mb-2 font-medium">
                  Learning Path Name*
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={(e) =>
                    setFormData({ ...formData, courseName: e.target.value })
                  }
                  placeholder="Enter Course Name"
                  className="w-full px-4 py-2 rounded bg-gray-600 text-white"
                />
              </div>

              {/* Course Overview */}
              <div>
                <label className="block mb-2 font-medium">Path Overview</label>
                <textarea
                  name="courseOverview"
                  value={formData.courseOverview}
                  onChange={(e) =>
                    setFormData({ ...formData, courseOverview: e.target.value })
                  }
                  rows="4"
                  placeholder="Enter Course Overview"
                  className="w-full px-4 py-2 rounded bg-gray-600 text-white"
                ></textarea>
              </div>

              {/* Benefits */}
              <div>
                <label className="block mb-2 font-semibold">
                  Benefits of Learning
                </label>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    />
                    <button
                      onClick={() => removeBenefit(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={addBenefit}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add Benefit
                </button>
              </div>

              {/* Tags */}
              <div>
                <label className="block mb-2 font-semibold">Tags</label>
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    />
                    <button
                      onClick={() => removeTag(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={addTag}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add Tag
                </button>
              </div>

              {/* Dropzone Trigger */}
              <div>
                <label className="block mb-2 font-medium">Cover Image</label>
                <button
                  onClick={handleDropzoneOpen}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Upload Cover Image
                </button>
                {uploadedImage && (
                  <div className="mt-2">
                    <p className="text-sm">
                      Uploaded File: {uploadedImage.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end items-center gap-4 mt-6">
                <button
                  className="px-4 py-2 rounded bg-gray-600"
                  onClick={() => alert("Form canceled.")}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                  onClick={handleSave}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <Footer/>
        </main>
      </div>

      {/* Dropzone Modal */}
      {isDropzoneOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleDropzoneClose}
        >
          <div
            className="bg-white p-6 rounded shadow-lg max-w-md w-full text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Upload Cover Image</h2>
            <div
              {...getRootProps({
                className:
                  "border-dashed border-2 border-gray-300 p-4 text-center rounded cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select a file</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLearningPathPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const AddWeeksAndVideos = () => {
  const navigate = useNavigate();

  const [weeks, setWeeks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState({
    weekTitle: '',
    videos: [],
  });

  const [videoDetails, setVideoDetails] = useState({
    title: '',
    thumbnail: null,
    video: null,
    resource: null,
  });

  const [showThumbnailModal, setShowThumbnailModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);

  const onDropThumbnail = (acceptedFiles) => {
    setVideoDetails((prev) => ({ ...prev, thumbnail: acceptedFiles[0] }));
    setShowThumbnailModal(false);
  };

  const onDropVideo = (acceptedFiles) => {
    setVideoDetails((prev) => ({ ...prev, video: acceptedFiles[0] }));
    setShowVideoModal(false);
  };

  const onDropResource = (acceptedFiles) => {
    setVideoDetails((prev) => ({ ...prev, resource: acceptedFiles[0] }));
    setShowResourceModal(false);
  };

  const handleAddVideo = () => {
    if (!videoDetails.title || !videoDetails.video) {
      alert('Video title and video file are required!');
      return;
    }
    setCurrentWeek((prev) => ({
      ...prev,
      videos: [...prev.videos, videoDetails],
    }));
    setVideoDetails({ title: '', thumbnail: null, video: null, resource: null });
  };

  const handleAddWeek = () => {
    if (!currentWeek.weekTitle) {
      alert('Week title is required!');
      return;
    }
    setWeeks([...weeks, currentWeek]);
    setCurrentWeek({ weekTitle: '', videos: [] });
  };

  const handleDeleteWeek = (index) => {
    setWeeks(weeks.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (weekIndex, videoIndex) => {
    setWeeks((prev) =>
      prev.map((week, i) =>
        i === weekIndex
          ? {
              ...week,
              videos: week.videos.filter((_, j) => j !== videoIndex),
            }
          : week
      )
    );
  };

  const handleNext = () => {
    navigate('/add-quizzes');
  };

  const handleBack = () => {
    navigate('/');
  };

  // Dropzone hooks
  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({
    onDrop: onDropThumbnail,
    accept: 'image/*',
    multiple: false,
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    onDrop: onDropVideo,
    accept: 'video/*',
    multiple: false,
  });

  const { getRootProps: getResourceRootProps, getInputProps: getResourceInputProps } = useDropzone({
    onDrop: onDropResource,
    accept: '*/*',
    multiple: false,
  });

  // Modal Component
  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            X
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto p-6 shadow-md bg-gray-800 rounded-lg"
    >
      <h1 className="text-2xl font-semibold text-center mb-4 text-white">Add Weeks and Videos</h1>

      {/* Add Week Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Week Title</label>
        <input
          type="text"
          placeholder="Enter Week Title"
          value={currentWeek.weekTitle}
          onChange={(e) =>
            setCurrentWeek((prev) => ({ ...prev, weekTitle: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {/* Add Video Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-300 mb-4">Add Video</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Video Title"
            value={videoDetails.title}
            onChange={(e) =>
              setVideoDetails((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />

          <button
            type="button"
            onClick={handleAddVideo}
            className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
          >
            <PlusCircle className="w-5 h-5 inline-block mr-2" />
            Add Video
          </button>

          {/* Modal triggers for Dropzone */}
          <button
            onClick={() => setShowThumbnailModal(true)}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
          >
            Upload Thumbnail
          </button>
          <button
            onClick={() => setShowVideoModal(true)}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
          >
            Upload Video
          </button>
          <button
            onClick={() => setShowResourceModal(true)}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
          >
            Upload Resource
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddWeek}
        className="w-full mb-6 px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none"
      >
        Add Week
      </button>

      {/* Display Weeks */}
      <div className="space-y-6">
        {weeks.map((week, i) => (
          <div key={i} className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white">{week.weekTitle}</h3>
            <ul className="space-y-2 mt-2">
              {week.videos.map((video, j) => (
                <li
                  key={j}
                  className="flex justify-between items-center px-3 py-2 bg-gray-600 rounded-md text-white"
                >
                  <span>{video.title}</span>
                  <button
                    onClick={() => handleDeleteVideo(i, j)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDeleteWeek(i)}
              className="mt-4 px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 focus:outline-none"
            >
              Delete Week
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Thumbnail */}
      <Modal show={showThumbnailModal} onClose={() => setShowThumbnailModal(false)}>
        <h2 className="text-xl font-medium text-center mb-4 text-black">Upload Thumbnail</h2>
        <div
          {...getThumbnailRootProps()}
          className="border-4 border-dashed border-gray-500 p-6 rounded-md relative z-10"
        >
          <input {...getThumbnailInputProps()} className="sr-only" />
          <p className="text-center text-black">Drag & drop a thumbnail or click to select files</p>
        </div>
      </Modal>

      {/* Modal for Video */}
      <Modal show={showVideoModal} onClose={() => setShowVideoModal(false)}>
        <h2 className="text-xl font-medium text-center mb-4 text-black">Upload Video</h2>
        <div
          {...getVideoRootProps()}
          className="border-4 border-dashed border-gray-500 p-6 rounded-md relative z-10"
        >
          <input {...getVideoInputProps()} className="sr-only" />
          <p className="text-center text-black">Drag & drop a video or click to select files</p>
        </div>
      </Modal>

      {/* Modal for Resource */}
      <Modal show={showResourceModal} onClose={() => setShowResourceModal(false)}>
        <h2 className="text-xl font-medium text-center mb-4 text-black">Upload Resource</h2>
        <div
          {...getResourceRootProps()}
          className="border-4 border-dashed border-gray-500 p-6 rounded-md relative z-10"
        >
          <input {...getResourceInputProps()} className="sr-only" />
          <p className="text-center text-black">Drag & drop a resource or click to select files</p>
        </div>
      </Modal>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="w-32 py-2 px-4 bg-gray-500 text-white font-medium rounded-md shadow hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="w-32 py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default AddWeeksAndVideos;

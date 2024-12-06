import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize2,
  Minimize2,
  Clock,
  Rewind,
  FastForward,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Flag,
  ChevronDown,
  ChevronUp,
  BookmarkPlus,
  Lock,
  CheckCircle2,
  FileText,
  Video,
  Paperclip,
  Loader2,
  AlertTriangle,
  Download,
  ExternalLink,
  Star,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";

const BibliographySection = () => {
  // Sample data for references (displaying only one reference)
  const reference = {
    title: "Artificial Intelligence: A Modern Approach",
    authors: "Stuart J. Russell, Peter Norvig",
    publicationDate: "4th Edition, 2021",
    sourceType: "Book",
    accessLink:
      "https://www.amazon.com/Artificial-Intelligence-Modern-Approach-4th/dp/0134610997",
    description:
      "This book is widely used in AI courses and serves as a foundational text for understanding AI principles.",
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg mt-6">
      {/* Bibliography Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          Bibliography and References
        </h2>

        <div className="border-b border-gray-600 pb-4">
          <h3 className="text-lg font-semibold text-blue-500">
            {reference.title}
          </h3>
          <p className="text-gray-400">Author(s): {reference.authors}</p>
          <p className="text-gray-400">
            Publication Date: {reference.publicationDate}
          </p>
          <p className="text-gray-400">Source Type: {reference.sourceType}</p>
          <p className="text-gray-300 mb-2">{reference.description}</p>
          <a
            href={reference.accessLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 flex items-center gap-2 hover:text-blue-700"
          >
            <ExternalLink size={16} />
            Read Here
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const FeedbackComponent = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState([]);
  const [comment, setComment] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const feedbackTypes = [
    "Content clarity",
    "Audio/visual quality",
    "Relevance to topic",
    "Pacing of the video",
  ];

  const tags = ["Poor audio", "Blurry video", "Too fast", "Too slow"];

  const handleRating = (value) => {
    setRating(value);
  };

  const toggleFeedbackType = (type) => {
    setFeedbackType((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleSubmitFeedback = () => {
    console.log({
      rating,
      feedbackType,
      comment,
      timeStamp,
      isAnonymous,
    });
    setIsFeedbackOpen(false);
    setRating(0);
    setFeedbackType([]);
    setComment("");
    setTimeStamp("");
    setIsAnonymous(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#1A202C", // gray-900
        color: "#FFFFFF", // white text
        borderRadius: "8px",
      }}
    >
      <motion.button
        onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
        whileHover={{ scale: 1.1 }}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isFeedbackOpen ? "Close Feedback" : "Give Feedback"}
      </motion.button>

      {isFeedbackOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#2D3748", // gray-800
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Was this video helpful?</h3>

          {/* Rating Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                color={rating >= star ? "#FFD700" : "#718096"} // yellow or gray-600
                onClick={() => handleRating(star)}
                style={{ cursor: "pointer", marginRight: "5px" }}
              />
            ))}
            <span style={{ marginLeft: "10px" }}>{rating} / 5</span>
          </div>

          {/* Categorized Feedback */}
          <div>
            <h4>Feedback Categories:</h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              {feedbackTypes.map((type) => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFeedbackType(type)}
                  style={{
                    padding: "5px 10px",
                    border: feedbackType.includes(type)
                      ? "2px solid #4CAF50"
                      : "1px solid #718096", // gray-600 border
                    borderRadius: "5px",
                    backgroundColor: feedbackType.includes(type)
                      ? "#4CAF50"
                      : "#1A202C",
                    color: feedbackType.includes(type) ? "#FFFFFF" : "#A0AEC0", // gray-400 text
                    cursor: "pointer",
                  }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tagging System */}
          <div>
            <h4>Tags for Specific Issues:</h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    border: "1px solid #718096", // gray-600
                    borderRadius: "5px",
                    backgroundColor: "#2D3748", // gray-800
                    color: "#A0AEC0", // gray-400 text
                    cursor: "pointer",
                  }}
                >
                  <Tag size={14} style={{ marginRight: "5px" }} />
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <h4>Additional Comments:</h4>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
              rows={4}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #718096", // gray-600 border
                backgroundColor: "#2D3748", // gray-800
                color: "#FFFFFF", // white text
                marginBottom: "15px",
              }}
            ></textarea>
          </div>

          {/* Timestamp Section */}
          <div>
            <h4>Timestamp:</h4>
            <input
              type="text"
              value={timeStamp}
              onChange={(e) => setTimeStamp(e.target.value)}
              placeholder="E.g., 2:15"
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                border: "1px solid #718096", // gray-600 border
                backgroundColor: "#2D3748", // gray-800
                color: "#FFFFFF", // white text
                width: "100%",
                marginBottom: "15px",
              }}
            />
          </div>

          {/* Anonymous Feedback */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              style={{ marginRight: "10px" }}
            />
            <label>Submit feedback anonymously</label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSubmitFeedback}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Feedback
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

// Simulated API Service
const ResourceService = {
  async getResources(filters = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const mockResources = [
            {
              week: 1,
              resources: [
                {
                  id: "doc1",
                  title: "HTML5 Reference Guide",
                  type: "doc",
                  size: "2 MB",
                  uploadDate: "2024-02-02",
                  url: "/mock-resources/html-guide.docx",
                  description: "A detailed reference guide for HTML5",
                },
                {
                  id: "ppt1",
                  title: "CSS Basics Presentation",
                  type: "ppt",
                  size: "5 MB",
                  uploadDate: "2024-02-03",
                  url: "/mock-resources/css-basics.pptx",
                  description: "CSS basics explained in slides",
                },
              ],
            },
            {
              week: 2,
              resources: [
                {
                  id: "pdf1",
                  title: "JavaScript Fundamentals",
                  type: "pdf",
                  size: "1 MB",
                  uploadDate: "2024-02-10",
                  url: "/mock-resources/js-fundamentals.pdf",
                  description: "A comprehensive guide to JavaScript basics",
                },
              ],
            },
          ];

          // Apply filters if needed
          const filteredResources = mockResources.flatMap(
            (week) => week.resources
          );
          resolve(filteredResources);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  },
};

const ResourcesComponent = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedResources = await ResourceService.getResources();
        setResources(fetchedResources);
      } catch (err) {
        setError("Failed to load resources. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-800 text-white">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800 text-white">
        <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
        <p className="text-lg">{error}</p>
        <button
          onClick={() => setResources([])}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-6 h-6 text-red-500" />;
      case "doc":
      case "pdf":
      case "ppt":
        return <FileText className="w-6 h-6 text-green-500" />;
      default:
        return <Paperclip className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
          <div style={{ height: "40vh", width: "100%" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl="http://localhost:5000/api/course/media/674ec7858a1eb4586fbf98a5"
                plugins={[defaultLayoutPluginInstance]}
                defaultScale={SpecialZoomLevel.PageWidth} // Fit the width of the container
              />
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseContentComponent = ({ course, onVideoSelect }) => {
  const [openWeeks, setOpenWeeks] = useState([0]); // First week open by default

  const toggleWeek = (weekIndex) => {
    setOpenWeeks((prev) =>
      prev.includes(weekIndex)
        ? prev.filter((w) => w !== weekIndex)
        : [...prev, weekIndex]
    );
  };

  const renderVideoIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="text-green-500 w-5 h-5" />;
      case "locked":
        return <Lock className="text-gray-400 w-5 h-5" />;
      case "completed":
        return <CheckCircle2 className="text-blue-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  if (!course || !course.weeks || !Array.isArray(course.weeks)) {
    return <p className="text-white">No course data available</p>;
  }
  return (
    <div className="bg-gray-700 text-white rounded-lg shadow-md p-6 overflow-hidden max-h-screen">
      {" "}
      {/* Added max-h-screen here to limit height */}
      <h2 className="text-2xl font-bold mb-6">{course.title}</h2>
      {course?.weeks.map((week, weekIndex) => (
        <div
          key={week._id?.$oid || weekIndex}
          className="mb-4 border-b border-gray-500 pb-4"
        >
          <button
            onClick={() => toggleWeek(weekIndex)}
            className="flex justify-between items-center w-full"
          >
            <div>
              <h3 className="text-lg font-semibold">
                Week {week.weekNumber}: {week.weekTitle}
              </h3>
              <span className="text-sm text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {week.totalDuration}
              </span>
            </div>
            {openWeeks.includes(weekIndex) ? (
              <ChevronUp className="w-6 h-6 text-gray-300" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-300" />
            )}
          </button>

          {openWeeks.includes(weekIndex) && (
            <div className="mt-4 space-y-4">
              {week.videos.map((video, videoIndex) => (
                <div
                  key={video._id?.$oid || videoIndex}
                  onClick={() => {
                    console.log(video.video, video.thumbnail);
                    onVideoSelect({
                      title: video.title,
                      description: video.description,
                      instructor: "", // Replace with real instructor data if available
                      uploadDate: course.createdAt,
                      thumbnail: `http://localhost:5000/api/course/media/${video.thumbnail}`,
                      video: `http://localhost:5000/api/course/media/${video.video}`,
                      resource: `http://localhost:5000/api/course/media/${video.resource}`,
                      views: 1000 * (videoIndex + 1), // Replace with real view count
                      likes: 10 * (videoIndex + 1), // Replace with real likes count
                    });
                  }}
                  className="flex justify-between items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 shadow-lg transition-all duration-200"
                >
                  {/* Left Section: Icon and Title */}
                  <div className="flex items-center space-x-4">
                    {renderVideoIcon("video")}
                    <span className="text-white text-base font-semibold">
                      {video.title}
                    </span>
                  </div>

                  {/* Right Section: Duration */}
                  <span className="text-blue-400 text-sm font-medium">
                    {video.duration} mins
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* Course Progress */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-white">Course Progress</h3>
          <span className="text-blue-400">35% Complete</span>
        </div>
        <div className="w-full bg-gray-500 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "35%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const VideoDescriptionComponent = ({
  title,
  instructor,
  uploadDate,
  thumbnail,
  views,
  likes,
  description,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(null);

  // Truncate description if too long
  const truncateDescription = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return isDescriptionExpanded ? text : `${text.slice(0, maxLength)}...`;
  };

  // Format view count
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Format upload date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      {/* Video Title */}
      <h1 className="text-xl font-bold mb-2">{title}</h1>

      {/* Video Metadata */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="text-gray-100 w-full sm:w-auto">
          <p>
            {formatViewCount(views)} • {formatDate(uploadDate)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <button
            className={`flex items-center space-x-1 ${
              isLiked === true ? "text-blue-600" : "text-gray-100"
            }`}
            onClick={() => setIsLiked(isLiked === true ? null : true)}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{likes}</span>
          </button>

          {/* Dislike Button */}
          <button
            className={`flex items-center space-x-1 ${
              isLiked === false ? "text-red-600" : "text-gray-100"
            }`}
            onClick={() => setIsLiked(isLiked === false ? null : false)}
          >
            <ThumbsDown className="w-5 h-5" />
          </button>

          {/* Share Button */}
          <button className="text-gray-100 hover:text-blue-600">
            <Share2 className="w-5 h-5" />
          </button>

          {/* Bookmark Button */}
          <button className="text-gray-100 hover:text-green-600">
            <BookmarkPlus className="w-5 h-5" />
          </button>

          {/* Report Button */}
          <button className="text-gray-100 hover:text-red-600">
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Instructor Information */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
        <div>
          <h2 className="font-semibold">{instructor}</h2>
          <p className="text-sm text-gray-100">Course Instructor</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-100">
          {truncateDescription(description)}
          {description.length > 200 && (
            <button
              className="text-blue-600 ml-2 flex items-center"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

const VideoPlayer = ({ thumbnail, video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true); // Controls visibility
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const changeVolume = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = volume;
  };

  const changePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseMove = () => {
    setShowControls(true); // Show controls on mouse move
    clearTimeout(timeoutRef.current); // Clear existing timeout
    timeoutRef.current = setTimeout(() => {
      setShowControls(false); // Hide controls after delay
    }, 3000); // Adjust delay as needed
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full h-80 bg-black rounded-lg overflow-hidden"
      style={{ height: "500px" }}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={thumbnail}
        onClick={togglePlayPause}
        src={video}
      ></video>

      {showControls && (
        <div className="absolute bottom-4 left-0 right-0 px-4 py-2 flex items-center justify-between bg-black bg-opacity-50">
          {/* Play/Pause Button */}
          <motion.div
            className="text-white cursor-pointer"
            onClick={togglePlayPause}
            whileTap={{ scale: 1.2 }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.div>

          {/* Volume Control */}
          <div className="flex items-center text-white">
            <motion.div
              className="cursor-pointer"
              onClick={toggleMute}
              whileTap={{ scale: 1.2 }}
            >
              {isMuted ? (
                <VolumeX size={24} />
              ) : volume > 0.5 ? (
                <Volume2 size={24} />
              ) : (
                <Volume1 size={24} />
              )}
            </motion.div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
              className="ml-2 w-20"
            />
          </div>

          {/* Playback Speed */}
          <motion.div
            className="text-white cursor-pointer"
            onClick={() =>
              changePlaybackSpeed(
                playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1
              )
            }
            whileTap={{ scale: 1.2 }}
          >
            <Clock size={24} />
            <span>{playbackSpeed}x</span>
          </motion.div>

          {/* Rewind and Fast Forward */}
          <div className="flex items-center text-white">
            <motion.div
              className="cursor-pointer"
              onClick={() => (videoRef.current.currentTime -= 10)}
              whileTap={{ scale: 1.2 }}
            >
              <Rewind size={24} />
            </motion.div>
            <motion.div
              className="cursor-pointer ml-4"
              onClick={() => (videoRef.current.currentTime += 10)}
              whileTap={{ scale: 1.2 }}
            >
              <FastForward size={24} />
            </motion.div>
          </div>

          {/* Fullscreen Button */}
          <motion.div
            className="text-white cursor-pointer"
            onClick={toggleFullscreen}
            whileTap={{ scale: 1.2 }}
          >
            {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </motion.div>
        </div>
      )}
    </div>
  );
};

const OverviewPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || "");
  const [course, setCourse] = useState(null);
  const [instructorName, setInstructorName] = useState("");
  const [isbibilography, setisbibilography] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({
    title: "Loading...",
    instructor: "Loading...",
    uploadDate: "",
    views: 0,
    likes: 0,
    description: "Loading description...",
    thumbnail: "/path/to/placeholder-thumbnail.jpg",
    video: "",
    resource: "",
  });

  useEffect(() => {
    const fetchInstructorName = async () => {
      try {
        if (course?.userId) {
          const response = await axios.get(
            `http://localhost:5000/api/protected/username/${course.userId}`,
            {
              withCredentials: true,
            }
          );
          setInstructorName(response.data.name || "Unknown");
        } else {
          console.warn("User ID is undefined. Skipping fetch.");
          setInstructorName("Unknown");
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
        setInstructorName("Unknown");
      }
    };

    fetchInstructorName();
  }, [course?.userId]);

  useEffect(() => {
    if (course?.weeks?.length > 0 && course.weeks[0].videos?.length > 0) {
      const firstVideo = course.weeks[0].videos[0];
      setSelectedVideo({
        title: firstVideo.title,
        description: firstVideo.description,
        instructor: instructorName,
        uploadDate: course.createdAt,
        thumbnail: `http://localhost:5000/api/course/media/${firstVideo.thumbnail}`,
        video: `http://localhost:5000/api/course/media/${firstVideo.video}`,
        resource: `http://localhost:5000/api/course/media/${firstVideo.resource}`,
        views: 1000,
        likes: 50,
      });
    }
  }, [course, instructorName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(
            `http://localhost:5000/api/course/courses/${query}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCourse(data);
          console.log(data);
        } else {
          console.warn("Query is undefined. Skipping fetch.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(
            `http://localhost:5000/api/course/courses/${query}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCourse(data);

          // Automatically select the first video of the first week
          if (data.weeks?.length > 0 && data.weeks[0].videos?.length > 0) {
            const firstVideo = data.weeks[0].videos[0];
            setSelectedVideo({
              title: firstVideo.title,
              description: firstVideo.description,
              instructor: instructorName, // Replace with actual instructor data if available
              uploadDate: data.createdAt, // Replace with actual data if available
              views: 1000, // Replace with real view count
              likes: 50, // Replace with real likes count
            });
          }
        } else {
          console.warn("Query is undefined. Skipping fetch.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [query]);
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

        <main className="flex-1 overflow-y-auto p-4">
          <div className="min-h-screen w-full overflow-y-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              <div className="col-span-1 lg:col-span-2 p-1">
                <div>
                  {selectedVideo.video ? (
                    <VideoPlayer
                      className="w-full h-full object-cover"
                      thumbnail={selectedVideo.thumbnail}
                      video={selectedVideo.video}
                    />
                  ) : (
                    <div className="flex justify-center items-center h-80 bg-gray-800">
                      <p className="text-gray-400">Loading video...</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 p-2 sm:p-2">
                  <VideoDescriptionComponent
                    title={selectedVideo.title}
                    instructor={instructorName}
                    uploadDate={selectedVideo.uploadDate}
                    views={selectedVideo.views}
                    likes={selectedVideo.likes}
                    thumbnail={selectedVideo.thumbnail}
                    video={selectedVideo.video}
                    resource={selectedVideo.resource}
                    description={selectedVideo.description}
                  />
                  <div className="mt-4">
                    <ResourcesComponent />
                  </div>
                </div>
              </div>

              {/* Right Column: Course Content */}
              <div className="col-span-1 p-1 ">
                <div className="overflow-y-auto">
                  <CourseContentComponent
                    course={course}
                    onVideoSelect={(video) => setSelectedVideo(video)}
                  />
                  <div className="mt-4" />
                  {isbibilography && <BibliographySection />}
                  <FeedbackComponent />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;

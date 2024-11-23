import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Stack,
  Menu,
  MenuItem,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SpeedIcon from "@mui/icons-material/Speed";

const App = () => {
  const [currentVideo, setCurrentVideo] = useState({
    title: "Introduction to AI Hardware",
    description: "This video provides an introduction to the components of AI hardware, including GPUs and CPUs.",
    videoUrl: "/A.mkv", // Assuming the file is in the public folder
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [videoStatus, setVideoStatus] = useState({});
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Default playback speed
  const [speedMenuAnchor, setSpeedMenuAnchor] = useState(null);
  const videoRef = useRef(null);
  const controlsTimeout = useRef(null);

  const courseContent = [
    {
      week: "Week 1",
      duration: "2 h 48 m 30 s",
      lectures: 5,
      topics: [
        {
          id: 1,
          title: "Introduction to AI Hardware",
          description: "This video provides an introduction to the components of AI hardware, including GPUs and CPUs.",
          videoUrl: "/A.mkv",
          duration: "10:15",
        },
        {
          id: 2,
          title: "Introduction to System Software",
          description: "Learn about system software and its role in AI systems.",
          videoUrl: "/A.mkv",
          duration: "12:30",
        },
      ],
    },
    {
      week: "Week 2",
      duration: "2 h 30 m 00 s",
      lectures: 4,
      topics: [
        {
          id: 3,
          title: "Introduction to Containers",
          description: "Explore the basics of containers and their use in AI development.",
          videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
          duration: "15:45",
        },
        {
          id: 4,
          title: "Kubernetes Deep Dive",
          description: "A deep dive into Kubernetes and orchestration tools for AI.",
          videoUrl: "https://www.youtube.com/watch?v=ZZ5LpwO-An4",
          duration: "14:20",
        },
      ],
    },
  ];

  const handleTopicClick = (topic) => {
    setCurrentVideo({
      title: topic.title,
      description: topic.description,
      videoUrl: topic.videoUrl,
    });
    setIsPlaying(false); // Pause the current video when switching
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset progress for new video
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (videoRef.current) {
      videoRef.current.volume = newValue / 100;
    }
  };

  const handleProgressUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);

      // Mark video as completed if it is finished
      if (progress >= 99) {
        const updatedStatus = { ...videoStatus, [currentVideo.title]: true };
        setVideoStatus(updatedStatus);
      }
    }
  };

  const handleProgressChange = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = (newValue / 100) * videoRef.current.duration;
      setProgress(newValue);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setSpeedMenuAnchor(null);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000); // Hide controls after 3 seconds of inactivity
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", margin: 0 }}>
      {/* Left: Video Player and Description */}
      <Box
        sx={{
          flex: 2,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        onMouseMove={handleMouseMove} // Detect mouse movement to show controls
      >
        <Box sx={{ width: "100%", mb: 3, position: "relative" }}>
          <video
            ref={videoRef}
            src={currentVideo.videoUrl}
            onTimeUpdate={handleProgressUpdate}
            preload="none"
            controlsList="nodownload" 
            poster="thumbnail.webp"
            style={{
              width: "100%",   
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          ></video>

          {/* Custom Controls */}
          {showControls && (
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                right: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
              }}
            >
              {/* Progress Bar */}
              <Slider
                value={progress}
                onChange={handleProgressChange}
                sx={{
                  width: "100%",
                  color: "#2196f3", // Blue Color
                  "& .MuiSlider-thumb": { backgroundColor: "#fff" },
                }}
              />
              {/* Controls */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%", mt: 1 }}>
                <IconButton onClick={togglePlayPause} sx={{ color: "white" }}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Stack direction="row" alignItems="center">
                  <IconButton sx={{ color: "white" }}>
                    {volume > 0 ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </IconButton>
                  <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    sx={{
                      width: 80,
                      color: "#2196f3", // Blue Color
                      "& .MuiSlider-thumb": { backgroundColor: "#fff" },
                    }}
                  />
                </Stack>
                <IconButton
                  onClick={(e) => setSpeedMenuAnchor(e.currentTarget)}
                  sx={{ color: "white" }}
                >
                  <SpeedIcon />
                </IconButton>
                <IconButton onClick={toggleFullScreen} sx={{ color: "white" }}>
                  <FullscreenIcon />
                </IconButton>
              </Stack>
            </Box>
          )}
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {currentVideo.title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontSize: "1.2rem" }}>
            {currentVideo.description}
          </Typography>
        </Box>
      </Box>

      {/* Playback Speed Menu */}
      <Menu
        anchorEl={speedMenuAnchor}
        open={Boolean(speedMenuAnchor)}
        onClose={() => setSpeedMenuAnchor(null)}
      >
        {[0.5, 1, 1.5, 2].map((speed) => (
          <MenuItem key={speed} onClick={() => handlePlaybackSpeedChange(speed)}>
            {speed}x
          </MenuItem>
        ))}
      </Menu>

      {/* Right: Fixed Scrollable Weekly Content */}
      <Box
        sx={{
          flex: 1,
          maxWidth: "400px",
          padding: "20px",
          borderLeft: "1px solid #ddd",
          position: "sticky",
          top: "10px",
          maxHeight: "calc(100vh - 20px)",
          overflowY: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Course Content
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {courseContent.map((week, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>{week.week}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {week.topics.map((topic, subIndex) => (
                <Box
                  key={subIndex}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handleTopicClick(topic)}
                >
                  {/* Completed Status */}
                  <Box sx={{ marginRight: "10px" }}>
                    {videoStatus[topic.title] ? (
                      <CheckCircleIcon sx={{ color: "#4caf50" }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: "#ccc" }} />
                    )}
                  </Box>
                  <Typography sx={{ color: "blue", textDecoration: "underline" }}>
                    {topic.title} <span style={{ color: "gray" }}>({topic.duration})</span>
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default App;

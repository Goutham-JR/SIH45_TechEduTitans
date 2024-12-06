// src/components/VideoPlayer.js

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize2, Minimize2, Clock, Rewind, FastForward, Type, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

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

  return (
    <div className="relative w-full h-80 bg-black rounded-lg overflow-hidden">
      <video ref={videoRef} className="w-full h-full" poster="your-poster-image.jpg" onClick={togglePlayPause}>
        <source src="your-video-file.mp4" type="video/mp4" />
      </video>

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
            {isMuted ? <VolumeX size={24} /> : volume > 0.5 ? <Volume2 size={24} /> : <Volume1 size={24} />}
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
          onClick={() => changePlaybackSpeed(playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1)}
          whileTap={{ scale: 1.2 }}
        >
          <Clock size={24} />
          <span>{playbackSpeed}x</span>
        </motion.div>

        {/* Rewind and Fast Forward */}
        <div className="flex items-center text-white">
          <motion.div
            className="cursor-pointer"
            onClick={() => videoRef.current.currentTime -= 10}
            whileTap={{ scale: 1.2 }}
          >
            <Rewind size={24} />
          </motion.div>
          <motion.div
            className="cursor-pointer ml-4"
            onClick={() => videoRef.current.currentTime += 10}
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
    </div>
  );
};

export default VideoPlayer;

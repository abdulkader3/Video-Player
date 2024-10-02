import React, { useRef, useState, useEffect } from "react";
import { BiSolidVolumeMute } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { RiFullscreenFill, RiFullscreenExitFill } from "react-icons/ri";



const VideoPlayer = () => {
  // Get data from Redux store
  

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPoster, setShowPoster] = useState(true); // State to manage poster visibility

  const togglePlayPause = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPoster(false); // Hide poster when video starts
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgress = () => {
    const progressValue =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progressValue);
  };

  const handleVolumeChange = (event) => {
    const volumeValue = event.target.value;
    videoRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(true); // Show poster again after the video ends
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleVideoError = () => {
    alert("An error occurred while loading the video. Please try again.");
  };

  return (
    <div className="video-container relative mx-auto">
      {showPoster && (
        <div className="poster-container absolute inset-0 flex items-center justify-center bg-black">
          <img
            src='https://64.media.tumblr.com/4efc9f53e0e397c4a0cde90cab16ccc9/5fc691b90541a3c2-ea/s640x960/a4a9178cf005b6b08375553b6e4f5186331ae979.gif' // Custom poster image URL
            alt="Custom Poster"
            className="w-full h-full object-cover"
          />
          <button
            onClick={togglePlayPause}
            className="play-button absolute bg-white text-black p-4 rounded-full"
          >
            <FaPlay className="text-3xl" />
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4" // Your video URL
        className="video-player"
        onTimeUpdate={handleProgress}
        onEnded={handleVideoEnd}
        onError={handleVideoError}
        onClick={togglePlayPause}  // Allow clicking on the video to play/pause it
      />

      <div className="controls flex justify-between items-center absolute bottom-0 left-0 w-full p-2">
        <button onClick={togglePlayPause} className="text-white px-2">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button onClick={toggleMute} className="text-white px-2">
          {isMuted ? <BiSolidVolumeMute /> : <GoUnmute />}
        </button>

        <input
          type="range"
          className="w-[150px] player-control mx-2"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
        />

        <label className="slider">
          <input
            type="range"
            className="level"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
          <svg
            className="volume"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
                fill="currentColor"
              />
              <path
                d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
                fill="currentColor"
              />
            </g>
          </svg>
        </label>

        <button onClick={handleFullscreenToggle} className="text-white px-2">
          {isFullscreen ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

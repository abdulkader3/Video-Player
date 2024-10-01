import React, { useRef, useState } from "react";
import { BiSolidVolumeMute } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { RiFullscreenFill } from "react-icons/ri";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
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
  };

  return (
    <div className="video-container relative mx-auto">
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        className="video-player"
        onTimeUpdate={handleProgress}
        onEnded={handleVideoEnd}
      />

      <div className="controls flex justify-between items-center absolute bottom-0 left-0 w-full p-2">
        {/* Play/Pause Button */}
        <button onClick={togglePlayPause} className="text-white px-2">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Mute/Unmute Button */}
        <button onClick={toggleMute} className="text-white px-2">
          {isMuted ? <BiSolidVolumeMute /> : <GoUnmute />}
        </button>

        {/* Progress Bar */}
        <input
          type="range"
          className="w-[150px] player-control mx-2"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
        />

        {/* Volume Control with Custom Design */}
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

        {/* Fullscreen Button */}
        <button
          onClick={() => videoRef.current.requestFullscreen()}
          className="text-white px-2"
        >
          <RiFullscreenFill />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

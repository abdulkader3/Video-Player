import React from 'react';
import VideoPlayer from '../video player/VideoPlayer';

const Home = () => {
  return (
    <div className="h-screen w-full bg-gray-800 flex items-center justify-center">
      <div className="flex items-center justify-center">
        <VideoPlayer />
      </div>
    </div>
  );
};

export default Home;

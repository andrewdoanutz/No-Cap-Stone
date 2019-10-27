import React, { Component } from 'react'
import VideoChat from './VideoChat';

const VideoComponent = () => {
  return (
    <div className="app">
      <header>
        <h1>Meeting</h1>
      </header>
      <main>
        <VideoChat />
      </main>
    </div>
  );
};

export default VideoComponent;

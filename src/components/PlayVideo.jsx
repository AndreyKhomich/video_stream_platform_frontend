import React from 'react';
import Header from './Header';
import VideoPlayer from './VideoPlayer';
import VideoDetails from './VideoDetails';
import Publisher from './Publisher';
import VideoDescription from './VideoDescription';
import RightSidebar from './RightSidebar';

function PlayVideo() {
  return (
    <div className="play-video-page">
      <Header />
      <div className="container play-container">
        <VideoPlayer />
        <VideoDetails />
        <Publisher />
        <VideoDescription />
        <RightSidebar />
      </div>
    </div>
  );
}

export default PlayVideo;
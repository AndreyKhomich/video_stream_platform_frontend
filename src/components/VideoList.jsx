import React from "react";
import thumbnail from "../images/thumbnail1.png";
import VideoInfo from "./VideoInfo";

function VideoList({ videos }) {
  return (
    <div className="list-container">
      {videos.map((video) => (
        <div key={video.id} className="vid-list">
          <video className="video" src={video.url}
          controls 
          // poster={video.thumbnail_url}
          loop
          preload="auto"></video>
          <VideoInfo videoName={video.title} videoViews={video.view_count}/>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
import React from "react";
import subscriber from "../images/Jack.png";
import "../css/videopage.css";

function VideoInfo({ videoViews, isVideoPage, video }) {
  if (isVideoPage) {
    return (
      <div className="vid-info">
        <p className="vid-title">{video.title}</p>
        <p>{video.channel.name}</p>

      </div>
    );
  } else {
    return (
      <div className="flex-div">
        <img src={subscriber} alt="subscriber" />
        <div className="vid-info-main-page">
          <p className="main-vid-title">{video.title}</p>
          <p>{video.channel.name}</p>
          {videoViews && <p>{video.view_count} views &bull; 2 days</p>}
        </div>
      </div>
    );
  }
}

export default VideoInfo;
import React from "react";
import subscriber from "../images/Jack.png";

function VideoInfo({videoName, videoViews}) {
  return (
    <div className="flex-div">
      <img src={subscriber} alt="" />
      <div className="vid-info">
        <a href="play-video.html">{videoName}</a>
        <p>My channel</p>
        <p>{videoViews} views &bull; 2 days</p>
      </div>
    </div>
  );
}

export default VideoInfo;

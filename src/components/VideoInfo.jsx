import React from "react";
import subscriber from "../images/Jack.png";

function VideoInfo({videoName, videoViews, channelName}) {
  return (
    <div className="flex-div">
      <img src={subscriber} alt="subscriber" />
      <div className="vid-info">
        <a href="#">{videoName}</a>
        <p >{channelName}</p>
        <p>{videoViews} views &bull; 2 days</p>
      </div>
    </div>
  );
}

export default VideoInfo;

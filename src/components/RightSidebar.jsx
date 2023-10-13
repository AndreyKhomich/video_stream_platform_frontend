import React from 'react';
import video from "../images/thumbnail1.png";

function RightSidebar() {
  return (
    <div className="side-video-list">
    <a href="#" className="small-thumbnail">
      <img src={video} className="thumbnail" alt=""
    /></a>
    <div className="vid-info">
      <a href="#"> Best channel</a>
      <p>My channel</p>
      <p></p>
    </div>
  </div>
  );
}

export default RightSidebar;
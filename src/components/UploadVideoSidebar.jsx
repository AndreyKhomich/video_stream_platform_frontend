// UploadVideoSidebar.js
import React, { useState } from "react";
import "../css/sidebar.css";
import UploadSidebarVideos from "./UploadSidebarVideos";
import UploadSidebarSettings from "./UploadSidebarSettings";
import UploadSidebarComments from "./UploadSidebarComments";
import UploadSidebarAnalytics from "./UploadSidebarAnalytics";
import user from "../images/Jack.png";

function UploadVideoSidebar({ isSidebarHidden, handleVideosClick }) {
  return (
    <div className={`sidebar ${isSidebarHidden ? 'small-sidebar' : ''}`}>
      <div className='user-info'>
        <div className='user-photo'>
          <img src={user} alt="user" />
          <div className='channel-name'>Channel Name</div>
          <div className='user-name'>Andrei Khomich</div>
        </div>
      </div>
      <div className="shortcut-links">
        <UploadSidebarVideos onClick={handleVideosClick} />
        <UploadSidebarSettings />
        <UploadSidebarComments />
        <UploadSidebarAnalytics />
      </div>
    </div>
  );
}

export default UploadVideoSidebar;

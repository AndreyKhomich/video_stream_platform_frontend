import React from "react";
import "../css/sidebar.css";
import SidebarHome from "./sidebar/SidebarHome";
import UploadSidebarVideos from "./UploadSidebarVideos";
import UploadSidebarSettings from "./UploadSidebarSettings";
import UploadSidebarAnalytics from "./UploadSidebarAnalytics";


function UploadVideoSidebar({ isSidebarHidden, handleVideosClick, userId }) {
  return (
    <div className={`sidebar ${isSidebarHidden ? 'small-sidebar' : ''}`}>
      <div className="shortcut-links">
        <SidebarHome/>
        <UploadSidebarVideos onClick={handleVideosClick} />
        <UploadSidebarSettings userId={userId} />
        <UploadSidebarAnalytics />
      </div>
    </div>
  );
}

export default UploadVideoSidebar;

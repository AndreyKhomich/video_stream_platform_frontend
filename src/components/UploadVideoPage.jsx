// Main component
import React, { useState } from 'react';
import NavbarLeft from "./navbar/NavbarLeft";
import upload from "../images/upload.png";
import UploadVideoSidebar from "./UploadVideoSidebar";
import VideoDetailsTable from "./VideoDetailsTable";

function UploadVideo({ isSidebarHidden, toggleSidebar, toggleContainerSize }) {
  const [showVideoDetails, setShowVideoDetails] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);

  const handleVideosClick = () => {
    // Here you can fetch video details from your backend or mock data
    // For demonstration, I'm using mock data
    const mockVideoDetails = [
      { video:"https://res.cloudinary.com/dn49hj23p/image/upload/v1706193669/Thumbnails/j4mfhwfk9bmvrsagijiz.jpg", title: "Video 1", description: "Escape to the majestic allure of Mountain Sky. Let your gaze ascend to the towering peaks that reach towards an expansive sky. Marvel at the ever-changing canvas above, where clouds dance and sunlight paints hues of blue and gold. Experience the serenity that envelops the mountains as they touch the heavens. Join us on a visual odyssey, where the grandeur of the mountains meets the vast expanse of the sky, creating a harmonious symphony of awe-inspiring beauty.", comments: 10, views: 100, likes: 50, dislikes: 5 },
      { video:"https://res.cloudinary.com/dn49hj23p/image/upload/v1706192279/Thumbnails/pxkvcdptnomr5rv6mj3e.jpg", title: "Video 2", description: "Escape to the majestic allure of Mountain Sky. Let your gaze ascend to the towering peaks that reach towards an expansive sky. Marvel at the ever-changing canvas above, where clouds dance and sunlight paints hues of blue and gold. Experience the serenity that envelops the mountains as they touch the heavens. Join us on a visual odyssey, where the grandeur of the mountains meets the vast expanse of the sky, creating a harmonious symphony of awe-inspiring beauty.", comments: 5, views: 200, likes: 30, dislikes: 3 },
      // Add more video details as needed
    ];
    setVideoDetails(mockVideoDetails);
    setShowVideoDetails(true);
  };

  return (
    <>
      <nav className="flex-div">
        <NavbarLeft toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize}/>
        <div className="nav-right flex-div">
          <img src={upload} alt="upload" />
        </div>
      </nav>
      <UploadVideoSidebar isSidebarHidden={isSidebarHidden} handleVideosClick={handleVideosClick}/>
      {showVideoDetails && <VideoDetailsTable videoDetails={videoDetails} />}
    </>
  );
}

export default UploadVideo;

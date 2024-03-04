import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarLeft from "./navbar/NavbarLeft";
import upload from "../images/upload.png";
import UploadVideoSidebar from "./UploadVideoSidebar";
import VideoDetailsTable from "./VideoDetailsTable";
import UploadVideoPopup from "./UploadVideoPopup";
import Pagination from "./Pagination";
import "../css/uploadvideo.css";
import "../css/uploadvideopopup.css";
import Axios from 'axios';

function UploadVideo({ isSidebarHidden, toggleSidebar, isContainerLarge, isLoggedIn, toggleContainerSize, toggleUploadForm, isUploadFormVisible, userId, jwtToken }) {
  const [showVideoDetails, setShowVideoDetails] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  console.log("Hello!");
  const pageSize = 4;

 
  const handleVideosClick = async (page, size) => {
    try {
      if (userId && size && page) {
        const response = await Axios.get(`http://127.0.0.1:8010/video/videos/${userId}?page=${page}&size=${size}`);
        
        setVideoDetails(response.data.items); 
        setTotalPages(response.data.pages);
        setShowVideoDetails(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setShowVideoDetails(false);
      }
    }
  };
  

  useEffect(() => {
    handleVideosClick(currentPage, pageSize);
  }, [userId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleVideosClick(page, pageSize);
  };


  return (
    <> 
       <nav className="flex-div">
        <NavbarLeft toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize} isUploadFormVisible={isUploadFormVisible} toggleUploadForm={toggleUploadForm}/>
        <div className="nav-right flex-div">
          <img src={upload} alt="upload" onClick={toggleUploadForm} />
        </div>
      </nav>
      <UploadVideoSidebar isSidebarHidden={isSidebarHidden} handleVideosClick={handleVideosClick}/>
      <div className={`upload-video-container ${isContainerLarge ? 'large-container' : ''} container ${isLoggedIn ? 'logged-in-container' : ''} `}>
      {showVideoDetails ? (
        <>
          <VideoDetailsTable videoDetails={videoDetails} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <VideoDetailsTable videoDetails={videoDetails} />
      )}
      </div>
      {<UploadVideoPopup userId={userId} jwtToken={jwtToken} toggleUploadForm={toggleUploadForm} isUploadFormVisible={isUploadFormVisible}/>}
      {isUploadFormVisible && <div className="overlay"></div>}
    
    </>
  );
}

export default UploadVideo;

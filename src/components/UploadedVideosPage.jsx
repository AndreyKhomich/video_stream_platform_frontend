import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLeft from "./navbar/NavbarLeft";
import upload from "../images/upload.png";
import UploadVideoSidebar from "./UploadVideoSidebar";
import VideoDetailsTable from "./VideoDetailsTable";
import Pagination from "./Pagination";
import { toast } from 'react-toastify';
import "../css/uploadvideo.css";
import Axios from 'axios';

function UploadedVideos({ 
  isSidebarHidden, 
  toggleSidebar, 
  isContainerLarge, 
  isLoggedIn, 
  toggleContainerSize, 
  userId, 
  }) {
  const [showVideoDetails, setShowVideoDetails] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/uploaded-videos/upload'); 
  };

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
  }, [userId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleVideosClick(page, pageSize);
  };



  return (
    <> 
       <nav className="flex-div">
        <NavbarLeft 
         toggleSidebar={toggleSidebar}
         toggleContainerSize={toggleContainerSize} 
         />
        <div className="nav-right flex-div">
          <img src={upload} alt="upload" onClick={handleUploadClick} />
        </div>
      </nav>
      <UploadVideoSidebar userId={userId} isSidebarHidden={isSidebarHidden} handleVideosClick={handleVideosClick}/>
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
    </>
  );
}

export default UploadedVideos;
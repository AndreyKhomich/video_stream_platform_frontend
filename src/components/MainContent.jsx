import React, { useState, useEffect } from 'react';
import "../css/maincontent.css";
import NavBar from './Navbar';
import Sidebar from './Sidebar';
import Banner from './Banner'
import VideoList from './VideoList';

function MainContent({ isLoggedIn }) {

  const [allVideos, setAllVideos] = useState([]);
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [isContainerLarge, setContainerLarge] = useState(false);

  const toggleContainerSize = () => {
    setContainerLarge(!isContainerLarge);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/video")
      .then((response) => response.json())
      .then((data) => {
        setAllVideos(data);
      });
  }, []);
  

  return (
    <><NavBar isLoggedIn={isLoggedIn} toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize} />
     {isLoggedIn && <Sidebar isSidebarHidden={isSidebarHidden}/>}
     <div className={`container ${isLoggedIn ? 'logged-in-container' : ''} ${isContainerLarge ? 'large-container' : ''}`}>
      <Banner />
      {allVideos.length > 0 && (
          <VideoList videos={allVideos} />
        )}
    </div></>
  );
}

export default MainContent;

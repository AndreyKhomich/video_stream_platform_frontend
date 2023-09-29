import React, { useState, useEffect } from 'react';
import "../css/maincontent.css";
import NavBar from './Navbar';
import Sidebar from './Sidebar';
import Banner from './Banner'
import VideoList from './VideoList';

function MainContent() {

  const [allVideos, setAllVideos] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/video")
      .then((response) => response.json())
      .then((data) => {
        setAllVideos(data);
      });
  }, []);


  return (
    <><NavBar />
    <Sidebar />
    <div className="container">
      <Banner />
      {allVideos.length > 0 && (
          <VideoList videos={allVideos} />
        )}
    </div></>
  );
}

export default MainContent;

import React from 'react';
import "../css/maincontent.css";
import NavBar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Banner from './Banner'
import VideoList from './VideoList';

function MainContent({ isLoggedIn, isSidebarHidden, isContainerLarge, toggleSidebar, toggleContainerSize }) {

  return (
    <><NavBar isLoggedIn={isLoggedIn} toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize} />
     {isLoggedIn && <Sidebar isSidebarHidden={isSidebarHidden} />}
     <div className={`container ${isContainerLarge ? 'large-container' : ''} container ${isLoggedIn ? 'logged-in-container' : ''} `}>
      <Banner />
      <VideoList isShowView containerClass="list-container" videoListClass="vid-list" />
    </div></>
  );
}

export default MainContent;

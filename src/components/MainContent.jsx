import React from "react";
import "../css/maincontent.css";
import NavBar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Banner from './Banner'
import VideoList from './VideoList';

function MainContent({
  isLoggedIn,
  setIsLoggedIn,
  isSidebarHidden,
  isContainerLarge,
  toggleSidebar,
  toggleContainerSize,
  userId,
  user,
  jwtToken
})
 {
  return (
    <><NavBar
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      toggleSidebar={toggleSidebar}
      toggleContainerSize={toggleContainerSize}
      userId={userId}
      user={user}
      jwtToken={jwtToken}
    />
      {isLoggedIn && <Sidebar isSidebarHidden={isSidebarHidden} />}
      <div className={`container ${isContainerLarge ? 'large-container' : ''} container ${isLoggedIn ? 'logged-in-container' : ''} `}>
        <Banner />
        <VideoList
          isShowView
          containerClass="list-container"
          videoListClass="vid-list"
        />
      </div>
    </>
  );
}

export default MainContent;

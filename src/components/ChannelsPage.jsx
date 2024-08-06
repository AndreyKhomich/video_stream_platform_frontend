import React from 'react';
import "../css/channelslist.css";
import NavBar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Banner from './Banner'
import ChannelsList from './ChannelsList';

function ChannelsPage({
  isLoggedIn,
  setIsLoggedIn,
  isSidebarHidden,
  isContainerLarge,
  toggleSidebar,
  toggleContainerSize,
  userId,
  user,
  jwtToken
}) {

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
      {
    isLoggedIn && 
      <Sidebar 
      isSidebarHidden={isSidebarHidden}
       />}
      <div className={`channels-page-container ${isContainerLarge ? 'large-container-channels-list' : ''} channels-page-container ${isLoggedIn ? 'logged-in-container-channels-list' : ''} `}>
        <Banner />
        <ChannelsList isLoggedIn={isLoggedIn} jwtToken={jwtToken} userId={userId} user={user}/>
      </div>
    </>
  );
}

export default ChannelsPage;

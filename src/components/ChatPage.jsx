import React, { useState, useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Chat from "./Chat";
import "../css/uploadvideo.css";
import "../css/chat.css";

function ChatPage({ toggleContainerSize, toggleSidebar }) {
  return (
    <> 

        <Navbar
        toggleContainerSize={toggleContainerSize} 
        toggleSidebar={toggleSidebar}
        />
      {<Sidebar
    //    isSidebarHidden={isSidebarHidden}
        />}
      {/* <div className={`change-video-container  ${isContainerLarge ? 'large-container' : ''} container ${isLoggedIn ? 'logged-in-container-video-settings' : ''} `}> */}
      <div className="chat-details">
            <div className="chat-details-heading">Message Chat</div>
        </div>
      <div className='chat-container'>
      <Chat />
      </div>
      {/* </div> */}
      

    </>
  );
}

export default ChatPage;

import React, { useState, useEffect } from 'react';


function ChatUserInfo({ toggleContainerSize, toggleSidebar }) {
  return ( 
    <div className="user-settings-tray">
    <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img" />
    <div className='chat-user-info'>
    <h6>User name</h6>
    <p className='text-muted'>Channel name</p>
    </div>
</div>
  );
}

export default ChatUserInfo;

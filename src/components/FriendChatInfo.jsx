import React, { useState, useEffect } from 'react';


function FriendChatInfo({ toggleContainerSize, toggleSidebar }) {
    return (
        <div className="friend">
            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="Profile img" />
            <div className="text">
                <h6>Robo Cop</h6>
            </div>
            <span className="time text-muted">13:21</span>
        </div>
    );
}

export default FriendChatInfo;

import React, { useState, useEffect } from 'react';


function FriendInfo({ toggleContainerSize, toggleSidebar }) {
    return (
        <div className="settings-tray">
            <div className="friend-drawer">
                <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                <div className="text">
                    <h6>Robo Cop</h6>
                    <p className="text-muted">Layin' down the law since like before Christ...</p>
                </div>
            </div>
        </div>
    );
}

export default FriendInfo;

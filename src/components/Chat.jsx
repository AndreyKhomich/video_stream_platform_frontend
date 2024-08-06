import React, { useState, useEffect } from 'react';
import FriendsList from "./FriendsList";
import ChatPanel from "./ChatPanel";




function Chat({ toggleContainerSize, toggleSidebar }) {
    return (
        <>
            <FriendsList/>
            <ChatPanel/>
        </>
    );
}

export default Chat;

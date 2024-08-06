import React, { useState, useEffect } from 'react';
import ChatUserInfo from "./ChatUserInfo";
import SearchUserChat from "./SearchUserChat";
import FriendChatInfo from "./FriendChatInfo";

function FriendsList({ toggleContainerSize, toggleSidebar }) {
    return (
        <div className="friends-list">
                <ChatUserInfo/>
                <SearchUserChat/>
                <FriendChatInfo/>
            </div>
    );
}

export default FriendsList;

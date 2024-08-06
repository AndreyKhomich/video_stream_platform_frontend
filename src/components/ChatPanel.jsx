import React, { useState, useEffect } from 'react';
import FriendInfo from "./FriendInfo";
import arrow from "../images/arrow.png"
import microphone from "../images/microphone.png"
import emoji from "../images/emoji.png"

function ChatPanel({ toggleContainerSize, toggleSidebar }) {
    return (
        <div className="chat-panel">
            <div>
                <FriendInfo />
                <div className='chat-buble-container'>
                    <div className="chat-bubble left">Hello dude!</div>
                    {/* <!-- Other chat bubbles --> */}
                    <div className="chat-bubble right">Hello dude!</div>
                    {/* <!-- Input box for typing message --> */}
                </div>
            </div>
            <div className="chat-box-tray">
                <img className="material-icons" src={emoji} />
                <input type="text" placeholder="Type your message here..." />
                <img className="material-icons-micro" src={microphone} />
                <img className="material-icons-input" src={arrow} />
            </div>
        </div>
    );
}

export default ChatPanel;

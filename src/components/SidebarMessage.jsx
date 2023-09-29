import React from "react";
import message from "../images/messages.png"

function SidebarMessage() {
  return (
         <a href=""
          ><img src={message} alt="explore" />
          <p>Messages</p>
        </a>
  );
}

export default SidebarMessage;
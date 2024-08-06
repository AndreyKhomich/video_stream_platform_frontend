import React from "react";
import channels from "../../images/channels.png"

function SidebarChannels(){
  
  return (
         <a href="/channels"
          ><img src={channels} alt="channels" />
          <p>Channels</p>
        </a>
  );
}

export default SidebarChannels;
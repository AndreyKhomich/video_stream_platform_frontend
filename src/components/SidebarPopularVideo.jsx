import React from "react";
import playlist from "../images/playlist.png"

function SidebarPopulaVideo() {
  return (
         <a href=""
          ><img src={playlist} alt="explore" />
          <p>Popular videos</p>
        </a>
  );
}

export default SidebarPopulaVideo;
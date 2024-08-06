import React from "react";
import videos from "../images/videos.png"

function VideoDetailSidebar({ }) {
  return (
         <a href="#"
          ><img src={videos} alt="videos" />
          <p>Details</p>
        </a>
  );
}

export default VideoDetailSidebar;
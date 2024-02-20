import React from "react";
import videos from "../images/videos.png"

function UploadSidebarVideos({ onClick }) {
  return (
         <a href="#" onClick={onClick}
          ><img src={videos} alt="videos" />
          <p>Videos</p>
        </a>
  );
}

export default UploadSidebarVideos;
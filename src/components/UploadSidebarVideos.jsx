import React from "react";
import videos from "../images/videos.png"

function UploadSidebarVideos({ onClick }) {
  return (
         <a href="/uploaded-videos" onClick={onClick}
          ><img src={videos} alt="videos" />
          <p>Content</p>
        </a>
  );
}

export default UploadSidebarVideos;
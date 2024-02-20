import React from "react";
import comments from "../images/comments.png"

function UploadSidebarComments() {
  return (
         <a href="#"
          ><img src={comments} alt="comments" />
          <p>Comments</p>
        </a>
  );
}

export default UploadSidebarComments;
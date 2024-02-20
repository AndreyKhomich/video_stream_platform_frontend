// ShareLink.js
import React, { useState } from "react";
import PopUp from "./ShareLinkPopUp";
import share from "../images/share.png";

function ShareLink({ video }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleShareClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <a onClick={handleShareClick}>
        <img className="share" src={share} alt="share" /> Share
      </a>
      <PopUp
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        linkToCopy={video.url}
      />
      {isPopupOpen && <div className="overlay"></div>}
    </>
  );
}

export default ShareLink;

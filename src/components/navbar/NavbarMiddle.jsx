import React from "react";
import search from "../../images/search.png"
import voice_search from "../../images/voice-search.png"

function NavbarMiddle() {
  return (
    <div className="nav-middle flex-div">
    <div className="search-box flex-div">
      <input type="text" placeholder="Search" />
      <img src={search} alt="search" />
    </div>
    <img src={voice_search} className="mic-icon" alt="voice-search" />
  </div>
  );
}

export default NavbarMiddle;
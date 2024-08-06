import React, { useState, useEffect } from 'react';
import search from "../images/search.png"


function SearchUserChat({ toggleContainerSize, toggleSidebar }) {
  return ( 
    <div className="search-box">
    <div className="input-wrapper">
        <img className="material-icons" src={search} />
        <input placeholder="Search here" type="text" />
    </div>
</div>
  );
}

export default SearchUserChat;

import React from "react";
import menu from "../images/menu.png"
import logo from "../images/logo.png"

function NavbarLeft({ toggleSidebar, toggleContainerSize }) {

  return (
    <div className="nav-left flex-div">
    <img src={menu} className="menu-icon" alt="menu" onClick={() => { toggleSidebar(); toggleContainerSize();}} />
    <img src={logo} className="logo" alt="logo" />
  </div>
  );
}

export default NavbarLeft;
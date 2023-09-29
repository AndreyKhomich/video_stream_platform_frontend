import React from "react";
import menu from "../images/menu.png"
import logo from "../images/logo.png"

function NavbarLeft() {
  return (
    <div className="nav-left flex-div">
    <img src={menu} className="menu-icon" alt="menu" />
    <img src={logo} className="logo" alt="logo" />
  </div>
  );
}

export default NavbarLeft;
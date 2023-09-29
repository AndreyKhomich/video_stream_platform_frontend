import React, { useState, useEffect } from 'react';
import "../css/navbar.css";
import Login from "./Login";
import NavbarLeft from './NavbarLeft';
import NavbarMiddle from './NavbarMiddle';
import NavbarRight from './NavbarRight';


function NavBar() {

  return (
    <nav className="flex-div">
     <NavbarLeft/>
     <NavbarMiddle/>
     <NavbarRight />
    </nav>
  );
}

export default NavBar;
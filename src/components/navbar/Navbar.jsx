import React from 'react';
import "../../css/navbar.css";
import NavbarLeft from './NavbarLeft';
import NavbarMiddle from './NavbarMiddle';
import NavbarRight from './NavbarRight';


function NavBar({ isLoggedIn, toggleSidebar, toggleContainerSize }) {

  return (
    <nav className="flex-div">
     <NavbarLeft toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize} />
     <NavbarMiddle/>
     <NavbarRight isLoggedIn={isLoggedIn} />
    </nav>
  );
}

export default NavBar;
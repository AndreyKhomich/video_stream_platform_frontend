import React from 'react';
import "../../css/navbar.css";
import NavbarLeft from './NavbarLeft';
import NavbarMiddle from './NavbarMiddle';
import NavbarRight from './NavbarRight';


function NavBar({ 
  isLoggedIn,
  setIsLoggedIn, 
  toggleSidebar, 
  toggleContainerSize,
  userId,
  user,
  jwtToken
 }) {

  return (
    <nav className="flex-div">
     <NavbarLeft toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize} />
     <NavbarMiddle/>
     <NavbarRight isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} user={user} jwtToken={jwtToken} />
    </nav>
  );
}

export default NavBar;
import React from "react";
import home from "../../images/home.png"

function SidebarHome(){
  
  return (
         <a href="/"
          ><img src={home} alt="home" />
          <p>Home</p>
        </a>
  );
}

export default SidebarHome;
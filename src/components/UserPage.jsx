import React, { useState, useEffect } from "react";
import NavBar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Banner from './Banner'
import ProfileInfo from './ProfileInfo';
import { useParams } from "react-router-dom";
import "../css/uservideos.css";
import axios from "axios";

function UserPage({ 
  isLoggedIn,
  setIsLoggedIn, 
  isSidebarHidden, 
  isContainerLarge, 
  toggleSidebar, 
  toggleContainerSize,
  jwtToken
}) {

  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8010/user/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <><NavBar 
    isLoggedIn={isLoggedIn}
    setIsLoggedIn={setIsLoggedIn} 
    toggleSidebar={toggleSidebar} 
    toggleContainerSize={toggleContainerSize}
    userId={userId}
    user={user}
    jwtToken={jwtToken}
     />
     {
     isLoggedIn && 
     <Sidebar 
     isSidebarHidden={isSidebarHidden} />}
     <div className={`user-page-container ${isContainerLarge ? 'large-container-user-page' : ''} user-page-container ${isLoggedIn ? 'logged-in-container-user-page' : ''} `}>
      <Banner />
      <ProfileInfo
       user={user}
       userId={userId}
       isLoggedIn={isLoggedIn}
       jwtToken={jwtToken}
      />
    </div>
    </>
   
  );
}


export default UserPage;
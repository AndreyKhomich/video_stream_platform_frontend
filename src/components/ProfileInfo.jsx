import React, { useState, useEffect } from 'react';
import UserInfo from "./UserInfo";
import UserVideos from "./UserVideos";



function ProfileInfo({ toggleContainerSize, toggleSidebar, userId, user, isLoggedIn, jwtToken }) {
  return (
    <>
      <div className='profile'>
        {user && (<UserInfo
          user={user}
        />
        )}
        <UserVideos
        userId={userId}
        isLoggedIn={isLoggedIn}
        jwtToken={jwtToken}
        user={user}
         />
      </div>
    </>
  );
}

export default ProfileInfo;

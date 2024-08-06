import NavbarLeft from "./navbar/NavbarLeft";
import UploadVideoSidebar from "./UploadVideoSidebar";
import ProfileSettings from "./ProfileSettings";
import "../css/changeprofile.css";

function ProfileSettingsPage({
  isLoggedIn, 
  isSidebarHidden, 
  isContainerLarge, 
  toggleContainerSize, 
  toggleSidebar, 
  userId, 
  jwtToken, 
  setIsLoggedIn 
}) {
  return (
    <> 
       <nav className="flex-div">
        <NavbarLeft
        toggleContainerSize={toggleContainerSize} 
        toggleSidebar={toggleSidebar}
        />
      </nav>
      {<UploadVideoSidebar
       isSidebarHidden={isSidebarHidden}
        />}
      <div className={`change-profile-container  ${isContainerLarge ? 'large-container-profile-settings' : ''} container ${isLoggedIn ? 'logged-in-container-profile-settings' : ''} `}>
    
      <ProfileSettings
       userId = {userId}
       jwtToken={jwtToken}
       setIsLoggedIn={setIsLoggedIn}
       />
      </div>
      
    </>
  );
}

export default ProfileSettingsPage;

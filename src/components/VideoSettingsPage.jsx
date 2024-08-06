import NavbarLeft from "./navbar/NavbarLeft";
import ChangeVideoSidebar from "./ChangeVideoSidebar";
import ChangeVideo from "./ChangeVideo";
import "../css/changevideo.css";

function VideoSettings({ 
  isLoggedIn,
  isSidebarHidden,
  isContainerLarge,
  toggleContainerSize,
  toggleSidebar,
  jwtToken 

}) {

  return (
    <> 
       <nav className="flex-div">
        <NavbarLeft
        toggleContainerSize={toggleContainerSize} 
        toggleSidebar={toggleSidebar}
        />
      </nav>
      {isLoggedIn && <ChangeVideoSidebar isSidebarHidden={isSidebarHidden} />}
      <div className={`change-video-container  ${isContainerLarge ? 'large-container-video-settings' : ''} container ${isLoggedIn ? 'logged-in-container-video-settings' : ''} `}>
      <ChangeVideo jwtToken={jwtToken} />
      </div>

    </>
  );
}

export default VideoSettings;
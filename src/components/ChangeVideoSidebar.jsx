import "../css/sidebar.css";
import SidebarHome from "./sidebar/SidebarHome";
import UploadSidebarComments from "./UploadSidebarComments";
import VideoDetailSidebar from "./VideoDetailSidebar";
import UploadSidebarVideos from "./UploadSidebarVideos";

function ChangeVideoSidebar({ isSidebarHidden, handleVideosClick }) {
  return (
    <div className={`sidebar ${isSidebarHidden ? 'small-sidebar' : ''}`}>
      <div className="shortcut-links">
        <SidebarHome/>
        <VideoDetailSidebar />
        <UploadSidebarComments />
        <UploadSidebarVideos />
      </div>
    </div>
  );
}

export default ChangeVideoSidebar;

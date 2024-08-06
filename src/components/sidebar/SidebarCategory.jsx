import React from "react";
import SidebarHome from "./SidebarHome";
import SidebarChannels from "./SidebarChannels";
import SidebarPopulaVideo from "./SidebarPopularVideo";
import SidebarMessage from "./SidebarMessage";
import SidebarTopAuthor from "./SidebarTopAuthor";
import SidebarSubscribersList from "./SidebarSubscribersList";
import UploadSidebarVideos from "./../UploadSidebarVideos";
import UploadSidebarSettings from "./../UploadSidebarSettings";


function SidebarCategory() {
  return (
    <div className="shortcut-links">
        <SidebarHome/>
        <SidebarChannels/>
        <SidebarPopulaVideo/>
        <SidebarMessage/>
        <SidebarTopAuthor/>
        <UploadSidebarVideos/>
        <UploadSidebarSettings/>

        <hr />
        <SidebarSubscribersList/>
    </div>
  );
}

export default SidebarCategory;
import React from "react";
import SidebarHome from "./SidebarHome";
import SidebarSubscription from "./SidebarSubscription";
import SidebarPopulaVideo from "./SidebarPopularVideo";
import SidebarMessage from "./SidebarMessage";
import SidebarTopAuthor from "./SidebarTopAuthor";
import SidebarSubscribersList from "./SidebarSubscribersList";
import SidebarSettings from "./SidebarSettings";

function SidebarCategory() {
  return (
    <div className="shortcut-links">
        <SidebarHome/>
        <SidebarSubscription/>
        <SidebarPopulaVideo/>
        <SidebarMessage/>
        <SidebarTopAuthor/>
        <SidebarSettings />

        <hr />
        <SidebarSubscribersList/>
    </div>
  );
}

export default SidebarCategory;
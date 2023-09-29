import React from "react";
import "../css/sidebar.css";
import SidebarCategory from './SidebarCategory';

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarCategory/>
    </div>
  );
}

export default Sidebar;
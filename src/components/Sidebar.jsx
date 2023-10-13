import React from "react";
import "../css/sidebar.css";
import SidebarCategory from './SidebarCategory';

function Sidebar({ isSidebarHidden }) {

  return (
    <div className={`sidebar ${isSidebarHidden ? 'small-sidebar' : ''}`}>
      <SidebarCategory/>
    </div>
  );
}

export default Sidebar;
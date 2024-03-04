import React from "react";
import settings from "../../images/settings.png"

function SidebarSettings() {
  return (
         <a href="#"
          ><img src={settings} alt="settings" />
          <p>Settings</p>
        </a>
  );
}

export default SidebarSettings;
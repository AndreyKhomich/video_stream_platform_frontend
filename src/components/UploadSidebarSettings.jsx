import React from "react";
import { useParams } from "react-router-dom";
import settings from "../images/settings.png"
import { Link } from "react-router-dom";

function UploadSidebarSettings() {

  return (
    <a href="/profile-settings">
      <img src={settings} alt="settings" />
      <p>Settings</p>
    </a>
  )
}

export default UploadSidebarSettings;
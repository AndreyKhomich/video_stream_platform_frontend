import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Signup from "./components/Signup";
import EmailVerification from "./components/EmailVerification";
import UploadVideo from "./components/UploadVideoPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoPage from "./components/VideoPage.jsx"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import UploadVideoPopup from "./components/UploadVideoPopup.jsx";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const jwtToken = Cookies.get("jwtToken");

  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [isContainerLarge, setContainerLarge] = useState(false);
  const [isUploadFormVisible, setUploadFormVisible] = useState(true);



  const toggleContainerSize = () => {
    setContainerLarge(!isContainerLarge);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  const toggleUploadForm = () => {
    setUploadFormVisible(!isUploadFormVisible);
  };

  useEffect(() => {
    if (jwtToken) {
      const decodedUser = jwtDecode(jwtToken);
      const userId = decodedUser.sub;
      setIsLoggedIn(true);
      setUserId(userId);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, [jwtToken]);


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainContent
            isLoggedIn={isLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar} />}
            toggleUploadForm={toggleUploadForm}
            isUploadFormVisible={isUploadFormVisible}
          />
          <Route
            path="/auth/confirmation/:verificationToken"
            element={<EmailVerification />}
          />
          <Route path="/video/:video_id" element={<VideoPage
            isLoggedIn={isLoggedIn}
            jwtToken={jwtToken}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            userId={userId} />}
          />
          <Route path="/upload-video" element={<UploadVideo
            isLoggedIn={isLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            toggleUploadForm={toggleUploadForm}
            isUploadFormVisible={isUploadFormVisible}
            userId={userId} 
            jwtToken={jwtToken}/>} />
            <Route path="/upload-video-popup" element={<UploadVideoPopup/>} />
        </Routes>
      </Router>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;

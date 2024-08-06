import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent.jsx";
import Signup from "./components/Signup";
import EmailVerification from "./components/EmailVerification.jsx";
import UploadVideo from "./components/UploadVideoPage.jsx";
import UploadedVideos from "./components/UploadedVideosPage.jsx";
import VideoSettingsPage from "./components/VideoSettingsPage.jsx";
import ProfileSettingsPage from "./components/ProfileSettingsPage.jsx";
import ChatPage from "./components/ChatPage.jsx";
import UserPage from "./components/UserPage.jsx";
import ChannelsPage from "./components/ChannelsPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoPage from "./components/VideoPage.jsx"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const jwtToken = Cookies.get("jwtToken");

  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [isContainerLarge, setContainerLarge] = useState(false);
  const [user, setUser] = useState(null);


  const toggleContainerSize = () => {
    setContainerLarge(!isContainerLarge);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
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

  useEffect(() => {
    const fetchUser = async () => {
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:8010/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    };

    fetchUser();
}, [userId]);


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />}
          />
          <Route path="/" element={<MainContent
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            userId={userId}
            user={user}
            jwtToken={jwtToken}
          />}
          />
          <Route
            path="/auth/confirmation/:verificationToken"
            element={<EmailVerification />}
          />
          <Route path="/video/:video_id" element={<VideoPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            jwtToken={jwtToken}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            userId={userId}
            user={user}
          />}
          />
          <Route path="/uploaded-videos/upload" element={<UploadVideo
            isLoggedIn={isLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            userId={userId}
            jwtToken={jwtToken}
          />}
          />
          <Route path="/uploaded-videos" element={<UploadedVideos
            isLoggedIn={isLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            userId={userId}
            jwtToken={jwtToken}
          />}
          />
          <Route path="/video-settings/:video_id" element={<VideoSettingsPage
            isLoggedIn={isLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            jwtToken={jwtToken}
          />}
          />
          <Route path="/profile-settings" element={<ProfileSettingsPage
            isLoggedIn={isLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            userId={userId}
            jwtToken={jwtToken}
            setIsLoggedIn={setIsLoggedIn}
          />}
          />
          <Route path="/video-chat" element={<ChatPage
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isSidebarHidden={isSidebarHidden}
          isContainerLarge={isContainerLarge}
          toggleContainerSize={toggleContainerSize}
          toggleSidebar={toggleSidebar}
          />}
          />
          <Route path="/profile/:userId" element={<UserPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            jwtToken={jwtToken}
          />}
          />
          <Route path="/channels" element={<ChannelsPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isSidebarHidden={isSidebarHidden}
            isContainerLarge={isContainerLarge}
            toggleContainerSize={toggleContainerSize}
            toggleSidebar={toggleSidebar}
            userId={userId}
            user={user}
            jwtToken={jwtToken}
          />}
          />
        </Routes>
      </Router>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
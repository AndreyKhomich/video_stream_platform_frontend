import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Signup from "./components/Signup";
import EmailVerification from "./components/EmailVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoPage from "./components/VideoPage.jsx"
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [jwtToken]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainContent isLoggedIn={isLoggedIn} />  } />
          <Route
            path="/auth/confirmation/:verificationToken"
            element={<EmailVerification />} />
            <Route path="/video/:video_id" element={<VideoPage isLoggedIn={isLoggedIn} jwtToken={jwtToken} />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;

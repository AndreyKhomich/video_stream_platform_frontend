import React, { useState } from "react";
import Login from "../Login";
import Signup from "../Signup";
import CreateChannelPopup from "../CreateChannelPopup.jsx";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import more from "../../images/more.png";
import notification from "../../images/notification.png";
import upload from "../../images/upload.png";
import axios from "axios";
import useErrorToast from '../../hooks/useErrorToast';



function NavbarRight({
  isLoggedIn,
  setIsLoggedIn,
  userId,
  user,
  jwtToken
}) {
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setSignupFormVisible] = useState(false);
  const [isChannelFormVisible, setIsChannelFormVisible] = useState(false)
  const showErrorToast = useErrorToast();

  const navigate = useNavigate();


  const toggleLoginForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
  };

  const toggleSignupForm = () => {
    setSignupFormVisible(!isSignupFormVisible);
  };

  const toggleChannelForm = () => {
    setIsChannelFormVisible(!isChannelFormVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8010/auth/jwt/logout', {}, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (response.status === 204) {
        Cookies.remove('jwtToken');
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data.detail === "Unauthorized") {
        Cookies.remove('jwtToken');
        navigate("/");
      } else {
        showErrorToast("Failed to logout. Please try again later.");
        console.error("Failed to logout:", error);
      }
    }
  };


  const handleUploadClick = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8010/channel/${userId}`
        );

        if (response.status === 200) {
          navigate("/uploaded-videos/upload");
        }
      } catch (error) {
        console.log(error.response.data.detail);
        if (error.response && error.response.data.detail === "The channel does not exist") {
          setIsChannelFormVisible(true);
        }
      }
    }
  };


  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="nav-right flex-div">
            <img src={upload} alt="upload" onClick={handleUploadClick} />
            <img src={more} alt="more" />
            <img src={notification} alt="notification" />
            <a href={`/profile/${userId}`}>
            {user && (
                <img src={user.user_photo} className="user-icon" alt="userphoto" />
              )}
            </a>
            <button className="logout" type="button" onClick={handleLogout} >Logout</button>
          </div>
          {isChannelFormVisible && <CreateChannelPopup
            setIsChannelFormVisible={setIsChannelFormVisible}
            toggleChannelForm={toggleChannelForm}
            isChannelFormVisible={isChannelFormVisible}
            userId={userId}
            jwtToken={jwtToken}
          />}
          {isChannelFormVisible && <div className="overlay"></div>}
        </>
      ) : (
        <>
          <div className="nav-right flex-div">
            <a href="#" className="login-button" id="loginButton" onClick={toggleLoginForm} > Login </a>
            <a href="#" className="signup-button" id="signupButton" onClick={toggleSignupForm}> Sign Up </a>
          </div>
          {isLoginFormVisible && <Login
            setLoginFormVisible={setLoginFormVisible}
            toggleLoginForm={toggleLoginForm}
            isLoginFormVisible={isLoginFormVisible}
          />}
          {isLoginFormVisible && <div className="overlay"></div>}
          {isSignupFormVisible && <Signup
            setSignupFormVisible={setSignupFormVisible}
            toggleSignupForm={toggleSignupForm}
            isSignupFormVisible={isSignupFormVisible}
          />}
          {isSignupFormVisible && <div className="overlay"></div>}
        </>
      )}
    </>
  );
}

export default NavbarRight;
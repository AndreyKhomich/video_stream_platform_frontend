import React, { useState } from "react";
import Login from "../Login";
import Signup from "../Signup";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import more from "../../images/more.png";
import notification from "../../images/notification.png";
import userphoto from "../../images/Jack.png";
import upload from "../../images/upload.png";


function NavbarRight({ isLoggedIn, toggleUploadForm, isUploadFormVisible }) {
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setSignupFormVisible] = useState(false);


  const toggleLoginForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
  };

  const toggleSignupForm = () => {
    setSignupFormVisible(!isSignupFormVisible);
  
  }


  const navigate = useNavigate();
  

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate(0);
  };


  const handleUploadClick = () => {
    navigate('/upload-video', { state: {test: true }});
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="nav-right flex-div">
          <img src={upload} alt="upload" onClick={handleUploadClick} />
          <img src={more} alt="more" />
          <img src={notification} alt="notification" />
          <img src={userphoto} className="user-icon" alt="userphoto" />
            <button className="logout" type="button" onClick={handleLogout} >Logout</button>
          </div>
        </>
      ) : (
        <>
          <div className="nav-right flex-div">
            <a href="#" className="login-button" id="loginButton" onClick={toggleLoginForm} > Login </a>
            <a href="#" className="signup-button" id="signupButton" onClick={toggleSignupForm}> Sign Up </a>
          </div>
          {isLoginFormVisible && <Login setLoginFormVisible={setLoginFormVisible} toggleLoginForm={toggleLoginForm} isLoginFormVisible={isLoginFormVisible} />}
          {isLoginFormVisible && <div className="overlay"></div>}
          {isSignupFormVisible && <Signup setSignupFormVisible={setSignupFormVisible} toggleSignupForm={toggleSignupForm} isSignupFormVisible={isSignupFormVisible} />}
          {isSignupFormVisible && <div className="overlay"></div>}
        </>
      )}
      
    </>
  );
}


export default NavbarRight;
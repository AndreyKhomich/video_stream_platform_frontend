import React, { useState } from "react";
import Login from "./Login";

function NavbarRight() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);

  const toggleLoginForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <><div className="nav-right flex-div">
      <a href="#" className="login-button" id="loginButton" onClick={toggleLoginForm} > Login </a>
      <a href="" className="signup-button" id="signupButton"> Sign Up </a>
    </div>
    {isLoginFormVisible && <Login toggleLoginForm={toggleLoginForm} isLoginFormVisible={isLoginFormVisible} />}</>
  );
}


export default NavbarRight;
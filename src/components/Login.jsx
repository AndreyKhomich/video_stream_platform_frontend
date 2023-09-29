import React from "react";
import "../css/login.css";
import logo from "../images/logo.png";

function Login({ toggleLoginForm, isLoginFormVisible }) {
  const containerClassName = `form-container ${isLoginFormVisible ? 'active' : ''}`;

  return (
    <div className={containerClassName} id="loginForm">
        <img src={logo} alt="Logo" className="logo"></img>
        <h2>Login</h2>
        <form action="">
          <label>Email:</label>
          <input type="email" id="email" name="email" required />

          <label>Password:</label>
          <input type="password" id="password" name="password" required></input>

          <button className="login" type="submit">
            Login
          </button>
          <button className="close" type="submit" onClick={toggleLoginForm}>
            Close
          </button>
        </form>
        <a href="/auth/google">Sign up with Google</a>
      </div>
  );
}

export default Login;

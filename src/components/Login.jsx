import React, {useState} from "react";
import "../css/login.css";
import logo from "../images/logo.png";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from '../hooks/useErrorToast';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Login({ toggleLoginForm, isLoginFormVisible, submitButtonText }) {
  const containerClassName = `form-container ${isLoginFormVisible ? 'active' : ''}`;

  const navigate = useNavigate();

  const showErrorToast = useErrorToast();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/jwt/login", {
        password: formData.password,
        username: formData.username,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
      }
      
      );
      console.log(response.data);
      Cookies.set('jwtToken', response.data.access_token, {
        expires: 1,
        sameSite: 'None', 
        secure: true,     
      });
      navigate(0);
    } catch (error) {
      if (error.response && error.response.data.detail === "LOGIN_BAD_CREDENTIALS") {
        showErrorToast('Credentials invalid. Please enter valid email or password.');
      } else if (error.response && error.response.data.detail === "User is not verified") {
        showErrorToast("Your email is not confirmed. You may login after confirmation.");
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={containerClassName} id="loginForm">
        <img src={logo} alt="Logo" className="logo"></img>
        <h2>{submitButtonText}</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="username" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

          <label>Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required></input>

          <button className="login" type="submit">
            Login
          </button>
          <button className="close" type="button" onClick={toggleLoginForm}>
            Close
          </button>
        </form>
        <a href="/auth/google">Sign up with Google</a>
      </div>
  );
}


export default Login;

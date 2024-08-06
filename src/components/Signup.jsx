import React, { useState } from "react";
import "../css/signup.css";
import "../css/toastmessage.css";
import logo from "../images/logo.png";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from '../hooks/useErrorToast';

function SignUp({ toggleSignupForm, isSignupFormVisible, setSignupFormVisible }) {
  const showErrorToast = useErrorToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    
  const showSuccessMessage = () => {
    toast.success('Sign-up Successful! Please check your email for a confirmation link.', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
    });
  };

    try {
      const response = await axios.post("http://127.0.0.1:8010/auth/register", {
        email: formData.email,
        password: formData.password,
      });

      setSignupFormVisible(false);
      showSuccessMessage();
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data.detail === "REGISTER_USER_ALREADY_EXISTS") {
        showErrorToast('User already exists. Please use a different email.');
      } else if (error.response && error.response.data.detail.code === "REGISTER_INVALID_PASSWORD") {
        showErrorToast("Your password must meet the following criteria: It should be a minimum of 8 characters in length and include a combination of letters, numbers, and either '!' or '?'.");
      } else if (error.response && error.response.data.detail.message === "value is not a valid email address: The part after the @-sign is not valid. It should have a period.") {
        showErrorToast("Please enter valid email");
      } else {
        console.error(error); 
      }
    }
  };

  const containerClassName = `form-container ${ isSignupFormVisible ? "active" : "" }`;

  return (
    <div className={containerClassName} id="loginForm">
      <img src={logo} alt="Logo" className="logo"></img>

      <h2 className="center">Sign Up</h2>
      <form onSubmit={handleRegistration}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password"  value={formData.password} onChange={handleInputChange} required />

        <button type="submit">Sign Up</button>

        <button className="close" type="button" onClick={toggleSignupForm}>
            Close
          </button>
      </form>
      <a href="/auth/google">Sign up with Google</a>
    </div>
  );
}

export default SignUp;

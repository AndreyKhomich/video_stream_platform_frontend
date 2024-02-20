import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import Ok from "../images/Ok.png";
import "../css/emailverification.css";
import useErrorToast from '../hooks/useErrorToast';

function EmailVerification() {
  const { verificationToken } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const [allowLoginStatus, setallowLoginStatus] = useState("");

  const showErrorToast = useErrorToast();


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8010/auth/confirmation/${verificationToken}`);

      if (response.data.message === "Email is confirmed") {
        setVerificationStatus("Email has been verified!");
        setallowLoginStatus("You can now login");
      }
    } catch (error) {
      if (error.response && error.response.data.detail === "Verification token expired") {
        showErrorToast("Your verification token has been expired! Please click button Resend Verification Email for the confirmation.");
        setVerificationStatus("Email is not verified!");
      } else {
        console.error(error);
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await axios.get(`http://localhost:8010/auth/resend-verification/${verificationToken}`);

      if (response.data.message === "Confirmation email was resend") {
        setVerificationStatus("Verificatio email was resend!");
        setallowLoginStatus("Please confirm your email");
      }
    } catch (error) {
      if (error.response && error.response.data.detail === "User already verified") {
        showErrorToast('Your email already verified. Please login.');
        setVerificationStatus("Your email already verified!");
        setallowLoginStatus("You can now login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [verificationToken]);

  return (
    <div className="container">
       <div className="verification-form-container">
      <img src={logo} alt="Logo" className="logo"></img>
      <h2 className="center">{verificationStatus}</h2>
      <img src={Ok} alt="Ok" className="ok"></img>
      {verificationStatus === "Email is not verified!" && (
        <button className="resend" onClick={handleResendVerification}>Resend Verification Email</button>
      )}
      <p className="verification-status">{allowLoginStatus}</p>
    </div>
    </div>
   
  );
}

export default EmailVerification;
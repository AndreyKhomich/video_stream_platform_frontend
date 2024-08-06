import React, { useState } from "react";
import useErrorToast from '../hooks/useErrorToast';
import Cookies from 'js-cookie';
import CautionPopup from "../components/CautionPopup";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

function UpdateUserSettings({ userId, jwtToken, setIsLoggedIn, updateUserName }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();
    const [updatedFields, setUpdatedFields] = useState([]);

    const showErrorToast = useErrorToast();

    const showUpdateNameMessage = () => {
        toast.success('Name updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        });
    };

    const showUpdateEmailMessage = () => {
        toast.success('Email updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        });
    };

    const showUpdatePasswordMessage = () => {
        toast.success('Password updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        setUpdatedFields((prevFields) => prevFields.filter(field => field !== "name"));
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setUpdatedFields((prevFields) => [...prevFields, "email"]);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setUpdatedFields((prevFields) => [...prevFields, "password"]);
    };

    const handleUpdateProfile = () => {
        if (updatedFields.includes("email") || updatedFields.includes("password")) {
            setShowConfirmationModal(true);
        } else {
            handleConfirmChanges();
        }
    };

    const handleCancel = () => {
        setShowConfirmationModal(false);
    };

    const handleConfirmChanges = async () => {
        setShowConfirmationModal(false);
        try {
            const updates = {};
            if (name) updates.name = name;
            if (email) updates.email = email;
            if (password) updates.password = password;

            if (Object.keys(updates).length > 0) {
                const Response = await axios.patch(
                    `http://localhost:8010/user/update/${userId}`,
                    updates,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    }
                );

                if (Response.status === 202) {
                    if (updates.name) {
                        console.log("Name was updated");
                        showUpdateNameMessage();
                        updateUserName(name);
                        setName("");
                    }

                    if (updates.email) {
                        console.log("Email was updated");
                        setIsLoggedIn(false);
                        showUpdateEmailMessage();
                        handleLogout();
                    }

                    if (updates.password) {
                        setIsLoggedIn(false);
                        showUpdatePasswordMessage();
                        handleLogout();
                    }
                } else {
                    throw new Error("Failed to update user data");
                }
            }
        } catch (error) {
            showErrorToast("Failed to save changes. Please try again later.");
            console.error("Failed to save changes:", error);
        }
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

    return (
        <div>
             <div className="user-settings-description" >
             All fields are editable either individually or simultaneously. The email mast contain "@" character. The password should be at least 8 characters long and must include a combination of letters, numbers, and either '!' or '?'.
                </div>
            <div className="user-settings-wrapper">
                <label className="user-label name">Name</label>
                <div className="user-value">
                    <input
                        className="user-settings-input"
                        type="text"
                        placeholder="Johnathan Doe"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
            </div>
            <div className="user-settings-wrapper">
                <label className="user-label">Email</label>
                <div className="user-value">
                    <input
                        className="user-settings-input"
                        type="email"
                        placeholder="johnathan@admin.com"
                        onChange={handleEmailChange}
                    />
                </div>
            </div>
            <div className="user-settings-wrapper">
                <label className="user-label">Password</label>
                <div className="user-value">
                    <input
                        className="user-settings-input"
                        type="password"
                        placeholder="password"
                        onChange={handlePasswordChange}
                    />
                </div>
            </div>
            <div className="button-settings-wrapper" >
                <button
                    className="update-profile-button"
                    onClick={handleUpdateProfile}
                >
                    Update Profile
                </button>
            </div>
            {showConfirmationModal && <CautionPopup onCancel={handleCancel} onConfirm={handleConfirmChanges} />}
        </div>
    );
}

export default UpdateUserSettings;

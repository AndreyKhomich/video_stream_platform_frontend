import React, { useState, useEffect } from "react";
import "../css/changeprofile.css";
import UploadProfilePicturePopup from "./UploadProfilePicturePopup";
import UpdateChannelSettings from "./UpdateChannelSettings";
import UpdateUserSettings from "./UpdateUserSettings";
import UserSettingsInfo from "./UserSettingsInfo";
import axios from "axios";

function ProfileSettings({ userId, jwtToken, setIsLoggedIn }) {
    const [isUploadImageVisible, setUpUploadImageVisible] = useState(false);
    const [user, setUser] = useState(null);

    const toggleUploadImage = () => {
        setUpUploadImageVisible(!isUploadImageVisible);
    };

    const updateUserPhoto = (newPhotoUrl) => {
        setUser(prevUser => ({
            ...prevUser,
            user_photo: newPhotoUrl
        }));
    };

    const updateUserName = (newUserName) => {
        setUser(prevUser => ({
            ...prevUser,
            user_name: newUserName
        }));
    };

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
        <>
            <div className="user-details">
                <div className="user-details-heading">Update user settings</div>
            </div>
            <div className="change-profile">
                <div className="user-settings">
                    <UpdateUserSettings
                        userId={userId}
                        jwtToken={jwtToken}
                        setIsLoggedIn={setIsLoggedIn}
                        updateUserName={updateUserName}
                    />
                    <UpdateChannelSettings
                        userId={userId}
                        jwtToken={jwtToken}
                    />
                </div>
                {user && (
                    <UserSettingsInfo
                        toggleUploadImage={toggleUploadImage}
                        jwtToken={jwtToken}
                        user={user}
                    />
                )}
                {isUploadImageVisible && (
                    <UploadProfilePicturePopup
                        isUploadImageVisible={isUploadImageVisible}
                        toggleUploadImage={toggleUploadImage}
                        userId={userId}
                        jwtToken={jwtToken}
                        updateUserPhoto={updateUserPhoto}
                    />
                )}
                {isUploadImageVisible && <div className="overlay"></div>}
            </div>
        </>
    );
}

export default ProfileSettings;

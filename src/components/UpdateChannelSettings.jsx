import React, { useState, useEffect } from "react";
import useErrorToast from '../hooks/useErrorToast';
import { toast } from 'react-toastify';
import axios from "axios";

function UpdateChannelSettings({ userId, jwtToken }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [nameLength, setNameLength] = useState(name.length);
    const [descriptionLength, setDescriptionLength] = useState(description.length);

    const showErrorToast = useErrorToast();

    const showUpdateNameMessage = () => {
        toast.success('Name updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        })
    };

    const showUpdateDEscriptionMessage = () => {
        toast.success('Description updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleUpdateChannel = async () => {
        try {
            const updates = {};
            if (name) updates.name = name;
            if (description) updates.description = description;

            if (Object.keys(updates).length > 0) {
                const Response = await axios.patch(
                    `http://localhost:8010/channel/update/${userId}`,
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
                        showUpdateNameMessage();
                        setName("");
                    }

                    if (updates.description) {
                        showUpdateDEscriptionMessage();
                        setDescription("");
                    }
                } else {
                    throw new Error("Failed to update user data");
                }
            }
        } catch (error) {
            showErrorToast("Failed to save changes. Please try again later.");
        }
    };



    useEffect(() => {
        setNameLength(name.length);
    }, [name])


    useEffect(() => {
        setDescriptionLength(description.length);
    }, [description])


    return (
        <>
            <div className="channel-details">
                <div className="channel-details-text">
                    Update channel settings
                </div>
            </div>
            <div className="update-channel">
                    <div className="user-settings-wrapper">
                        <div className="channel-settings-description" >
                          All fields are editable either individually or simultaneously.
                          The name length must not exceed 100 characters.  Current length: {nameLength} / 100.
                          The description length must not exceed 1000 characters. Current length: {descriptionLength} / 1000
                        </div>
                        <label className="user-label name">Name</label>
                        <div className="channel-value">
                            <input
                                className="user-settings-input"
                                type="text" 
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                    </div>
                    <div className="user-settings-wrapper">
                        <label className="user-label">Description</label>
                        <div className="user-value">
                            <textarea
                                className="update-channel-textarea"
                                rows="4"
                                placeholder="Description"
                                value={description}
                                onChange={handleDescriptionChange}
        
                            ></textarea>
                        </div>
                    </div>
                    <div className="button-settings-wrapper" >
                        <button className="update-profile-button" onClick={handleUpdateChannel}>Update Channel</button>
                    </div>
            </div>
        </>
    );
}

export default UpdateChannelSettings;

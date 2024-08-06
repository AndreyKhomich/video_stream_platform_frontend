import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useErrorToast from '../hooks/useErrorToast';
import "../css/createchannelpopup.css";

function CreateChannelPopup({ toggleChannelForm, userId, jwtToken }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameLength, setNameLength] = useState(name.length);
  const [descriptionLength, setDescriptionLength] = useState(description.length);
 
  const navigate = useNavigate();
  const showErrorToast = useErrorToast();

  const handleChannelCreate = () => {
    navigate("/uploaded-videos/upload");
  };

  const handleCreateChannel = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", event.target.elements.channelName.value);
    formData.append(
      "description",
      event.target.elements.channelDescription.value
    );

    if (userId) {
        try {
            const response = await axios.post(
              `http://localhost:8010/channel/${userId}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );
      
            if (response.status === 201) {
              handleChannelCreate();
            } 
          } catch (error) {
            console.error("Error:", error.message);
            if (error.response && error.response.data.detail === "The length of the channel name is too long") {
              showErrorToast('The length of the channel name can`t be more than 100 characters');
            } else if (error.response && error.response.data.detail === "The length of the channel description is too long") {
              showErrorToast("The length of the channel description can`t be more than 500 characters");
            } else {
              console.error(error); 
            }
          }
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
      
        <div className="upload-container-channel">
          <header>
            <h1>Create Channel</h1>
            <button className="close-popup-button" 
            onClick={toggleChannelForm}
            >
              X
            </button>
          </header>
          <main>
            <form
              id="createChannelForm"
              onSubmit={handleCreateChannel}
            >
              <div className="form-group">
                <label htmlFor="channelName">Channel Name:</label>
                <input
                  type="text"
                  className="channel-name-popup"
                  name="channelName"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <p>The name length must not exceed 100 characters. Current length: {nameLength} / 100.</p>
              <div className="form-group">
                <label htmlFor="channelDescription">Description:</label>
                <textarea
                  className="channel-description-popup"
                  name="channelDescription"
                  rows="4"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <p>The name length must not exceed 500 characters. Current length: {descriptionLength} / 500.</p>
              <button type="submit" className="submit-button-channel">
                Create Channel
              </button>
            </form>
          </main>
          <footer>
            <p>&copy; 2024 YourPlatform. All rights reserved.</p>
          </footer>
        </div>
    </>
  );
}

export default CreateChannelPopup;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useErrorToast from '../hooks/useErrorToast';
import Loader from "./Loader";
import "../css/uploadvideopopup.css";
import axios from "axios";

function UploadVideoPopup({ userId, jwtToken, isUploadFormVisible }) {
  const [taskId, setTaskId] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [channelId, setChannelId] = useState(null); 

  const showErrorToast = useErrorToast();

  const handleUploadClick = () => {
    navigate("/uploaded-videos");
  };

  const handleUploadFile = (event) => {
    setFile(event.target.files[0]);
  };

  const showSuccessMessage = () => {
    toast.success('Video was uploaded', {
      position: toast.POSITION.TOP_LEFT,
      className: 'toast-message',
    });
  };

  useEffect(() => {
    if (taskId) {
      const source = new EventSource(
        `http://localhost:8010/video/check_upload_status/${taskId}`
      );
      source.addEventListener("message", function (event) {
        const result = event.data;
        if (result === "Video uploaded successfully") {
          setLoading(false);
          source.close();
          showSuccessMessage();
          navigate("/uploaded-videos");
        }
      });

      return () => {
        source.close();
      };
    }
  }, [taskId]);

  useEffect(() => {
    if (channelId && file) {
      const uploadVideo = async () => {
        try {
          const formData = new FormData();
          formData.append("title", document.getElementById('videoTitle').value);
          formData.append("description", document.getElementById('videoDescription').value);
          formData.append("video_file", file);

          const response = await axios.post(
            `http://localhost:8010/video/upload/${channelId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );

          if (response.status === 201) {
            const taskId = response.data.task_id;
            setTaskId(taskId);
          } else {
            const errorData = await response.json();
            console.error("Error:", errorData.message);
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      };

      uploadVideo();
    }
  }, [channelId, file, jwtToken]);

  const handleUpload = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:8010/channel/${userId}`);
      if (response.status === 200) {
        setChannelId(response.data.id);
      }
    } catch (error) {
      showErrorToast("Something went wrong. Please try again later");
      console.error("Error fetching channel ID:", error.message);
    }
  };
   
  return (
    <>
      {isUploadFormVisible && (
        <div className="upload-container">
          <header>
            <h1>Upload Video</h1>
            <button className="close-popup-button" onClick={handleUploadClick}>
              X
            </button>
          </header>
          <main>
            <form
              id="uploadForm"
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleUpload}
            >
              <div className="form-group">
                <label htmlFor="videoTitle">Title:</label>
                <input
                  type="text"
                  className="video-title"
                  id="videoTitle"
                  name="videoTitle"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="videoDescription">Description:</label>
                <textarea
                  className="video-description"
                  id="videoDescription"
                  name="videoDescription"
                  rows="4"
                  required
                  disabled={loading}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="videoFile">Choose Video File:</label>
                <input
                  type="file"
                  id="videoFile"
                  name="videoFile"
                  accept="video/*"
                  required
                  onChange={handleUploadFile}
                  disabled={loading}
                />
              </div>
              <button type="submit" className="submit-button">
                Upload Video
              </button>
            </form>
          </main>
          <footer>
            <p>&copy; 2024 YourPlatform. All rights reserved.</p>
          </footer>
        </div>
      )}
      {loading && <Loader />}
    </>
  );
}

export default UploadVideoPopup;

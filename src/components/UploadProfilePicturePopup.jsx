import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useErrorToast from '../hooks/useErrorToast';
import Loader from "./Loader";
import axios from "axios";
import "../css/uploadprofileimagepopup.css";

function UploadProfilePicturePopup({ userId, jwtToken, isUploadImageVisible, toggleUploadImage, updateUserPhoto}) {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoTaskId, setuserPhotoTaskId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const showErrorToast = useErrorToast();

  const showUpdateThumbnailMessage = () => {
      toast.success('Thumbnail updated successfully', {
          position: toast.POSITION.TOP_LEFT,
          className: 'toast-message',
      });
  };
  const handlePhotoUpdate = (event) => {
    setUserPhoto(event.target.files[0]);
};

  const handleSubmit = async () => {
    setLoading(true);
    try {
    
        if (userPhoto && userId) {
            const formData = new FormData();
            formData.append('video_file', userPhoto);

            const response = await axios.put(
                `http://localhost:8010/user/upload_user_thumbnail/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${jwtToken}`
                    }
                }
            );

            if (response.status === 202) {
                setuserPhotoTaskId(response.data.task_id);
            } else {
                throw new Error("Failed to upload profile image");
            }
        }
    } catch (error) {
        showErrorToast("Failed to save changes. Please try again later.");
        console.error("Failed to save changes:", error);
    }
};

useEffect(() => {
    if (userPhotoTaskId) {
        const eventSource = new EventSource(
            `http://localhost:8010/user/check_upload_user_photo_status/${userPhotoTaskId}`
        );

        eventSource.addEventListener("message", function (event) {
            const result = event.data;
            if (result.startsWith("User thumbnail updated successfully")) {
                const thumbnailURL = result.split("\n")[1].substring("Thumbnail URL: ".length);
                console.log(thumbnailURL);
                eventSource.close();
                showUpdateThumbnailMessage();
                setIsSuccess(true); 
                updateUserPhoto(thumbnailURL); 
                
                
            } else if (result === "Invalid image file") {
                eventSource.close();
                showErrorToast("Failed to save changes. You have to upload only image file.");
            }

            else if (result === "File size too large") {
              eventSource.close();
              setLoading(false);
              showErrorToast("Failed to save changes. The file size has to be less than 10MB.");
            }
            else {
              eventSource.close();
              setLoading(false);
              showErrorToast("Failed to save changes. Please try again later.");
            }
        });

        return () => {
            eventSource.close();
        };
    }
}, [userPhotoTaskId]);


useEffect(() => {
  if (isSuccess) {
      toggleUploadImage();
  }
}, [isSuccess, toggleUploadImage]);

   
  return (
    <>
       {isUploadImageVisible && <div className="upload-image-container">
          <header>
            <h1>Update Profile Image</h1>
            <button className="close-popup-button" onClick={toggleUploadImage}>
              X
            </button>
          </header>
          <main>
              <div className="form-group">
                <label htmlFor="videoFile">Choose Image:</label>
                <input
                  type="file"
                  id="videoFile"
                  name="videoFile"
                  accept="image/*"
                  onChange={handlePhotoUpdate}
                  required
                  disabled={loading}
                />
              </div>
              <button 
              type="submit"
              className="submit-button"  
              onClick={handleSubmit}
              disabled={loading}
               >
                Upload Image
              </button>
          </main>
          <footer>
            <p>It’s recommended to use a picture that’s at least 98 x 98 pixels and less then 10MB. Use PNG, gpg or JPEG file.</p>
          </footer>
        </div>}
      {loading && <Loader />}
    </>
  );
}

export default UploadProfilePicturePopup;

import React from "react";
import "../css/uploadvideopopup.css";

function UploadVideoPopup({ isSidebarHidden }) {

    return (
        <div className="upload-container">
          <header>
            <h1>Upload Video</h1>
          </header>
          <main>
            <form id="uploadForm" encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="videoTitle">Title:</label>
                <input type="text" className="video-title" name="videoTitle" required />
              </div>
              <div className="form-group">
                <label htmlFor="videoDescription">Description:</label>
                <textarea className="video-description" name="videoDescription" rows="4" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="videoFile">Choose Video File:</label>
                <input type="file" id="videoFile" name="videoFile" accept="video/*" required />
              </div>
              <button type="submit">Upload Video</button>
            </form>
          </main>
          <footer>
            <p>&copy; 2024 YourPlatform. All rights reserved.</p>
          </footer>
        </div>
      );
    }
    

export default UploadVideoPopup;
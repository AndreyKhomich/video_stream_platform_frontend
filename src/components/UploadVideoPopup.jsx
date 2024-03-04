import React, { useState, useEffect } from "react";
import "../css/uploadvideopopup.css";
import axios from 'axios';

function UploadVideoPopup({ userId, jwtToken, toggleUploadForm, isUploadFormVisible }) {
    const [taskStatus, setTaskStatus] = useState('');
    console.log(userId);



    const handleUpload = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const title = formData.get('videoTitle');
        const description = formData.get('videoDescription');
        const file = formData.get('videoFile');

        if (userId) {
            try {
                const response = await axios.post(`http://127.0.0.1:8010/upload/${userId}/`, {
                    title: title,
                    description: description,
                    file: file
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                      },
                });
    
                if (response.ok) {
                    // Task started successfully, show message or perform any additional actions
                    setTaskStatus('Task started successfully');
                } else {
                    // Handle error response
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }    
    };

  
    useEffect(() => {
        if (userId) {
            const socket = new WebSocket(`ws://127.0.0.1:8010/ws/${userId}`);
            socket.onopen = () => {
                console.log('WebSocket connected');
            };
    
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setTaskStatus(data.message);
            };
    
            socket.onclose = () => {
                console.log('WebSocket closed');
            };
    
            return () => {
                socket.close();
            };
        }
    }, [userId]);
    

    return (
        <>
            {isUploadFormVisible && (
                <div className="upload-container">
                    <header>
                        <h1>Upload Video</h1>
                        <button className="close-popup-button" onClick={toggleUploadForm}>
                            X
                        </button>
                    </header>
                    <main>
                        <form id="uploadForm" method="POST" encType="multipart/form-data">
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
                            <button type="submit" className="submit-button" onSubmit={handleUpload}>Upload Video</button>
                        </form>
                    </main>
                    <footer>
                        <p>&copy; 2024 YourPlatform. All rights reserved.</p>
                        <p>Task Status: {taskStatus}</p>
                    </footer>
                </div>
            )}
        </>
    );
}

export default UploadVideoPopup;

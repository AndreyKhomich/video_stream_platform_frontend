import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/changevideo.css";
import UpdateVideo from "./UpdateVideo";
import ShowVideoInfo from "./ShowVideoInfo";
import useErrorToast from '../hooks/useErrorToast';
import { toast } from 'react-toastify';


function ChangeVideo({ jwtToken }) {
    const { video_id } = useParams();
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailTaskId, setThumbnailTaskId] = useState(null);
    const showErrorToast = useErrorToast();


    const showUpdateTitleMessage = () => {
        toast.success('Title updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        });
    };

    const showUpdateDescriptionMessage = () => {
        toast.success('Description updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        });
    };

    const showUpdateThumbnailMessage = () => {
        toast.success('Thumbnail updated successfully', {
            position: toast.POSITION.TOP_LEFT,
            className: 'toast-message',
        });
    };


    const handleUndo = () => {
        setTitle("");
        setDescription("");
        setThumbnail(null);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        setThumbnail(event.target.files[0]);
    };

    useEffect(() => {

        const fetchData = async () => {
            if (video_id) {
                try {
                    const response = await axios.get(
                        `http://localhost:8010/video/${video_id}`
                    );
                    const data = response.data;
                    setVideo(data);
                } catch (error) {
                    console.error("Failed to fetch video:", error);
                }
            }
        };

        fetchData();
    }, [video_id]

    );

    const handleSave = async () => {
        try {
            const updates = {};

            if (title) {
                updates.title = title;
            }

            if (description) {
                updates.description = description;
            }

            if (Object.keys(updates).length > 0) {
                const videoResponse = await axios.patch(
                    `http://localhost:8010/video/update/${video_id}`,
                    updates,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    }
                );

                if (videoResponse.status === 202) {
                    if (updates.title) {
                        showUpdateTitleMessage();
                        setVideo(prevVideo => ({ ...prevVideo, title: title }));
                        setTitle("");
                    }

                    if (updates.description) {
                        showUpdateDescriptionMessage();
                        setDescription("");
                    }
                } else {
                    throw new Error("Failed to update video data");
                }
            }

            if (thumbnail) {
                const formData = new FormData();
                formData.append('video_file', thumbnail);

                const thumbnailResponse = await axios.put(
                    `http://localhost:8010/video/upload_video_thumbnail/${video_id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    }
                );

                if (thumbnailResponse.status === 202) {
                    setThumbnailTaskId(thumbnailResponse.data.task_id);
                } else {
                    throw new Error("Failed to upload thumbnail");
                }
            }
        } catch (error) {
            showErrorToast("Failed to save changes. Please try again later.");
            console.error("Failed to save changes:", error);
        }
    };

    useEffect(() => {
        if (thumbnailTaskId) {
            const eventSource = new EventSource(
                `http://localhost:8010/video/check_upload_thumbnail_status/${thumbnailTaskId}`
            );

            eventSource.addEventListener("message", function (event) {
                const result = event.data;
                console.log(result);
                if (result.startsWith("Video thumbnail updated successfully")) {
                    const thumbnailURL = result.split("\n")[1].substring("Thumbnail URL: ".length);
                    console.log(thumbnailURL);
                    setVideo(prevVideo => ({ ...prevVideo, thumbnail_url: thumbnailURL }));
                    eventSource.close();
                    setThumbnail(null);
                    showUpdateThumbnailMessage();
                } else if (result === "Invalid image file") {
                    eventSource.close();
                    setThumbnail(null);
                    showErrorToast("Failed to save changes. You have to upload only image file.");
                }
    
                else if (result === "File size too large") {
                  eventSource.close();
                  setThumbnail(null);
                  showErrorToast("Failed to save changes. The file size has to be less than 10MB.");
                }
                else {
                  eventSource.close();
                  setThumbnail(null);
                  showErrorToast("Failed to save changes. Please try again later.");
                }
            });

            return () => {
                eventSource.close();
            };
        }
    }, [thumbnailTaskId]);

    
    return (
        <>
            <div className="video-details">
                <div className="details-heading">Video details</div>
                <div className="details-buttons">
                    <button onClick={handleSave} className="save-button">Save</button>
                    <button onClick={handleUndo} className="undo-button">Undo Changes</button>
                </div>
            </div>
            <div className="change-video">
                <UpdateVideo
                    video={video}
                    jwtToken={jwtToken}
                    title={title}
                    description={description}
                    thumbnail={thumbnail}
                    handleTitleChange={handleTitleChange}
                    handleDescriptionChange={handleDescriptionChange}
                    handleFileChange={handleFileChange}
                />
                <ShowVideoInfo
                    video={video}
                    jwtToken={jwtToken}
                />

            </div>
        </>
    );
}

export default ChangeVideo;

import React, { useState } from "react";

function UpdateVideoThumbnail({ video, thumbnail, handleFileChange }) {
    const [uploadedImage, setUploadedImage] = useState(null);


    const handleFileInput = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUploadedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    return (
        <div className="form-settings-group">
            <p className="change-thumbnail-title">Thumbnail</p>
            <div className="change-video-description" >
                Thumbnail can be updated independently of the title and description, or in conjunction with them. The zise of image could not exceed 10MB. Expected image format is JPG.
            </div>
            <div className="thumbnail-container">
                {video && (
                    <img src={video.thumbnail_url} alt="Thumbnail" className="thumbnail-preview" />
                )}

                <div className="file-upload">
                    {uploadedImage && thumbnail ? (
                        <div className="thumbnail-preview-wrapper">
                            <img src={uploadedImage} alt="Uploaded Thumbnail" />
                            <button onClick={handleRemoveImage} className="remove-image-button">Remove</button>
                        </div>
                    ) : (
                        <div className="image-upload-wrap">
                            <input
                                className="file-upload-input"
                                type="file"
                                onChange={(event) => {
                                    handleFileInput(event);
                                    handleFileChange(event);
                                }}
                                accept="image/*"
                            />
                            <div className="drag-text">
                                <div className="neon-input-inner">
                                    <div className="neon-input-text">
                                        <h3>Drag & Drop file here</h3>
                                        <span>or</span>
                                    </div>
                                    <button className="neon-input-choose-btn">Browse File</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UpdateVideoThumbnail;

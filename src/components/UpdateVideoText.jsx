import React, { useState, useEffect } from "react";

function UpdateVideoText({ title, description, handleTitleChange, handleDescriptionChange }) {
    const [titleLength, setTitleLength] = useState(title.length);
    const [descriptionLength, setDescriptionLength] = useState(description.length);

    const handleTitleInputChange = (event) => {
        const newValue = event.target.value;
        setTitleLength(newValue.length);
        handleTitleChange(event); 
    };

    const handleDescriptionInputChange = (event) => {
        const newValue = event.target.value;
        setDescriptionLength(newValue.length);
        handleDescriptionChange(event); 
    };


    useEffect(() => {
        setTitleLength(title.length);
    }, [title])


    useEffect(() => {
        setDescriptionLength(description.length);
    }, [description])

    
    return (
        <>
            <div className="form-settings-group custom-margin-top">
                <label className="title-label">Title</label>
                <div className="change-video-description" >
                Title can be updated independently of the description and image, or in conjunction with them. The title length must not exceed 100 characters.
                    Current length: {titleLength} / 100
                </div>
                <textarea
                    value={title}
                    onChange={handleTitleInputChange}
                    className="video-settings-title"
                    id="videoSettingsTitle"
                    name="videoSettingsTitle"
                    rows="4"
                ></textarea>
            </div>
            <div className="form-settings-group">
                <label className="description-label">Description</label>
                <div className="change-video-description" >
                Description can be updated independently of the title and image, or in conjunction with them. The length of description can't be more than 2000 characters. 
                    Current length: {descriptionLength} / 2000
                    </div>
                <textarea
                    value={description}
                    onChange={handleDescriptionInputChange}
                    className="video-settings-description"
                    id="videoSettingsDescription"
                    name="videoSettingsDescription"
                    rows="8"
                ></textarea>
            </div>
        </>
    );
}

export default UpdateVideoText;

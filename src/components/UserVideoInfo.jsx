import React from "react";

function UserVideoInfo({ video }) {

    return (
        <div className="flex-div">
            <div className="vid-info-profile">
                <p className="profile-vid-title">{video.title}</p>
                <p className='profile-vid-views'>{video.views} views &bull; 2 days</p>
            </div>
        </div>
    );
}

export default UserVideoInfo;
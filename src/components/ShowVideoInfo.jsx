import React, { useState } from "react";
import VideoDetails from "./VideoDetails";
import DeleteVideo from "./DeleteVideo";
import CommentSettings from "./CommentSettings";


function ShowVideoInfo({ video, jwtToken }) {
    

    return (
        <div className="video-wrapper">
           <VideoDetails video ={video}/>
           <DeleteVideo video ={video} jwtToken={jwtToken}/>
           <CommentSettings/>
        </div>
    );
}

export default ShowVideoInfo;
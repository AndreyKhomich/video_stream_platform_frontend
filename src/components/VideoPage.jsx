import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import VideoDetails from "./VideoDetails";
import Publisher from "./Publisher";
import VideoDescription from "./VideoDescription";
import RightSidebar from "./RightSidebar";
import VideoPlayerInfo from "./VideoPlayerInfo";

import "../css/videopage.css";
import axios from "axios";

function VideoPage({ isLoggedIn, jwtToken }) {
  const { video_id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/video/${video_id}`
        );
        const data = response.data;
        setVideo(data);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    };

    fetchData();
  }, [video_id]);

  return (
    <div className="play-video-page">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="container play-container">
        <div className="row">
          <div className="play-video">
            {video && (
              <video
                className="video"
                src={video.url}
                controls
                // poster={video.thumbnail_url}
                loop
                preload="auto"
              ></video>
            )}

            {video && <VideoPlayerInfo video={video} />}
            <hr />
            {video && <Publisher video={video} isLoggedIn={isLoggedIn} jwtToken={jwtToken} />}
            <VideoDetails />
            <VideoDescription />
          </div>
          <div className="right-sidebar">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;

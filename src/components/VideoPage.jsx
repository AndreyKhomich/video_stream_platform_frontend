import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Publisher from "./Publisher";
import VideoDescription from "./VideoDescription";
import VideoPlayerInfo from "./VideoPlayerInfo";
import Sidebar from "./sidebar/Sidebar";
import VideoList from "./VideoList";
import "../css/videopage.css";
import axios from "axios";

function VideoPage({ isLoggedIn, jwtToken, isSidebarHidden, isContainerLarge, toggleSidebar, toggleContainerSize, userId }) {
  const { video_id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8010/video/${video_id}`
        );
        const data = response.data;
        setVideo(data);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    };

    fetchData();
  }, [video_id]);


  const increaseViewCount = async () => {
    try {
      await axios.post(`http://127.0.0.1:8010/video/${video_id}`, 
      {
        user_id: userId
      }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    } catch (error) {
      console.error("Failed to increase view count:", error);
    }
  };

  const handleVideoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    increaseViewCount();
  };

  return (
    <div className="play-video-page">
      <Navbar isLoggedIn={isLoggedIn} toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize} />
      {isLoggedIn && <Sidebar isSidebarHidden={isSidebarHidden}/>}
      <div className={`play-container ${isContainerLarge ? 'large-container' : ''} container ${isLoggedIn ? 'logged-in-container-video-page' : ''} `}>
        <div className="row">
          <div className="play-video">
            {video && (
              <video
                className="video"
                src={video.url}
                controls={true} 
                poster={video.thumbnail_url}
                preload="none"
                onPlay={increaseViewCount}
              ></video>
            )}

            {video && <VideoPlayerInfo video={video} isLoggedIn={isLoggedIn} jwtToken={jwtToken} userId={userId} />}
            <hr />
            {video && <Publisher video={video} isLoggedIn={isLoggedIn} jwtToken={jwtToken} />}
            {video &&<VideoDescription video={video} isLoggedIn={isLoggedIn} jwtToken={jwtToken} userId={userId}/>}
          </div>
          <div className="right-sidebar">
            {video &&  <VideoList isShowView={false} containerClass="side-video-list" videoListClass="small-video" isVideoPage={true} handleVideoClick={handleVideoClick}/>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;

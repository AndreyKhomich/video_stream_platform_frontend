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

function VideoPage({ 
  isLoggedIn,
  setIsLoggedIn, 
  jwtToken, 
  isSidebarHidden, 
  isContainerLarge, 
  toggleSidebar, 
  toggleContainerSize, 
  userId, 
  user,
}) {
  const { video_id } = useParams();
  const [video, setVideo] = useState(null);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);


  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8010/video/${video_id}`
        );
        const data = response.data;
        setVideo(data);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    };

    fetchVideo();
  }, [video_id]);


  const increaseViewCount = async () => {
    if (!isVideoPlayed) {
      try {
        await axios.post(
          `http://localhost:8010/video/${video_id}`,
          {
            user_id: userId
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setIsVideoPlayed(true);
      } catch (error) {
        console.error("Failed to increase view count:", error);
      }
    }
  };

  const handleVideoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="play-video-page">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} toggleSidebar={toggleSidebar} toggleContainerSize={toggleContainerSize} userId={userId} user={user} />
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
                muted={false}
                // enablePictureInPicture
                playsInline
                onPlay={increaseViewCount}
                controlsList="nodownload"
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

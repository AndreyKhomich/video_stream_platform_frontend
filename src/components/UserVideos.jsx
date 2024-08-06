import React, { useRef, useState, useEffect } from 'react';
import Pagination from "./Pagination";
import UserVideoInfo from "./UserVideoInfo";
import chat from "../images/chat.png";
import { Link } from "react-router-dom";
import SubscriptionButton from './SubscriptionButton';
import Axios from 'axios';

function UserVideos({ userId, isLoggedIn, jwtToken, user }) {
  console.log(userId)

  const videoRefs = useRef({});
  const [showVideoDetails, setShowVideoDetails] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const handleVideosClick = async (page, size) => {
    try {
      if (userId && size && page) {
        const response = await Axios.get(`http://127.0.0.1:8010/video/videos/${userId}?page=${page}&size=${size}`);

        const sortedVideos = response.data.items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        setVideoDetails(sortedVideos);
        setTotalPages(response.data.pages);
        setShowVideoDetails(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
        setShowVideoDetails(false);
      }
    }
  };


  useEffect(() => {
    handleVideosClick(currentPage, pageSize);
  }, [userId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleVideosClick(page, pageSize);
  };
  console.log(videoDetails);

  const handleMouseEnter = (videoId) => {
    const videoElement = videoRefs.current[videoId];

    if (videoElement && !videoElement.error) {
      if (document.body.contains(videoElement)) {
        if (videoElement.paused || videoElement.ended) {
          videoElement.play().catch((error) => {
            console.error("Error playing video:", error);
          });
        }
      } else {
        videoElement.pause();
      }
    }
  };

  const handleMouseLeave = (videoId) => {
    if (videoRefs.current[videoId]) {
      videoRefs.current[videoId].pause();
    }
  };


  return (
    <>

      <div className="video-list-container">
        <ul className="categories">
          <li>Videos</li>
          <li>Playlists</li>
        </ul>
        <div className='profile-info-buttons'>
          {isLoggedIn && user && (
            <SubscriptionButton
              channelId={user.channel.id}
              isLoggedIn={isLoggedIn}
              jwtToken={jwtToken}
            />
          )}
          <img src={chat} alt="search" />
        </div>
        <div className="gallery">
          {videoDetails.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id}>
              <div className="col-md-4">
                <video
                  className="video"
                  src={`${video.url}#t=,20`}
                  controls={false}
                  controlsList="nodownload"
                  poster={video.thumbnail_url}
                  muted
                  // onClick={handleVideoClick}
                  disablePictureInPicture
                  preload="metadata"
                  playsInline
                  onMouseEnter={() => handleMouseEnter(video.id)}
                  onMouseLeave={() => handleMouseLeave(video.id)}
                  ref={(el) => {
                    videoRefs.current[video.id] = el;
                  }}
                ></video>
                <UserVideoInfo video={video} />
              </div>
            </Link>
          ))}

          {showVideoDetails && <Pagination
            currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}
          />}
        </div>
      </div>

    </>

  );
}


export default UserVideos;
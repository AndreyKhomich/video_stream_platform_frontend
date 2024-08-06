import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoInfo from "./VideoInfo";
import Axios from 'axios';

function VideoList({
  isShowView,
  containerClass,
  videoListClass,
  isVideoPage,
  handleVideoClick
}) {
  const videoRefs = useRef({});
  const [allVideos, setAllVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const response = await Axios.get(`http://127.0.0.1:8010/video?page=${page}`);
      setAllVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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

  useEffect(() => {
    const container = document.querySelector(`.${containerClass}`);

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages && !loading) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    const lastVideoElement = document.querySelector(`.${videoListClass}:last-child video`);
    if (lastVideoElement) {
      observer.observe(lastVideoElement);
    }

    return () => {
      if (lastVideoElement) {
        observer.unobserve(lastVideoElement);
      }
    };
  }, [currentPage, totalPages, loading, containerClass, videoListClass]);

  return (
    <div className={containerClass}>
      {allVideos.map((video) => (
        <Link to={`/video/${video.id}`} key={video.id}>
          <div className={videoListClass}>
            <video
              className="video"
              src={`${video.url}#t=,20`}
              controls={false}
              controlsList="nodownload"
              poster={video.thumbnail_url}
              muted
              onClick={handleVideoClick}
              disablePictureInPicture
              preload="metadata"
              playsInline
              onMouseEnter={() => handleMouseEnter(video.id)}
              onMouseLeave={() => handleMouseLeave(video.id)}
              ref={(el) => {
                videoRefs.current[video.id] = el;
              }}
            ></video>
            <VideoInfo videoViews={isShowView ? video.view_count : ''} isVideoPage={isVideoPage} video={video} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoList;
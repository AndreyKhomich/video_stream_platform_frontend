import React, {useRef} from "react";
import { Link } from "react-router-dom";
import VideoInfo from "./VideoInfo";

function VideoList({ videos }) {
  const videoRefs = useRef({});

  const handleMouseEnter = (videoId) => {
    if (videoRefs.current[videoId]) {
      videoRefs.current[videoId].play();
    }
  };

  const handleMouseLeave = (videoId) => {
    if (videoRefs.current[videoId]) {
      videoRefs.current[videoId].pause();
    }
  };

  return (
    <div className="list-container">
      {videos.map((video) => (
        <Link to={`/video/${video.id}`} key={video.id}>
          <div className="vid-list">
            <video
              className="video"
              src={`${video.url}#t=,20`} 
              controls={false}
              // poster={video.thumbnailUrl}
              loop
              muted
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload"
              onMouseEnter={() => handleMouseEnter(video.id)}
              onMouseLeave={() => handleMouseLeave(video.id)}
              ref={(el) => {
                videoRefs.current[video.id] = el;
              }}
            >
            </video>
            <VideoInfo
              videoName={video.title}
              videoViews={video.view_count}
              channelName={video.channel.name}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoList;
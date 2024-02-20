import React from "react";
import VideoLike from './VideoLike';
import VideoDislike from './VideoDislike';
import ShareLink from "./ShareLink";

function VideoPlayerInfo({ video, isLoggedIn, jwtToken, userId }) {

  return (
    <div className="play-video-info">
      <p>{video.view_count} Views &bull; 2 days ago</p>

      <div className="play-vide-info-ditail">
        <VideoLike video={video} isLoggedIn={isLoggedIn} jwtToken={jwtToken} userId={userId}/>
        <VideoDislike video={video} isLoggedIn={isLoggedIn} jwtToken={jwtToken} userId={userId}/>
        <ShareLink video={video}/>
      </div>
    </div>
  );
}

export default VideoPlayerInfo;

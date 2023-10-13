import React from "react";
import like from "../images/like.png";
import dislike from "../images/dislike.png";
import share from "../images/share.png";


function VideoPlayerInfo({ video }) {
  return (
    <div className="play-video-info">
            <p>{video.view_count} Views &bull; 2days ago</p>

            <div>
              <a href="#"><img src={like} alt="like" />{video.like_count}</a>
              <a href="#"><img src={dislike} alt="dislike" />{video.dislike_count}</a>
              <a href="#"><img src={share} alt="share" />Share</a>
            </div>
          </div>
  );
}

export default VideoPlayerInfo;
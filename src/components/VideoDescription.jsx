import React from 'react';
import ListComments from './comments/ListComments';


function VideoDescription({ video, isLoggedIn, jwtToken, userId}) {
  return (
    <div className="vid-description">
      <p>{video.description}</p>
            <hr />
            <h4>{video.comment_count} Comments</h4>
            <ListComments video={video} isLoggedIn={isLoggedIn} jwtToken={jwtToken} userId={userId} />
    </div>
  );
}

export default VideoDescription;
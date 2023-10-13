import React from 'react';
import AddComment from './AddComment';
import OldComment from './OldComment';

function VideoDescription() {
  return (
    <div className="vid-description">
      <p>
              "Welcome to our vibrant video world! 🌟 Explore a diverse range of
              captivating content that promises to entertain, educate, and
              inspire. Dive into a sea of creativity, where each video is a
              unique story waiting to unfold. From thrilling adventures to
              thought-provoking discussions, our channel is your passport to
              endless entertainment. Join our community of enthusiasts, share
              your thoughts, and embark on a journey of discovery. Subscribe now
              and be a part of this exciting video-sharing adventure!"
            </p>
            <hr />
            <h4>134 Comments</h4>
            <AddComment />
            <OldComment/>
    </div>
  );
}

export default VideoDescription;
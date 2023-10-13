import React from 'react';
import avatar from "../images/Jack.png";
import like from "../images/like.png";
import dislike from "../images/dislike.png";

function OldComment() {
  return (
    <div className="old-comment">
    <img src={avatar} alt="avatar" />
    <div>
      <h3>Jack Nicholson <span> 2 days ago</span></h3>
      <p>
        "Wow, this video is absolutely mind-blowing! The visuals are
        stunning, and I can't get enough of the engaging content.
        Kudos to the creators for their hard work and dedication. This
        is the kind of quality content that keeps me coming back for
        more. I'm already looking forward to the next upload!
      </p>
      <div className="comment-action">
        <img src={like} alt="like" />
        <span>244</span>
        <img src={dislike} alt="dislike" />
        <span>2</span>
        <span>REPLAY</span>
        <a href="#">All replies</a>
      </div>
    </div>
  </div>
  );
}

export default OldComment;
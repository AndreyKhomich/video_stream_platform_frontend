import React from 'react';
import avatar from "../images/Jack.png";

function AddComment() {
  return (
    <div className="add-comment">
    <img src={avatar} alt="avatar" />
    <input type="text" placeholder="write comment" />
    <button className="addComment" type="button"> Add Comment </button>
    <button className="removeComment" type="button"> Remove Comment </button>
  </div>
  );
}

export default AddComment;
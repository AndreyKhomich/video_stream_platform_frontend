import React from "react";
import avatar from "../../images/Jack.png";
import CommentForm from "./CommentForm";

function Comment({ 
    comment,
    replies, 
    userId, 
    deleteComment, 
    setActiveComment, 
    activeComment, 
    addComment, 
    parentId = null, 
    updateComment,
    setIsCommenting             
}) {
  const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === "editing";
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = Math.abs(new Date() - new Date(comment.timestamp)) > fiveMinutes;
  const canReply = Boolean(userId);
  const canEdit = parseInt(userId) === parseInt(comment.user_id) && !timePassed;
  const canDelete = parseInt(userId) === parseInt(comment.user_id) && !timePassed;
  const createdAt = new Date(comment.timestamp).toLocaleDateString();
  const replyId = parentId ? parentId : comment.id;

  return (
    <div className="old-comment">
        <img src={avatar} alt="avatar" />
     <div className="comment-right-part">
        <div className="comment-content">
            <h3>{comment.username}
            <span>{createdAt}</span>
            </h3>
        </div>
        {!isEditing && <p>{comment.text}</p>}
      
        <div className="comment-action">
            {canReply && <span onClick={() => setActiveComment({ id: comment.id, type: "replying" })}>Reply</span>}
            {canEdit && <span  onClick={() => setActiveComment({ id: comment.id, type: "editing" })}>Edit</span>}
            {canDelete && <span onClick={() => deleteComment(comment.id)}>Delete</span>}
        </div>
        {isReplying && (
          <CommentForm
            handleSubmit={(text) => addComment(text, replyId)}
            isReplying={isReplying}
            setIsCommenting={setIsCommenting}
            setActiveComment={setActiveComment}
          />
        )}
        {isEditing && (
          <CommentForm
            initialText={comment.text}
            handleSubmit={(text) => updateComment(text, comment.id)}
            isEditing={isEditing}
            setIsCommenting={setIsCommenting}
            setActiveComment={setActiveComment}
            />
            )}
        {replies.length > 0 && (
            <div > 
            {replies.map(reply =>(
                <Comment 
                comment={reply} 
                key={reply.id} 
                replies={[]} 
                userId={userId} 
                deleteComment={deleteComment} 
                updateComment={updateComment}
                addComment={addComment} 
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                setIsCommenting={setIsCommenting}
                parentId={comment.id}
                />
            ))}
            </div>
        )}
     </div>
    </div>
  );
}

export default Comment;
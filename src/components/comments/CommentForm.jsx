import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  initialText = "",
  isLoggedIn,
  setActiveComment,
  isCommenting,
  setIsCommenting,
  isReplying,
  isEditing
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };


  const handleCommentClick = () => {
    setIsCommenting(true);
};

  const handleCancelClick = () => {
    setIsCommenting(false);

};

  return (
    <div className="add-comment">
      <form onSubmit={onSubmit}>
        <textarea
          maxLength="2000"
          className="write-comment"
          type="text"
          placeholder="write comment"
          onClick={handleCommentClick}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {(isLoggedIn && isCommenting) || isReplying || isEditing ? (
          <div className="submit-comment">
            <button
              className="comment-button"
              onSubmit={onSubmit}
              disabled={isTextareaDisabled}
            >
               {isReplying ? "Reply" : (isEditing ? "Update" : "Comment")}
            </button>
            <button type="button" className="cancel-button" onClick={() => {
              setActiveComment();
              handleCancelClick();
            }}>
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default CommentForm;
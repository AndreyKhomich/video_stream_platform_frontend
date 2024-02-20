import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({ video, isLoggedIn, jwtToken, userId }) {
    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const [isCommenting, setIsCommenting] = useState(false); 
    const rootComents = comments.filter(comment => comment.parent_id === null)
    const getReplies = (commentId) =>
    comments
      .filter((comment) => parseInt(comment.parent_id) === commentId)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    
      const addComment = async (text, parentId) => {
    
        try {
            const response = await axios.post(
                `http://localhost:8010/comment/${video.id}`,
                {
                    text: text,
                    parent_comment_id: parentId
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
    
            if (response.status === 201) {
                setComments(comments => [response.data, ...comments]);
                setActiveComment(null);
                setIsCommenting(false);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    
    

    const fetchComments = async () => {
      try {
          const response = await axios.get(
              `http://localhost:8010/comment/${video.id}`,
              {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${jwtToken}`,
                  },
              }
          );
          
          if (response.status === 200) {
              setIsCommenting(false);
              const newComments = response.data;
              setComments(newComments);
          } else {
              console.error("Unexpected response status:", response.status);
          }
      } catch (error) {
          console.error("Error fetching comments:", error);
          if (error.response && error.response.data.detail === "The video doesn't have comments") {
              setComments([]);
          } else {
              console.error("Unexpected error:", error);
          }
      }
  };
  
  
    
    const updateComment = async (text, commentId) => {
      try {
        const response = await axios.put(
          `http://localhost:8010/comment/${commentId}`,
          {
            text: text,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
    
        if (response.status === 200) {
          const updatedComments = comments.map((comment) => {
                if (comment.id === commentId) {
                  return { ...comment, text: text };
                }
                return comment;
              });
              setComments(updatedComments);
              setActiveComment(null);
          
          return response.data;
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        if (
          error.response &&
          error.response.data.detail === "The video has no comments"
        ) {
          console.warn("The video has no comments");
        }
      }
    };  

    const deleteComment = async (commentId) => {
      if (window.confirm("Are you sure you want to remove comment?")) {
        try {
    
          const response = await axios.delete(`http://localhost:8010/comment/${video.id}/${commentId}`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });

          if (response.status === 204) {
            const updatedComments = comments.filter(
              (comment) => comment.id !== commentId
            );
            setComments(updatedComments);
            
          } else {
            console.error("Unexpected response status:", response.status);
          }
      
      
      } catch (error) {
        
      }
    }      
  };
  

  useEffect(() => {
    fetchComments().then((data) => {
      if (data) {
        const sortedRootComments = data.sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        setComments(sortedRootComments);
      }
    });
  }, [video.id]);
    
    return (
      <div className="comments">
        <CommentForm 
        handleSubmit={addComment}
        isCommenting={isCommenting}
        isLoggedIn={isLoggedIn}
        setIsCommenting={setIsCommenting}
        setActiveComment={setActiveComment}
        />
        <div className="comments-container">
            {rootComents.map((rootComment) => (
                <Comment 
                  key={rootComment.id}
                  comment={rootComment}
                  replies={getReplies(rootComment.id)} 
                  userId={userId} 
                  deleteComment={deleteComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  updateComment={updateComment}
                  addComment={addComment}
                  setIsCommenting={setIsCommenting}
                  />
            ))}
        </div>
      </div>
    );
  }
  
  export default Comments;
  
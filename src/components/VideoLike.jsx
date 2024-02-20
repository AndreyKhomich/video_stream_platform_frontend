import React, { useState, useEffect } from "react";
import like from "../images/like.png";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from '../hooks/useErrorToast';


function VideoLike({ video, isLoggedIn, jwtToken, userId }) {
  const showErrorToast = useErrorToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);


  const fetchLikeStatus = async () => {
    try  {
      const response = await axios.get(`http://localhost:8010/like/${video.id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        setIsLiked(response.data.is_liked);
        setLikeCount(video.like_count);
      }
    } catch (error) {
      console.error('Error fetching like status:', error);
      }
    }

  const handleLikeToggle = async (event) => {
    event.preventDefault();

    try {
      
      if (isLiked) {
        await axios.delete(`http://localhost:8010/like/${video.id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setLikeCount((prevCount) => Math.max(0, prevCount - 1));
      } else {
        await axios.post(`http://localhost:8010/like/${video.id}`, {}, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setLikeCount((prevCount) => prevCount + 1);
      }
    
      setIsLiked(!isLiked);
      localStorage.setItem(`likeStatus_${video.id}`, JSON.stringify(!isLiked));
    } catch (error) {
      if (error.response && error.response.data.detail === "Cannot create like. Dislike already exists for this video") {
        showErrorToast('You cannot like videdo. Please remove dislike first');
      } 
    }
  };
 

  useEffect(() => {
    if (isLoggedIn) {
      fetchLikeStatus();
      const savedLikeStatus = localStorage.getItem(`likeStatus_${video.id}`);
      if (savedLikeStatus !== null) {
        setIsLiked(JSON.parse(savedLikeStatus));
      }
    }
  }, [video.id, video.user_id, jwtToken, isLoggedIn]);
  

  return (

    isLoggedIn && <a href="#"><img className={isLiked ? "active" : "like"} src={like} alt="like" onClick={handleLikeToggle} />{likeCount}</a>
  );
};

export default VideoLike;
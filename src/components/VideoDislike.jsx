import React, { useState, useEffect } from "react";
import dislike from "../images/dislike.png";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from '../hooks/useErrorToast';


function VideoLike({ video, isLoggedIn, jwtToken, userId }) {
  const showErrorToast = useErrorToast();
  const [isDisliked, setIsDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);


  const fetchDislikeStatus = async () => {
    try  {
      const response = await axios.get(`http://localhost:8010/dislike/${video.id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        setIsDisliked(response.data.is_disliked);
        setDislikeCount(video.dislike_count);
      }
    } catch (error) {
      console.error('Error fetching like status:', error);
      }
    }

  const handleDislikeToggle = async (event) => {
    event.preventDefault();

    try {
      
      if (isDisliked) {
        await axios.delete(`http://localhost:8010/dislike/${video.id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setDislikeCount((prevCount) => Math.max(0, prevCount - 1));
      } else {
        await axios.post(`http://localhost:8010/dislike/${video.id}`, {}, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setDislikeCount((prevCount) => prevCount + 1);
      }
    
      setIsDisliked(!isDisliked);
      localStorage.setItem(`dislikeStatus_${video.id}`, JSON.stringify(!isDisliked));
    } catch (error) {
      if (error.response && error.response.data.detail === "Cannot create dislike. Like already exists for this video") {
        showErrorToast('You cannot dislike videdo. Please remove like first');
      }
      
    }
  };
 

  useEffect(() => {
    if (isLoggedIn) {
      fetchDislikeStatus();
      const savedDislikeStatus = localStorage.getItem(`dislikeStatus_${video.id}`);
      if (savedDislikeStatus !== null) {
        setIsDisliked(JSON.parse(savedDislikeStatus));
      }
    }
  }, [video.id, video.user_id, jwtToken, isLoggedIn]);
  

  return (

    isLoggedIn && <a href="#"><img className={isDisliked ? "active" : "dislike"} src={dislike} alt="dislike" onClick={handleDislikeToggle} />{dislikeCount}</a>
  );
};

export default VideoLike;
import React, { useState } from 'react';
import avatar from "../images/Jack.png";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from '../hooks/useErrorToast';

  
function Publisher({ video, isLoggedIn, jwtToken }) {
  console.log(jwtToken)
  console.log(video.channel.id)

  const [isSubscribed, setSubscribe] = useState(false);

  const subscribersText =
    video.channel.subscription_count === 1 ? "Subscriber" : "Subscribers";

  const subscriptionText = isSubscribed ? 'Unsubscribed' : 'Subscribe';

  const handleSubscribe = async () => {
    try {
        const response = await axios.post(
          `http://127.0.0.1:8000/subscription/${video.channel.id}`,
          
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`
            },
          }
        );

        if (response.status === 200) {
          setSubscribe(!isSubscribed);        
        }
    
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  }

  return (
    <div className="publisher">
      <img src={avatar} alt="avatar" />
      <div>
        <p>Some text</p>
        <span>{video.channel.subscription_count} {subscribersText}</span>
      </div>
      {isLoggedIn && (
        <button type="button" onClick={handleSubscribe}>
          {subscriptionText}
        </button>
      )}
    </div>
  );
}

export default Publisher;
import React, { useState, useEffect } from 'react';
import avatar from "../images/Jack.png";
import axios from "axios";


function Publisher({ video, isLoggedIn, jwtToken }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribersText =
  video.channel.subscription_count === 1 ? "Subscriber" : "Subscribers";

  const subscriptionText = isSubscribed ? 'Subscribed' : 'Subscribe';
  const buttonClassName = isSubscribed ? 'active' : 'button';


  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8010/subscription/${video.channel.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }});

      if (response.status === 200) {
        setIsSubscribed(response.data.is_subscribed);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchSubscriptionStatus();
    }

  }, [video.channel.id, jwtToken, isLoggedIn]);
  

  const handleSubscription = async () => {
 
    try {
      if (isSubscribed) {
        await axios.delete(`http://localhost:8010/subscription/${video.channel.id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

      } else {
        await axios.post(`http://localhost:8010/subscription/${video.channel.id}`, {}, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          }
        });
      }
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="publisher">
      <img src={avatar} alt="avatar" />
      <div>
        <p>{video.title}</p>
        <span>{video.channel.subscription_count} {subscribersText}</span>
      </div>
      {isLoggedIn && (
        <button type="button" onClick={handleSubscription} className={buttonClassName}>
          {subscriptionText}
        </button>
      )}
    </div>
  );
}

export default Publisher;
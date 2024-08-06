import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubscriptionButton({ channelId, isLoggedIn, jwtToken, subscriptionStatus, onSubscriptionChange }) {
  const [isSubscribed, setIsSubscribed] = useState(subscriptionStatus ?? false);

  useEffect(() => {
    if (subscriptionStatus !== undefined) {
      setIsSubscribed(subscriptionStatus);
    } else if (isLoggedIn) {
      fetchSubscriptionStatus();
    }
  }, [channelId, jwtToken, isLoggedIn, subscriptionStatus]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8010/subscription/${channelId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        setIsSubscribed(response.data.is_subscribed);
      }
    } catch (error) {
      console.error('Error fetching subscription status', error);
    }
  };

  const handleSubscription = async () => {
    try {
      if (isSubscribed) {
        await axios.delete(`http://localhost:8010/subscription/${channelId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
      } else {
        await axios.post(`http://localhost:8010/subscription/${channelId}`, {}, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
      }
      setIsSubscribed(!isSubscribed);
      if (onSubscriptionChange) {
        onSubscriptionChange(channelId, !isSubscribed);
      }
    } catch (error) {
      console.error('Error handling subscription', error);
    }
  };

  const subscriptionText = isSubscribed ? 'Subscribed' : 'Subscribe';
  const buttonClassName = isSubscribed ? 'active' : 'button';

  return (
    <button type="button" onClick={handleSubscription} className={buttonClassName}>
      {subscriptionText}
    </button>
  );
}

export default SubscriptionButton;

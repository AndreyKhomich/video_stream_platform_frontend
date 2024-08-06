import React from 'react';
import SubscriptionButton from './SubscriptionButton';

function Publisher({ video, isLoggedIn, jwtToken }) {
  const subscribersText =
    video.channel.subscription_count === 1 ? 'Subscriber' : 'Subscribers';

  return (
    <div className="publisher">
      <img src={video.user.user_photo} alt="avatar" />
      <div>
        <p>{video.title}</p>
        <span>{video.channel.subscription_count} {subscribersText}</span>
      </div>
      {isLoggedIn && (
        <SubscriptionButton
          channelId={video.channel.id}
          isLoggedIn={isLoggedIn}
          jwtToken={jwtToken}
        />
      )}
    </div>
  );
}

export default Publisher;
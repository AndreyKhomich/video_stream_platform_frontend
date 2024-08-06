import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SubscriptionButton from './SubscriptionButton'; 
import Axios from 'axios';

function ChannelsList({ IsLoggedIn, jwtToken, userId, user }) {
    const [channels, setChannels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const truncateTitle = (title) => {
        return title.length > 15 ? title.slice(0, 15) + "..." : title;
    };

    const fetchChannels = async (page) => {
        try {
            setLoading(true);
            const response = await Axios.get(`http://127.0.0.1:8010/channel?page=${page}`);
            setChannels((prevChannels) => [
                ...prevChannels,
                ...response.data.items.map(channel => ({
                    ...channel,
                    isSubscribed: channel.is_subscribed // Add subscription status to channel data
                }))
            ]);
            setTotalPages(response.data.pages);
        } catch (error) {
            console.error('Failed to fetch channels:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChannels(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const container = document.querySelector('.channels-list');

        if (!container) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && currentPage < totalPages && !loading) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        const lastChannelElement = container.querySelector('.channel:last-child');
        if (lastChannelElement) {
            observer.observe(lastChannelElement);
        }

        return () => {
            if (lastChannelElement) {
                observer.unobserve(lastChannelElement);
            }
        };
    }, [currentPage, totalPages, loading, channels]);

    const handleSubscriptionChange = (channelId, isSubscribed) => {
        setChannels((prevChannels) => 
            prevChannels.map(channel => 
                channel.id === channelId ? { ...channel, isSubscribed } : channel
            )
        );
    };

    return (
        <>
            <div className="channels-header">
                <h2>
                    <span className="title">Channels</span>
                </h2>
            </div>
            <div className="channels-list">
                {channels.map((channel) => (
                    <div className="channel" key={channel.id}>
                        {user && (
                            <Link to={`/profile/${channel.user.id}`} className="channels-info">
                                <img src={channel.user.user_photo} alt={channel.name}/>
                                <span className="channel-title">{truncateTitle(channel.name)}</span>
                                <span className="subscribers">{channel.subscription_count || 0} subscribers</span>
                            </Link>
                        )}
                        <SubscriptionButton
                            channelId={channel.id}
                            isLoggedIn={IsLoggedIn}
                            jwtToken={jwtToken}
                            subscriptionStatus={channel.isSubscribed} // Pass the subscription status
                            onSubscriptionChange={handleSubscriptionChange} // Pass the handler
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ChannelsList;

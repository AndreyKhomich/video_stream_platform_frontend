

function UserInfo({ user }) {
   
    return (
        <div className='user-profile-info'>
            <div>
                <img src={user.user_photo} alt="User Photo" className="user-info-photo" />
                <div className="active-status"></div>
            </div>
            <h1 className="user-info-name">{user.user_name || ''}</h1>
            <p className="user-info-email">{user.email || ''}</p>
            {user.channel && (
                <>
                    <p className="channel-info-name">{user.channel.name || ''}</p>
                    <p className="channel-description">{user.channel.description || ''}</p>
                </>
            )}
            <div className='user-stats'>
                <div className='user-subscriptions'>
                    <p className="number-stat">{user.subscriptions || 0}</p>
                    <p className="desc-stat">Subscriptions</p>
                </div>
                <div className='user-subscribers'>
                    <p className="number-stat">{user.channel?.subscription_count || 0}</p>
                    <p className="desc-stat">Subscribers</p>
                </div>
                <div className='user-uploaded-video'>
                    <p className="number-stat">{user.total_video_count || 0}</p>
                    <p className="desc-stat">Videos</p>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;

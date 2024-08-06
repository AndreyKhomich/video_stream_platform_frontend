
function UserSettingsInfo({ toggleUploadImage, user }) {

    return (
        <div className="user-settings-info">
            {user && (
                <div className='user-info'>
                    <div className='user-photo'>
                        <img src={user.user_photo} alt="user" />
                        <div className='user-name'>{user.user_name}</div>
                        <div className='user-email'>{user.email}</div>
                        <button className="update-image-button" onClick={toggleUploadImage}>Update Profile Image</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserSettingsInfo;

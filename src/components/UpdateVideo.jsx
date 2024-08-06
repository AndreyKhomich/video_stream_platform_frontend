import UpdateVideoThumbnail from "./UpdateVideoThumbnail";
import UpdateVideoText from "./UpdateVideoText";

function UpdateVideo({ 
    video,
    jwtToken,
    title,
    description,
    thumbnail, 
    handleTitleChange, 
    handleDescriptionChange, 
    handleFileChange
 }) {
    return (
        <div className="settings-container">
            <UpdateVideoText
            title={title}
            description={description}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange} 
            />
            <UpdateVideoThumbnail 
            video={video} 
            jwtToken={jwtToken}
            thumbnail={thumbnail} 
            handleFileChange={handleFileChange}
            />
        </div>
    );
}

export default UpdateVideo;
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";


function VideoDetails({ video }) {

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(video.url).then(() => {
            toast.success('Link copied to clipboard!', {
                position: toast.POSITION.TOP_LEFT,
                className: 'toast-message',
            })
        }).catch((error) => {
            console.error("Failed to copy link: ", error);
        });
    };

    const truncateTitle = (title) => {
        return title.length > 25 ? title.slice(0, 25) + "..." : title;
    };


    return (
        <div className="video-container">
            {video && (
                <video
                    className="uploaded-video"
                    src={`${video.url}`}
                    controls={true}
                    poster={video.thumbnail_url}
                    preload="none"
                    muted={false}
                    playsInline
                    controlsList="nodownload nofullscreen"
                ></video>
            )}
            <div className="video-name">
                {video && 
                (<Link to={`/video/${video.id}`} key={video.id}>
                    <span>{truncateTitle(video.title)}</span>
                    </Link>
                )}
            </div>
            <a href="#" onClick={copyLinkToClipboard}>Copy Link</a>
        </div>
    );
}

export default VideoDetails;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function DeleteVideo({ video, jwtToken }) {
    const navigate = useNavigate();

   
    const deleteVideo = async () => {
        if (video) {
            try {
                const response = await axios.delete(`http://localhost:8010/video/delete/${video.id}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                if (response.status === 204) {
                    toast.success('Video was deleted!', {
                        position: toast.POSITION.TOP_LEFT,
                        className: 'toast-message',
                      })
                    navigate("/uploaded-videos");
                }
            }
            catch (error) {
                console.error("Failed to delete video:", error);
            }
        }
    };


    return (
        <div className="video-options">
            <button onClick={deleteVideo} className="delete-button">Delete Video</button>
        </div>
    );
}

export default DeleteVideo;

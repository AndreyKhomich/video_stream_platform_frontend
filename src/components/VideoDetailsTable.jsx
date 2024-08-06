import React, { useState } from "react";
import "../css/videodetailstable.css";
import { Link } from "react-router-dom";

function VideoDetailsTable({ videoDetails }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckAll = (e) => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = e.target.checked;
        });
        setIsChecked(e.target.checked);
    };


    return (
        <div className="video-details-table">
            <table className="table custom-table">
                <thead>
                    <tr>
                        <th scope="col">
                            <label className="control control--checkbox">
                                <input className="check-all" type="checkbox" onChange={handleCheckAll} checked={isChecked} />
                                <div className="control-indicator"></div>
                            </label>
                        </th>
                        <th scope="col">Video</th>
                        <th scope="col">Title</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Views</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Dislikes</th>
                    </tr>
                </thead>
                <tbody>
                    {videoDetails.map((video, index) => (
                        <tr key={index}>
                            <td>
                                <label className="control control--checkbox">
                                    <input type="checkbox" />
                                    <div className="control-indicator"></div>
                                </label>
                            </td>
                            <td>
                                <Link to={`/video-settings/${video.id}`}>
                                    <img src={video.thumbnail_url} alt="Thumbnail" />
                                </Link>
                            </td>
                            <td className='title'>{video.title}</td>
                            <td>{video.comments}</td>
                            <td>{video.views}</td>
                            <td>{video.likes}</td>
                            <td>{video.dislikes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VideoDetailsTable;

import React from "react";
import "../css/sharelinkpopup.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShareLinkPopup({ isOpen, onClose, linkToCopy }) {
  const containerClassName = `popup-container ${isOpen ? 'active' : ''}`;
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(linkToCopy).then(() => {
      toast.success('Link copied to clipboard!', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-message',
      })
    }).catch((error) => {
      console.error("Failed to copy link: ", error);
    });
  };

  return (
    isOpen && (
      <div className={containerClassName}>
        <div className="popup-content">
          <div className="popup-header">
            <h2>Video Link</h2>
            <span className="close-button" onClick={onClose}>&times;</span>
          </div>
          <div className="popup-body">
            <div className="popup-link">
              <form>
                <input
                  id="linkInput"
                  type="text"
                  value={linkToCopy}
                  readOnly
                />
              </form>
              <button onClick={copyLinkToClipboard}>Copy Link</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ShareLinkPopup;
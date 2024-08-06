import React from 'react';
import "../css/cautionpopup.css";

const CautionPopup = ({ onCancel, onConfirm }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Caution</h2>
                <ul>
                    <li>Changing your email or password will immediately log you out of your account.</li>
                    <br/>
                    <li>Please ensure that you remember your new email or password, as it will be required to log back in.</li>
                    <br/>
                    <li>In case you change your email, you will need to confirm the new email address. </li>
                    <br/>
                    <li>Failure to remember your new email or password may result in the loss of access to your account and any associated content.</li>
                </ul>
                <div className="button-wrapper">
                    <button onClick={onConfirm} className="confirm-button">Submit</button>
                    <button onClick={onCancel} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CautionPopup;
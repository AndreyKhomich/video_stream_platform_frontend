import React, { useState } from "react";


function CommentSettings() {
    return (

        <div className="comments-settings">
            <div className="select-options">
                <select>
                    <option value="1">Display Comments</option>
                    <option value="2">Forbid Comments</option>
                </select>
            </div>
        </div>
    );
}

export default CommentSettings;
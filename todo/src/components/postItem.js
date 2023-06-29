import React from "react";

export const PostItem = ({ id, title, completed }) => {
    return (
        <div className="Do">
            <span>{title}</span>
            <input type="checkbox" checked={completed} onChange={() => {}} />
        </div>
    );
};

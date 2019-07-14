import React from 'react';

function MessageListItem({ label, value }) {
    return (
        <div className="column is-2">
            <div>{label}</div>
            {value}
        </div>
    );
}

export default MessageListItem;

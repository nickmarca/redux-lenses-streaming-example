import React from 'react'

function ListHeading ({ numberOfMessages }) {
    return (
        <div className="panel-block" style={{borderTop: 0}}>
            <div className="control">
                Number of messages: {numberOfMessages}
            </div>
        </div>
    );
}

export default ListHeading;
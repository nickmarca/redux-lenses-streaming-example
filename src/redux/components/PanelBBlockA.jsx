import React from 'react'

function PanelBBlockA ({ numberOfMessages }) {
    return (
        <div className="panel-block">
            <div className="control">
                Number of messages: {numberOfMessages}
            </div>
        </div>
    );
}

export default PanelBBlockA;
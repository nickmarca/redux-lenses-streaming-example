import React from 'react'

function PanelABlockA({
    isSubscribeDisabled,
    isClearDisabled,
    onClearMessages,
    onSubscribe,
    topics,
}) {
    return (
        <div className="panel-block">
            <div className="control">
                <button
                    style={{ marginRight: '10px' }}
                    onClick={onSubscribe}
                    className="button is-small is-info"
                    disabled={isSubscribeDisabled}
                >
                    Subscribe
                </button>

                <button
                    onClick={onClearMessages}
                    className="button is-small is-danger"
                    disabled={isClearDisabled}
                >
                    Clear Messages
                </button>
            </div>
            <div className="control">{topics}</div>
        </div>
    )
}

export default PanelABlockA

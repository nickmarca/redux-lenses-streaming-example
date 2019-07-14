import React, { Fragment, useState } from 'react';
import PanelA from './PanelA';
import PanelB from './PanelB';
import ListItemDetails from './ListItemDetails';

function Messages({ messages, onCommit }) {
    const [detailed, setDetailed] = useState({});
    const [searchResult, setSearchResult] = useState([]);

    const onMessageDetailRequest = message => {
        setDetailed(message);
    };

    console.log('messages', messages);

    return (
        <Fragment>
            <PanelA />
            <ListItemDetails
                message={detailed}
                onCommitMessage={onCommit}
                onShowRowDetails={onMessageDetailRequest}
            />

            {messages.length ? (
                <PanelB
                    messages={messages.slice(0, 3)}
                    onCommitMessage={onCommit}
                    onMessageDetailRequest={onMessageDetailRequest}
                    shouldScrollToBottom={false}
                />
            ) : null}

            {messages.length ? (
                <PanelB
                    messages={messages}
                    onCommitMessage={onCommit}
                    onMessageDetailRequest={onMessageDetailRequest}
                    shouldScrollToBottom={Object.keys(detailed).length === 0}
                />
            ) : null}
        </Fragment>
    );
}

export default Messages;

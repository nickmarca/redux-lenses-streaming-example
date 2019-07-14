import React, { Fragment, useState } from 'react';
import Actions from './Actions';
import MessageList from './MessageList';
import ListItemDetails from './ListItemDetails';
import { filter } from 'lodash';
import { findInJSON } from '../util';

function Messages({ messages, onCommit }) {
    const [detailed, setDetailed] = useState({});
    const [searchResult, setSearchResult] = useState([]);

    const onMessageDetailRequest = message => {
        setDetailed(message);
    };

    const onSearch = keyword => {
        const res = filter(messages, ({ key, value }) => {
            return findInJSON(key, keyword) || findInJSON(value, keyword);
        });

        return setSearchResult(res);
    };

    return (
        <Fragment>
            <Actions onSerch={onSearch} totalOfMessages={messages.length} />
            <ListItemDetails
                message={detailed}
                onCommitMessage={onCommit}
                onShowRowDetails={onMessageDetailRequest}
            />

            {searchResult.length ? (
                <MessageList
                    messages={searchResult}
                    onCommitMessage={onCommit}
                    onMessageDetailRequest={onMessageDetailRequest}
                    shouldScrollToBottom={false}
                />
            ) : null}

            {messages.length ? (
                <MessageList
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

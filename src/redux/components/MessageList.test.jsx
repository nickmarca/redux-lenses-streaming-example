import React from 'react';
import { create } from 'react-test-renderer';
import { MessageList } from './MessageList';

describe('MessageList', () => {
    it('matches the snapshot', () => {
        const messageList = create(<MessageList messages={[]} />);

        expect(messageList.toJSON()).toMatchSnapshot();
    });
});

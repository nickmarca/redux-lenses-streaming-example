import React from 'react';
import { create } from 'react-test-renderer';
import MessageListItem from './MessageListItem';

describe('MessageListItem', () => {
    it('matches the snapshot', () => {
        const messageListItem = create(<MessageListItem />);

        expect(messageListItem.toJSON()).toMatchSnapshot();
    });
});

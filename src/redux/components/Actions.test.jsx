import React from 'react';
import { create } from 'react-test-renderer';
import { Actions } from './Actions';

describe('Actions', () => {
    it('matches the snapshot', () => {
        const onSearch = jest.fn();
        const subscribe = jest.fn();
        const unsubscribe = jest.fn();
        const actions = create(
            <Actions
                subscriptions={[]}
                onSerch={onSearch}
                subscribe={subscribe}
                totalOfMessages={0}
                unsubscribe={unsubscribe}
            />
        );

        expect(actions.toJSON()).toMatchSnapshot();
    });
});

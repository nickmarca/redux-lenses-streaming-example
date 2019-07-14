import React from 'react';
import { create } from 'react-test-renderer';
import ListActions from './ListActions';

describe('ListActions', () => {
    it('matches the snapshot', () => {
        const listActions = create(<ListActions />);

        expect(listActions.toJSON()).toMatchSnapshot();
    });
});

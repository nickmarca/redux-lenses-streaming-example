import React from 'react';
import { create } from 'react-test-renderer';
import ListHeading from './ListHeading';

describe('ListHeading', () => {
    it('matches the snapshot', () => {
        const listActions = create(<ListHeading />);

        expect(listActions.toJSON()).toMatchSnapshot();
    });
});

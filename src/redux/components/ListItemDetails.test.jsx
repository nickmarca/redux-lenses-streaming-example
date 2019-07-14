import React from 'react';
import { create } from 'react-test-renderer';
import ListItemDetails from './ListItemDetails';

describe('ListItemDetails', () => {
    it('matches the snapshot', () => {
        const listItemDetails = create(<ListItemDetails />);

        expect(listItemDetails.toJSON()).toMatchSnapshot();
    });
});

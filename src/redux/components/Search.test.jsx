import React from 'react';
import { create } from 'react-test-renderer';
import Search from './Search';

describe('Search', () => {
    it('matches the snapshot', () => {
        const search = create(<Search />);

        expect(search.toJSON()).toMatchSnapshot();
    });
});

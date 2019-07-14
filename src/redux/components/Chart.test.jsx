import React from 'react';
import { create } from 'react-test-renderer';
import Chart from './Chart';

describe('Chart', () => {
    it('matches the snapshot', () => {
        const actions = create(<Chart data={[]} />);

        expect(actions.toJSON()).toMatchSnapshot();
    });
});

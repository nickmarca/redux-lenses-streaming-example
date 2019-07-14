import React from 'react';
import { create } from 'react-test-renderer';
import { Publish } from './Publish';

describe('Publish', () => {
    it('matches the snapshot', () => {
        const publish = create(<Publish />);

        expect(publish.toJSON()).toMatchSnapshot();
    });
});

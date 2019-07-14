import React from 'react';
import { create } from 'react-test-renderer';
import SQLInput from './SQLInput';

describe('SQLInput', () => {
    it('matches the snapshot', () => {
        const sqlInput = create(<SQLInput />);

        expect(sqlInput.toJSON()).toMatchSnapshot();
    });
});

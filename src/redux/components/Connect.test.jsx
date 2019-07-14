import React from 'react';
import { create } from 'react-test-renderer';
import { Connect } from './Connect';

describe('Connect', () => {
    it('matches the snapshot', () => {
        const connectFn = jest.fn();
        const disconnect = jest.fn();
        const login = jest.fn();

        const connect = create(
            <Connect
                connect={connectFn}
                disconnect={disconnect}
                login={login}
            />
        );

        expect(connect.toJSON()).toMatchSnapshot();
    });
});

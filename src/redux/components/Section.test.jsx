import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Section from './Section';

describe('Section', () => {
    it('matches the snapshot', () => {
        const renderer = new ShallowRenderer();
        const onCommit = jest.fn();
        renderer.render(<Section messages={[]} onCommit={onCommit} />);
        const section = renderer.getRenderOutput();

        expect(section).toBeTruthy();
    });
});

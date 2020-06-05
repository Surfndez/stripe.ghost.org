import React from 'react';
import {render} from '@testing-library/react';
import Switch, {Case} from './Switch';

test('Does not render children that have a "when" prop which does not match the "on" prop', () => {
    const {queryAllByText} = render(
        <Switch on="value">
            <Case when="not-value">
                Should NOT be rendered
            </Case>

            <div when="not-value">
                Should NOT be rendered
            </div>

            <Case when="value">
                Should be rendered
            </Case>

            <div when="value">
                Should be rendered
            </div>

            <Case>
                Should be rendered
            </Case>

            <div>
                Should be rendered
            </div>

            Should be rendered
        </Switch>
    );

    expect(queryAllByText('Should NOT be rendered').length).toBe(0);
    expect(queryAllByText('Should be rendered').length).toBe(2);
});

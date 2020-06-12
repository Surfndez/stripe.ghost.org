import React from 'react';
import {render} from '@testing-library/react';
import ErrorState from './ErrorState';

test.skip('Renders a loading text', () => {
    const {queryByText} = render(
        <ErrorState errorMessage="MESSAGE" />
    );

    expect(queryByText('MESSAGE')).toBeTruthy();
});

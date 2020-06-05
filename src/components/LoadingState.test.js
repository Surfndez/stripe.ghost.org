import React from 'react';
import {render} from '@testing-library/react';
import LoadingState from './LoadingState';

test('Renders a loading text', () => {
    const {queryByText} = render(
        <LoadingState />
    );

    expect(queryByText('Loading...')).toBeTruthy();
});

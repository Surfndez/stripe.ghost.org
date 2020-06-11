import React from 'react';
import {render} from '@testing-library/react';
import LoadingState from './LoadingState';

test('Renders the loading spinner', () => {
    const {queryByTestId} = render(
        <LoadingState />
    );

    expect(queryByTestId('loading')).toBeInTheDocument();
});

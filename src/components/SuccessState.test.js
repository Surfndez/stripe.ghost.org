import React from 'react';
import {render} from '@testing-library/react';
import SuccessState from './SuccessState';

test('Renders a loading text', () => {
    const {queryByText} = render(
        <SuccessState token="TOKEN" />
    );

    expect(queryByText('TOKEN')).toBeTruthy();
});

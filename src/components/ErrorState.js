import React from 'react';
import {ReactComponent as Warning} from '../assets/warning.svg';

/**
 * @param {object} props
 * @param {string} props.errorMessage
 */
function ErrorState(props) {
    const {errorMessage} = props;
    console.log('ErrorState -> errorMessage', errorMessage);
    return (
        <div className="gh-box gh-error-box">
            <Warning />
            <div className="gh-error-content">
                <h2>Could not connect to Stripe</h2>
                <p>An error occurred while connecting to Stripe. Please try again by clicking on “Connect with Stripe” in Ghost.</p>
                <code>{errorMessage}</code>
            </div>
        </div>
    );
}

export default ErrorState;

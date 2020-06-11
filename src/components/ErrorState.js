import React from 'react';

/**
 * @param {object} props
 * @param {string} props.errorMessage
 */
function ErrorState(props) {
    return (
        <div className="gh-box">
            <h2>Something went wrong</h2>
            <p>Couldn't connect Ghost with Stripe. Please try again.</p>
            <p>Error message:</p>
            <code>{props.errorMessage}</code>
        </div>
    );
}

export default ErrorState;

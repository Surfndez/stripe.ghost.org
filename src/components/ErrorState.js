import React from 'react';
import {useState, useEffect} from 'react';
import {ReactComponent as Warning} from '../assets/warning.svg';

/**
 * @param {object} props
 * @param {string} props.errorMessage
 */
function ErrorState(props) {
    const {errorMessage} = props;
    const [state, setState] = useState({title: 'Connection error', message: 'An error occurred while connecting to Stripe. Please try again by clicking on “Connect with Stripe” in Ghost Admin to start over.'});

    useEffect(() => {
        if (errorMessage.match(/user denied your request/igm)) {
            setState({title: 'Connection cancelled', message: 'You cancelled the connection process to Stripe. If you would like to try again, you can return to Ghost Admin and click on “Connect with Stripe” to start over.'});
        }
    }, [errorMessage]);

    return (
        <div className="gh-box gh-error-box">
            <Warning />
            <div className="gh-error-content">
                <h2>{state.title}</h2>
                <p>{state.message}</p>
            </div>
        </div>
    );
}

export default ErrorState;

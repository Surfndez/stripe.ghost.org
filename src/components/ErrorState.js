import React from 'react';
import {useState, useEffect} from 'react';
import {ReactComponent as Warning} from '../assets/warning.svg';

/**
 * @param {object} props
 * @param {string} props.errorMessage
 */
function ErrorState(props) {
    const {errorMessage} = props;
    const [state, setState] = useState({title: 'Default error title', message: 'An error occurred while connecting to Stripe. Please try again by clicking on “Connect with Stripe” in Ghost.'});

    useEffect(() => {
        if (errorMessage.match(/authorization code has already been used/igm)) {
            setState({title: 'Code has been used already', message: 'An error occurred while connecting to Stripe. Please try again by clicking on “Connect with Stripe” in Ghost.'});
        } else if (errorMessage.match(/authorization code does not exist/igm)) {
            setState({title: 'Code does not exist', message: 'An error occurred while connecting to Stripe. Please try again by clicking on “Connect with Stripe” in Ghost.'});
        } else if (errorMessage.match(/connection to Stripe/igm)) {
            setState({title: 'Could not connect to Stripe', message: 'An error occurred while connecting to Stripe. Please try again by clicking on “Connect with Stripe” in Ghost.'});
        } else if (errorMessage.match(/user denied your request/igm)) {
            setState({title: 'You pressed cancel', message: 'An error occurred while connecting to Stripe. Please try again by clicking on “Connect with Stripe” in Ghost.'});
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

import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import Switch, {Case} from './components/Switch';

function LoadingState() {
    return (
        <span> Loading... </span>
    );
}

/**
 * @param {object} props
 * @param {string} props.errorMessage
 */
function ErrorState(props) {
    return (
        <div>
            <span> There was an error </span>
            <span> {props.errorMessage} </span>
        </div>
    );
}

/**
 * @param {object} props
 * @param {string} props.token
 */
function SuccessState(props) {
    return (
        <div>
            <span> Copy this stuff! </span>
            <code> {props.token} </code>
        </div>
    );
}

async function getData() {
    const res = await fetch(`/.netlify/functions/get-stripe-connect-integration-token${window.location.search}`, {
        method: 'POST'
    });

    const text = await res.text();

    if (!res.ok) {
        throw new Error(text);
    }

    return text;
}

function App() {
    const [state, setState] = useState({status: 'init', data: null});

    const setSuccess = data => setState({status: 'success', data});
    const setError = error => setState({status: 'error', data: error.message});

    useEffect(() => {
        setState({status: 'loading', data: null});
        getData().then(setSuccess, setError);
    }, []);

    return (
        <div className="App">
            <main className="App-main">
                <Switch on={state.status}>
                    <Case when="loading">
                        <LoadingState />
                    </Case>
                    <Case when="error">
                        <ErrorState errorMessage={state.data} />
                    </Case>
                    <Case when="success">
                        <SuccessState token={state.data} />
                    </Case>
                </Switch>
            </main>
        </div>
    );
}

export default App;

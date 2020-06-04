import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import Switch, {Case} from './components/Switch';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function LoadingState() {
    return (
        <p> Loading... </p>
    );
}

/**
 * @param {object} props
 * @param {string} props.errorMessage
 */
function ErrorState(props) {
    return (
        <div>
            <p> There was an error </p>
            <p>
                <code> {props.errorMessage} </code>
            </p>
        </div>
    );
}

/**
 * @param {object} props
 * @param {string} props.token
 */
function SuccessState(props) {
    const [copied, setCopied] = useState(false);

    return (
        <div>
            <p> Copy this stuff! </p>
            <p> {props.token} </p>
            <CopyToClipboard text={props.token} onCopy={() => setCopied(true)}>
                <button disabled={copied}>
                    Click this to copy!
                </button>
            </CopyToClipboard>
            <span> {copied ? 'copied!' : null} </span>
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

import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import Switch, {Case} from './components/Switch';
import SuccessState from './components/SuccessState';
import ErrorState from './components/ErrorState';
import LoadingState from './components/LoadingState';

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

    /**
     * @param {string} token
     */
    function handleSuccess(token) {
        setState({status: 'success', data: token});
    }
    /**
     * @param {Error} error
     */
    function handleError(error) {
        setState({status: 'error', data: error.message});
    }

    useEffect(() => {
        setState({status: 'loading', data: null});
        getData().then(handleSuccess, handleError);
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

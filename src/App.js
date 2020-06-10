import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import Switch, {Case} from './components/Switch';
import SuccessState from './components/SuccessState';
import ErrorState from './components/ErrorState';
import LoadingState from './components/LoadingState';

/**
 * @param {object} props
 * @param {() => Promise<string>} props.getData
 */
function App(props) {
    const {getData} = props;
    const [state, setState] = useState({status: 'init', data: ''});

    useEffect(() => {
        setState({status: 'loading', data: ''});
        getData().then(
            token => setState({status: 'success', data: token}),
            error => setState({status: 'error', data: error.message})
        );
    }, [getData]);

    return (
        <div className="gh-app">
            <div className="gh-viewport">
                <main className="gh-main">
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
                    <div className="gh-canvas spread">
                        <span>Stripe Icon</span>
                        <button className="gh-button gh-button-white">Get support</button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;

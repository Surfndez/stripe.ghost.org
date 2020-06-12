import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import Switch, {Case} from './components/Switch';
import SuccessState from './components/SuccessState';
import ErrorState from './components/ErrorState';
import LoadingState from './components/LoadingState';
import {ReactComponent as StripeLogo} from './assets/stripe_verified.svg';
import {ReactComponent as Checkmark} from './assets/checkmark.svg';
import {ReactComponent as GhostStripe} from './assets/ghost_stripe.svg';

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
        <div className="gh-viewport">
            <main className="gh-main">
                <div className="gh-page">
                    <section className="gh-container gh-content">

                        <div className="gh-header">
                            <Switch on={state.status}>
                                <Case when="success">
                                    <div className="gh-status success"><Checkmark /></div>
                                </Case>
                            </Switch>
                            <div className="gh-logo"><GhostStripe /></div>
                        </div>

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

                    </section>

                    <div className="gh-footer">
                        <StripeLogo />
                        <a href="https://ghost.org/faq/" className="gh-button gh-button-white" role="button">
                            Get support
                        </a>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default App;

import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useState} from 'react';
import {ReactComponent as Checkmark} from '../assets/check.svg';
import {ReactComponent as GhostStripe} from '../assets/ghost_stripe.svg';

/**
 * @param {object} props
 * @param {string} props.token
 */
function SuccessState(props) {
    const [copied, setCopied] = useState(false);

    return (
        <section className="gh-container gh-content">
            <div className="gh-header">
                <div className="gh-status"><Checkmark /></div>
                <div className="gh-logo"><GhostStripe /></div>
            </div>
            <div className="gh-box">
                <h2>Secure key successfully generated!</h2>
                <p>Paste this key into Ghost Admin to complete the connection to Stripe. This is a secret key, so you should never give it to anyone else!</p>
                <code>{props.token}</code>
                <CopyToClipboard text={props.token} onCopy={() => setCopied(true)}>
                    <button className="gh-button gh-button-primary" disabled={copied}>
                        {copied ? 'Copied' : 'Click this to copy!'}
                    </button>
                </CopyToClipboard>
            </div>
        </section>
    );
}

export default SuccessState;

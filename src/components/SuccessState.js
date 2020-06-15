import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useState} from 'react';

/**
 * @param {object} props
 * @param {string} props.token
 */
function SuccessState(props) {
    const [copied, setCopied] = useState(false);

    return (
        <div className="gh-box">
            <h2>Secure key successfully generated!</h2>
            <p>Paste this key into Ghost Admin to complete the connection to Stripe. This is a secret key, so you should never give it to anyone else!</p>
            <code style={{userSelect: 'none'}}>{props.token}</code>
            <CopyToClipboard text={props.token} onCopy={() => setCopied(true)}>
                <button className="gh-button gh-button-primary">
                    {copied ? 'Copied to clipboard!' : 'Copy secure key'}
                </button>
            </CopyToClipboard>
        </div>
    );
}

export default SuccessState;

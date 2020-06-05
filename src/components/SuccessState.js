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

export default SuccessState;

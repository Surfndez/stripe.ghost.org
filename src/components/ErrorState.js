import React from "react";

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

export default ErrorState;

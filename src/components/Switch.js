import React from 'react';

/**
 * @param {object} props
 * @param {any} props.on
 * @param {React.Children} props.children
 */
export default function Switch(props) {
    /**
     * @param {React.Element} child
     */
    function matchChild(child) {
        if (React.isValidElement(child)) {
            if (child.props.when === props.on) {
                return React.cloneElement(child);
            }
        }
        return null;
    }

    return (
        <>
            {React.Children.map(props.children, matchChild)}
        </>
    );
}

/**
 * @param {object} props
 * @param {any} props.when
 * @param {React.Children} props.children
 */
export function Case(props) {
    return (
        <>
            {props.children}
        </>
    );
}

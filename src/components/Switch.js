import React from 'react';

/**
 * @param {object} props
 * @param {any} props.on
 * @param {React.ReactNode} props.children
 */
function Switch(props) {
    /**
     * @param {React.ReactElement} child
     */
    function matchChild(child) {
        if (!React.isValidElement(child)) {
            return child;
        }
        if (!Reflect.has(child.props, 'when') || child.props.when === props.on) {
            return React.cloneElement(child);
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
 * @param {React.ReactNode} props.children
 */
function Case(props) {
    return (
        <>
            {props.children}
        </>
    );
}

export default Switch;
export {Switch, Case};

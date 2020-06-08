import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import getData from './getData';

if (!window.location.search) {
    window.location.href = 'https://ghost.org';
} else {
    ReactDOM.render(
        <React.StrictMode>
            <App getData={getData} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

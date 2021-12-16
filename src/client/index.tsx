import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function clientStart(): Promise<void> {
    // const App: JSX.Element = await AppPromise();
    render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root'),
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    console.info('Web vitals:');
    reportWebVitals(console.log);
    console.log();
}

export { clientStart };

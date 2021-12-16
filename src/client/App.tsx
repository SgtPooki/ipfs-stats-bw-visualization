import React from 'react';

import './App.css';
import { BandwidthLogger } from './components/BandwidthLogger';
import logo from './logo.svg';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
            <BandwidthLogger />
        </div>
    );
}

// connect to the default API address http://localhost:5001
// const client = create();

export default App;

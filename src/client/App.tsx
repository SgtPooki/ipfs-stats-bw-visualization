import React, { Component, useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';

import { BandwidthData } from '../ipfs/stats/bw';
import './App.css';
import { BandwidthLogger } from './components/BandwidthLogger';
import { MultilineChart } from './components/MultilineChart';
import { TimeWindowControl } from './components/TimeWindowControl';
import { useIpfsBandwidth } from './hooks/ipfs/useIpfsBandwidth';
import { useTimeWindow } from './hooks/viz/useTimeWindow';
import logo from './logo.svg';

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 },
};

function App(): JSX.Element {
    const { timeWindow } = useTimeWindow();

    const bwStats = useIpfsBandwidth();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <TimeWindowControl />
                <MultilineChart
                    // data={[schcData]}
                    dimensions={dimensions}
                    timeWindow={timeWindow}
                    bwStats={bwStats}
                />
            </header>
            <BandwidthLogger />
        </div>
    );
}

export default App;

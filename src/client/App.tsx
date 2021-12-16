import './App.css';
import { ChartControl } from './components/ChartControl';
import { MultilineChart } from './components/MultilineChart';
import { useTimeWindow } from './hooks/controls/useTimeWindow';
import logo from './logo.svg';

const dimensions = {
    width: window.innerHeight / 2,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 },
};

function App(): JSX.Element {
    const { timeWindow } = useTimeWindow();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="instructions">
                    <p>Sample ipfs.stats.bw viewer.</p>
                    <span>
                        You can use the controls below to change the query that
                        is being sent to the ipfs node.
                    </span>
                </div>
            </header>

            <div>
                <ChartControl />
                <MultilineChart
                    // data={[schcData]}
                    dimensions={dimensions}
                    timeWindow={timeWindow}
                    // bwStats={bwStats}
                />
            </div>
        </div>
    );
}

export default App;

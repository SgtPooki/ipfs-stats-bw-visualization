import { BwStatsPropertyControl } from '../BwStatsPropertyControl';
import { TimeWindowControl } from '../TimeWindowControl';

function ChartControl(): JSX.Element {
    return (
        <div id="chartControlContainer">
            <BwStatsPropertyControl />
            <TimeWindowControl />
        </div>
    );
}
export { ChartControl };

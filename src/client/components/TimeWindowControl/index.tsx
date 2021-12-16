import { ChangeEventHandler } from 'react';

import { useTimeWindow } from '../../hooks/controls/useTimeWindow';

function TimeWindowControl(): JSX.Element {
    const { timeWindow, updateTimeWindow, timeOptions } = useTimeWindow();

    const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        updateTimeWindow(event.target.value);
    };

    return (
        <span className="chartControl">
            <label id="timeWindowControlLabel" htmlFor="timeWindowControl">
                Time Range:
            </label>
            <select
                id="timeWindowControl"
                onChange={onChange}
                value={timeWindow.label}
            >
                {timeOptions.map((o) => (
                    <option key={o.label} value={o.label}>
                        {o.label}
                    </option>
                ))}
            </select>
        </span>
    );
}

export { TimeWindowControl };

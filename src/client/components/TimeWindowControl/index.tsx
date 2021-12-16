import { ChangeEventHandler } from 'react';

import { useTimeWindow } from '../../hooks/viz/useTimeWindow';

function TimeWindowControl(): JSX.Element {
    const { timeWindow, updateTimeWindow, timeOptions } = useTimeWindow();

    const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        // console.log('thing: ', thing);
        console.log(event.target.value, event);
        updateTimeWindow(event.target.value);
    };

    return (
        <select onChange={onChange} value={timeWindow.label}>
            {timeOptions.map((o) => (
                <option
                    key={o.label}
                    value={o.label}
                    // selected={o.label === timeWindow.label}
                >
                    {o.label}
                </option>
            ))}
        </select>
    );
}

export { TimeWindowControl };

import { ChangeEventHandler } from 'react';

import {
    BwStatPropertyOption,
    useBwStatProperty,
} from '../../hooks/controls/useBwStatProperty';

function BwStatsPropertyControl(): JSX.Element {
    const { property, options, updateProperty } = useBwStatProperty();

    const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        console.log(event.target.value);
        updateProperty(event.target.value as BwStatPropertyOption);
    };

    return (
        <span className="chartControl">
            <label id="bwStatsPropertyLabel" htmlFor="bwStatsPropertyControl">
                Property:{' '}
            </label>
            <select
                id="bwStatsPropertyControl"
                onChange={onChange}
                value={property}
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </span>
    );
}

export { BwStatsPropertyControl };

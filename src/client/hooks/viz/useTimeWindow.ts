import { useEffect, useMemo, useState } from 'react';

import { Observable } from '../../hof/observable';

enum TimeUnit {
    seconds = 'seconds',
    minutes = 'minutes',

    hours = 'hours',

    days = 'days',
}
enum TimeUnitRank {
    seconds,
    minutes,
    hours,
    days,
}

type TimeSelection = {
    value: number;
    unit: TimeUnit;
    label: string;
};

const timeOptions: TimeSelection[] = [
    {
        value: 30,
        unit: TimeUnit.seconds,
    },
    {
        value: 60,
        unit: TimeUnit.seconds,
    },
    {
        value: 5,
        unit: TimeUnit.minutes,
    },
    {
        value: 15,
        unit: TimeUnit.minutes,
    },
    {
        value: 30,
        unit: TimeUnit.minutes,
    },
    {
        value: 45,
        unit: TimeUnit.minutes,
    },
    {
        value: 1,
        unit: TimeUnit.hours,
    },
    {
        value: 12,
        unit: TimeUnit.hours,
    },
    {
        value: 6,
        unit: TimeUnit.hours,
    },
    {
        value: 1,
        unit: TimeUnit.days,
    },
]
    .map((o) => ({ ...o, label: `${o.value} ${o.unit}` }))
    .sort((a, b) => {
        if (a.unit === b.unit) {
            if (a.value < b.value) {
                return -1;
            } else if (a.value > b.value) {
                return 1;
            }
            throw new Error('Duplicate time selection option found.');
        } else {
            if (TimeUnitRank[a.unit] < TimeUnitRank[b.unit]) {
                return -1;
            }

            return 1;
        }
    });
console.log(TimeUnitRank['days']);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const defaultTimeSelection = timeOptions.find(
    (o) => o.value === 1 && o.unit === TimeUnit.hours,
)!;

const globalHookId = 'global';
// const timeSelection = ;
const timeSelectionObservables = new Map<string, Observable<TimeSelection>>();

type useTimeWindowResponse = {
    timeWindow: TimeSelection;
    timeOptions: TimeSelection[];
    updateTimeWindow: (
        newValue: TimeSelection['label'] | TimeSelection,
    ) => void;
};

/**
 * This hook shares the time-window value by default, via the globalHookId of 'global'.
 *
 * If you want a different instance, you need to pass a unique id.
 */
function useTimeWindow(instanceId = globalHookId): useTimeWindowResponse {
    if (!timeSelectionObservables.has(instanceId)) {
        timeSelectionObservables.set(
            instanceId,
            new Observable(defaultTimeSelection),
        );
    }
    // guard clause above
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const timeSelection = timeSelectionObservables.get(instanceId)!;

    const [timeWindow, setTimeWindow] = useState(timeSelection.get());

    useEffect(() => {
        return timeSelection.subscribe(setTimeWindow);
    }, [timeSelection]);

    const updateTimeWindow = (
        newValue: TimeSelection['label'] | TimeSelection,
    ) => {
        if ((newValue as TimeSelection).label) {
            timeSelection.set(newValue as TimeSelection);
        } else {
            const newTimeOption = timeOptions.find((o) => o.label === newValue);
            if (newTimeOption) {
                timeSelection.set(newTimeOption);
            }
        }
    };

    return {
        timeWindow,
        timeOptions,
        updateTimeWindow,
    };
}

export type { TimeSelection };
export { useTimeWindow, TimeUnit };

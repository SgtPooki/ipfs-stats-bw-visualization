import { TimeSelection, TimeUnit } from '../hooks/controls/useTimeWindow';

/**
 * Return the start & end dates for a d3 graph, given a TimeSelection.
 *
 * The TimeSelection object represents how far in the past the starting date should be.
 *
 * @param timeWindow
 * @returns [Date, Date]
 */
function getDomainFromTimeSelection(
    timeSelection: TimeSelection,
): [Date, Date] {
    const now = new Date();
    const xTimeStart = new Date(now);

    switch (timeSelection.unit) {
        case TimeUnit.days:
            xTimeStart.setDate(now.getDate() - timeSelection.value);
            break;
        case TimeUnit.hours:
            xTimeStart.setHours(now.getHours() - timeSelection.value);
            break;
        case TimeUnit.minutes:
            xTimeStart.setMinutes(now.getMinutes() - timeSelection.value);
            break;
        case TimeUnit.seconds:
            xTimeStart.setSeconds(now.getSeconds() - timeSelection.value);
            break;
        default:
            throw new Error('Unexpected timeSelection provided.');
    }

    return [xTimeStart, now];
}

export { getDomainFromTimeSelection };

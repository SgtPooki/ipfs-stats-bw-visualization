import {
    scaleLinear,
    scaleTime,
    min,
    max,
    select,
    axisBottom,
    axisLeft,
    line,
} from 'd3';
import { useEffect, useRef, useState } from 'react';

import { BWOptions } from 'ipfs-core-types/src/stats';

import { BandwidthData, ipfsStatsBw } from '../../../ipfs/stats/bw';
import { Observable } from '../../hof/observable';
import { useBwStatProperty } from '../../hooks/controls/useBwStatProperty';
import {
    TimeSelection,
    TimeUnit,
    useTimeWindow,
} from '../../hooks/controls/useTimeWindow';
import { getDomainFromTimeSelection } from '../../util/getDomainFromTimeSelection';

type MultilineChartDimensions = {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number };
};
type MultilineChartProps = {
    // data: MultilineChartData;
    dimensions: MultilineChartDimensions;
    timeWindow?: TimeSelection;
    bwStats?: BandwidthData;
};

const cachedData: BandwidthData[] = [];
const dataObservable = new Observable<BandwidthData[]>([]);

const MAX_DATAPOINTS = 24 * 60 * 60; // do not exceed

const MultilineChart = ({
    // data,
    dimensions,
}: // timeWindow,
// bwStats,
MultilineChartProps): JSX.Element => {
    const svgRef = useRef(null);
    const { timeWindow } = useTimeWindow();
    const { property: selectedProperty } = useBwStatProperty();
    const [data, setData] = useState([] as BandwidthData[]);
    const [property] = useState(selectedProperty);
    const [bwStatsIterator] = useState<AsyncIterable<BandwidthData>>(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const bwOptions: BWOptions = { poll: true, interval: '1s' };

        return ipfsStatsBw(bwOptions);
    });
    // const [MAX_DATA, setMaxData] = useState(1000);
    const xdomain = getDomainFromTimeSelection(timeWindow);

    const [MAX_DATA] = useState(() => {
        return new Observable<number>(1000);
    });

    useEffect(() => {
        let max_data: number;
        switch (timeWindow.unit) {
            case TimeUnit.days:
                max_data = 24 * 60 * 60 * timeWindow.value;
                break;
            case TimeUnit.hours:
                max_data = 60 * 60 * timeWindow.value;
                break;
            case TimeUnit.minutes:
                max_data = 60 * timeWindow.value;
                break;
            case TimeUnit.seconds:
                max_data = timeWindow.value;
                break;
            default:
                max_data = 1000;
        }
        MAX_DATA.set(max_data);
    }, [MAX_DATA, timeWindow]);

    useEffect(() => {
        (async () => {
            for await (const bwStats of bwStatsIterator) {
                setData((oldData) => {
                    const excessDataPoints = oldData.length - MAX_DATA.get();

                    if (excessDataPoints > 0) {
                        oldData.splice(0, excessDataPoints);
                    }

                    return [...oldData, bwStats];
                });
            }
        })();
    }, [bwStatsIterator, data, MAX_DATA]);

    useEffect(() => {
        const { width, height, margin } = dimensions;
        const ydomain = [
            0, //(min(data, (d) => d.rateIn) as number) - 50,
            (max(
                data,
                (d: BandwidthData) => d[property as 'rateIn' | 'rateOut'],
            ) as number) * 1.05,
        ];

        const xScale = scaleTime().domain(xdomain).range([0, width]);

        const yScale = scaleLinear().domain(ydomain).range([height, 0]);

        // Create root container where we will append all other chart elements
        const svgEl = select(svgRef.current);

        svgEl.selectAll('text').remove();
        svgEl.selectAll('g').remove();
        // svgEl.selectAll('.line').remove();

        const svg = svgEl
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Add X grid lines with labels
        const xAxis = axisBottom(xScale)
            .ticks(10)
            .tickSize(-height + margin.bottom);

        const xAxisGroup = svg
            .append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        xAxisGroup.select('.domain').remove();
        xAxisGroup.selectAll('line').attr('stroke', 'rgba(40, 44, 52, 0.2)');
        xAxisGroup
            .selectAll('text')
            // .attr('opacity', 0.5)
            .attr('color', '#282c34')
            .attr('font-size', '0.75rem');

        // Add Y grid lines with labels
        const yAxis = axisLeft(yScale)
            .ticks(5)
            .tickSize(-width)
            .tickFormat((val) => `${val} bytes`);

        const yAxisGroup = svg.append('g').call(yAxis);
        yAxisGroup.select('.domain').remove();
        yAxisGroup.selectAll('line').attr('stroke', 'rgba(40, 44, 52, 0.2)');
        yAxisGroup
            .selectAll('text')
            // .attr('opacity', 0.5)
            .attr('color', '#282c34')
            .attr('font-size', '0.75rem');

        // Draw the lines
        const lines = line<BandwidthData>()
            .x((d: BandwidthData) => xScale(d.date))
            .y((d: BandwidthData) => yScale(d.rateIn));

        svg.selectAll('.line')
            .data(data)
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', '#700')
            .attr('stroke-width', 3)
            .attr('d', () => lines(data));
    }, [data, timeWindow, dimensions, property, xdomain]); // Redraw chart if data changes

    useEffect(() => {
        const svgEl = select(svgRef.current);
        // clear everything if any of the dependents change.
        svgEl.selectAll('*').remove();
    }, [property]);

    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export { MultilineChart };

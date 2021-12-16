import * as d3 from 'd3';
import {
    scaleLinear,
    extent,
    scaleTime,
    min,
    max,
    select,
    axisBottom,
    axisLeft,
    line,
} from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-async-hook';

import { BandwidthData } from '../../../ipfs/stats/bw';
import { useIpfsBandwidth } from '../../hooks/ipfs/useIpfsBandwidth';
import {
    TimeSelection,
    TimeUnit,
    useTimeWindow,
} from '../../hooks/viz/useTimeWindow';
import { getDomainFromTimeSelection } from '../../util/getDomainFromTimeSelection';

type MultilineChartDimensions = {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number };
};
type MultilineChartProps = {
    // data: MultilineChartData;
    dimensions: MultilineChartDimensions;
    timeWindow: TimeSelection;
    bwStats?: BandwidthData;
};

const MultilineChart = ({
    // data,
    dimensions,
    timeWindow,
    bwStats,
}: MultilineChartProps): JSX.Element => {
    const svgRef = useRef(null);
    const [data, setData] = useState([] as BandwidthData[]);

    useEffect(() => {
        const addBwStats = (bwStats: BandwidthData) => {
            setData([...data, bwStats]);
        };

        if (bwStats) {
            addBwStats(bwStats);
        }
        const { width, height, margin } = dimensions;
        const xdomain = getDomainFromTimeSelection(timeWindow);
        // const sample = data[0];
        // const sampleItems = sample.items;
        // if (!sample || sampleItems.length === 0) {
        //     return;
        // }
        // const domainArg = extent(dataArray, (d) => d.date) as [Date, Date];

        const xScale = scaleTime().domain(xdomain).range([0, width]);

        const yScale = scaleLinear()
            .domain([
                (min(data, (d) => d.rateIn) as number) - 50,
                (max(data, (d) => d.rateIn) as number) + 50,
            ])
            .range([height, 0]);

        // Create root container where we will append all other chart elements
        const svgEl = select(svgRef.current);

        svgEl.selectAll('*').remove(); // Clear svg content before adding new elements

        const svg = svgEl
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Add X grid lines with labels
        const xAxis = axisBottom(xScale)
            .ticks(5)
            .tickSize(-height + margin.bottom);

        const xAxisGroup = svg
            .append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        xAxisGroup.select('.domain').remove();
        xAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
        xAxisGroup
            .selectAll('text')
            .attr('opacity', 0.5)
            .attr('color', 'white')
            .attr('font-size', '0.75rem');

        // Add Y grid lines with labels
        const yAxis = axisLeft(yScale)
            .ticks(5)
            .tickSize(-width)
            .tickFormat((val) => `${val}%`);

        const yAxisGroup = svg.append('g').call(yAxis);
        yAxisGroup.select('.domain').remove();
        yAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
        yAxisGroup
            .selectAll('text')
            .attr('opacity', 0.5)
            .attr('color', 'white')
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
    }, [data, timeWindow, bwStats, dimensions]); // Redraw chart if data changes

    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export { MultilineChart };

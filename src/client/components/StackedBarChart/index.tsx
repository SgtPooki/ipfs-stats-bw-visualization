// import { create } from 'd3';

// function buildChart() {
//     const svg = create('svg').attr('viewBox', [0, 0, width, height]);

//     const rect = svg
//         .selectAll('g')
//         .data(y01z)
//         .join('g')
//         .attr('fill', (d, i) => z(i))
//         .selectAll('rect')
//         .data((d) => d)
//         .join('rect')
//         .attr('x', (d, i) => x(i))
//         .attr('y', height - margin.bottom)
//         .attr('width', x.bandwidth())
//         .attr('height', 0);

//     svg.append('g').call(xAxis);

//     function transitionGrouped() {
//         y.domain([0, yMax]);

//         rect.transition()
//             .duration(500)
//             .delay((d, i) => i * 20)
//             .attr('x', (d, i) => x(i) + (x.bandwidth() / n) * d[2])
//             .attr('width', x.bandwidth() / n)
//             .transition()
//             .attr('y', (d) => y(d[1] - d[0]))
//             .attr('height', (d) => y(0) - y(d[1] - d[0]));
//     }

//     function transitionStacked() {
//         y.domain([0, y1Max]);

//         rect.transition()
//             .duration(500)
//             .delay((d, i) => i * 20)
//             .attr('y', (d) => y(d[1]))
//             .attr('height', (d) => y(d[0]) - y(d[1]))
//             .transition()
//             .attr('x', (d, i) => x(i))
//             .attr('width', x.bandwidth());
//     }

//     function update(layout) {
//         if (layout === 'stacked') transitionStacked();
//         // else transitionGrouped();
//     }

//     return Object.assign(svg.node(), { update });
// }

export {};

// https://observablehq.com/@d3/lets-make-a-bar-chart?collection=@d3/lets-make-a-bar-chart
import * as d3 from 'd3';
import './scss/style.scss';
import data from './assets/numbers.csv';

// constants
const widthBar = 20;
const axisSize = 30;
const height = 500;

// linear interpolation on both axes
const scaleX = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([0, data.length * widthBar])
  .paddingInner(0.2);
const scaleY = d3.scaleLinear()
  .domain([0, d3.max(data, (d) => d.value)])
  .range([height - (2 * axisSize), 0]);

// container (leave space for axis ticks)
const svg = d3.select('body')
  .insert('svg', ':first-child')
  .attr('width', widthBar * data.length + axisSize + 20)
  .attr('height', height);

// each bar is an svg group (contains rect + text)
const bars = svg.selectAll(null)
  .data(data)
  .join('g')
  .attr('transform', (d, i) => `translate(${axisSize + scaleX(i)}, ${scaleY(d.value) + axisSize})`);

// append automatically binds data to container children
bars.append('rect')
  .attr('width', `${widthBar}`)
  .attr('height', (d) => `${height - (2 * axisSize) - scaleY(d.value)}px`)
  .attr('opacity', 1.0)
  .attr('fill', 'steelblue');

bars.append('text')
  .attr('fill', 'white')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 10)
  .attr('dominant-baseline', 'hanging')
  .attr('writing-mode', 'tb')
  .attr('pointer-events', 'none')
  .text((d) => d.name);

// tooltip shown on hover
const tooltip = svg.append('g')
  .style('visibility', 'hidden');
tooltip.append('rect')
  .attr('y', -20)
  .attr('opacity', 0.5)
  .attr('width', 20)
  .attr('height', 19)
  .attr('fill', 'green');
tooltip.append('text')
  .attr('fill', 'white')
  .attr('dominant-baseline', 'auto')
  .attr('text-anchor', 'middle')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 10)
  .attr('x', widthBar / 2)
  .attr('y', -5);

// show data tooltip on hover & change rect opacity
bars.on('mouseover', function onMouseOver() {
  const rect = d3.select(this)
    .select('rect');

  const { x, y } = rect.node().getBoundingClientRect();
  const { value } = rect.data()[0];
  tooltip.style('visibility', 'visible')
    .attr('transform', () => `translate(${x}, ${y})`);
  tooltip.select('text')
    .text(value);

  rect.transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr('opacity', 0.7);
});
bars.on('mouseout', function onMouseOut() {
  tooltip.style('visibility', 'hidden');

  d3.select(this)
    .select('rect')
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr('opacity', 1.0);
});

// draw axes
const gBottom = svg.append('g')
  .attr('transform', `translate(${axisSize}, ${height - axisSize})`);
const gLeft = svg.append('g')
  .attr('transform', `translate(${axisSize}, ${axisSize})`);
d3.axisBottom(scaleX)(gBottom);
d3.axisLeft(scaleY)(gLeft);

// y-axis legend
svg.append('text')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 10)
  .attr('dominant-baseline', 'middle')
  .attr('text-anchor', 'middle')
  .attr('pointer-events', 'none')
  .attr('x', axisSize / 2)
  .attr('y', axisSize / 2)
  .text('Age');

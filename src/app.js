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
  .attr('width', widthBar * data.length + axisSize)
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
  .attr('fill', 'steelblue');

bars.append('text')
  .attr('fill', 'white')
  .attr('dominant-baseline', 'hanging')
  .attr('writing-mode', 'tb')
  .text((d) => d.name);

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
  .attr('x', axisSize / 2)
  .attr('y', axisSize / 2)
  .text('Age');

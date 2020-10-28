// map: https://observablehq.com/@d3/lets-make-a-bar-chart?collection=@d3/lets-make-a-bar-chart
import * as d3 from 'd3';

// import assets
import countries from 'assets/countries.geo.json';

// constants
const width = 500;
const height = 500;

const map = () => {
  const svg = d3.select('body')
    .insert('svg', 'svg + *')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'map');

  const projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale(100);
  const path = d3.geoPath(projection);
  svg.selectAll(null)
    .data(countries.features)
    .join('path')
    .attr('d', path)
    .attr('class', 'country');
};

export default map;

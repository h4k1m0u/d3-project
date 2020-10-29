// map:
// tutorial: https://observablehq.com/@d3/lets-make-a-bar-chart?collection=@d3/lets-make-a-bar-chart
// example: https://www.d3-graph-gallery.com/graph/choropleth_basic.html
import * as d3 from 'd3';

// import assets
import worldmap from 'assets/world.geo.json';
import populations from 'assets/population.csv';

// links csv and geojson files to get population cooresp. to country shape
const getPopulationById = (id) => {
  const country = populations.find((population) => population.code === id);
  return (country ? country.pop : null);
};

// constants
const width = 500;
const height = 500;

const map = () => {
  // assign each population range to color
  const scale = d3.scaleThreshold()
    .domain([30e6, 100e6, 200e6, 500e6])
    .range(d3.schemeReds[5]);

  const svg = d3.select('body')
    .insert('svg', 'svg + *')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'map');

  // mercator projection
  const projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale(100);

  // draw every country's shape
  const geopath = d3.geoPath(projection);
  const shape = svg.selectAll(null)
    .data(worldmap.features)
    .join('path')
    .attr('d', geopath)
    .attr('class', 'country')
    .attr('fill', (d) => {
      const population = getPopulationById(d.id);
      return (population ? scale(population) : '#000');
    });

  // show population in country clicked
  shape.on('mousedown', function onMouseDown() {
    const country = d3.select(this).data()[0];
    console.log('country ', country);
    const population = getPopulationById(country.id);
    console.log('pop ', population);
  });
};

export default map;

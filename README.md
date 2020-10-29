# Description
- Draw a graph bar from entries inside CSV file.
- Draw a map from the given geojson vector.

# Credit
- Graphs with D3.js: [Tutorial](https://observablehq.com/@d3/lets-make-a-bar-chart?collection=@d3/lets-make-a-bar-chart)
- Maps with D3.js: [Tutorial](https://soshace.com/mapping-the-world-creating-beautiful-maps-and-populating-them-with-data-using-d3-js/) and [example](https://www.d3-graph-gallery.com/graph/choropleth_basic.html)

# Assets
- GeoJSON and CSV files for world population by country in 2006: [example](https://www.d3-graph-gallery.com/graph/choropleth_basic.html)

# Notions in D3.js
- `selection.enter()`: more data items than DOM elements.
- `selection.data()`: as many data items as DOM elements.
- `selection.exit()`: more DOM elements than data items.
- `selection.join()`: appends (`selection.enter().append()`), removes (`selection.exit().remove()`), and updates (`selection.data()`).
- `selection.append()`: inserts as a last-child.

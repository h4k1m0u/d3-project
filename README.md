# Description
- Draw a graph bar from entries inside CSV file.
- Draw a map from the given geojson vector.

# Credit
- Graphs with D3.js: [1](https://observablehq.com/@d3/lets-make-a-bar-chart?collection=@d3/lets-make-a-bar-chart)
- Maps with D3.js: [2](https://soshace.com/mapping-the-world-creating-beautiful-maps-and-populating-them-with-data-using-d3-js/)

# Notions in D3.js
- `selection.enter()`: more data items than DOM elements.
- `selection.data()`: as many data items as DOM elements.
- `selection.exit()`: more DOM elements than data items.
- `selection.join()`: appends (`selection.enter().append()`), removes (`selection.exit().remove()`), and updates (`selection.data()`).
- `selection.append()`: inserts as a last-child.

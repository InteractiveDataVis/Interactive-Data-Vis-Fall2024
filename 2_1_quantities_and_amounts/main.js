/* CONSTANTS AND GLOBALS */
const width = 960, height = 500;
const margin = { top: 20, right: 30, bottom: 40, left: 100 };

// Create SVG canvas
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

/* LOAD DATA */
d3.csv('MoMA_topTenNationalities.csv', d3.autoType)
.then(data => {
  // Define color scale
  const colorScale = d3.scaleOrdinal(d3.schemeTableau10); // Uses a D3 color scheme

  // Define your scales based on the data
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Count)]) // Make sure 'Count' matches your CSV
    .range([0, width - margin.left - margin.right]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Nationality)) 
    .range([0, height - margin.top - margin.bottom])
    .padding(0.1);

  // Add bars
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0) // Bars start at x=0
    .attr("y", d => yScale(d.Nationality))
    .attr("width", d => xScale(d.Count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "white") // Fill bars with white
    .attr("stroke", d => colorScale(d.Nationality)) // Use the color scale for the stroke
    .attr("stroke-width", 2); // Set the width of the stroke

  // Add Y Axis
  svg.append("g")
    .call(d3.axisLeft(yScale));

  // Add X Axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(xScale));
});


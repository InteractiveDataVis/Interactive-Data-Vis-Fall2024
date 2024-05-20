/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 60 };

/* DATA */
const data = [
  { year: new Date(2020, 0, 1), residentialPrice: 18.36 },
  { year: new Date(2019, 0, 1), residentialPrice: 17.94 },
  { year: new Date(2018, 0, 1), residentialPrice: 18.52 },
  { year: new Date(2017, 0, 1), residentialPrice: 18.03 },
  { year: new Date(2016, 0, 1), residentialPrice: 17.58 },
  { year: new Date(2015, 0, 1), residentialPrice: 18.54 },
  { year: new Date(2014, 0, 1), residentialPrice: 20.07 },
  { year: new Date(2013, 0, 1), residentialPrice: 18.79 },
  { year: new Date(2012, 0, 1), residentialPrice: 17.62 },
  { year: new Date(2011, 0, 1), residentialPrice: 18.26 },
  { year: new Date(2010, 0, 1), residentialPrice: 18.74 },
  { year: new Date(2009, 0, 1), residentialPrice: 17.50 },
  { year: new Date(2008, 0, 1), residentialPrice: 18.31 },
  { year: new Date(2007, 0, 1), residentialPrice: 17.10 },
  { year: new Date(2006, 0, 1), residentialPrice: 16.89 },
  { year: new Date(2005, 0, 1), residentialPrice: 15.72 },
  { year: new Date(2004, 0, 1), residentialPrice: 14.54 },
];

// SCALES
const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.year))
  .range([margin.left, width - margin.right]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.residentialPrice)])
  .range([height - margin.bottom, margin.top]);

// CREATE SVG ELEMENT
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// AXES
const xAxis = d3.axisBottom(xScale).ticks(data.length);
const yAxis = d3.axisLeft(yScale).tickFormat(d => `$${d.toFixed(2)}`);

svg.append("g")
  .attr("class", "axis xAxis")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis)
  .append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "end")
    .attr("x", width - margin.right)
    .attr("y", -10)
    .text("Year");

svg.append("g")
  .attr("class", "axis yAxis")
  .attr("transform", `translate(${margin.left},0)`)
  .call(yAxis)
  .append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", 15)
    .attr("x", -margin.top)
    .text("Price ($)");

// AREA GENERATOR
const areaGen = d3.area()
  .x(d => xScale(d.year))
  .y0(height - margin.bottom)
  .y1(d => yScale(d.residentialPrice));

// DRAW AREA
svg.append("path")
  .datum(data) // Use datum as we're only creating one area path
  .attr("class", "area")
  .attr("d", areaGen)
  .attr("fill", "#90caf9"); // Using a placeholder color, you can change it to fit your design

t /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
      height = window.innerHeight * 0.9,
      margin = { top: 20, bottom: 60, left: 60, right: 40 };

/* TOOLTIP SETUP */
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("width", "120px")
    .style("height", "auto")
    .style("padding", "2px")
    .style("font", "12px sans-serif")
    .style("background", "lightsteelblue")
    .style("border", "1px solid #333")
    .style("border-radius", "8px")
    .style("pointer-events", "none")
    .style("opacity", "0.9")
    .style("display", "none");

/* LOAD DATA */
d3.csv("MoMA_distributions.csv", d => ({
  // Parse strings to numbers where necessary
  length: +d["Length (cm)"],
  width: +d["Width (cm)"],
  lifespan: +d["Artist Lifespan"], 
  artist: d.Artist, // You can add other data fields you need here
})).then(rawData => {
  // Filter out records with no lifespan, lifespans over 100, and then reduce to one entry per artist
  const data = Array.from(
    rawData
    .filter(d => d.lifespan > 0 && d.lifespan <= 100)
    .reduce((acc, d) => {
      acc.has(d.artist) || acc.set(d.artist, d);
      return acc;
    }, new Map()).values()
  );

  // Define the maximum length and width for the scales based on the filtered data
  const maxDataLength = Math.min(300, d3.max(data, d => d.length));
  const maxDataWidth = Math.min(160, d3.max(data, d => d.width));

  /* SCALES */
  // xScale - linear, clamp max at 300 or max data length
  const xScale = d3.scaleLinear()
    .domain([0, maxDataLength])
    .range([margin.left, width - margin.right]);

  // yScale - linear, clamp max at 160 or max data width
  const yScale = d3.scaleLinear()
    .domain([0, maxDataWidth])
    .range([height - margin.bottom, margin.top]);

  // Create a size scale for the artist lifespan, with a range to make differences more noticeable
  const sizeScale = d3.scaleSqrt()
    .domain(d3.extent(data, d => d.lifespan))
    .range([5, 40]); // Adjust the range for more pronounced circle sizes

  /* SVG SETUP */
  const svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);

  /* AXES AND AXIS LABELS */
  const xAxis = d3.axisBottom(xScale);
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width - margin.right)
    .attr("y", 40)
    .attr("text-anchor", "end")
    .attr("fill", "black")
    .text("Length (cm)");

  const yAxis = d3.axisLeft(yScale);
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("y", 15 - margin.left)
    .attr("x", -margin.top)
    .attr("dy", ".71em")
    .attr("text-anchor", "end")
    .attr("fill", "black")
    .text("Width (cm)");

  /* DRAW CIRCLES WITH TOOLTIPS */
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("r", d => sizeScale(d.lifespan))
      .attr("cx", d => xScale(d.length))
      .attr("cy", d => yScale(d.width))
      .attr("fill", "red")
      .attr("stroke", "#333")
      .attr("stroke-width", "1px")
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 28}px`)
          .html(`<strong>Artist:</strong> ${d.artist}<br>
                 <strong>Lifespan:</strong> ${d.lifespan} years<br>
                 <strong>Dimensions:</strong> ${d.length} x ${d.width} cm`);
        d3.select(event.currentTarget)
          .attr("stroke", "black")
          .attr("stroke-width", "2px");
      })
      .on("mouseout", (event) => {
        tooltip.style("display", "none");
        d3.select(event.currentTarget)
          .attr("stroke", "#333")
          .attr("stroke-width", "1px");
      });
      });
    
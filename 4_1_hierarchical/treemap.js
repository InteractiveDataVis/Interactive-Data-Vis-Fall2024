/** CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let tooltip;

/** APPLICATION STATE */
let state = {
  data: null,
  hover: null
};

/** LOAD DATA */
d3.json("../data/flare.json", d3.autotype).then(data => {
  state.data = data;
  init();
});

/** INITIALIZING FUNCTION */
function init() {

  const colorScale = d3.scaleOrdinal(d3.schemeSet3);

  const container = d3.select("#container")
  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("overflow", "visible")

  console.log(state.data)

  // create root
  const root = d3.hierarchy(state.data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value)

  console.log({...root})
  
  // create treemap generator
  const treeGen = d3.treemap()
    .size([width, height])
    .paddingInner(1)
    .round(true)
    // .tile(d3.treemapBinary)

  treeGen(root)
  console.log(root)
  
  // get leaves
  const leaves = root.leaves()
  console.log(leaves)

  // append leaves to svg
  // const leavesSel = svg.selectAll(".leaf")
  //   .data(leaves)
  //   .join("rect")
  //   .attr("class", "leaf")
  //   .attr("x", d => d.x0)
  //   .attr("y", d => d.y0)
  //   .attr("width", d => d.x1 - d.x0)
  //   .attr("height", d => d.y1 - d.y0)

  const leavesGroup = svg.selectAll(".leaf")
    .data(leaves)
    .join("g")
    .attr("class", "leaf")
    .attr("transform", d => `translate(${d.x0}, ${d.y0})`)

  const rects = leavesGroup.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    // .style("fill", "none")
    // .style("stroke", "black")
    .attr("fill", d => {
      const level1Ancestor = d.ancestors().find(d => d.depth === 1)
      return colorScale(level1Ancestor.data.name)
    })

  const leafText = leavesGroup.append("text")
    .text(d => `${d.data.name} | ${d.data.value}`)
    .attr("dy", "1em")
  
  draw(); // calls the draw function
}

/** DRAW FUNCTION  */
function draw() {

}
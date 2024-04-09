

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

  const container = d3.select("#container")
  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    
    // create root based on hierarchy
    const root = d3.hierarchy(state.data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    // create a circlepack generator
    const packGen = d3.pack()
      .size([width, height])
      .padding(10)

    packGen(root)
    console.log(root)
    
    // define the descendants for the visualization
    const desc = root.descendants();

    console.log(desc)

    // append descendants to visualization
    const circles = svg.selectAll(".desc")
      .data(desc)
      .join("circle")
      .attr("class", "desc")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .style("fill", d => d.children ? "transparent" : "black")
      .style("stroke", "black")
      // .style("opacity", 0.3)


  
  draw(); // calls the draw function
}

/** DRAW FUNCTION */
function draw() {
  


}
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
      height = window.innerHeight * 0.9;

/* LOAD DATA */
Promise.all([
  d3.json("../data/world.json"),
  d3.csv("../data/MoMA_nationalities.csv", d3.autoType), 
]).then(([geojson, momaData]) => {
  // Adjust country names in the momaData array
  momaData.forEach(d => {
    if (d.Country === "French") d.Country = "France";
    if (d.Country === "Britain") d.Country = "United Kingdom";
  });

  // Filter geojson to only include specified European countries
  const europeanCountriesGeoJSON = geojson.features.filter(feature => feature.properties.name && [
    "Germany", "United Kingdom", "France", "Italy", "Switzerland", "The Netherlands", "Slovenia", "Ukraine",
    "Austria", "Spain", "Poland", "Sweden", "Denmark", "Belgium", "Czech Republic", "Israel", 
    "Finland", "Hungary", "Norway", "Croatia", "Ireland", "Turkey", "Scotland", "Romania", 
    "Serbia", "Iceland", "Greece", "Portugal", "Lebanon", "Slovakia", 
    "Bosnia", "Georgia", "Bulgaria", "Macedonia", "Palestine", "Lithuania", "Albania", "Luxembourg", "Latvia", // Add other countries as necessary
  ].includes(feature.properties.name));

  // Define color scale (change to red)
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateReds)
    .domain([0, d3.max(momaData, d => d.Count)]);

  const svg = d3
    .select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  // SPECIFY PROJECTION
  const projection = d3.geoMercator()
    .fitSize([width, height], {type: "FeatureCollection", features: europeanCountriesGeoJSON});

  // DEFINE PATH FUNCTION
  const geoPathGen = d3.geoPath(projection);

  // DRAW MAP
  svg.selectAll(".country")
    .data(europeanCountriesGeoJSON)
    .join("path")
    .attr("class", "country")
    .attr("stroke", "black")
    .attr("fill", d => {
      const countryName = d.properties.name;
      const countryData = momaData.find(cd => cd.Country === countryName);
      return countryData ? colorScale(countryData.Count) : "#f0f0f0"; // Default color for countries with no data
    })
    .attr("d", geoPathGen);
})
.catch(error => {
  console.error("Error loading or processing data:", error);
});

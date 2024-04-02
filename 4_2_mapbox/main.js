mapboxgl.accessToken = 'pk.eyJ1IjoiZWxsaWVmcnkiLCJhIjoiY2xsc2RtN3htMHRwdzNlczJwNDJkMWN0bSJ9.0yud2cyis9T9rp3CeanjIA';

const usMap = new mapboxgl.Map({
  container: 'map',
  center: [-122.420679, 37.772537], // starting position [lng, lat]
  zoom: 10, // starting zoom
  style: 'mapbox://styles/elliefry/cluhjll03006h01pwalus3jk0',
})

const gcPopUp = new mapboxgl.Popup().setText("testing!")

const gradCenter = new mapboxgl.Marker()
  .setLngLat([-73.9833, 40.7423])
  .setPopup(gcPopUp)
  .addTo(usMap)

d3.csv("../data/usHeatExtremes.csv").then(data => {
  console.log(data)

  const [min, max] = d3.extent(data.map(d => +d['Change in 95 percent Days']))
  const colorScale = d3.scaleLinear()
    .domain([min, 0, max])
    .range(["blue", "white", "red"])

  data
    .filter(point => point['Change in 95 percent Days'] !== "0")
    .forEach((point) => {
      new mapboxgl.Marker({
        scale: Math.abs(+point['Change in 95 percent Days']) / 100,
        color: colorScale(+point['Change in 95 percent Days'])
      })
        .setLngLat([point.Long, point.Lat])
        .addTo(usMap)
        // .setDraggable(true)
        .setPopup(new mapboxgl.Popup().setText(`Temp change: ${point['Change in 95 percent Days']}`))
    })
})


document.addEventListener('DOMContentLoaded', function() {
    setupWorldMap();
});

function setupWorldMap() {
    const width = window.innerWidth;
    const height = window.innerHeight * 0.9;
    const svg = d3.select("#worldMap").append("svg")
        .attr("width", width)
        .attr("height", height);

    const projection = d3.geoNaturalEarth1()
    .scale(width / 5.6)
    .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    //data from TopoJSON
    d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(world => {
        const land = topojson.feature(world, world.objects.land);
        svg.append("path")
            .datum(land)
            .attr("d", pathGenerator)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 0.5); // Fine black line for coastline

        addLocations(svg, projection);
    }).catch(error => {
        console.error('Failed to load data: ', error);
    });

    // Zoom functionality
    svg.call(d3.zoom().on('zoom', (event) => {
        svg.attr('transform', event.transform);
    }));
}

function addLocations(svg, projection) {
    const locations = [
        // ... your locations array ...
    ];

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.selectAll("circle")
        .data(locations)
        .enter().append("circle")
        .attr("cx", d => projection([d.lng, d.lat])[0])
        .attr("cy", d => projection([d.lng, d.lat])[1])
        .attr("r", 3) // Default circle radius
        .style("fill", () => "#" + Math.floor(Math.random()*16777215).toString(16))  // Random color
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`
                <p>Location: ${d.lat}, ${d.lng}</p>
                <p><a href="${d.momaUrl}" target="_blank">MoMA Collection</a></p>
                <p><a href="${d.googleMapsUrl}" target="_blank">View how it looks today</a></p>
            `)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", (event, d) => showPopup(event, d));
}

function showPopup(event, d) {
    removePopup(); // Remove existing popups first
    const x = event.pageX + 10; // Offset to avoid cursor
    const y = event.pageY + 10;

    d3.select("body").append("div")
        .attr("class", "popup")
        .style("left", `${x}px`)
        .style("top", `${y}px`)
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid black")
        .style("padding", "10px")
        .html(`
            <p><a href="${d.momaUrl}" target="_blank">MoMA Collection</a></p>
            <p><a href="${d.googleMapsUrl}" target="_blank">View how it looks today</a></p>
        `);

    // Adding a click event on the document to close the popup when clicking elsewhere
    d3.select(document).on("click.popup", function() {
        if (!d3.select(d3.event.target).classed("popup") && !d3.select(d3.event.target).node().parentNode.classList.contains("popup")) {
            removePopup();
            d3.select(document).on("click.popup", null); // Remove this event listener
        }
    });
}

function removePopup() {
    d3.select(".popup").remove();
}

function addLocations(svg, projection) {
        const locations = [
            {
                lat: 41.88895085837717,
                lng: 12.481324221898328,
                momaUrl: "https://www.moma.org/collection/works/57850",
                googleMapsUrl: "https://www.google.com/maps/place/Temple+of+Hercules+Victor/@41.8870852,12.4829786,248a,35y,303.43h,44.92t/data=!3m1!1e3"
            },
            {
                lat: 41.88895085837717,
                lng: 12.481324221898328,
                momaUrl: "https://www.moma.org/collection/works/57850",
                googleMapsUrl: "https://www.google.com/maps/place/Temple+of+Hercules+Victor/@41.8870852,12.4829786,248a,35y,303.43h,44.92t/data=!3m1!1e3!4m6!3m5!1s0x132f604a7f37e1c7:0x7a6122833563fa10!8m2!3d41.8887637!4d12.4807554!16zL20vMDc1Y2g1"
            },
            {
                lat: 31.198806566219808,
                lng: 29.893327795093718,
                momaUrl: "https://www.moma.org/collection/works/54811",
                googleMapsUrl: "https://www.google.com/maps/place/31°11'55.7%22N+29°53'36.0%22E/@31.1988066,29.8933278,770m/data=!3m1!1e3!4m4!3m3!8m2!3d31.1988066!4d29.8933278"
            },
            {
                lat: 31.182045343445335,
                lng: 29.89673912986325,
                momaUrl: "https://www.moma.org/collection/works/54825",
                googleMapsUrl: "https://www.google.com/maps/place/31°10'55.4%22N+29°53'48.3%22E/@31.1820453,29.8967391,17z/data=!3m1!4b1!4m4!3m3!8m2!3d31.1820453!4d29.8967391"
            },
            {
                lat: 21.691890224523586,
                lng: 31.29070935713978,
                momaUrl: "https://www.moma.org/collection/works/54838",
                googleMapsUrl: "https://www.google.com/maps/search/nubia+sudan+waterwheel/@21.5712284,30.819198,141168m/data=!3m1!1e3"
            },
            {
                lat: 55.95497461552964,
                lng: -3.182991460036102,
                momaUrl: "https://www.moma.org/collection/works/57847",
                googleMapsUrl: "https://www.google.com/maps/place/Dugald+Stewart+Monument/@55.9549604,-3.1822482,150a,35y,236.63h,45t/data=!3m1!1e3!4m6!3m5!1s0x4887c789365f252d:0xdaa07654a220018b!8m2!3d55.9544941!4d-3.1844506!16zL20vMGRmazU1"
            },
            {
                lat: 9.919282988437628,
                lng: 78.11907984007348,
                momaUrl: "https://www.moma.org/collection/works/45554",
                googleMapsUrl: "https://www.google.com/maps/place/Meenakshi+Amman+Temple/@9.9187115,78.1193724,884m/data=!3m1!1e3!4m6!3m5!1s0x3b00c58461e46987:0xf134621ce5286703!8m2!3d9.9195045!4d78.1193418!16s%2Fm%2F026g1j2"
            },
            {
                lat: 59.3254763832158,
                lng: 18.06362626171251,
                momaUrl: "https://www.moma.org/collection/works/47393",
                googleMapsUrl: "https://www.google.com/maps/place/59°19'31.7%22N+18°03'49.1%22E/@59.3253401,18.0635428,17z/data=!4m11!1m6!3m5!2zNTnCsDE5JzMxLjciTiAxOMKwMDMnNDkuMSJF!8m2!3d59.3254764!4d18.0636263!10e5!3m3!8m2!3d59.3254764!4d18.0636263"
            },
            {
                lat: 37.96910606962951,
                lng: 23.732497925215448,
                momaUrl: "https://www.moma.org/collection/works/51338",
                googleMapsUrl: "https://www.google.com/maps/place/Temple+of+Olympian+Zeus/@37.969225,23.7318058,709m/data=!3m1!1e3!4m12!1m5!3m4!2zMzfCsDU4JzA4LjgiTiAyM8KwNDMnNTcuMCJF!8m2!3d37.9691061!4d23.7324979!3m5!1s0x14a1bd169b9c6429:0x5519bb221fe94255!8m2!3d37.9693!4d23.7331!16zL20vMDVrZzg"
            },
            {
                lat: -11.889632308878712,
                lng: -76.48823229136183,
                momaUrl: "https://www.moma.org/collection/works/44835",
                googleMapsUrl: "https://www.google.com/maps/place/Puente+Carrión/@-11.8887177,-76.4870768,856a,35y,167.07h/data=!3m1!1e3!4m6!3m5!1s0x9105f95e281281c9:0xd98db740f2364950!8m2!3d-11.8895298!4d-76.4882672!16s%2Fg%2F11r9q30t1t"
            },
            {
                lat: 39.36623628451196,
                lng: -74.42600927065651,
                momaUrl: "https://www.moma.org/collection/works/298545",
                googleMapsUrl: "https://www.google.com/maps/place/39°21'58.5%22N+74°25'33.6%22W/@39.3673069,-74.4264422,127a,35y,162.72h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d39.3662363!4d-74.4260093"
            },
            {
                lat: 44.89468359083679,
                lng: -110.38462385311021,
                momaUrl: "https://www.moma.org/collection/works/400217",
                googleMapsUrl: "https://www.google.com/maps/search/Grand+Canyon+of+Yellowstone+river/@44.8990204,-110.4304563,10088m/data=!3m1!1e3"
            },
            {
                lat: 41.881993141632584,
                lng: -87.63185607551002,
                momaUrl: "https://www.moma.org/collection/works/400219",
                googleMapsUrl: "https://www.google.com/maps/place/41°52'55.2%22N+87°37'54.7%22W/@41.8819931,-87.6318561,17z/data=!3m1!4b1!4m4!3m3!8m2!3d41.8819931!4d-87.6318561"
            },
            {
                lat: 41.97508424835115,
                lng: -87.72942073429664,
                momaUrl: "https://www.moma.org/collection/works/400220",
                googleMapsUrl: "https://www.google.com/maps/place/North+Park,+Chicago,+IL/@41.9762394,-87.7363084,264m/data=!3m1!1e3!4m6!3m5!1s0x880fce7068f6c281:0x6ffce8a274ec7076!8m2!3d41.9828479!4d-87.7284429!16s%2Fg%2F1q67rgj74"
            },
            {
                lat: 44.343361322029196,
                lng: -110.06876422845869,
                momaUrl: "https://www.moma.org/collection/works/400222",
                googleMapsUrl: "https://www.google.com/maps/place/Mount+Schutz/@44.338568,-110.0669723,14.98z/data=!4m13!1m6!3m5!2zNDTCsDIwJzM2LjEiTiAxMTDCsDA0JzA3LjYiVw!8m2!3d44.3433613!4d-110.0687642!10e5!3m5!1s0x534de36146be514d:0x5437330e65c181a8!8m2!3d44.3419444!4d-110.0716666!16s%2Fg%2F1thl0j3w"
            },
            {
                lat: 44.934813351734576,
                lng: -110.72291089209295,
                momaUrl: "https://www.moma.org/collection/works/400223",
                googleMapsUrl: "https://www.google.com/maps/@44.9353152,-110.7231102,3a,60y,243.02h,90t/data=!3m6!1e1!3m4!1s0GR7uqvfY-nA9boewjTVVQ!2e0!7i13312!8i6656"
            },
            {
                lat: 41.11575601615458,
                lng: -112.51874668980129,
                momaUrl: "https://www.moma.org/collection/works/400227",
                googleMapsUrl: "https://www.google.com/maps/@41.1788447,-112.596999,49020m/data=!3m1!1e3"
            },
            {
                lat: 40.77109741138491,
                lng: -111.89071296083303,
                momaUrl: "https://www.moma.org/collection/works/400228",
                googleMapsUrl: "https://www.google.com/maps/place/Salt+Lake+Utah+Temple/@40.7709786,-111.8922027,236m/data=!3m1!1e3!4m12!1m5!3m4!2zNDDCsDQ2JzE2LjAiTiAxMTHCsDUzJzI2LjYiVw!8m2!3d40.7710974!4d-111.890713!3m5!1s0x8752f508e4890ee9:0x7f871e221aa7395d!8m2!3d40.7705774!4d-111.8919146!16zL20vMDM0em40"
            },
            {
                lat: 39.742927231147746,
                lng: -105.51477750005218,
                momaUrl: "https://www.moma.org/collection/works/400229",
                googleMapsUrl: "https://www.google.com/maps/@39.7404578,-105.516203,3a,75y,179.41h,90t/data=!3m8!1e1!3m6!1sAF1QipPoK8zEzK0ZyWopVc0rJDncjTlCKYh3cQI1ZmMi!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPoK8zEzK0ZyWopVc0rJDncjTlCKYh3cQI1ZmMi%3Dw203-h100-k-no-pi-0-ya353.5434-ro0-fo100!7i7680!8i3840"
            },
            {
                lat: 52.708001652364054,
                lng: -2.7527973503280423,
                momaUrl: "https://www.moma.org/collection/works/124769",
                googleMapsUrl: "https://www.google.com/maps/place/52°42'28.8%22N+2°45'10.1%22W/@52.7083366,-2.752541,18.3z/data=!4m11!1m6!3m5!2zNTLCsDQyJzI4LjgiTiAywrA0NScxMC4xIlc!8m2!3d52.7080017!4d-2.7527974!10e5!3m3!8m2!3d52.7080017!4d-2.7527974"
            },
            {
                lat: 40.419910532397395,
                lng: 15.006473286711138,
                momaUrl: "https://www.moma.org/collection/works/125021",
                googleMapsUrl: "https://www.google.com/maps/place/40°25'11.7%22N+15°00'23.3%22E/@40.4199105,15.0064733,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.4199105!4d15.0064733"
            },
            {
                lat: 40.85214308710397,
                lng: 14.260868487734557,
                momaUrl: "https://www.moma.org/collection/works/46310",
                googleMapsUrl: "https://www.google.com/maps/place/40°51'07.7%22N+14°15'39.1%22E/@40.8521389,14.2582862,680m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d40.8521389!4d14.2608611"
            },
            {
                lat: 41.82480949613774,
                lng: -71.40918394770594,
                momaUrl: "https://www.moma.org/collection/works/124760",
                googleMapsUrl: "https://www.google.com/maps/place/The+Arcade+Providence/@41.8241699,-71.410686,15z/data=!3m1!5s0x89e44514222cf7a3:0xef84708a8e9f1508!4m14!1m7!3m6!1s0x89e445142198f60f:0xac3f2b5e6651f5ea!2sThe+Arcade+Providence!8m2!3d41.8241699!4d-71.410686!16zL20vMGcxc3Rr!3m5!1s0x89e445142198f60f:0xac3f2b5e6651f5ea!8m2!3d41.8241699!4d-71.410686!16zL20vMGcxc3Rr"
            },
            {
                lat: 40.06939094142866,
                lng: -105.61458791675068,
                momaUrl: "https://www.moma.org/collection/works/124999",
                googleMapsUrl: "https://www.google.com/maps/@40.06902,-105.6162267,3a,75y,241.46h,95.98t/data=!3m8!1e1!3m6!1sAF1QipMKsBX7Ns1WWLRjt6pHg3aV0j_647ZoFUxF88oL!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMKsBX7Ns1WWLRjt6pHg3aV0j_647ZoFUxF88oL%3Dw203-h100-k-no-pi-0-ya84.39318-ro-0-fo100!7i11988!8i5994"
            },
            {
                lat: 49.440354213924934,
                lng: 1.0949767938473727,
                momaUrl: "https://www.moma.org/collection/works/54890",
                googleMapsUrl: "https://www.google.com/maps/@49.4406398,1.0938199,3a,75y,130.44h,117.59t/data=!3m6!1e1!3m4!1s5ta9xySb4gyRJcFpuYpkTA!2e0!7i13312!8i6656"
            },
            {
                lat: 54.93857445344881,
                lng: 43.34853430229154,
                momaUrl: "https://www.moma.org/collection/works/86468",
                googleMapsUrl: "https://www.google.com/maps/place/54°56'18.9%22N+43°20'54.7%22E/@54.9385745,43.3485343,517m/data=!3m1!1e3!4m4!3m3!8m2!3d54.9385745!4d43.3485343"
            },
            {
                lat: 52.18919947342216,
                lng: -2.2198910997366075,
                momaUrl: "https://www.moma.org/collection/works/124766",
                googleMapsUrl: "https://www.google.com/maps/place/52°11'21.1%22N+2°13'11.6%22W/@52.1896571,-2.2182031,127a,35y,243.22h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d52.1891995!4d-2.2198911"
            },
            {
                lat: 52.189080738926876,
                lng: -2.2236043845740294,
                momaUrl: "https://www.moma.org/collection/works/124767",
                googleMapsUrl: "https://www.google.com/maps/place/52°11'20.7%22N+2°13'25.0%22W/@52.1890807,-2.2236044,551m/data=!3m1!1e3!4m4!3m3!8m2!3d52.1890807!4d-2.2236044"
            },
            {
                lat: 51.752523467511224,
                lng: -1.2538621682740625,
                momaUrl: "https://www.moma.org/collection/works/124854",
                googleMapsUrl: "https://www.google.com/maps/place/51°45'09.1%22N+1°15'13.9%22W/@51.7517219,-1.2525434,127a,35y,314.85h,45t/data=!3m1!1e3!4m5!3m4!4b1!8m2!3d51.7525235!4d-1.2538622"
            },
            {
                lat: 44.40766673643361,
                lng: 8.933525531317672,
                momaUrl: "https://www.moma.org/collection/works/125028",
                googleMapsUrl: "https://www.google.com/maps/place/Doge's+Palace/@44.4075246,8.9328796,126m/data=!3m1!1e3!4m12!1m5!3m4!2zNDTCsDI0JzI3LjYiTiA4wrA1NicwMC43IkU!8m2!3d44.4076667!4d8.9335255!3m5!1s0x12d343dd7fd645db:0xaa22692f44c315c1!8m2!3d44.4075158!4d8.9332508!16s%2Fm%2F04zxf64"
            },
            {
                lat: 45.25329556468555,
                lng: 9.128590945770801,
                momaUrl: "https://www.moma.org/collection/works/125029",
                googleMapsUrl: "https://www.google.com/maps/@45.2563896,9.148056,3a,75y,249.37h,96.18t/data=!3m8!1e1!3m6!1sAF1QipPPjQ_vdxgTmf5YUF40t7p2dYCrr4AK-jp7kjk3!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPPjQ_vdxgTmf5YUF40t7p2dYCrr4AK-jp7kjk3%3Dw203-h100-k-no-pi-0-ya99.985054-ro-0-fo100!7i5472!8i2736"
            },
            {
                lat: 9.349767551055923,
                lng: -79.90467595493874,
                momaUrl: "https://www.moma.org/collection/works/181830",
                googleMapsUrl: "https://www.google.com/maps/place/9°20'59.2%22N+79°54'16.8%22W/@9.349003,-79.9084133,1822m/data=!3m1!1e3!4m4!3m3!8m2!3d9.3497778!4d-79.9046667"
            },
            {
                lat: 40.756044066853505,
                lng: -73.98699718541272,
                momaUrl: "https://www.moma.org/collection/works/51802",
                googleMapsUrl: "https://www.google.com/maps/place/40°45'21.8%22N+73°59'13.2%22W/@40.7560441,-73.9869972,682m/data=!3m1!1e3!4m4!3m3!8m2!3d40.7560441!4d-73.9869972"
            },
            {
                lat: 43.76794909691097,
                lng: 11.254968974917196,
                momaUrl: "https://www.moma.org/collection/works/124997",
                googleMapsUrl: "https://www.google.com/maps/place/43°46'04.6%22N+11°15'17.9%22E/@43.7667727,11.2572471,267a,35y,286.59h,44.92t/data=!3m1!1e3!4m4!3m3!8m2!3d43.7679491!4d11.254969"
            },
            {
                lat: 47.050851404321755,
                lng: 8.308238835504977,
                momaUrl: "https://www.moma.org/collection/works/125022",
                googleMapsUrl: "https://www.google.com/maps/place/47°03'03.1%22N+8°18'29.7%22E/@47.0508514,8.3082388,610m/data=!3m1!1e3!4m4!3m3!8m2!3d47.0508514!4d8.3082388"
            },
            {
                lat: 8.960683777875238,
                lng: -79.55506571103703,
                momaUrl: "https://www.moma.org/collection/works/83524",
                googleMapsUrl: "https://www.google.com/maps/place/Edificio+de+La+Administración+del+Canal+de+Panamá/@8.9595434,-79.5555727,886m/data=!3m1!1e3!4m6!3m5!1s0x8faca8a935e8e6d5:0x496c7d0f698bd9e6!8m2!3d8.9594695!4d-79.5550504!16s%2Fg%2F11r92jrhl"
            },
            {
                lat: 9.09409842228529,
                lng: -79.68147636807662,
                momaUrl: "https://www.moma.org/collection/works/82872",
                googleMapsUrl: "https://www.google.com/maps/place/Culebra+Cut/@9.0870667,-79.6835177,906a,35y,39.2t/data=!3m1!1e3!4m12!1m5!3m4!2zOcKwMDUnMzguOCJOIDc5wrA0MCc1My4zIlc!8m2!3d9.0940984!4d-79.6814764!3m5!1s0x8fab5ee4b1f714d9:0x70059d6d44f30f85!8m2!3d9.0939289!4d-79.681927!16zL20vMDZ6d3Z4"
            },
            {
                lat: 40.704537627962694,
                lng: -73.99489060494403,
                momaUrl: "https://www.moma.org/collection/works/58810",
                googleMapsUrl: "https://www.google.com/maps/place/40°42'16.3%22N+73°59'41.6%22W/@40.6982215,-73.9964633,836a,35y,39.22t/data=!3m1!1e3!4m4!3m3!8m2!3d40.7045376!4d-73.9948906"
            },
            {
                lat: 32.84551539723446,
                lng: -96.84855407038768,
                momaUrl: "https://www.moma.org/collection/works/55783",
                googleMapsUrl: "https://www.google.com/maps/place/32°50'43.9%22N+96°50'54.8%22W/@32.818614,-96.8562586,3733a,35y,38.69t/data=!3m1!1e3!4m4!3m3!8m2!3d32.8455154!4d-96.8485541"
            },
            {
                lat: 29.87602491442088,
                lng: 31.221909341941064,
                momaUrl: "https://www.moma.org/collection/works/125040",
                googleMapsUrl: "https://www.google.com/maps/place/29°52'33.7%22N+31°13'18.9%22E/@29.8611163,31.217897,1929a,35y,38.97t/data=!3m1!1e3!4m4!3m3!8m2!3d29.8760249!4d31.2219093"
            },
            {
                lat: 40.68957479982746,
                lng: -74.0430841865869,
                momaUrl: "https://www.moma.org/collection/works/98136",
                googleMapsUrl: "https://www.google.com/maps/place/40°41'22.5%22N+74°02'35.1%22W/@40.6828064,-74.0454878,834a,35y,39.22t/data=!3m1!1e3!4m4!3m3!8m2!3d40.6895748!4d-74.0430842"
            },
            
            
            
            
            
            {
                lat: 51.35077685989592,
                lng: -0.11674142495791595,
                momaUrl: "https://www.moma.org/collection/works/46430",
                googleMapsUrl: "https://www.google.com/maps/@51.3532957,-0.1088572,495a,35y,297.49h,44.82t/data=!3m5!1e1!3m3!1skmVuYQ8kX54rJb4nNYdSbw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DkmVuYQ8kX54rJb4nNYdSbw%26cb_client%3Dmaps_sv.tactile.gps%26w%3D203%26h%3D100%26yaw%3D13.376058%26pitch%3D0%26thumbfov%3D100"
            },
            
            
            {
                lat: 49.48695530315101,
                lng: 0.10751205459331625,
                momaUrl: "https://www.moma.org/collection/works/405094",
                googleMapsUrl: "https://www.google.com/maps/place/49°29'13.0%22N+0°06'27.0%22E/@49.4871577,0.1056542,127a,35y,89.97h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d49.4869553!4d0.1075121"
            },
            
            
            
            
            
            {
                lat: 57.05108765324497,
                lng: -92.59528046938004,
                momaUrl: "https://www.moma.org/collection/works/124982",
                googleMapsUrl: "https://www.google.com/maps/place/57°03'03.9%22N+92°35'43.0%22W/@57.0193041,-92.61905,4852a,35y,38.48t/data=!3m1!1e3!4m4!3m3!8m2!3d57.0510877!4d-92.5952805"
            },
            
            
            
            
            
            {
                lat: 45.10832271097335,
                lng: 3.8414381998774823,
                momaUrl: "https://www.moma.org/collection/works/405431",
                googleMapsUrl: "https://www.google.com/maps/place/45°06'30.0%22N+3°50'29.2%22E/@45.1078739,3.8447553,260a,35y,279.94h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d45.1083227!4d3.8414382"
            },
            
            
            
            
            
            {
                lat: 51.83052602778765,
                lng: 12.241811186312464,
                momaUrl: "https://www.moma.org/collection/works/83847",
                googleMapsUrl: "https://www.google.com/maps/place/51°49'49.9%22N+12°14'30.5%22E/@51.8254998,12.2417997,686a,35y,39.2t/data=!3m1!1e3!4m4!3m3!8m2!3d51.830526!4d12.2418112"
            },
            
            
            
            
            
            {
                lat: 43.70264245422624,
                lng: -72.28921992853401,
                momaUrl: "https://www.moma.org/collection/works/174548",
                googleMapsUrl: "https://www.google.com/maps/place/43°42'09.5%22N+72°17'21.2%22W/@43.7000619,-72.2900561,394a,35y,39.31t/data=!3m1!1e3!4m4!3m3!8m2!3d43.7026425!4d-72.2892199"
            },
            
            
            
            
            
            {
                lat: 42.391219697522374,
                lng: -71.10139759072389,
                momaUrl: "https://www.moma.org/collection/works/174549",
                googleMapsUrl: "https://www.google.com/maps/place/42°23'28.4%22N+71°06'05.0%22W/@42.3897324,-71.1020385,200a,35y,39.48t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3912222!4d-71.1013889"
            },
            
            
            
            
            
            {
                lat: 42.341388276915104,
                lng: -71.09202121574259,
                momaUrl: "https://www.moma.org/collection/works/174550",
                googleMapsUrl: "https://www.google.com/maps/place/140+Fenway,+Boston,+MA+02115/@42.3435285,-71.0925955,238a,35y,163.21h,44.92t/data=!3m1!1e3!4m12!1m5!3m4!2zNDLCsDIwJzI5LjAiTiA3McKwMDUnMzEuMyJX!8m2!3d42.3413889!4d-71.0920278!3m5!1s0x89e37a1f31f9f6df:0xfcff76492ba21389!8m2!3d42.3407907!4d-71.0917633!16s%2Fg%2F1tdbgfr9"
            },
            
            
            
            {
                lat: 42.35888180748135,
                lng: -71.05782293199077,
                momaUrl: "https://www.moma.org/collection/works/174551",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'32.0%22N+71°03'28.2%22W/@42.3562669,-71.058085,311a,35y,39.42t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3588818!4d-71.0578229"
            },
            
            
            
            
            
            {
                lat: 42.35747062497912,
                lng: -71.05831644527095,
                momaUrl: "https://www.moma.org/collection/works/174552",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'26.9%22N+71°03'29.9%22W/@42.3546263,-71.0593165,402a,35y,39.36t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3574706!4d-71.0583164"
            },
            
            
            
            
            
            {
                lat: 42.35782577698874,
                lng: -71.06346682201249,
                momaUrl: "https://www.moma.org/collection/works/174553",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'28.2%22N+71°03'48.5%22W/@42.3565575,-71.0640233,184a,35y,39.45t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3578333!4d-71.0634722"
            },
            
            
            
            
            
            {
                lat: 42.357416260733935,
                lng: -71.07187729754105,
                momaUrl: "https://www.moma.org/collection/works/174554",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'26.7%22N+71°04'18.8%22W/@42.3553242,-71.0730187,251a,35y,11.84h,44.92t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3574163!4d-71.0718773"
            },
            
            
            
            
            
            {
                lat: 42.35359679124663,
                lng: -71.06941856170256,
                momaUrl: "https://www.moma.org/collection/works/174555",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'22.3%22N+71°03'56.3%22W/@42.3512891,-71.0699389,412a,35y,39.36t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3561882!4d-71.0656417"
            },
            
            
            
            
            
            {
                lat: 42.355491084604395,
                lng: -71.07017374169916,
                momaUrl: "https://www.moma.org/collection/works/174556",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'19.8%22N+71°04'12.6%22W/@42.3495684,-71.0710275,815a,35y,39.23t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3554911!4d-71.0701737"
            },
            
            
            
            
            
            {
                lat: 42.352641143643936,
                lng: -71.06977510867817,
                momaUrl: "https://www.moma.org/collection/works/174557",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'09.5%22N+71°04'11.2%22W/@42.3466456,-71.0697751,815a,35y,39.23t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3526411!4d-71.0697751"
            },
            
            
            
            
            
            {
                lat: 42.358233465417065,
                lng: -71.05687874605744,
                momaUrl: "https://www.moma.org/collection/works/174558",
                googleMapsUrl: "https://www.google.com/maps/place/42°21'29.6%22N+71°03'24.8%22W/@42.3522372,-71.0568787,816a,35y,39.23t/data=!3m1!1e3!4m4!3m3!8m2!3d42.3582335!4d-71.0568787"
            },
            
            
            
            
            
            {
                lat: 42.367373802453535,
                lng: -71.05554694657887,
                momaUrl: "https://www.moma.org/collection/works/174559",
                googleMapsUrl: "https://www.google.com/maps/place/Copps+Hill+Burying+Ground/@42.3619782,-71.056937,818a,35y,39.23t/data=!3m1!1e3!4m12!1m5!3m4!2zNDLCsDIyJzAzLjgiTiA3McKwMDMnMTcuNyJX!8m2!3d42.3677174!4d-71.0549073!3m5!1s0x89e3708c0acb2b17:0xb4a9fcb9bfa4879d!8m2!3d42.3673053!4d-71.0558515!16s%2Fm%2F04658qy"
            },
            
            
            
            {
                lat: 40.83978700963584,
                lng: -73.93056459708299,
                momaUrl: "https://www.moma.org/collection/works/174560",
                googleMapsUrl: "https://www.google.com/maps/place/40°50'32.3%22N+73°55'45.7%22W/@40.8342445,-73.9329109,832a,35y,39.22t/data=!3m1!1e3!4m4!3m3!8m2!3d40.8423108!4d-73.9293472"
            },
            
            
            
            
            
            {
                lat: 40.85582136678708,
                lng: -73.92586839261148,
                momaUrl: "https://www.moma.org/collection/works/174561",
                googleMapsUrl: "https://www.google.com/maps/place/40°51'21.0%22N+73°55'33.1%22W/@40.8530342,-73.9153918,903a,35y,270h,39.21t/data=!3m1!1e3!4m4!3m3!8m2!3d40.8558214!4d-73.9258684"
            },
            
            
            
            
            
            {
                lat: 40.7412666079906,
                lng: -73.98755111953741,
                momaUrl: "https://www.moma.org/collection/works/174562",
                googleMapsUrl: "https://www.google.com/maps/place/40°44'28.6%22N+73°59'15.2%22W/@40.7478254,-73.9875873,837a,35y,180h,39.22t/data=!3m1!1e3!4m4!3m3!8m2!3d40.7412666!4d-73.9875511"
            },
            
            
            
            
            
            {
                lat: 43.06999711439963,
                lng: 12.614293773664077,
                momaUrl: "https://www.moma.org/collection/works/98187",
                googleMapsUrl: "https://www.google.com/maps/place/43°04'12.0%22N+12°36'51.5%22E/@43.0665694,12.6131165,431a,35y,39.24t/data=!3m1!1e3!4m4!3m3!8m2!3d43.0699971!4d12.6142938"
            },
            {
                lat: 40.75214096588844,
                lng: -73.9755449157015,
                momaUrl: "https://www.moma.org/collection/works/83784",
                googleMapsUrl: "https://www.google.com/maps/place/40°45'07.7%22N+73°58'32.0%22W/@40.7459879,-73.9755449,838a,35y,39.22t/data=!3m1!1e3!4m4!3m3!8m2!3d40.752141!4d-73.9755449"
            },
            {
                lat: 48.572300370649316,
                lng: -4.323490337207763,
                momaUrl: "https://www.moma.org/collection/works/405357",
                googleMapsUrl: "https://www.google.com/maps/place/48°34'20.3%22N+4°19'24.6%22W/@48.572781,-4.3277144,265a,35y,93.26h,44.99t/data=!3m1!1e3!4m4!3m3!8m2!3d48.5723004!4d-4.3234903"
            },
            {
                lat: 40.779566038419276,
                lng: -73.92432378733687,
                momaUrl: "https://www.moma.org/collection/works/45898",
                googleMapsUrl: "https://www.google.com/maps/place/40°46'46.4%22N+73°55'27.6%22W/@40.7801639,-73.9354708,509a,35y,90h,44.79t/data=!3m1!1e3!4m4!3m3!8m2!3d40.779566!4d-73.9243238"
            },
            {
                lat: 49.97398458936697,
                lng: 8.605080485173037,
                momaUrl: "https://www.moma.org/collection/works/217510",
                googleMapsUrl: "https://www.google.com/maps/place/49°58'26.3%22N+8°36'18.3%22E/@49.9688397,8.6026995,714a,35y,39.24t/data=!3m1!1e3!4m4!3m3!8m2!3d49.9739846!4d8.6050805"
            },
            {
                lat: 40.76627632625654,
                lng: -73.97765608226179,
                momaUrl: "https://www.moma.org/collection/works/141033",
                googleMapsUrl: "https://www.google.com/maps/place/40°45'58.6%22N+73°58'39.6%22W/@40.7662763,-73.9695459,837a,35y,270h,39.22t/data=!3m1!1e3!4m4!3m3!8m2!3d40.7662763!4d-73.9776561"
            },
            {
                lat: 40.723812561290806,
                lng: -74.00036569633788,
                momaUrl: "https://www.moma.org/collection/works/98642",
                googleMapsUrl: "https://www.google.com/maps/place/40°43'25.7%22N+74°00'01.3%22W/@40.7176788,-74.0010598,838a,35y,39.22t/data=!3m1!1e3!4m4!3m3!8m2!3d40.7238126!4d-74.0003657"
            },
            {
                lat: 40.59535129579829,
                lng: -73.50042311622309,
                momaUrl: "https://www.moma.org/collection/works/400106",
                googleMapsUrl: "https://www.google.com/maps/place/40°35'43.3%22N+73°30'01.5%22W/@40.582746,-73.501651,1676a,35y,39.03t/data=!3m1!1e3!4m4!3m3!8m2!3d40.5953513!4d-73.5004231"
            },
            {
                lat: 44.97168037578974,
                lng: -110.71378507972594,
                momaUrl: "https://www.moma.org/collection/works/400224",
                googleMapsUrl: "https://www.google.com/maps/place/44°58'18.1%22N+110°42'49.6%22W/@44.9605421,-110.7188262,1495a,35y,38.75t/data=!3m1!1e3!4m4!3m3!8m2!3d44.9716804!4d-110.7137851"
            },
            {
                lat: 44.649577907176585,
                lng: -110.78601510866288,
                momaUrl: "https://www.moma.org/collection/works/400225",
                googleMapsUrl: "https://www.google.com/maps/place/44°38'58.5%22N+110°47'09.7%22W/@44.6274392,-110.7934536,3057a,35y,38.56t/data=!3m1!1e3!4m4!3m3!8m2!3d44.6495779!4d-110.7860151"
            },
            {
                lat: 29.215461934602775,
                lng: -82.05354861524819,
                momaUrl: "https://www.moma.org/collection/works/418748",
                googleMapsUrl: "https://www.google.com/maps/place/29°12'55.7%22N+82°03'12.8%22W/@29.2137026,-82.0537043,241a,35y,39.43t/data=!3m1!1e3!4m4!3m3!8m2!3d29.2154619!4d-82.0535486"
            },
            {
                lat: 49.44174137210123,
                lng: 1.0966995723888247,
                momaUrl: "https://www.moma.org/collection/works/405086",
                googleMapsUrl: "https://www.google.com/maps/place/49°26'30.3%22N+1°05'48.1%22E/@49.4366923,1.0954054,715a,35y,39.26t/data=!3m1!1e3!4m4!3m3!8m2!3d49.4417414!4d1.0966996"
            },
            {
                lat: 46.90103281665305,
                lng: 3.8351877084962207,
                momaUrl: "https://www.moma.org/collection/works/405414",
                googleMapsUrl: "https://www.google.com/maps/place/46°54'03.7%22N+3°50'06.7%22E/@46.8902563,3.8327353,1475a,35y,39.03t/data=!3m1!1e3!4m4!3m3!8m2!3d46.9010328!4d3.8351877"
            },
            {
                lat: 47.657617234479844,
                lng: -2.758276961446285,
                momaUrl: "https://www.moma.org/collection/works/405157",
                googleMapsUrl: "https://www.google.com/maps/place/47°39'27.4%22N+2°45'29.8%22W/@47.6566933,-2.7576207,125a,35y,325.25h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d47.6576172!4d-2.758277"
            },
            {
                lat: 49.36469695723288,
                lng: 0.08258373642310539,
                momaUrl: "https://www.moma.org/collection/works/405043",
                googleMapsUrl: "https://www.google.com/maps/@49.3637086,0.0838218,3a,60y,90t/data=!3m6!1e1!3m4!1sYeg0yPsdmjL_jejqoyZZSQ!2e0!7i16384!8i8192"
            },
            {
                lat: 45.54788390866503,
                lng: 2.309686798272528,
                momaUrl: "https://www.moma.org/collection/works/405267",
                googleMapsUrl: "https://www.google.com/maps/@45.5477599,2.3120016,203a,35y,270h,39.27t/data=!3m1!1e3"
            },
            {
                lat: 49.04504503276133,
                lng: 3.9574017293482346,
                momaUrl: "https://www.moma.org/collection/works/405038",
                googleMapsUrl: "https://www.google.com/maps/place/Mai+des+Lys/@49.0450217,3.9564163,3a,75y,262.09h,87t/data=!3m6!1e1!3m4!1s-Zxe1TrLizO0GlLJnzNsKw!2e0!7i16384!8i8192!4m9!1m2!2m1!1schinese+food+near+Épernay,+France!3m5!1s0x47e96b51c5435caf:0x39e08f8465eeb17d!8m2!3d49.0450533!4d3.9557262!16s%2Fg%2F1tdq5b83"
            },
            {
                lat: 50.406344422090456,
                lng: 1.5641359117590492,
                momaUrl: "https://www.moma.org/collection/works/405041",
                googleMapsUrl: "https://www.google.com/maps/place/La+Renommée/@50.4062627,1.5680839,231a,35y,279.99h,45t/data=!3m1!1e3!4m6!3m5!1s0x47dddc1c6d850fcb:0x153edfb850290beb!8m2!3d50.406314!4d1.5641438!16s%2Fg%2F1tvgtmbv"
            },
            {
                lat: 48.30358626222227,
                lng: 0.18175029926383882,
                momaUrl: "https://www.moma.org/collection/works/405374",
                googleMapsUrl: "https://www.google.com/maps/place/7+Rue+Principale,+72610+Grandchamp,+France/@48.3013368,0.181515,245a,35y,3.98h,45t/data=!3m1!1e3!4m15!1m8!3m7!1s0x47e26e0fb55e2a9f:0x40d37521e0ac8a0!2s72610+Grandchamp,+France!3b1!8m2!3d48.301982!4d0.182782!16s%2Fm%2F03qk2fm!3m5!1s0x47e26e16cdefa507:0x7600887e135b2b3a!8m2!3d48.3036837!4d0.181673!16s%2Fg%2F11v03v4chr"
            },
            {
                lat: 45.76754461999532,
                lng: 4.830005590971094,
                momaUrl: "https://www.moma.org/collection/works/405034",
                googleMapsUrl: "https://www.google.com/maps/@45.7672191,4.8295231,3a,75y,28.1h,95.55t/data=!3m6!1e1!3m4!1shc7e-oC1Qj8KEjMwoX4A1A!2e0!7i16384!8i8192"
            },
            {
                lat: 46.72281483527499,
                lng: 2.506303672441867,
                momaUrl: "https://www.moma.org/collection/works/405152",
                googleMapsUrl: "https://www.google.com/maps/place/Ad-Thermie/@46.7232229,2.5097407,254a,35y,257.99h,45t/data=!3m1!1e3!4m6!3m5!1s0x47fa7c75cb1d02f7:0xbba8bae6b39f5940!8m2!3d46.7227884!4d2.5061934!16s%2Fg%2F11c603hdpc"
            },
            {
                lat: 48.8797074625925,
                lng: 2.3271057936244475,
                momaUrl: "https://www.moma.org/collection/works/405159",
                googleMapsUrl: "https://www.google.com/maps/place/Crédit+Agricole+de+Paris+Amsterdam/@48.8787793,2.3265988,122a,35y,45t/data=!3m1!1e3!4m6!3m5!1s0x47e66e493d0c4c0b:0x8b62d8f3159010c!8m2!3d48.8797458!4d2.3272029!16s%2Fg%2F1tj20vq8"
            },
            {
                lat: 46.820916268168624,
                lng: 3.031174284884848,
                momaUrl: "https://www.moma.org/collection/works/405167",
                googleMapsUrl: "https://www.google.com/maps/@46.820749,3.0308464,3a,75y,64.46h,92.05t/data=!3m6!1e1!3m4!1smqY-1SEtUDySmxq1a1x3MQ!2e0!7i16384!8i8192"
            },
            {
                lat: 48.86347151689559,
                lng: 2.3468866794116283,
                momaUrl: "https://www.moma.org/collection/works/405192",
                googleMapsUrl: "https://www.google.com/maps/@48.8592181,2.3492388,465a,35y,337.42h,44.81t/data=!3m1!1e3"
            },
            {
                lat: 47.47242382870598,
                lng: -0.554859510732735,
                momaUrl: "https://www.moma.org/collection/works/405320",
                googleMapsUrl: "https://www.google.com/maps/place/Republic+Square/@47.4712745,-0.5560514,133a,35y,33.15h,45t/data=!3m1!1e3!4m6!3m5!1s0x480878c22a1fb16b:0xb1d32731bc9c36ce!8m2!3d47.4722967!4d-0.5549854!16s%2Fg%2F1hhh_t1tb"
            },
            {
                lat: 45.748094414671264,
                lng: 4.847056375928625,
                momaUrl: "https://www.moma.org/collection/works/405070",
                googleMapsUrl: "https://www.google.com/maps/@45.7488293,4.8457609,127a,35y,132.39h,45t/data=!3m1!1e3"
            },
            {
                lat: 48.84162218526684,
                lng: 2.2888906925341397,
                momaUrl: "https://www.moma.org/collection/works/405155",
                googleMapsUrl: "https://www.google.com/maps/place/32+Av.+Félix+Faure,+75015+Paris,+France/@48.8404143,2.2890333,127a,35y,357.32h,45t/data=!3m1!1e3!4m7!3m6!1s0x47e6701224f19ae1:0xebefbdee3eb216f1!8m2!3d48.8417513!4d2.2889892!10e5!16s%2Fg%2F11b8v7h6z1"
            },
            {
                lat: 53.579265442157165,
                lng: 9.939259808249368,
                momaUrl: "https://www.moma.org/collection/works/405047",
                googleMapsUrl: "https://www.google.com/maps/place/Langenfelder+Damm+31,+20257+Hamburg,+Germany/@53.5814204,9.9439363,352a,35y,241.5h,44.87t/data=!3m1!1e3!4m7!3m6!1s0x47b185fc79c52c37:0x3e5349744c346513!8m2!3d53.57942!4d9.93961!10e5!16s%2Fg%2F11c2grj9jr"
            },
            {
                lat: 48.88152151344504,
                lng: 2.278035013290337,
                momaUrl: "https://www.moma.org/collection/works/405201",
                googleMapsUrl: "https://www.google.com/maps/@48.8816158,2.2780361,3a,75y,169.28h,86.22t/data=!3m6!1e1!3m4!1sXn0xk4DDBsOOIFCFoivjTA!2e0!7i16384!8i8192"
            },
            {
                lat: 48.877809323494496,
                lng: 2.2701077229481874,
                momaUrl: "https://www.moma.org/collection/works/405223",
                googleMapsUrl: "https://www.google.com/maps/place/Jardin+d'Acclimatation/@48.8777811,2.2697644,15z/data=!4m14!1m7!3m6!1s0x47e66533f74a6505:0x8ac32ed9b41ff362!2sJardin+d'Acclimatation!8m2!3d48.8777811!4d2.2697644!16zL20vMDg3cTVy!3m5!1s0x47e66533f74a6505:0x8ac32ed9b41ff362!8m2!3d48.8777811!4d2.2697644!16zL20vMDg3cTVy"
            },
            {
                lat: 43.471899993228156,
                lng: -0.9239526049885319,
                momaUrl: "https://www.moma.org/collection/works/405324",
                googleMapsUrl: "https://www.google.com/maps/@43.4719159,-0.9240121,3a,15y,105.79h,115.29t/data=!3m6!1e1!3m4!1sdYsQG66GOaFMhQz_UfHVzQ!2e0!7i16384!8i8192"
            },
            {
                lat: 48.861683677690586,
                lng: 2.383134948059767,
                momaUrl: "https://www.moma.org/collection/works/405418",
                googleMapsUrl: "https://www.google.com/maps/@48.861747,2.3830888,3a,75y,351.26h,76.21t/data=!3m6!1e1!3m4!1s6DpuSjE8h4i75xCEuYuVpw!2e0!7i16384!8i8192"
            },
            {
                lat: 48.855927197363044,
                lng: 2.3366129872966277,
                momaUrl: "https://www.moma.org/collection/works/405425",
                googleMapsUrl: "https://www.google.com/maps/@48.8558966,2.3366898,3a,75y,245.47h,94.87t/data=!3m6!1e1!3m4!1sLy-bbViflAq_yXuAiU_9JA!2e0!7i16384!8i8192"
            },
            {
                lat: 43.73941443486874,
                lng: 7.427609586965822,
                momaUrl: "https://www.moma.org/collection/works/44527",
                googleMapsUrl: "https://www.google.com/maps/place/Hector+Berlioz+Statue/@43.7381936,7.4268018,127a,35y,30.49h,45t/data=!3m1!1e3!4m6!3m5!1s0x12cdc3970f4958d7:0xe5035950b2de16dd!8m2!3d43.7385175!4d7.4283065!16s%2Fg%2F11gphvlpwy"
            },
            {
                lat: 48.86974168390968,
                lng: 2.3427743313825906,
                momaUrl: "https://www.moma.org/collection/works/405052",
                googleMapsUrl: "https://www.google.com/maps/@48.8697537,2.3428275,3a,75y,224.61h,82.68t/data=!3m6!1e1!3m4!1s2bJwQZ8sf5w_IrdvQGrjXg!2e0!7i16384!8i8192"
            },
            {
                lat: 45.769583468077144,
                lng: 4.837052986196882,
                momaUrl: "https://www.moma.org/collection/works/405060",
                googleMapsUrl: "https://www.google.com/maps/@45.7695054,4.8369042,3a,75y,277.22h,95.75t/data=!3m6!1e1!3m4!1saHiEDGLW_5781Ky2Ymj0tQ!2e0!7i13312!8i6656"
            },
            {
                lat: 48.89581693090365,
                lng: 3.3975216621559987,
                momaUrl: "https://www.moma.org/collection/works/405066",
                googleMapsUrl: "https://www.google.com/maps/@48.8950604,3.3962836,127a,35y,44.35h,45t/data=!3m1!1e3"
            },
            {
                lat: 45.75759305471242,
                lng: 4.8352935623694355,
                momaUrl: "https://www.moma.org/collection/works/405090",
                googleMapsUrl: "https://www.google.com/maps/@45.7576397,4.8353473,3a,75y,210.81h,81.15t/data=!3m6!1e1!3m4!1s6iV1fmkn2j-5_YCr-QgK2Q!2e0!7i16384!8i8192"
            },
            {
                lat: 48.850070787829935,
                lng: 2.3309833010962335,
                momaUrl: "https://www.moma.org/collection/works/405113",
                googleMapsUrl: "https://www.google.com/maps/@48.8501094,2.3308501,3a,90y,118.46h,83.09t/data=!3m6!1e1!3m4!1swKWIOyTs-H8IAem79lQMzQ!2e0!7i16384!8i8192"
            },
            {
                lat: 48.86681033826423,
                lng: 2.3364981566167815,
                momaUrl: "https://www.moma.org/collection/works/405118",
                googleMapsUrl: "https://www.google.com/maps/@48.8668346,2.3365708,3a,82y,212.64h,85.38t/data=!3m6!1e1!3m4!1soHq8BioOLaKVmjbJTC7ezA!2e0!7i16384!8i8192"
            },
            {
                lat: 45.393428981438376,
                lng: 5.262114097954639,
                momaUrl: "https://www.moma.org/collection/works/405119",
                googleMapsUrl: "https://www.google.com/maps/@45.3934062,5.2620852,3a,75y,18h,93.06t/data=!3m6!1e1!3m4!1sfUnJpokMN_KM_b2l40H2Qw!2e0!7i16384!8i8192"
            },
            {
                lat: 48.58821574168755,
                lng: 2.249591138579081,
                momaUrl: "https://www.moma.org/collection/works/405354",
                googleMapsUrl: "https://www.google.com/maps/@48.5882409,2.2496452,3a,75y,251.56h,90.4t/data=!3m6!1e1!3m4!1swnNK_NqbnuWV4J0JmImAHw!2e0!7i16384!8i8192"
            },
            {
                lat: 43.7390832921887,
                lng: 7.42758209220295,
                momaUrl: "https://www.moma.org/collection/works/45058",
                googleMapsUrl: "https://www.google.com/maps/@43.7390723,7.4276955,3a,75y,228.89h,97.56t/data=!3m6!1e1!3m4!1sPoLQmexS1lLpT0OmdTdveQ!2e0!7i13312!8i6656"
            },
            {
                lat: 48.11226335486959,
                lng: 4.373846746278106,
                momaUrl: "https://www.moma.org/collection/works/405121",
                googleMapsUrl: "https://www.google.com/maps/place/Kebab+le+Break+Time/@48.1122632,4.373908,3a,75y,277.83h,77.66t/data=!3m6!1e1!3m4!1sXvURV94FTadl32taNp--bg!2e0!7i16384!8i8192!4m9!1m2!2m1!1sBar-sur-Seine+B13+P383!3m5!1s0x47efab0883d190ef:0xdd49d155e9e425a!8m2!3d48.1138899!4d4.3734581!16s%2Fg%2F1tdkw_zm"
            },
            {
                lat: 40.712332804665394,
                lng: -74.0080418584068,
                momaUrl: "https://www.moma.org/collection/works/103075",
                googleMapsUrl: "https://www.google.com/maps/place/The+Woolworth+Building/@40.7132641,-74.0133187,438a,35y,90h,39.36t/data=!3m2!1e3!5s0x89c26231f276e3d1:0xd14663d250c94764!4m6!3m5!1s0x89c25a18ed652051:0x7489abf50a82e5d6!8m2!3d40.71243!4d-74.0083547!16s%2Fg%2F1tffvvwf"
            },
            {
                lat: 48.950816292929105,
                lng: 3.6994205357616052,
                momaUrl: "https://www.moma.org/collection/works/405250",
                googleMapsUrl: "https://www.google.com/maps/@48.8879548,2.3245082,3a,75y,206.74h,85.66t/data=!3m6!1e1!3m4!1silghjfGJ-DbsjDp5ha0vew!2e0!7i16384!8i8192"
            },
            {
                lat: 43.69957083297352,
                lng: 7.278377798718261,
                momaUrl: "https://www.moma.org/collection/works/405098",
                googleMapsUrl: "https://www.google.com/maps/place/Zucchini/@48.8707492,2.3428367,3a,90y,282.98h,94.66t/data=!3m6!1e1!3m4!1s3OvQZpfd-6eFD8av3OLQnQ!2e0!7i16384!8i8192!4m16!1m9!3m8!1s0x47e66e3c327fdc49:0xde38bab02d262e91!2s157+Rue+Montmartre,+75002+Paris,+France!3b1!8m2!3d48.8707325!4d2.3426686!10e5!16s%2Fg%2F11csgr81nt!3m5!1s0x47e66e3c2d78dcc1:0xf7c88e19344936d6!8m2!3d48.8707616!4d2.3426813!16s%2Fg%2F11hkw6kdr8"
            },
            {
                lat: 50.406316144899364,
                lng: 1.5643431275242923,
                momaUrl: "https://www.moma.org/collection/works/405041",
                googleMapsUrl: "https://www.google.com/maps/@50.4066871,1.5644835,3a,47.5y,157.16h,92.88t/data=!3m6!1e1!3m4!1s84jAue32VRu8ocTQLRRQCQ!2e0!7i13312!8i6656"
            },
            {
                lat: 43.554379813887444,
                lng: 7.016900157703351,
                momaUrl: "https://www.moma.org/collection/works/405095",
                googleMapsUrl: "https://www.google.com/maps/@43.5554551,7.0169359,3a,75y,307.34h,88.01t/data=!3m6!1e1!3m4!1sSJfstqTdz35OnNdxPBydjw!2e0!7i16384!8i8192"
            },
            {
                lat: 51.81581772657315,
                lng: 4.663398991154661,
                momaUrl: "https://www.moma.org/collection/works/124988",
                googleMapsUrl: "https://www.google.com/maps/@51.8155554,4.6637919,3a,75y,302.4h,73.44t/data=!3m6!1e1!3m4!1steDPNu9hO2UsdEfGJyzmfQ!2e0!7i16384!8i8192"
            },
            {
                lat: 32.68353890710354,
                lng: -117.18554480889098,
                momaUrl: "https://www.moma.org/collection/works/48361",
                googleMapsUrl: "https://www.google.com/maps/place/Coronado+Beach/@32.68657,-117.193616,2365m/data=!3m1!1e3!4m6!3m5!1s0x80deacc6539184dd:0x11b91f6167735576!8m2!3d32.6847742!4d-117.1878115!16s%2Fm%2F0jw38dw"
            },
            {
                lat: 51.254249192963584,
                lng: -115.83931496929809,
                momaUrl: "https://www.moma.org/collection/works/174386",
                googleMapsUrl: "https://www.google.com/maps/@51.2539909,-115.8378352,3a,75y,229.75h,82.9t/data=!3m6!1e1!3m4!1sAF1QipN8TO-kEqE4F4KabE5PIZUmbDs2J2DoWwnofvOI!2e10!7i5760!8i2880"
            },
            {
                lat: 51.16663486772885,
                lng: -115.56009131387391,
                momaUrl: "https://www.moma.org/collection/works/174387",
                googleMapsUrl: "https://www.google.com/maps/@51.164975,-115.5613783,3a,75y,55.75h,90t/data=!3m8!1e1!3m6!1sAF1QipOMF7nbMVfBQGIoSw-3WVViQidxs9WMx03S7-c2!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOMF7nbMVfBQGIoSw-3WVViQidxs9WMx03S7-c2%3Dw203-h100-k-no-pi-0-ya180.04263-ro-0-fo100!7i6720!8i3360"
            },
            {
                lat: 51.41666135969157,
                lng: -116.21692139074365,
                momaUrl: "https://www.moma.org/collection/works/174388",
                googleMapsUrl: "https://www.google.com/maps/@51.164975,-115.5613783,3a,75y,55.75h,90t/data=!3m8!1e1!3m6!1sAF1QipOMF7nbMVfBQGIoSw-3WVViQidxs9WMx03S7-c2!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOMF7nbMVfBQGIoSw-3WVViQidxs9WMx03S7-c2%3Dw203-h100-k-no-pi-0-ya180.04263-ro-0-fo100!7i6720!8i3360"
            },
            {
                lat: 49.342937887878676,
                lng: -123.11487302333927,
                momaUrl: "https://www.moma.org/collection/works/174414",
                googleMapsUrl: "https://www.google.com/maps/@49.3427841,-123.114401,3a,75y,294.95h,84.68t/data=!3m6!1e1!3m4!1sAF1QipNCZg9bE1wf3yfes_SfBdm7hChgfL1QzeJz_3gQ!2e10!7i5376!8i2688"
            },
            {
                lat: 40.83139124201942,
                lng: -73.93793787712224,
                momaUrl: "https://www.moma.org/collection/works/98195",
                googleMapsUrl: "https://www.google.com/maps/@40.8322908,-73.9386395,127a,35y,121.03h,45t/data=!3m1!1e3"
            }

            ];

              const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.selectAll("circle")
        .data(locations)
        .enter().append("circle")
        .attr("cx", d => projection([d.lng, d.lat])[0])
        .attr("cy", d => projection([d.lng, d.lat])[1])
        .attr("r", 3) // Default circle radius
        .style("fill", () => "#" + Math.floor(Math.random()*16777215).toString(16))  // Random color
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`
                <p>Location: ${d.lat}, ${d.lng}</p>
                
                
            `)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", (event, d) => showPopup(event, d));
}

function showPopup(event, d) {
    removePopup(); // Remove existing popups first
    const x = event.pageX + 10; // Offset to avoid cursor
    const y = event.pageY + 10;

    d3.select("body").append("div")
        .attr("class", "popup")
        .style("left", `${x}px`)
        .style("top", `${y}px`)
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid black")
        .style("padding", "10px")
        .html(`
            <p><a href="${d.momaUrl}" target="_blank">MoMA Collection</a></p>
            <p><a href="${d.googleMapsUrl}" target="_blank">View how it looks today</a></p>
        `);

   
    d3.select(document).on("click.popup", function() {
        if (!d3.select(d3.event.target).classed("popup") && !d3.select(d3.event.target).node().parentNode.classList.contains("popup")) {
            removePopup();
            d3.select(document).on("click.popup", null); // Remove
        }
    });
}

function removePopup() {
    d3.select(".popup").remove();
}
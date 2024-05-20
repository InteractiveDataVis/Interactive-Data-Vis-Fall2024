const urls = [
  "https://www.moma.org/collection/works/45665?artist_id=8595&page=1&sov_referrer=artist",
  "https://www.moma.org/collection/works/45262?artist_id=8595&page=1&sov_referrer=artist",
  "https://www.moma.org/collection/works/45290?artist_id=8595&page=1&sov_referrer=artist",
  "https://www.moma.org/collection/works/58052?artist_id=8595&page=1&sov_referrer=artist",
  "https://www.moma.org/collection/works/45319?artist_id=8595&page=1&sov_referrer=artist",
  "https://www.moma.org/collection/works/124754?artist_id=8595&page=1&sov_referrer=artist",
  "https://www.moma.org/collection/works/124758?artist_id=8595&page=1&sov_referrer=artist",
  "https://www.moma.org/collection/works/124784",
  "https://www.moma.org/collection/works/55462",
  "https://www.moma.org/collection/works/49650",
  "https://www.moma.org/collection/works/45360",
  "https://www.moma.org/collection/works/45540",
  "https://www.moma.org/collection/works/45565",
  "https://www.moma.org/collection/works/45590",
  "https://www.moma.org/collection/works/45614",
  "https://www.moma.org/collection/works/45688",
  "https://www.moma.org/collection/works/45974",
  "https://www.moma.org/collection/works/45190",
  "https://www.moma.org/collection/works/47913",
  "https://www.moma.org/collection/works/55439",
  "https://www.moma.org/collection/works/55447",
  "https://www.moma.org/collection/works/55455",
  "https://www.moma.org/collection/works/273630",
  "https://www.moma.org/collection/works/273631",
  "https://www.moma.org/collection/works/273632",
  "https://www.moma.org/collection/works/273633",
  "https://www.moma.org/collection/works/273634",
  "https://www.moma.org/collection/works/273635",
  "https://www.moma.org/collection/works/273636",
  "https://www.moma.org/collection/works/273637",
  "https://www.moma.org/collection/works/45995",
  "https://www.moma.org/collection/works/124756",
  "https://www.moma.org/collection/works/51524",
  "https://www.moma.org/collection/works/124753",
  "https://www.moma.org/collection/works/124757",
  "https://www.moma.org/collection/works/49630",
  "https://www.moma.org/collection/works/49640",
  "https://www.moma.org/collection/works/45333",
  "https://www.moma.org/collection/works/45711",
  "https://www.moma.org/collection/works/45757",
  "https://www.moma.org/collection/works/178898",
  "https://www.moma.org/collection/works/178902",
  "https://www.moma.org/collection/works/55115",
  "https://www.moma.org/collection/works/55125",
  "https://www.moma.org/collection/works/55135",
  "https://www.moma.org/collection/works/55145",
  "https://www.moma.org/collection/works/45905",
  "https://www.moma.org/collection/works/178883",
  "https://www.moma.org/collection/works/178884",
  "https://www.moma.org/collection/works/178885",
  "https://www.moma.org/collection/works/178894",
  "https://www.moma.org/collection/works/55407",
  "https://www.moma.org/collection/works/45841",
  "https://www.moma.org/collection/works/45861",
  "https://www.moma.org/collection/works/134274",
  "https://www.moma.org/collection/works/134275",
  "https://www.moma.org/collection/works/124829",
  "https://www.moma.org/collection/works/124946",
  "https://www.moma.org/collection/works/125001",
  "https://www.moma.org/collection/works/125016",
  "https://www.moma.org/collection/works/45344",
  "https://www.moma.org/collection/works/51010",
  "https://www.moma.org/collection/works/124828",
  "https://www.moma.org/collection/works/418646",
  "https://www.moma.org/collection/works/126055",
  "https://www.moma.org/collection/works/111515",
  "https://www.moma.org/collection/works/124810",
  "https://www.moma.org/collection/works/124812",
  "https://www.moma.org/collection/works/124808",
  "https://www.moma.org/collection/works/124839",
  "https://www.moma.org/collection/works/141259",
  "https://www.moma.org/collection/works/124811",
  "https://www.moma.org/collection/works/55262",
  "https://www.moma.org/collection/works/111456",
  "https://www.moma.org/collection/works/178897",
  "https://www.moma.org/collection/works/56091",
  "https://www.moma.org/collection/works/56098",
  "https://www.moma.org/collection/works/56109",
  "https://www.moma.org/collection/works/141100",
  "https://www.moma.org/collection/works/400048",
  "https://www.moma.org/collection/works/418742",
  "https://www.moma.org/collection/works/422726",
  "https://www.moma.org/collection/works/422705",
  "https://www.moma.org/collection/works/48053",
  "https://www.moma.org/collection/works/141234",
  "https://www.moma.org/collection/works/418741",
  "https://www.moma.org/collection/works/400042",
  "https://www.moma.org/collection/works/124850",
  "https://www.moma.org/collection/works/124993",
  "https://www.moma.org/collection/works/98125",
  "https://www.moma.org/collection/works/141081",
  "https://www.moma.org/collection/works/141134",
  "https://www.moma.org/collection/works/405292",
  "https://www.moma.org/collection/works/405325",
  "https://www.moma.org/collection/works/400047",
  "https://www.moma.org/collection/works/111532",
  "https://www.moma.org/collection/works/141158",
  "https://www.moma.org/collection/works/400043",
  "https://www.moma.org/collection/works/400044",
  "https://www.moma.org/collection/works/141177"
];

document.addEventListener('DOMContentLoaded', () => {
  const gridCount = 10;
  const overlay = document.getElementById('overlay');

  // Create the clickable areas
  for (let i = 0; i < gridCount * gridCount; i++) {
    const area = document.createElement('div');
    area.className = 'clickable-area';
    area.style.gridColumn = (i % gridCount) + 1;
    area.style.gridRow = Math.floor(i / gridCount) + 1;

    // Assign event listener to each area
    if (urls[i]) {
      area.addEventListener('click', () => {
        window.open(urls[i], '_blank'); // Open the URL in a new tab
      });
    }

    overlay.appendChild(area);
  }
});

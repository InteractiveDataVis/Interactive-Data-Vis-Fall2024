const mugshotUrls = [
    "https://www.moma.org/collection/works/47931",
    "https://www.moma.org/collection/works/400496",
    "https://www.moma.org/collection/works/400497",
    "https://www.moma.org/collection/works/400498",
    "https://www.moma.org/collection/works/400499",
    "https://www.moma.org/collection/works/400500",
    "https://www.moma.org/collection/works/400501",
    "https://www.moma.org/collection/works/400502",
    "https://www.moma.org/collection/works/400503",
    "https://www.moma.org/collection/works/400504",
    "https://www.moma.org/collection/works/400505",
    "https://www.moma.org/collection/works/400506",
    "https://www.moma.org/collection/works/400507",
    "https://www.moma.org/collection/works/400508",
    "https://www.moma.org/collection/works/400509",
    "https://www.moma.org/collection/works/400510"
  ];
  
  const mugshotGridCount = 4; // Change this to 4 for a 4x4 grid
  
  // Select the overlay for the mug shots
  const overlayMugshots = document.getElementById('overlay-mugshots');
  
  // Create the clickable areas for the mug shots
  for (let i = 0; i < mugshotGridCount * mugshotGridCount; i++) {
    const area = document.createElement('div');
    area.className = 'clickable-area';
    area.style.gridColumn = i % mugshotGridCount + 1;
    area.style.gridRow = Math.floor(i / mugshotGridCount) + 1;
    area.addEventListener('click', () => {
      window.open(mugshotUrls[i], '_blank');
    });
    overlayMugshots.appendChild(area);
  }
  
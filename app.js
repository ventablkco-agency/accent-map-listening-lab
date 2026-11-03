const ACCENTS = [
  {id:"british",name:"British RP",region:"Southern England",files:["british-01.mp3","british-02.mp3"]},
  {id:"cockney",name:"Cockney",region:"East London",files:["cockney-01.mp3","cockney-02.mp3"]},
  {id:"scottish",name:"Scottish English",region:"Scotland",files:["scottish-01.mp3","scottish-02.mp3"]},
  {id:"irish",name:"Irish English",region:"Ireland",files:["irish-01.mp3","irish-02.mp3"]},
  {id:"yorkshire",name:"Yorkshire English",region:"Northern England",files:["yorkshire-01.mp3","yorkshire-02.mp3"]},
  {id:"american",name:"General American",region:"United States",files:["american-01.mp3","american-02.mp3"]},
  {id:"southern-american",name:"Southern American",region:"Southern United States",files:["southern-american-01.mp3","southern-american-02.mp3"]},
  {id:"australian",name:"Australian English",region:"Australia",files:["australian-01.mp3","australian-02.mp3"]},
  {id:"south-african",name:"South African English",region:"South Africa",files:["south-african-01.mp3","south-african-02.mp3"]},
  {id:"indian-english",name:"Indian English",region:"India",files:["indian-english-01.mp3","indian-english-02.mp3"]}
];
const SENTENCES = [
  "I think the water is rather warm, but the bath feels much better.",
  "Yesterday, I travelled by car to the market and bought a large bottle of water."
];
const grid = document.getElementById("accent-grid");
if (grid) {
  grid.innerHTML = ACCENTS.map((accent, i) =>
    `<a class="accent-link" href="./listen.html?accent=${accent.id}"><span class="number">${String(i+1).padStart(2,"0")}</span><span>${accent.name}<small>${accent.region}</small></span><span class="arrow" aria-hidden="true">↗</span></a>`
  ).join("");
}
const recordings = document.getElementById("recordings");
if (recordings) {
  const id = new URLSearchParams(window.location.search).get("accent");
  const index = ACCENTS.findIndex(accent => accent.id === id);
  const safeIndex = index < 0 ? 0 : index;
  const accent = ACCENTS[safeIndex];
  document.title = `${accent.name} — The Accent Lab`;
  document.getElementById("accent-name").textContent = accent.name;
  document.getElementById("accent-region").textContent = accent.region;
  recordings.innerHTML = SENTENCES.map((sentence, i) =>
    `<article class="recording"><span class="sample-label">SENTENCE 0${i+1}</span><p>${sentence}</p><audio controls preload="none" src="./audio/${accent.files[i]}" aria-label="Play sentence ${i+1} in ${accent.name}"></audio><small class="audio-status" data-status="${i}">Press play to listen</small></article>`
  ).join("");
  recordings.querySelectorAll("audio").forEach((audio, i) => {
    audio.addEventListener("error", () => {
      recordings.querySelector(`[data-status="${i}"]`).textContent = "Audio file unavailable. Please check this recording.";
    });
  });
  const previous = ACCENTS[(safeIndex + ACCENTS.length - 1) % ACCENTS.length];
  const next = ACCENTS[(safeIndex + 1) % ACCENTS.length];
  const previousLink = document.getElementById("previous-link");
  const nextLink = document.getElementById("next-link");
  previousLink.href = `./listen.html?accent=${previous.id}`;
  previousLink.textContent = `← ${previous.name}`;
  nextLink.href = `./listen.html?accent=${next.id}`;
  nextLink.textContent = `${next.name} →`;
}
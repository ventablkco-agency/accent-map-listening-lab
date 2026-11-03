const ACCENTS = [
  {id:"british",name:"British RP",flag:"england",place:"Southern England, United Kingdom",region:"Southern England",files:["british-01.mp3","british-02.mp3"]},
  {id:"cockney",name:"Cockney",flag:"england",place:"East London, England",region:"East London",files:["cockney-01.mp3","cockney-02.mp3"]},
  {id:"scottish",name:"Scottish English",flag:"scotland",place:"Scotland",region:"Scotland",files:["scottish-01.mp3","scottish-02.mp3"]},
  {id:"irish",name:"Irish English",flag:"ireland",place:"Ireland",region:"Ireland",files:["irish-01.mp3","irish-02.mp3"]},
  {id:"yorkshire",name:"Yorkshire English",flag:"england",place:"Yorkshire, England",region:"Northern England",files:["yorkshire-01.mp3","yorkshire-02.mp3"]},
  {id:"american",name:"General American",flag:"usa",place:"United States",region:"United States",files:["american-01.mp3","american-02.mp3"]},
  {id:"southern-american",name:"Southern American",flag:"usa",place:"Southern United States",region:"Southern United States",files:["southern-american-01.mp3","southern-american-02.mp3"]},
  {id:"australian",name:"Australian English",flag:"australia",place:"Australia",region:"Australia",files:["australian-01.mp3","australian-02.mp3"]},
  {id:"south-african",name:"South African English",flag:"south-africa",place:"South Africa",region:"South Africa",files:["south-african-01.mp3","south-african-02.mp3"]},
  {id:"indian-english",name:"Indian English",flag:"india",place:"India",region:"India",files:["indian-english-01.mp3","indian-english-02.mp3"]}
];
const FLAG_SVGS = {"england":"<svg viewBox=\"0 0 60 36\" aria-hidden=\"true\"><rect width=\"60\" height=\"36\" fill=\"#fff\"/><path fill=\"#cf142b\" d=\"M24 0h12v12h24v12H36v12H24V24H0V12h24z\"/></svg>","scotland":"<svg viewBox=\"0 0 60 36\" aria-hidden=\"true\"><rect width=\"60\" height=\"36\" fill=\"#0065bd\"/><path stroke=\"#fff\" stroke-width=\"7\" d=\"M0 0l60 36M60 0L0 36\"/></svg>","ireland":"<svg viewBox=\"0 0 60 36\" aria-hidden=\"true\"><rect width=\"20\" height=\"36\" fill=\"#169b62\"/><rect x=\"20\" width=\"20\" height=\"36\" fill=\"#fff\"/><rect x=\"40\" width=\"20\" height=\"36\" fill=\"#ff883e\"/></svg>","usa":"<svg viewBox=\"0 0 60 36\" aria-hidden=\"true\"><rect width=\"60\" height=\"36\" fill=\"#fff\"/><path stroke=\"#b22234\" stroke-width=\"3\" d=\"M0 1.5h60M0 7.5h60M0 13.5h60M0 19.5h60M0 25.5h60M0 31.5h60\"/><rect width=\"26\" height=\"19\" fill=\"#3c3b6e\"/><g fill=\"#fff\"><circle cx=\"5\" cy=\"4\" r=\"1\"/><circle cx=\"12\" cy=\"4\" r=\"1\"/><circle cx=\"19\" cy=\"4\" r=\"1\"/><circle cx=\"8.5\" cy=\"9\" r=\"1\"/><circle cx=\"15.5\" cy=\"9\" r=\"1\"/><circle cx=\"5\" cy=\"14\" r=\"1\"/><circle cx=\"12\" cy=\"14\" r=\"1\"/><circle cx=\"19\" cy=\"14\" r=\"1\"/></g></svg>","australia":"<svg viewBox=\"0 0 60 36\" aria-hidden=\"true\"><rect width=\"60\" height=\"36\" fill=\"#012169\"/><path stroke=\"#fff\" stroke-width=\"7\" d=\"M0 0l30 18M30 0L0 18\"/><path stroke=\"#c8102e\" stroke-width=\"3\" d=\"M0 0l30 18M30 0L0 18\"/><path stroke=\"#fff\" stroke-width=\"10\" d=\"M15 0v18M0 9h30\"/><path stroke=\"#c8102e\" stroke-width=\"5\" d=\"M15 0v18M0 9h30\"/><path fill=\"#fff\" d=\"M43 7l1.4 4.2 4.4 0-3.6 2.6 1.4 4.2-3.6-2.6-3.6 2.6 1.4-4.2-3.6-2.6 4.4 0zM51 25l1 2.5 2.6 0-2.1 1.5.8 2.5-2.3-1.5-2.1 1.5.8-2.5-2.1-1.5 2.6 0z\"/></svg>","south-africa":"<svg viewBox=\"0 0 60 36\" aria-hidden=\"true\"><rect width=\"60\" height=\"36\" fill=\"#de3831\"/><path fill=\"#fff\" d=\"M0 0h60v8H16L0 20zM0 36h60v-8H16L0 16z\"/><path fill=\"#007a4d\" d=\"M0 5l22 13L0 31V5M0 12l13 6L0 24h60V12z\"/><path fill=\"#ffb612\" d=\"M0 0l25 18L0 36h8l25-18L8 0z\"/><path fill=\"#000\" d=\"M0 0l29 18L0 36h8l29-18L8 0z\"/></svg>","india":"<svg viewBox=\"0 0 60 36\" aria-hidden=\"true\"><rect width=\"60\" height=\"12\" fill=\"#ff9933\"/><rect y=\"12\" width=\"60\" height=\"12\" fill=\"#fff\"/><rect y=\"24\" width=\"60\" height=\"12\" fill=\"#138808\"/><circle cx=\"30\" cy=\"18\" r=\"5\" fill=\"none\" stroke=\"#000080\" stroke-width=\"1.5\"/><circle cx=\"30\" cy=\"18\" r=\"1\" fill=\"#000080\"/></svg>"};
const SENTENCES = [
  "I think the water is rather warm, but the bath feels much better.",
  "Yesterday, I travelled by car to the market and bought a large bottle of water."
];
const grid = document.getElementById("accent-grid");
if (grid) {
  grid.innerHTML = ACCENTS.map((accent, i) =>
    `<a class="accent-link" href="./listen.html?accent=${accent.id}"><span class="flag-icon" role="img" aria-label="${accent.place}">${FLAG_SVGS[accent.flag]}</span><span>${accent.name}<small>${accent.region}</small></span><span class="arrow" aria-hidden="true">↗</span></a>`
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
  document.getElementById("accent-region").innerHTML = `<span class="flag-icon flag-large" role="img" aria-label="${accent.place}">${FLAG_SVGS[accent.flag]}</span><span>${accent.place}</span>`;
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
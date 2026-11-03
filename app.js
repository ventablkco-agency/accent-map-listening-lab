const ACCENTS = [
{id:"british",name:"British RP",region:"Southern England · United Kingdom",country:"UNITED KINGDOM",files:["british-01.mp3","british-02.mp3"],feature:"Listen for the long vowel in “bath”, the non-rhotic R in “water” and “car”, and the careful rhythm of the sentence.",coords:[66,20],colour:"coral"},
{id:"cockney",name:"Cockney",region:"East London · United Kingdom",country:"EAST LONDON",files:["cockney-01.mp3","cockney-02.mp3"],feature:"Listen for features such as TH-fronting and glottal stops. These should sound natural, never like a character or a joke.",coords:[72,28],colour:"yellow"},
{id:"scottish",name:"Scottish English",region:"Scotland · United Kingdom",country:"SCOTLAND",files:["scottish-01.mp3","scottish-02.mp3"],feature:"Listen for Scottish vowel qualities and the R sound in words such as “car” and “water”. Scottish English has many regional varieties.",coords:[62,12],colour:"mint"},
{id:"irish",name:"Irish English",region:"Dublin · Ireland",country:"IRELAND",files:["irish-01.mp3","irish-02.mp3"],feature:"Listen for the R sound, vowel quality and the melody of the sentence. Irish English differs from place to place.",coords:[58,24],colour:"lavender"},
{id:"yorkshire",name:"Yorkshire",region:"Northern England · United Kingdom",country:"YORKSHIRE",files:["yorkshire-01.mp3","yorkshire-02.mp3"],feature:"Listen for Northern English vowel qualities, especially in “bath”, alongside the rhythm and shape of each phrase.",coords:[68,34],colour:"blue"},
{id:"american",name:"General American",region:"United States · Broad reference",country:"UNITED STATES",files:["american-01.mp3","american-02.mp3"],feature:"Listen for the R in “car” and “water”, and the quick flap-T sound that can make the T in “water” sound closer to a soft D.",coords:[23,42],colour:"yellow"},
{id:"southern-american",name:"Southern American",region:"Southern United States",country:"SOUTHERN USA",files:["southern-american-01.mp3","southern-american-02.mp3"],feature:"Listen for Southern vowel qualities and relaxed rhythm. The American South includes many distinct accents, not just one.",coords:[30,58],colour:"coral"},
{id:"australian",name:"Australian English",region:"Australia · General Australian",country:"AUSTRALIA",files:["australian-01.mp3","australian-02.mp3"],feature:"Listen for non-rhotic R and Australian vowel qualities in words such as “yesterday”, “market” and “water”.",coords:[86,76],colour:"mint"},
{id:"south-african",name:"South African English",region:"South Africa · Mainstream reference",country:"SOUTH AFRICA",files:["south-african-01.mp3","south-african-02.mp3"],feature:"Listen for South African vowel qualities and the way the speaker shapes words such as “bath”, “car” and “market”.",coords:[57,68],colour:"lavender"},
{id:"indian-english",name:"Indian English",region:"India · Broad reference",country:"INDIA",files:["indian-english-01.mp3","indian-english-02.mp3"],feature:"Listen for consonant articulation, vowel quality and syllable rhythm. Indian English is wonderfully diverse across regions.",coords:[78,49],colour:"blue"}
];
const SENTENCES=[
"I think the water is rather warm, but the bath feels much better.",
"Yesterday, I travelled by car to the market and bought a large bottle of water."
];
function renderCards(){
 const grid=document.getElementById("accent-grid");if(!grid)return;
 grid.innerHTML=ACCENTS.map((a,i)=>`<a class="destination-card tone-${a.colour}" href="./listen.html?accent=${a.id}"><span class="destination-number">${String(i+1).padStart(2,"0")}</span><span class="destination-copy"><strong>${a.name}</strong><small>${a.region}</small></span><span class="destination-arrow" aria-hidden="true">↗</span></a>`).join("");
}
function renderMapStops(){
 const map=document.getElementById("map-stops");if(!map)return;
 map.innerHTML=ACCENTS.map((a,i)=>`<a class="map-stop stop-${i+1} tone-${a.colour}" style="--x:${a.coords[0]}%;--y:${a.coords[1]}%" href="./listen.html?accent=${a.id}" aria-label="Listen to ${a.name}"><span class="stop-dot">${String(i+1).padStart(2,"0")}</span><span class="stop-label">${a.name}</span></a>`).join("");
}
function renderListenPage(){
 const area=document.getElementById("recordings");if(!area)return;
 const id=new URLSearchParams(location.search).get("accent");let index=ACCENTS.findIndex(a=>a.id===id);if(index<0)index=0;
 const a=ACCENTS[index];document.title=`${a.name} — The Accent Lab`;
 document.getElementById("accent-number").textContent=`${String(index+1).padStart(2,"0")} / 10`;
 document.getElementById("accent-name").textContent=a.name;
 document.getElementById("accent-region").textContent=a.region;
 document.getElementById("feature-copy").textContent=a.feature;
 area.innerHTML=SENTENCES.map((sentence,i)=>`<article class="recording-card"><div class="recording-top"><span class="recording-index">0${i+1}</span><span class="recording-tag">LISTENING SAMPLE ${i+1}</span><span class="recording-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div><p class="sentence-text">“${sentence}”</p><audio controls preload="none" src="./audio/${a.files[i]}" aria-label="Play sentence ${i+1} in ${a.name}"></audio><p class="audio-status" data-status="${i}">Ready when you are · Press play to listen</p></article>`).join("");
 area.querySelectorAll("audio").forEach((player,i)=>{
  const status=area.querySelector(`[data-status="${i}"]`);
  player.addEventListener("error",()=>status.textContent=`This recording could not load. Check that ${a.files[i]} is in the audio folder.`);
  player.addEventListener("canplay",()=>status.textContent="Audio ready · Press play whenever you like");
 });
 const prev=ACCENTS[(index+ACCENTS.length-1)%ACCENTS.length],next=ACCENTS[(index+1)%ACCENTS.length];
 const prevLink=document.getElementById("previous-link"),nextLink=document.getElementById("next-link");
 prevLink.href=`./listen.html?accent=${prev.id}`;prevLink.textContent=`← ${prev.name}`;
 nextLink.href=`./listen.html?accent=${next.id}`;nextLink.textContent=`${next.name} →`;
}
renderCards();renderMapStops();renderListenPage();
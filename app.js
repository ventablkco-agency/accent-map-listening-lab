const ACCENTS = [
  {id:"british",name:"British RP",region:"United Kingdom · Received Pronunciation",files:["british-01.mp3","british-02.mp3"],feature:"Listen for the long vowel in “bath”, non-rhotic R in “water”, “rather” and “car”, and precise consonant articulation.",note:"A contemporary Southern British reference accent."},
  {id:"cockney",name:"Cockney",region:"East London · United Kingdom",files:["cockney-01.mp3","cockney-02.mp3"],feature:"Listen for TH-fronting and possible glottal stops. These features should come naturally from the speaker, not from altered spelling.",note:"Cockney features vary between speakers and generations."},
  {id:"scottish",name:"Scottish English",region:"Scotland · Edinburgh / Glasgow reference",files:["scottish-01.mp3","scottish-02.mp3"],feature:"Listen for rhotic R in words such as “car” and “water”, Scottish vowel qualities and sentence rhythm.",note:"Edinburgh and Glasgow speech are not identical; choose and document the voice's regional target."},
  {id:"irish",name:"Irish English",region:"Dublin · Ireland",files:["irish-01.mp3","irish-02.mp3"],feature:"Listen for rhotic R, vowel quality, consonant articulation and the melodic movement of the sentence.",note:"Irish English includes many regional varieties; this is a Dublin-oriented example."},
  {id:"yorkshire",name:"Yorkshire",region:"Northern England · United Kingdom",files:["yorkshire-01.mp3","yorkshire-02.mp3"],feature:"Listen for the short vowel in “bath” and related words, alongside Northern English vowel qualities.",note:"Yorkshire speech varies across towns and speakers."},
  {id:"american",name:"General American",region:"United States · General American reference",files:["american-01.mp3","american-02.mp3"],feature:"Listen for rhotic R in “car” and “water”, and the flap T often heard in “water” and “better”.",note:"A broad reference variety, not one single local accent."},
  {id:"southern-american",name:"Southern American",region:"Southern United States",files:["southern-01.mp3","southern-02.mp3"],feature:"Listen for Southern vowel shifts, possible changes to the “I” vowel in “I” and “time”, and regional drawl.",note:"The American South contains many distinct accents."},
  {id:"australian",name:"Australian English",region:"Australia · General Australian",files:["australian-01.mp3","australian-02.mp3"],feature:"Listen for non-rhotic R and characteristic Australian vowel qualities in “yesterday”, “market” and “water”.",note:"A broad Australian English example."},
  {id:"south-african",name:"South African English",region:"South Africa · Mainstream South African English",files:["south-african-01.mp3","south-african-02.mp3"],feature:"Listen for South African vowel qualities, particularly in “bath”, “car”, “market” and “water”.",note:"South African English varies by community and first-language background."},
  {id:"indian-english",name:"Indian English",region:"India · Indian English",files:["indian-01.mp3","indian-02.mp3"],feature:"Listen for consonant articulation, possible retroflex T and D, vowel qualities and syllable rhythm.",note:"Indian English is diverse across regions and speakers."}
];
const SENTENCES = [
  "I think the water is rather warm, but the bath feels much better.",
  "Yesterday, I travelled by car to the market and bought a large bottle of water."
];

function renderCards(){
  const grid=document.getElementById("accent-grid");
  if(!grid)return;
  grid.innerHTML=ACCENTS.map(a=>`<a class="accent-card" href="./listen.html?accent=${a.id}"><span><strong>${a.name}</strong><small>${a.region} · 2 listening samples</small></span><span class="card-arrow" aria-hidden="true">↗</span></a>`).join("");
}
function renderListenPage(){
  const area=document.getElementById("recordings");
  if(!area)return;
  const id=new URLSearchParams(location.search).get("accent");
  let index=ACCENTS.findIndex(a=>a.id===id);
  if(index<0)index=0;
  const a=ACCENTS[index];
  document.title=`${a.name} — The Accent Lab`;
  document.getElementById("accent-number").textContent=`${String(index+1).padStart(2,"0")} / 10`;
  document.getElementById("accent-name").textContent=a.name;
  document.getElementById("accent-region").textContent=a.region;
  document.getElementById("feature-copy").textContent=a.feature+" "+a.note;
  area.innerHTML=SENTENCES.map((sentence,i)=>`
    <article class="recording">
      <div class="recording-heading"><strong>Sentence ${i+1}</strong><span>Sample ${String(i+1).padStart(2,"0")}</span></div>
      <blockquote>“${sentence}”</blockquote>
      <audio controls preload="none" src="./audio/${a.files[i]}">
        Your browser does not support audio playback.
      </audio>
      <p class="audio-status" data-status="${i}">Press play to listen. If the file is missing, check the audio folder.</p>
    </article>`).join("");
  area.querySelectorAll("audio").forEach((player,i)=>{
    player.addEventListener("error",()=>{area.querySelector(`[data-status="${i}"]`).textContent=`Audio not uploaded yet: ${a.files[i]}`;});
    player.addEventListener("canplay",()=>{area.querySelector(`[data-status="${i}"]`).textContent="Audio ready. Press play to listen.";});
  });
  const prev=ACCENTS[(index+ACCENTS.length-1)%ACCENTS.length],next=ACCENTS[(index+1)%ACCENTS.length];
  document.getElementById("previous-link").href=`./listen.html?accent=${prev.id}`;
  document.getElementById("previous-link").textContent=`← ${prev.name}`;
  document.getElementById("next-link").href=`./listen.html?accent=${next.id}`;
  document.getElementById("next-link").textContent=`${next.name} →`;
}
renderCards();renderListenPage();

const scenes=[...document.querySelectorAll(".scene")];
const playBtn=document.getElementById("playBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const exitBtn=document.getElementById("exitBtn");
const progressBar=document.getElementById("progressBar");
const counter=document.getElementById("sceneCounter");

let index=0;
let playing=false;
let timer=null;
let startedAt=0;
let remaining=0;
let raf=null;

function duration(){
  return Number(scenes[index]?.dataset.duration||0);
}

function render(){
  scenes.forEach((s,i)=>s.classList.toggle("active",i===index));
  counter.textContent=`${index+1} / ${scenes.length}`;
  progressBar.style.width=`${(index/(scenes.length-1))*100}%`;
}

function stopTimer(){
  clearTimeout(timer);
  cancelAnimationFrame(raf);
  timer=null;
  raf=null;
}

function updateProgress(){
  if(!playing || !duration()) return;
  const elapsed=performance.now()-startedAt;
  const pct=Math.min(100,(elapsed/duration())*100);
  progressBar.style.width=`${Math.min(100,((index+pct/100)/(scenes.length-1))*100)}%`;
  if(elapsed<duration()) raf=requestAnimationFrame(updateProgress);
}

function schedule(ms){
  stopTimer();
  if(!playing || !ms) return;
  startedAt=performance.now();
  remaining=ms;
  timer=setTimeout(()=>nextScene(true),ms);
  raf=requestAnimationFrame(updateProgress);
}

function show(i,autoplay=playing){
  stopTimer();
  index=Math.max(0,Math.min(scenes.length-1,i));
  render();
  playing=autoplay;
  playBtn.textContent=playing?"Ⅱ":"▶";
  if(playing) schedule(duration());
}

function nextScene(auto=false){
  if(index>=scenes.length-1){playing=false;playBtn.textContent="▶";stopTimer();render();return}
  show(index+1,auto?true:playing);
}
function prevScene(){
  show(index-1,false);
}
function startMovie(){
  show(1,true);
}
playBtn.onclick=()=>{if(index===0){startMovie();return} playing=!playing;playBtn.textContent=playing?"Ⅱ":"▶"; if(playing)schedule(remaining||duration());else stopTimer()};
nextBtn.onclick=()=>nextScene(false);
prevBtn.onclick=prevScene;
exitBtn.onclick=()=>location.href="index.html";
document.querySelector('[data-action="start"]').onclick=startMovie;
document.querySelector('[data-action="restart"]').onclick=()=>show(0,false);
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight") nextScene(false);
  if(e.key==="ArrowLeft") prevScene();
  if(e.code==="Space"){e.preventDefault();playBtn.click()}
  if(e.key==="Escape") exitBtn.click();
});
render();

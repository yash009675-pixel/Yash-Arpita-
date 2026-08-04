(() => {
const boot=document.getElementById("boot"), bar=document.getElementById("bootProgress"), status=document.getElementById("bootStatus");
let p=0; const msgs=["INITIALIZING LOVE SYSTEMS...","CONNECTING MEMORY DATABASE...","VERIFYING ARPITA...","EARTH ENGINE READY...","LOVE CORE ONLINE..."];
const timer=setInterval(()=>{p+=5;bar.style.width=p+"%";status.textContent=msgs[Math.min(msgs.length-1,Math.floor(p/25))];if(p>=100){clearInterval(timer);setTimeout(()=>boot.classList.add("hide"),450)}},55);

document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>document.querySelector(b.dataset.go)?.scrollIntoView({behavior:"smooth"})));
document.querySelectorAll(".os-nav a").forEach(a=>a.addEventListener("click",e=>{const el=document.querySelector(a.getAttribute("href"));if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}}));

const terminalLines=["LOVEOS v3.0","Initializing...","Loading Memories...","Connecting...","♥ ARPITA","Mission: MAKE ARPITA SMILE","Earth Engine: READY","Memory Database: CONNECTED"];
let line=0,char=0;const out=document.getElementById("terminalText");
function type(){if(line>=terminalLines.length)return;const t=terminalLines[line];out.innerHTML+=t[char]||"";char++;if(char<t.length)setTimeout(type,22);else{out.innerHTML+="<br>";line++;char=0;setTimeout(type,180)}} setTimeout(type,900);

const speed=document.getElementById("speed"),speedValue=document.getElementById("speedValue"),planet=document.querySelector(".planet");
speed?.addEventListener("input",()=>{speedValue.textContent=Number(speed.value).toFixed(1)+"×";planet.style.animationDuration=(25/Number(speed.value))+"s"});

document.getElementById("themeBtn")?.addEventListener("click",()=>document.body.classList.toggle("soft-day"));

const output=document.getElementById("loveOutput");
document.querySelectorAll("[data-love]").forEach(b=>b.addEventListener("click",()=>{
const map={timeline:"LOVE STORY TIMELINE · 2021 → 2026 · Every chapter remains connected.",memories:"MEMORY GALLERY · Your moments are waiting in the Memories module.",letter:"LOVE LETTER · A message written from the heart, preserved in Special.",countdown:"ANNIVERSARY COUNTDOWN · Mission timer synchronized."};
output.textContent=map[b.dataset.love]||"LOVE SYSTEM ONLINE.";
}));

let charge=0;document.getElementById("reactor")?.addEventListener("click",()=>{charge=Math.min(100,charge+10);document.getElementById("loveIndex").textContent=charge+"%";output.textContent="HEART REACTOR CHARGED · "+charge+"%";if(charge>=100)output.textContent="HEART REACTOR · FULL POWER ♥"});
})();
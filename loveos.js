/* ======================================================
   LOVEOS v3.1 FINAL
   Created by Yash ❤️ For Arpita
   Part 1 — Core + BIOS + Terminal
====================================================== */

"use strict";

/* ======================================================
   HELPERS
====================================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ======================================================
   DOM ELEMENTS
====================================================== */

const biosScreen = $("#biosScreen");
const biosBar = $("#biosBar");
const biosText = $("#biosText");

const biosMemory = $("#biosMemory");
const biosLove = $("#biosLove");
const biosMission = $("#biosMission");
const biosEarth = $("#biosEarth");
const biosGalaxy = $("#biosGalaxy");
const biosBTS = $("#biosBTS");

const terminalText = $("#terminalText");

const speedSlider = $("#speed");
const speedValue = $("#speedValue");

const planet = $(".planet");
const miniEarth = $(".mini-earth");

const reactor = $("#reactor");

const countdown = $("#anniversaryCountdown");

const themeBtn = $("#themeBtn");

/* ======================================================
   BIOS BOOT
====================================================== */

const bootMessages = [

"Checking Memory Database...",
"Starting Love Engine...",
"Connecting Mission Control...",
"Synchronizing Digital Earth...",
"Loading Galaxy Command...",
"Connecting BTS Universe...",
"Launching LOVEOS..."

];

const bootTargets = [

biosMemory,
biosLove,
biosMission,
biosEarth,
biosGalaxy,
biosBTS

];

let bootProgress = 0;
let bootStep = 0;

function updateBoot(){

    if(!biosScreen) return;

    if(bootProgress<=100){

        if(biosBar){

            biosBar.style.width=bootProgress+"%";

        }

        bootProgress++;

    }

    if(

        bootProgress%15===0 &&

        bootStep<bootMessages.length

    ){

        if(biosText){

            biosText.textContent=

            bootMessages[bootStep];

        }

        if(bootTargets[bootStep]){

            bootTargets[bootStep].textContent="ONLINE";

            bootTargets[bootStep].style.color="#76ff8c";

        }

        bootStep++;

    }

    if(bootProgress>=100){

        clearInterval(bootLoop);

        setTimeout(()=>{

            biosScreen.style.opacity="0";

            setTimeout(()=>{

                biosScreen.style.display="none";

            },700);

        },800);

    }

}

const bootLoop=setInterval(updateBoot,50);

/* ======================================================
   TERMINAL
====================================================== */

const terminalLines=[

"> LOVEOS v3.1",
"> Memory Database Connected",
"> Earth Engine Online",
"> Moon Engine Online",
"> Space Dock Online",
"> Galaxy Command Ready",
"> BTS Universe Connected",
"> Mission : Make Arpita Smile ❤️"

];

let terminalIndex=0;

function typeTerminal(){

    if(

        !terminalText ||

        terminalIndex>=terminalLines.length

    ) return;

    const row=document.createElement("div");

    row.textContent=

    terminalLines[terminalIndex];

    terminalText.appendChild(row);

    terminalText.scrollTop=

    terminalText.scrollHeight;

    terminalIndex++;

    setTimeout(typeTerminal,700);

}

window.addEventListener("load",()=>{

    setTimeout(typeTerminal,2500);

});

/* ======================================================
   SMOOTH SCROLL BUTTONS
====================================================== */

document

.querySelectorAll("[data-go]")

.forEach(button=>{

button.addEventListener("click",()=>{

const target=

document.querySelector(

button.dataset.go

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ======================================================
   PART 1 END
====================================================== */
/* ======================================================
   PART 2 — EARTH ENGINE
====================================================== */

let earthSpeed = 1;

/* ======================================================
   EARTH ROTATION
====================================================== */

function updateEarthSpeed(){

    if(!speedSlider) return;

    earthSpeed = Number(speedSlider.value);

    if(speedValue){

        speedValue.textContent =
        earthSpeed.toFixed(1) + "×";

    }

    if(planet){

        planet.style.animationDuration =
        (25 / earthSpeed) + "s";

    }

    if(miniEarth){

        miniEarth.style.animationDuration =
        (25 / earthSpeed) + "s";

    }

}

if(speedSlider){

    speedSlider.addEventListener(

        "input",

        updateEarthSpeed

    );

    updateEarthSpeed();

}

/* ======================================================
   DAY & NIGHT ENGINE
====================================================== */

const terminator = $(".terminator");

let dayRotation = 0;

function animateDayNight(){

    dayRotation += 0.25;

    if(terminator){

        const move =

        Math.sin(

            dayRotation * Math.PI / 180

        ) * 10;

        terminator.style.transform =

        `translateX(${move}px)`;

    }

    requestAnimationFrame(

        animateDayNight

    );

}

animateDayNight();

/* ======================================================
   CLOUD ENGINE
====================================================== */

const cloudLayers =

$$(".clouds,.mini-clouds");

let cloudOffset = 0;

function animateClouds(){

    cloudOffset += 0.15;

    cloudLayers.forEach(layer=>{

        layer.style.backgroundPosition =

        `${cloudOffset}px 0`;

    });

    requestAnimationFrame(

        animateClouds

    );

}

animateClouds();

/* ======================================================
   ATMOSPHERIC GLOW
====================================================== */

let glowTick = 0;

function animateGlow(){

    glowTick += 0.02;

    if(planet){

        const glow =

        60 +

        Math.sin(glowTick) * 20;

        planet.style.boxShadow =

        `
        0 0 ${glow}px rgba(110,140,255,.30),
        inset -45px -20px 80px #02050b,
        inset 25px 15px 45px rgba(220,240,255,.28)
        `;

    }

    requestAnimationFrame(

        animateGlow

    );

}

animateGlow();

/* ======================================================
   SUNLIGHT ENGINE
====================================================== */

let sunlight = 0;

function animateSunlight(){

    sunlight += 0.015;

    const brightness =

    1 +

    Math.sin(sunlight) * .08;

    if(planet){

        planet.style.filter =

        `brightness(${brightness})`;

    }

    if(miniEarth){

        miniEarth.style.filter =

        `brightness(${brightness})`;

    }

    requestAnimationFrame(

        animateSunlight

    );

}

animateSunlight();

/* ======================================================
   WEATHER ENGINE
====================================================== */

const weatherItems =

$$(".weather-map span");

const weatherStates=[

"☀ SUNNY",

"☁ CLOUDY",

"🌧 RAIN",

"⛈ STORM",

"🌤 CLEAR",

"🌫 FOG",

"❄ SNOW"

];

function updateWeather(){

    weatherItems.forEach(item=>{

        const location =

        item.textContent.split("•")[0].trim();

        const state =

        weatherStates[

            Math.floor(

                Math.random() *

                weatherStates.length

            )

        ];

        item.textContent =

        location + " • " + state;

    });

}

updateWeather();

setInterval(

    updateWeather,

    7000

);

/* ======================================================
   EARTH CAMERA ENGINE
====================================================== */

const earthConsole =

$(".earth-console");

let cameraTick = 0;

function animateCamera(){

    cameraTick += 0.01;

    if(earthConsole){

        const x =

        Math.sin(cameraTick) * 4;

        const y =

        Math.cos(cameraTick) * 3;

        earthConsole.style.transform =

        `translate(${x}px,${y}px)`;

    }

    requestAnimationFrame(

        animateCamera

    );

}

animateCamera();

/* ======================================================
   PART 2 END
====================================================== */
/* ======================================================
   PART 3 — OCEAN & MOON ENGINE
====================================================== */

/* ======================================================
   OCEAN WAVE ENGINE
====================================================== */

const waves = $$(".wave");

let waveTick = 0;

function animateOcean(){

    waveTick += 0.8;

    waves.forEach((wave,index)=>{

        const x =
        Math.sin((waveTick + index * 45) * Math.PI / 180) * 35;

        wave.style.transform =
        `translateX(${x}px)`;

    });

    requestAnimationFrame(animateOcean);

}

animateOcean();

/* ======================================================
   OCEAN GLOW
====================================================== */

const oceanPanel = $(".ocean-panel");

let oceanGlow = 0;

function animateOceanGlow(){

    oceanGlow += 0.02;

    if(oceanPanel){

        const value =
        .92 + Math.sin(oceanGlow) * .08;

        oceanPanel.style.filter =
        `brightness(${value})`;

    }

    requestAnimationFrame(animateOceanGlow);

}

animateOceanGlow();

/* ======================================================
   MOON ENGINE
====================================================== */

const moon = $(".moon");

let moonAngle = 0;

function animateMoon(){

    moonAngle += .08;

    if(moon){

        moon.style.transform =
        `rotate(${moonAngle}deg)`;

    }

    requestAnimationFrame(animateMoon);

}

animateMoon();

/* ======================================================
   MOON GLOW
====================================================== */

let moonGlow = 0;

function animateMoonGlow(){

    moonGlow += .03;

    if(moon){

        const glow =
        40 + Math.sin(moonGlow) * 15;

        moon.style.boxShadow =

        `
        inset -35px -20px 60px #11111a,
        0 0 ${glow}px rgba(210,210,255,.22)
        `;

    }

    requestAnimationFrame(animateMoonGlow);

}

animateMoonGlow();

/* ======================================================
   MOON CRATERS
====================================================== */

const craters = $$(".moon-crater");

let craterTick = 0;

function animateCraters(){

    craterTick += .04;

    craters.forEach((crater,index)=>{

        crater.style.opacity =
        .65 +
        Math.sin(craterTick + index) * .15;

    });

    requestAnimationFrame(animateCraters);

}

animateCraters();

/* ======================================================
   SPACE STARS
====================================================== */

const stars = $$(".space-bg span");

let starTick = 0;

function animateStars(){

    starTick += .03;

    stars.forEach((star,index)=>{

        star.style.opacity =

        .35 +

        Math.sin(

            starTick + index

        ) * .35;

    });

    requestAnimationFrame(animateStars);

}

animateStars();

/* ======================================================
   ORBIT ENGINE
====================================================== */

const orbitRings = $$(".orbit");

let orbitTick = 0;

function animateOrbit(){

    orbitTick += .15;

    orbitRings.forEach((ring,index)=>{

        const rotate =

        orbitTick *

        (index===0 ? 1 : -1);

        ring.style.transform =

        `rotate(${rotate}deg)`;

    });

    requestAnimationFrame(animateOrbit);

}

animateOrbit();

/* ======================================================
   SYSTEM TELEMETRY
====================================================== */

setInterval(()=>{

    console.log("🌍 Earth Engine : ONLINE");
    console.log("🌊 Ocean Engine : ONLINE");
    console.log("🌙 Moon Engine : ONLINE");
    console.log("🛰 Orbit System : ACTIVE");
    console.log("⭐ Starfield : ACTIVE");

},10000);

/* ======================================================
   PART 3 END
====================================================== */
/* ======================================================
   PART 4 — SPACE DOCK + GALAXY + BTS + HEART ENGINE
====================================================== */

/* ======================================================
   SPACE DOCK ENGINE
====================================================== */

const ships = $$(".ship");

let dockAngle = 0;

function animateShips(){

    dockAngle += 0.4;

    ships.forEach((ship,index)=>{

        const radius = 90 + (index * 35);

        const angle = (dockAngle + index * 180) * Math.PI / 180;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        ship.style.transform =
        `translate(${x}px,${y}px) rotate(${dockAngle}deg)`;

    });

    requestAnimationFrame(animateShips);

}

animateShips();

/* ======================================================
   SPACE STATION PULSE
====================================================== */

const station = $(".station");

let stationGlow = 0;

function animateStation(){

    stationGlow += 0.03;

    if(station){

        const glow =

        30 +

        Math.sin(stationGlow) * 15;

        station.style.boxShadow =

        `0 0 ${glow}px rgba(140,110,255,.35)`;

    }

    requestAnimationFrame(animateStation);

}

animateStation();

/* ======================================================
   GALAXY COMMAND CENTER
====================================================== */

const commandCards =

$$(".command-grid article");

function animateCommandCards(){

    commandCards.forEach((card,index)=>{

        card.animate(

            [

                {transform:"translateY(0px)"},

                {transform:"translateY(-8px)"},

                {transform:"translateY(0px)"}

            ],

            {

                duration:2500 + index * 300,

                iterations:Infinity

            }

        );

    });

}

animateCommandCards();

/* ======================================================
   PURPLE CORE ENGINE
====================================================== */

const purpleCore = $(".purple-core");

let purpleTick = 0;

function animatePurpleCore(){

    purpleTick += 0.04;

    if(purpleCore){

        const scale =

        1 +

        Math.sin(purpleTick) * .08;

        purpleCore.style.transform =

        `scale(${scale})`;

    }

    requestAnimationFrame(animatePurpleCore);

}

animatePurpleCore();

/* ======================================================
   BTS UNIVERSE
====================================================== */

const purpleCaption = $(".purple-caption");

const btsMessages = [

"💜 I PURPLE YOU",

"💜 BTS FOREVER",

"💜 BORAHAE",

"💜 LOVE NEVER ENDS",

"💜 YASH × ARPITA"

];

let btsIndex = 0;

setInterval(()=>{

    if(purpleCaption){

        purpleCaption.textContent =

        btsMessages[btsIndex];

    }

    btsIndex++;

    if(btsIndex >= btsMessages.length){

        btsIndex = 0;

    }

},3500);

/* ======================================================
   HEART REACTOR
====================================================== */

if(reactor){

    reactor.addEventListener("click",()=>{

        reactor.animate(

            [

                {transform:"scale(1)"},

                {transform:"scale(1.3)"},

                {transform:"scale(1)"}

            ],

            {

                duration:450

            }

        );

        reactor.innerHTML="💜";

        setTimeout(()=>{

            reactor.innerHTML="❤️";

        },450);

    });

}

/* ======================================================
   LOVE OUTPUT
====================================================== */

const loveOutput = $("#loveOutput");

const loveButtons = $$("[data-love]");

const loveMessages = {

timeline:
"❤️ Every chapter of our journey is written forever.",

memories:
"📸 Every picture reminds me of your smile.",

letter:
"💌 Every heartbeat still writes your name.",

countdown:
"⏳ Another beautiful anniversary is getting closer."

};

loveButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const key = button.dataset.love;

        if(loveOutput && loveMessages[key]){

            loveOutput.textContent =

            loveMessages[key];

        }

    });

});

/* ======================================================
   LOVEOS STATUS
====================================================== */

console.log(

"%cLOVEOS v3.1 ONLINE ❤️",

"color:#c59cff;font-size:18px;font-weight:bold;"

);

/* ======================================================
   PART 4 END
====================================================== */
/* ======================================================
   PART 5 — COUNTDOWN + THEME + REVEAL + FINALE
====================================================== */

/* ======================================================
   ANNIVERSARY COUNTDOWN
====================================================== */

const anniversaryDate = new Date("2027-01-22T00:00:00");

function updateCountdown(){

    if(!countdown) return;

    const now = new Date();

    const diff = anniversaryDate - now;

    if(diff <= 0){

        countdown.textContent =
        "❤️ HAPPY ANNIVERSARY ❤️";

        return;

    }

    const days =
    Math.floor(diff / (1000*60*60*24));

    const hours =
    Math.floor(
    (diff%(1000*60*60*24))
    /(1000*60*60));

    const minutes =
    Math.floor(
    (diff%(1000*60*60))
    /(1000*60));

    const seconds =
    Math.floor(
    (diff%(1000*60))
    /1000);

    countdown.textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;

}

updateCountdown();

setInterval(updateCountdown,1000);

/* ======================================================
   THEME ENGINE
====================================================== */

if(themeBtn){

    themeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("light-mode");

    });

}

/* ======================================================
   SCROLL REVEAL
====================================================== */

const revealItems = $$(
".module,.terminal,.finale"
);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealItems.forEach(item=>{

observer.observe(item);

});

/* ======================================================
   FINAL HEART
====================================================== */

const finalHeart =
$(".final-heart");

if(finalHeart){

setInterval(()=>{

finalHeart.animate(

[

{transform:"scale(1)"},

{transform:"scale(1.15)"},

{transform:"scale(1)"}

],

{

duration:1800

}

);

},1800);

}

/* ======================================================
   LOVEOS READY
====================================================== */

window.addEventListener("load",()=>{

console.log("");

console.log("=================================");

console.log(" LOVEOS v3.1 READY ");

console.log("=================================");

console.log("BIOS            ✔");

console.log("Earth Engine    ✔");

console.log("Ocean Engine    ✔");

console.log("Moon Engine     ✔");

console.log("Space Dock      ✔");

console.log("Galaxy Center   ✔");

console.log("BTS Universe    ✔");

console.log("Love Engine     ✔");

console.log("Countdown       ✔");

console.log("Mission Ready   ✔");

console.log("=================================");

});

/* ======================================================
   END OF LOVEOS v3.1
====================================================== */
/* ======================================
TIMELINE ANIMATION
====================================== */

const timelineCards =
document.querySelectorAll(".timeline-card");

const timelineObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate(

[
{
opacity:0,
transform:"translateY(60px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],
{
duration:800,
fill:"forwards"
}
);

}

});

},

{
threshold:.2
}

);

timelineCards.forEach(card=>{

timelineObserver.observe(card);

});
/* ======================================================
   LOVE TIMELINE ENGINE
====================================================== */

const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:0.2

}

);

timelineItems.forEach(item=>{

item.classList.add("timeline-hidden");

timelineObserver.observe(item);

});

/* ======================================================
   TIMELINE GLOW EFFECT
====================================================== */

const timelineDots =
document.querySelectorAll(".timeline-dot");

let glowFrame = 0;

function animateTimelineGlow(){

glowFrame += 0.05;

timelineDots.forEach((dot,index)=>{

const glow =
10 + Math.sin(glowFrame + index) * 6;

dot.style.boxShadow =
`0 0 ${glow}px #9b78ff,
0 0 ${glow*2}px rgba(155,120,255,.45)`;

});

requestAnimationFrame(animateTimelineGlow);

}

animateTimelineGlow();

/* ======================================================
   TIMELINE CARD FLOAT
====================================================== */

const timelineCards =
document.querySelectorAll(".timeline-card");

timelineCards.forEach((card,index)=>{

card.animate(

[
{
transform:"translateY(0px)"
},
{
transform:"translateY(-6px)"
},
{
transform:"translateY(0px)"
}
],

{

duration:3200 + index*250,

iterations:Infinity,

easing:"ease-in-out"

}

);

});

/* ======================================================
   TIMELINE AUTO SCROLL HIGHLIGHT
====================================================== */

window.addEventListener("scroll",()=>{

timelineCards.forEach(card=>{

const rect = card.getBoundingClientRect();

if(rect.top < window.innerHeight*0.65){

card.style.borderColor="#b58cff";
card.style.boxShadow=
"0 15px 35px rgba(140,100,255,.28)";

}else{

card.style.borderColor="rgba(255,255,255,.08)";
card.style.boxShadow="none";

}

});

});


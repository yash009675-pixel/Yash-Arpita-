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






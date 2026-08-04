/* ======================================================
   LOVEOS v3.1
   Created by Yash ❤️ For Arpita
====================================================== */

"use strict";

/* ======================================================
   DOM ELEMENTS
====================================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ======================================================
   BIOS ELEMENTS
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

/* ======================================================
   TERMINAL
====================================================== */

const terminalText = $("#terminalText");

/* ======================================================
   EARTH
====================================================== */

const speedSlider = $("#speed");
const speedValue = $("#speedValue");
const rotationStatus = $("#rotationStatus");

const planet = $(".planet");
const miniEarth = $(".mini-earth");

/* ======================================================
   LOVE
====================================================== */

const reactor = $("#heartReactor");
const countdown = $("#anniversaryCountdown");

/* ======================================================
   BIOS BOOT SEQUENCE
====================================================== */

const bootSteps = [

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

let progress = 0;
let step = 0;

function bootSystem(){

    if(progress <= 100){

        biosBar.style.width = progress + "%";

        progress++;

    }

    if(progress % 15 === 0 && step < bootSteps.length){

        biosText.textContent = bootSteps[step];

        if(bootTargets[step]){

            bootTargets[step].textContent = "ONLINE";
            bootTargets[step].style.color = "#7CFF8A";

        }

        step++;

    }

    if(progress >= 100){

        clearInterval(bootLoop);

        setTimeout(()=>{

            biosScreen.style.opacity="0";

            setTimeout(()=>{

                biosScreen.style.display="none";

            },700);

        },700);

    }

}

const bootLoop = setInterval(bootSystem,50);

/* ======================================================
   TERMINAL MESSAGES
====================================================== */

const terminalLines=[

"> LOVEOS v3.1",
"> Memory Database Connected",
"> Earth Engine Online",
"> Moon Engine Online",
"> Galaxy Command Ready",
"> Heart Reactor Stable",
"> Mission: Make Arpita Smile ❤️"

];

let line=0;

function terminalWriter(){

    if(line>=terminalLines.length) return;

    const row=document.createElement("div");

    row.textContent=terminalLines[line];

    terminalText.appendChild(row);

    terminalText.scrollTop=terminalText.scrollHeight;

    line++;

    setTimeout(terminalWriter,700);

}

setTimeout(terminalWriter,2500);
/* ======================================================
   EARTH ENGINE
====================================================== */

let earthSpeed = 1;

function updateEarthSpeed() {

    earthSpeed = Number(speedSlider.value);

    speedValue.textContent = earthSpeed.toFixed(1) + "×";

    if (rotationStatus) {
        rotationStatus.textContent = earthSpeed.toFixed(1) + "×";
    }

    if (planet) {
        planet.style.animationDuration = (25 / earthSpeed) + "s";
    }

    if (miniEarth) {
        miniEarth.style.animationDuration = (25 / earthSpeed) + "s";
    }

}

if (speedSlider) {

    speedSlider.addEventListener("input", updateEarthSpeed);

    updateEarthSpeed();

}

/* ======================================================
   DAY & NIGHT ENGINE
====================================================== */

const terminator = document.querySelector(".terminator");

let dayAngle = 0;

function animateDayNight() {

    dayAngle += 0.2;

    if (terminator) {

        terminator.style.transform =
            `translateX(${Math.sin(dayAngle * Math.PI / 180) * 8}px)`;

    }

    requestAnimationFrame(animateDayNight);

}

animateDayNight();

/* ======================================================
   CLOUD PHYSICS ENGINE
====================================================== */

const cloudLayers = document.querySelectorAll(".clouds, .mini-clouds");

let cloudOffset = 0;

function animateClouds() {

    cloudOffset += 0.15;

    cloudLayers.forEach(layer => {

        layer.style.backgroundPosition =
            `${cloudOffset}px 0`;

    });

    requestAnimationFrame(animateClouds);

}

animateClouds();

/* ======================================================
   ATMOSPHERIC GLOW
====================================================== */

const glow = document.querySelectorAll(".atmospheric-glow");

let glowValue = 0;

function animateGlow() {

    glowValue += 0.05;

    glow.forEach(item => {

        item.style.opacity =
            0.55 + Math.sin(glowValue) * 0.25;

    });

    requestAnimationFrame(animateGlow);

}

animateGlow();

/* ======================================================
   EARTH WEATHER ENGINE
====================================================== */

const weatherItems = document.querySelectorAll(".weather-map span");

const weatherStates = [

"☀ SUNNY",

"☁ CLOUDY",

"🌧 RAIN",

"⛈ STORM",

"🌤 CLEAR",

"🌫 FOG"

];

function updateWeather() {

    weatherItems.forEach(item => {

        const country = item.textContent.split("•")[0].trim();

        const randomWeather =
            weatherStates[
                Math.floor(Math.random() * weatherStates.length)
            ];

        item.textContent =
            country + " • " + randomWeather;

    });

}

setInterval(updateWeather, 7000);

/* ======================================================
   EARTH LIVE STATUS
====================================================== */

function updateEarthStatus() {

    console.log(
        "Earth Rotation:",
        earthSpeed.toFixed(1) + "×"
    );

}

setInterval(updateEarthStatus, 5000);
/* ======================================================
   OCEAN CURRENT ENGINE
====================================================== */

const waves = document.querySelectorAll(".wave");

let waveOffset = 0;

function animateOcean() {

    waveOffset += 0.6;

    waves.forEach((wave, index) => {

        wave.style.transform =
            `translateX(${Math.sin((waveOffset + index * 40) * Math.PI / 180) * 35}px)`;

    });

    requestAnimationFrame(animateOcean);

}

animateOcean();

/* ======================================================
   WATER SHADER ENGINE
====================================================== */

const oceanDisplay = document.querySelector(".ocean-display");

let waterGlow = 0;

function animateWaterShader() {

    waterGlow += 0.04;

    if (oceanDisplay) {

        oceanDisplay.style.filter =
            `brightness(${1 + Math.sin(waterGlow) * 0.08})`;

    }

    requestAnimationFrame(animateWaterShader);

}

animateWaterShader();

/* ======================================================
   ATMOSPHERIC WIND ENGINE
====================================================== */

const windObjects = document.querySelectorAll(".clouds, .mini-clouds");

let windSpeed = 0;

function animateWind() {

    windSpeed += 0.2;

    windObjects.forEach(item => {

        item.style.transform =
            `translateX(${Math.sin(windSpeed * Math.PI / 180) * 10}px)`;

    });

    requestAnimationFrame(animateWind);

}

animateWind();

/* ======================================================
   DIGITAL MOON ENGINE
====================================================== */

const moon = document.querySelector(".digital-moon");

let moonRotation = 0;

function animateMoon() {

    moonRotation += 0.05;

    if (moon) {

        moon.style.transform =
            `rotate(${moonRotation}deg)`;

    }

    requestAnimationFrame(animateMoon);

}

animateMoon();

/* ======================================================
   LUNAR DUST EFFECT
====================================================== */

const lunarDust = document.querySelector(".lunar-dust");

let dustOpacity = 0;

function animateDust() {

    dustOpacity += 0.05;

    if (lunarDust) {

        lunarDust.style.opacity =
            0.4 + Math.sin(dustOpacity) * 0.2;

    }

    requestAnimationFrame(animateDust);

}

animateDust();

/* ======================================================
   TIDAL SYSTEM
====================================================== */

const tidalMeter = document.querySelector(".tidal-meter div");

let tide = 0;

function animateTides() {

    tide += 0.08;

    if (tidalMeter) {

        tidalMeter.style.width =
            (50 + Math.sin(tide) * 50) + "%";

    }

    requestAnimationFrame(animateTides);

}

animateTides();

/* ======================================================
   ORBIT VISUALIZER
====================================================== */

const satellite = document.querySelector(".orbit-satellite");

let orbitAngle = 0;

function animateOrbit() {

    orbitAngle += 0.7;

    if (satellite) {

        const radius = 130;

        const x = Math.cos(orbitAngle * Math.PI / 180) * radius;
        const y = Math.sin(orbitAngle * Math.PI / 180) * radius;

        satellite.style.transform =
            `translate(${x}px, ${y}px)`;

    }

    requestAnimationFrame(animateOrbit);

}

animateOrbit();

/* ======================================================
   JET STREAM VISUALIZER
====================================================== */

const jetStreams = document.querySelectorAll(".jet-stream");

let jetFlow = 0;

function animateJetStreams() {

    jetFlow += 1;

    jetStreams.forEach((stream, index) => {

        stream.style.backgroundPosition =
            `${jetFlow * (index + 1)}px 0`;

    });

    requestAnimationFrame(animateJetStreams);

}

animateJetStreams();

/* ======================================================
   SYSTEM TELEMETRY
====================================================== */

setInterval(() => {

    console.log("🌍 Earth Engine : ONLINE");
    console.log("🌊 Ocean Engine : ONLINE");
    console.log("🌙 Moon Engine : ONLINE");
    console.log("🛰 Orbit Visualizer : ACTIVE");
    console.log("🌬 Atmospheric Wind : ACTIVE");
    console.log("☁ Cloud Physics : ACTIVE");

}, 10000);
/* ======================================================
   SPACE DOCK TRAFFIC ENGINE
====================================================== */

const ships = document.querySelectorAll(".ship");

let dockFrame = 0;

function animateSpaceDock() {

    dockFrame += 0.4;

    ships.forEach((ship, index) => {

        const radius = 90 + (index * 30);

        const angle = (dockFrame + index * 120) * Math.PI / 180;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        ship.style.transform =
            `translate(${x}px, ${y}px) rotate(${dockFrame}deg)`;

    });

    requestAnimationFrame(animateSpaceDock);

}

animateSpaceDock();

/* ======================================================
   ASTEROID BELT ENGINE
====================================================== */

const asteroids = document.querySelectorAll(".asteroid");

let asteroidAngle = 0;

function animateAsteroids() {

    asteroidAngle += 0.3;

    asteroids.forEach((rock, index) => {

        const orbit = 120 + index * 25;

        const angle = (asteroidAngle + index * 90) * Math.PI / 180;

        const x = Math.cos(angle) * orbit;
        const y = Math.sin(angle) * orbit;

        rock.style.transform =
            `translate(${x}px, ${y}px)`;

    });

    requestAnimationFrame(animateAsteroids);

}

animateAsteroids();

/* ======================================================
   GALAXY COMMAND CENTER
====================================================== */

const commandCards =
    document.querySelectorAll(".command-card");

function pulseCommandCards() {

    commandCards.forEach((card, index) => {

        card.animate(

            [

                {

                    transform: "translateY(0px)"

                },

                {

                    transform: "translateY(-8px)"

                },

                {

                    transform: "translateY(0px)"

                }

            ],

            {

                duration: 2500 + index * 250,

                iterations: Infinity

            }

        );

    });

}

pulseCommandCards();

/* ======================================================
   PLANETARY CONTROL
====================================================== */

const planetStatus = [

    "EARTH",

    "MOON",

    "MARS",

    "JUPITER",

    "SATURN",

    "URANUS",

    "NEPTUNE"

];

let currentPlanet = 0;

setInterval(() => {

    console.log(

        "🪐 Planetary Control:",

        planetStatus[currentPlanet]

    );

    currentPlanet++;

    if (currentPlanet >= planetStatus.length) {

        currentPlanet = 0;

    }

}, 3000);

/* ======================================================
   SPACE-TIME MAP
====================================================== */

const timelineYears = [

    "2021",

    "2022",

    "2023",

    "2024",

    "2025",

    "2026",

    "∞"

];

let yearIndex = 0;

setInterval(() => {

    console.log(

        "🛰 Space-Time:",

        timelineYears[yearIndex]

    );

    yearIndex++;

    if (yearIndex >= timelineYears.length) {

        yearIndex = 0;

    }

}, 2500);

/* ======================================================
   HEART REACTOR
====================================================== */

if (reactor) {

    reactor.addEventListener("click", () => {

        reactor.animate(

            [

                {

                    transform: "scale(1)"

                },

                {

                    transform: "scale(1.35)"

                },

                {

                    transform: "scale(1)"

                }

            ],

            {

                duration: 500

            }

        );

        reactor.textContent = "💜";

        setTimeout(() => {

            reactor.textContent = "❤️";

        }, 500);

    });

}

/* ======================================================
   LOVE OUTPUT SYSTEM
====================================================== */

const loveOutput = document.querySelector("#loveOutput");

const loveButtons =
    document.querySelectorAll("[data-love]");

const messages = {

    timeline:
        "❤️ Every chapter of our journey is stored forever.",

    memories:
        "📸 Every smile has become a beautiful memory.",

    letter:
        "💌 My heart still writes your name every day.",

    countdown:
        "⏳ Every second brings us closer to another anniversary."

};

loveButtons.forEach(button => {

    button.addEventListener("click", () => {

        const key = button.dataset.love;

        if (loveOutput && messages[key]) {

            loveOutput.textContent = messages[key];

        }

    });

});

/* ======================================================
   LOVEOS STATUS
====================================================== */

console.log(
    "%cLOVEOS v3.1 ONLINE ❤️",
    "color:#b388ff;font-size:18px;font-weight:bold;"
);
/* ======================================================
   EARTH LIVE CAMERA ENGINE
====================================================== */

const earthConsole = document.querySelector(".earth-console");

let cameraTime = 0;

function animateEarthCamera() {

    cameraTime += 0.01;

    if (earthConsole) {

        const x = Math.sin(cameraTime) * 4;
        const y = Math.cos(cameraTime * 0.8) * 3;

        earthConsole.style.transform =
            `translate(${x}px, ${y}px)`;

    }

    requestAnimationFrame(animateEarthCamera);

}

animateEarthCamera();

/* ======================================================
   GLOBAL SUNLIGHT ENGINE
====================================================== */

let sunlight = 0;

function animateSunlight() {

    sunlight += 0.01;

    const intensity =
        1 + Math.sin(sunlight) * 0.15;

    if (planet) {

        planet.style.filter =
            `brightness(${intensity})`;

    }

    if (miniEarth) {

        miniEarth.style.filter =
            `brightness(${intensity})`;

    }

    requestAnimationFrame(animateSunlight);

}

animateSunlight();

/* ======================================================
   REALISTIC CLOUD SHADOWS
====================================================== */

const cloudShadow =
    document.querySelector(".terminator");

let shadow = 0;

function animateCloudShadow() {

    shadow += 0.02;

    if (cloudShadow) {

        cloudShadow.style.opacity =
            0.45 + Math.sin(shadow) * 0.15;

    }

    requestAnimationFrame(animateCloudShadow);

}

animateCloudShadow();

/* ======================================================
   HORIZON CURVATURE ENGINE
====================================================== */

let horizonTime = 0;

function animateHorizon() {

    horizonTime += 0.02;

    if (planet) {

        const scale =
            1 + Math.sin(horizonTime) * 0.01;

        planet.style.borderRadius = "50%";
        planet.style.scale = scale;

    }

    requestAnimationFrame(animateHorizon);

}

animateHorizon();

/* ======================================================
   EARTH REFLECTION ENGINE
====================================================== */

let reflection = 0;

function animateReflection() {

    reflection += 0.015;

    const glow =
        60 + Math.sin(reflection) * 20;

    if (planet) {

        planet.style.boxShadow = `
        0 0 ${glow}px rgba(95,140,255,.35),
        inset -45px -20px 80px #02050b,
        inset 25px 15px 45px rgba(220,240,255,.25)
        `;

    }

    requestAnimationFrame(animateReflection);

}

animateReflection();

/* ======================================================
   AMBIENT SPACE PARTICLES
====================================================== */

const stars =
    document.querySelectorAll(".space-bg span");

let particleTick = 0;

function animateStars() {

    particleTick += 0.02;

    stars.forEach((star, index) => {

        star.style.opacity =
            0.25 +
            Math.sin(
                particleTick * 2 + index
            ) * 0.35;

    });

    requestAnimationFrame(animateStars);

}

animateStars();

/* ======================================================
   GRAND FINALE EFFECT
====================================================== */

const finale =
    document.querySelector(".final-heart");

if (finale) {

    setInterval(() => {

        finale.animate(

            [

                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.18)"
                },

                {
                    transform: "scale(1)"
                }

            ],

            {

                duration: 1800

            }

        );

    }, 1800);

}

/* ======================================================
   LOVEOS SYSTEM CLOCK
====================================================== */

function updateSystemClock() {

    const now = new Date();

    console.log(

        "🕒 LOVEOS TIME :",

        now.toLocaleTimeString()

    );

}

setInterval(updateSystemClock, 60000);

/* ======================================================
   LOVEOS READY
====================================================== */

window.addEventListener("load", () => {

    console.log("================================");

    console.log("LOVEOS v3.1 READY");

    console.log("Digital Earth      ✔");

    console.log("Moon Engine        ✔");

    console.log("Ocean Engine       ✔");

    console.log("Galaxy Center      ✔");

    console.log("Space Dock         ✔");

    console.log("Heart Reactor      ✔");

    console.log("BTS Universe       ✔");

    console.log("Mission Complete   ✔");

    console.log("================================");

});

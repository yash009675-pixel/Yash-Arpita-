"use strict";


/* ==========================================
   MAIN
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const themeButton =
    document.getElementById("themeButton");

  const savedTheme =
    safeGet("love-site-theme");


  /* Theme */

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  updateThemeButton(themeButton);


  themeButton?.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light-theme"
      );

      const activeTheme =
        document.body.classList.contains(
          "light-theme"
        )
          ? "light"
          : "dark";


      safeSet(
        "love-site-theme",
        activeTheme
      );


      updateThemeButton(
        themeButton
      );

    }
  );


  /* Current year */

  const currentYear =
    document.getElementById(
      "currentYear"
    );


  if (currentYear) {
    currentYear.textContent =
      String(
        new Date().getFullYear()
      );
  }


  /* Existing features */

  setupCountdown();

  setupMusic();


  /* New features */

  setupEnvelope();

  setupSecret();

  setupLastThing();

});


/* ==========================================
   COUNTDOWN
========================================== */

function setupCountdown() {

  const days =
    document.getElementById("days");

  const hours =
    document.getElementById("hours");

  const minutes =
    document.getElementById("minutes");

  const seconds =
    document.getElementById("seconds");

  const yearsTogether =
    document.getElementById(
      "yearsTogether"
    );


  if (
    !days ||
    !hours ||
    !minutes ||
    !seconds
  ) {
    return;
  }


  const startDate =
    new Date(
      2021,
      0,
      22
    );


  const update = () => {

    const now =
      new Date();


    let nextAnniversary =
      new Date(
        now.getFullYear(),
        0,
        22,
        0,
        0,
        0
      );


    if (
      nextAnniversary <= now
    ) {

      nextAnniversary =
        new Date(
          now.getFullYear() + 1,
          0,
          22,
          0,
          0,
          0
        );

    }


    const timeLeft =
      Math.max(
        0,
        nextAnniversary.getTime()
        -
        now.getTime()
      );


    const totalSeconds =
      Math.floor(
        timeLeft / 1000
      );


    const remainingDays =
      Math.floor(
        totalSeconds / 86400
      );


    const remainingHours =
      Math.floor(
        (totalSeconds % 86400)
        / 3600
      );


    const remainingMinutes =
      Math.floor(
        (totalSeconds % 3600)
        / 60
      );


    const remainingSeconds =
      totalSeconds % 60;


    days.textContent =
      String(
        remainingDays
      ).padStart(
        3,
        "0"
      );


    hours.textContent =
      String(
        remainingHours
      ).padStart(
        2,
        "0"
      );


    minutes.textContent =
      String(
        remainingMinutes
      ).padStart(
        2,
        "0"
      );


    seconds.textContent =
      String(
        remainingSeconds
      ).padStart(
        2,
        "0"
      );


    if (yearsTogether) {

      const completedYears =
        now.getFullYear()
        -
        startDate.getFullYear()
        -
        (
          now <
          new Date(
            now.getFullYear(),
            0,
            22
          )
            ? 1
            : 0
        );


      yearsTogether.textContent =
        `${completedYears} beautiful years together`;

    }

  };


  update();


  window.setInterval(
    update,
    1000
  );

}


/* ==========================================
   MUSIC
========================================== */

function setupMusic() {

  const music =
    document.getElementById(
      "bgMusic"
    );

  const musicButton =
    document.getElementById(
      "musicButton"
    );


  if (
    !music ||
    !musicButton
  ) {
    return;
  }


  const showPaused = () => {

    musicButton.textContent =
      "♫ Play our song";

    musicButton.setAttribute(
      "aria-pressed",
      "false"
    );

  };


  const showPlaying = () => {

    musicButton.textContent =
      "❚❚ Pause our song";

    musicButton.setAttribute(
      "aria-pressed",
      "true"
    );

  };


  musicButton.addEventListener(
    "click",
    async () => {

      if (!music.paused) {

        music.pause();

        return;

      }


      try {

        const source = music.querySelector("source[src]");
        if (!source || !source.getAttribute("src")) {
          musicButton.textContent = "♫ Add song.mp3 first";
          return;
        }

        await music.play();

      } catch {

        musicButton.textContent =
          "Unable to play song";

        musicButton.setAttribute(
          "aria-pressed",
          "false"
        );

      }

    }
  );


  music.addEventListener(
    "play",
    showPlaying
  );


  music.addEventListener(
    "pause",
    showPaused
  );


  music.addEventListener(
    "ended",
    showPaused
  );

}


/* ==========================================
   INTERACTIVE ENVELOPE
========================================== */

function setupEnvelope() {

  const envelope =
    document.getElementById(
      "loveEnvelope"
    );

  const closeButton =
    document.getElementById(
      "envelopeClose"
    );

  const envelopeArea =
    document.querySelector(
      ".envelope-area"
    );


  if (
    !envelope ||
    !envelopeArea
  ) {
    return;
  }


  /* Open */

  envelope.addEventListener(
    "click",
    () => {

      const isOpen =
        envelope.classList.contains(
          "open"
        );


      if (isOpen) {
        return;
      }


      envelope.classList.add(
        "open"
      );


      envelopeArea.classList.add(
        "open"
      );


      envelope.setAttribute(
        "aria-expanded",
        "true"
      );

    }
  );


  /* Close */

  closeButton?.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      envelope.classList.remove(
        "open"
      );


      envelopeArea.classList.remove(
        "open"
      );


      envelope.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );

}


/* ==========================================
   SECRET MESSAGE
========================================== */

function setupSecret() {

  const secretCard =
    document.getElementById(
      "secretCard"
    );


  if (!secretCard) {
    return;
  }


  secretCard.addEventListener(
    "click",
    () => {

      const revealed =
        secretCard.classList.toggle(
          "revealed"
        );


      secretCard.setAttribute(
        "aria-expanded",
        String(revealed)
      );

    }
  );

}


/* ==========================================
   ONE LAST THING
========================================== */

function setupLastThing() {

  const lastThingButton =
    document.getElementById(
      "lastThingButton"
    );

  const finalReveal =
    document.getElementById(
      "finalReveal"
    );


  if (
    !lastThingButton ||
    !finalReveal
  ) {
    return;
  }


  lastThingButton.addEventListener(
    "click",
    () => {

      const revealed =
        finalReveal.classList.toggle(
          "revealed"
        );


      lastThingButton.setAttribute(
        "aria-expanded",
        String(revealed)
      );


      finalReveal.setAttribute(
        "aria-hidden",
        String(!revealed)
      );


      if (revealed) {

        window.setTimeout(
          () => {

            finalReveal.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          },
          250
        );

      }

    }
  );

}


/* ==========================================
   THEME BUTTON
========================================== */

function updateThemeButton(button) {

  if (!button) {
    return;
  }


  const isLight =
    document.body.classList.contains(
      "light-theme"
    );


  button.textContent =
    isLight
      ? "🌙"
      : "☀️";


  button.setAttribute(
    "aria-label",
    isLight
      ? "Switch to dark theme"
      : "Switch to light theme"
  );

}


/* ==========================================
   SAFE LOCAL STORAGE
========================================== */

function safeGet(key) {

  try {

    return window.localStorage.getItem(
      key
    );

  } catch {

    return null;

  }

}


function safeSet(
  key,
  value
) {

  try {

    window.localStorage.setItem(
      key,
      value
    );

  } catch {

    /* Theme still works even if
       browser storage is unavailable. */

  }

}
/* ===============================
   SCROLL PROGRESS
================================ */

const progressFill=document.querySelector(".scroll-progress-fill");

window.addEventListener("scroll",()=>{

if(!progressFill) return;

const h=document.documentElement.scrollHeight-window.innerHeight;

const progress=h>0 ? (window.scrollY/h)*100 : 0;

progressFill.style.width=progress+"%";

});
/* ===============================
   SCROLL PROGRESS
================================ */

const progressFill=document.querySelector(".scroll-progress-fill");

window.addEventListener("scroll",()=>{

if(!progressFill) return;

const h=document.documentElement.scrollHeight-window.innerHeight;

const progress=h>0 ? (window.scrollY/h)*100 : 0;

progressFill.style.width=progress+"%";

});
/* ==========================================================
   PART 1C-1
   Mood Bear + Love Popup
========================================================== */

const bearMessages = [
  "Yash is missing you ❤️",
  "Smile please 😊",
  "You are my favorite person 💖",
  "Sending unlimited hugs 🤗",
  "You look adorable today 🌸",
  "I still choose you every day ❤️",
  "You make my world brighter ✨",
  "Virtual teddy hug 🧸💕"
];

const popupMessages = [
  "🌹 You are my happy place.",
  "💖 Every moment with you is special.",
  "🥹 Thank you for being in my life.",
  "🌸 You're my sunshine.",
  "❤️ Forever starts with you.",
  "✨ You're my favorite notification.",
  "🥰 Smile! Someone loves you."
];

const bearMessage = document.getElementById("bearMessage");
const lovePopup = document.getElementById("lovePopup");
const lovePopupText = document.getElementById("lovePopupText");
const bearFace = document.querySelector(".bear-face");

function randomItem(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

/* Change teddy message */

function updateBearMessage(){

  if(!bearMessage) return;

  bearMessage.textContent = randomItem(bearMessages);

}

setInterval(updateBearMessage,5000);

/* Click teddy */

if(bearFace){

  bearFace.addEventListener("click",()=>{

      updateBearMessage();

      bearFace.animate([
        {transform:"scale(1) rotate(0deg)"},
        {transform:"scale(1.2) rotate(-12deg)"},
        {transform:"scale(1) rotate(0deg)"}
      ],{
        duration:600
      });

  });

}

/* Floating popup */

function showLovePopup(){

   if(!lovePopup) return;

   lovePopupText.textContent =
      randomItem(popupMessages);

   lovePopup.classList.add("show");

   setTimeout(()=>{

      lovePopup.classList.remove("show");

   },3500);

}

/* First popup */

setTimeout(showLovePopup,2500);

/* Repeat every 20 sec */

setInterval(showLovePopup,20000);
/* ==========================================================
   PART 1C-2
   Love Prediction + Funny Button
========================================================== */

const predictions = [

"💖 Today is perfect for a warm hug.",
"🌹 Someone is thinking about you right now.",
"🥰 Unlimited love detected.",
"🍫 Chocolate date loading...",
"🎬 Movie night is coming soon.",
"💍 Your love story keeps getting stronger.",
"✨ Happiness is closer than you think.",
"❤️ Today you'll receive extra love."

];

const funnyReplies = [

"😂 Oops! I told you not to click!",
"🙈 Curiosity level: 100%",
"🥹 You're officially the cutest girlfriend.",
"😎 Mission Failed Successfully!",
"❤️ System Error: Too much cuteness detected.",
"🤭 Secret unlocked: You belong to Yash.",
"💘 Achievement Unlocked: Heart Thief."

];

const predictionBtn =
document.getElementById("predictionBtn");

const predictionResult =
document.getElementById("predictionResult");

const funnyBtn =
document.getElementById("funnyBtn");

const funnyResult =
document.getElementById("funnyResult");

/* Random helper */

function getRandom(arr){

return arr[
Math.floor(Math.random()*arr.length)
];

}

/* Love Prediction */

if(predictionBtn){

predictionBtn.addEventListener("click",()=>{

predictionResult.innerHTML=getRandom(predictions);

predictionResult.animate(

[
{opacity:0,transform:"translateY(20px)"},
{opacity:1,transform:"translateY(0px)"}
],

{
duration:500,
fill:"forwards"
}

);

});

}

/* Funny Button */

if(funnyBtn){

funnyBtn.addEventListener("click",()=>{

funnyResult.innerHTML=getRandom(funnyReplies);

funnyBtn.animate(

[
{transform:"rotate(0deg) scale(1)"},
{transform:"rotate(-8deg) scale(1.12)"},
{transform:"rotate(8deg) scale(.95)"},
{transform:"rotate(0deg) scale(1)"}
],

{

duration:700

}

);

});

}

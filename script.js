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
 " Play our song";

 musicButton.setAttribute(
 "aria-pressed",
 "false"
 );

 };


 const showPlaying = () => {

 musicButton.textContent =
 " Pause our song";

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
 musicButton.textContent = " Add song.mp3 first";
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


 button.innerHTML = isLight
 ? `<svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.6 8.6 0 1 0 20.5 15.2Z"/></svg>`
 : `<svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>`;


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
/* ==========================================================
 PART 1C-1
 Mood Bear + Love Popup
========================================================== */

const bearMessages = [
 "Yash is missing you ",
 "Smile please ",
 "You are my favorite person ",
 "Sending unlimited hugs ",
 "You look adorable today ",
 "I still choose you every day ",
 "You make my world brighter ",
 "Virtual teddy hug "
];

const popupMessages = [
 " You are my happy place.",
 " Every moment with you is special.",
 " Thank you for being in my life.",
 " You're my sunshine.",
 " Forever starts with you.",
 " You're my favorite notification.",
 " Smile! Someone loves you."
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

" Today is perfect for a warm hug.",
" Someone is thinking about you right now.",
" Unlimited love detected.",
" Chocolate date loading...",
" Movie night is coming soon.",
" Your love story keeps getting stronger.",
" Happiness is closer than you think.",
" Today you'll receive extra love."

];

const funnyReplies = [

" Oops! I told you not to click!",
" Curiosity level: 100%",
" You're officially the cutest girlfriend.",
" Mission Failed Successfully!",
" System Error: Too much cuteness detected.",
" Secret unlocked: You belong to Yash.",
" Achievement Unlocked: Heart Thief."

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
/* ==========================================================
 PART 1C-3
 Love Meter Animation
========================================================== */

const meterBtn = document.getElementById("meterBtn");
const meterFill = document.getElementById("loveMeterFill");
const lovePercent = document.getElementById("lovePercent");

function animateLoveMeter(){

 if(!meterFill || !lovePercent) return;

 meterFill.classList.add("active");

 let value = 0;

 const timer = setInterval(()=>{

 value++;

 meterFill.style.width = value + "%";
 lovePercent.textContent = value + "% ";

 if(value >= 100){

 clearInterval(timer);

 lovePercent.innerHTML =
 "∞% Unlimited Love";

 meterFill.style.width = "100%";

 meterFill.animate([
 {transform:"scaleX(1)"},
 {transform:"scaleX(1.02)"},
 {transform:"scaleX(1)"}
 ],{
 duration:800,
 iterations:2
 });

 setTimeout(()=>{

 showLovePopup();

 },500);

 }

 },25);

}

if(meterBtn){

 meterBtn.addEventListener("click",()=>{

 meterFill.style.width="0%";
 lovePercent.textContent="0%";

 animateLoveMeter();

 });

}

/* ==========================================
 Small Entrance Animation
========================================== */

window.addEventListener("load",()=>{

 const cards=document.querySelectorAll(
 ".prediction-section,.funny-section,.love-meter-section"
 );

 cards.forEach((card,index)=>{

 card.animate([

 {
 opacity:0,
 transform:"translateY(40px)"
 },

 {
 opacity:1,
 transform:"translateY(0)"
 }

 ],{

 duration:700,
 delay:index*180,
 fill:"forwards",
 easing:"ease-out"

 });

 });

});
/* ==========================================================
 PART 2C
 Virtual Pet + Gift Box + Kiss Counter
========================================================== */

/* ---------- Virtual Pet ---------- */

const petBtn = document.getElementById("petBtn");
const petText = document.getElementById("petText");
const petEmoji = document.getElementById("petEmoji");

const petMessages = [
 " Purr... I love you!",
 " Thank you for the pet!",
 " Can I get another hug?",
 " You're my favorite human!",
 " Meow... you're so sweet!",
 " I will always stay with you!"
];

if (petBtn) {

 petBtn.addEventListener("click", () => {

 petText.textContent =
 petMessages[
 Math.floor(Math.random() * petMessages.length)
 ];

 petEmoji.animate([
 { transform: "scale(1)" },
 { transform: "scale(1.25)" },
 { transform: "scale(1)" }
 ], {
 duration: 500
 });

 });

}

/* ---------- Gift Box ---------- */

const giftBtn = document.getElementById("giftBtn");
const giftBox = document.getElementById("giftBox");
const giftText = document.getElementById("giftText");

const gifts = [
 " A Beautiful Rose",
 " Chocolate Box",
 " Cute Teddy",
 " Virtual Ring",
 " Love Letter",
 " Movie Date Coupon",
 " Pizza Date",
 " Unlimited Hugs"
];

if (giftBtn) {

 giftBtn.addEventListener("click", () => {

 giftText.textContent =
 gifts[Math.floor(Math.random() * gifts.length)];

 giftBox.animate([
 { transform: "rotate(0deg)" },
 { transform: "rotate(-12deg)" },
 { transform: "rotate(12deg)" },
 { transform: "rotate(0deg)" }
 ], {
 duration: 700
 });

 });

}

/* ---------- Kiss Counter ---------- */

const kissBtn = document.getElementById("kissBtn");
const kissCount = document.getElementById("kissCount");

let totalKisses = 0;

if (kissBtn) {

 kissBtn.addEventListener("click", () => {

 totalKisses++;

 kissCount.textContent =
 totalKisses + " ";

 kissCount.animate([
 { transform: "scale(1)" },
 { transform: "scale(1.25)" },
 { transform: "scale(1)" }
 ], {
 duration: 300
 });

 });

}
/* ======================================================
 PART 3C - SPIN THE LOVE WHEEL
====================================================== */

const spinBtn = document.getElementById("spinWheelBtn");
const loveWheel = document.getElementById("loveWheel");
const wheelResult = document.getElementById("wheelResult");

const wheelRewards = [

" You won a Beautiful Rose",
" Chocolate Date",
" Teddy Hug",
" Movie Night",
" Pizza Treat",
" Promise Ring",
" Love Letter",
" Unlimited Hugs"

];

let spinning = false;

if(spinBtn){

spinBtn.addEventListener("click",()=>{

if(spinning) return;

spinning=true;

const reward =
wheelRewards[
Math.floor(Math.random()*wheelRewards.length)
];

const rotate =
3600 + Math.floor(Math.random()*720);

loveWheel.style.transform =
`rotate(${rotate}deg)`;

setTimeout(()=>{

wheelResult.innerHTML=
` ${reward}`;

loveWheel.animate([

{transform:"scale(1)"},

{transform:"scale(1.08)"},

{transform:"scale(1)"}

],{

duration:600

});

spinning=false;

},4000);

});

}
/* ======================================================
 PART 4C - Catch Hearts Game
====================================================== */

const startHeartGame =
document.getElementById("startHeartGame");

const heartGameArea =
document.getElementById("heartGameArea");

const heartScore =
document.getElementById("heartScore");

const heartTime =
document.getElementById("heartTime");

let score = 0;
let timeLeft = 30;
let gameRunning = false;

let spawnInterval;
let timerInterval;

function createHeart(){

 if(!gameRunning) return;

 const heart =
 document.createElement("div");

 heart.className="falling-heart";

 heart.innerHTML="";

 heart.style.left=
 Math.random()*90+"%";

 heart.style.animationDuration=
 (2+Math.random()*2)+"s";

 heartGameArea.appendChild(heart);

 heart.onclick=function(){

 score++;

 heartScore.innerHTML=score;

 heart.animate([

 {
 transform:"scale(1)"
 },

 {
 transform:"scale(1.6)"
 },

 {
 transform:"scale(0)"
 }

 ],{

 duration:250

 });

 heart.remove();

 };

 setTimeout(()=>{

 heart.remove();

 },4500);

}

function startGame(){

 if(gameRunning) return;

 gameRunning=true;

 score=0;
 timeLeft=30;

 heartScore.innerHTML=0;
 heartTime.innerHTML=30;

 spawnInterval=
 setInterval(createHeart,500);

 timerInterval=
 setInterval(()=>{

 timeLeft--;

 heartTime.innerHTML=timeLeft;

 if(timeLeft<=0){

 endGame();

 }

 },1000);

}

function endGame(){

 gameRunning=false;

 clearInterval(spawnInterval);

 clearInterval(timerInterval);

 alert(
` Game Over!

 Hearts Collected : ${score}

${
score>=40
?
" Amazing! You're the Love Champion!"
:
score>=20
?
" Great Job!"
:
" Try Again!"
}`
);

}

if(startHeartGame){

startHeartGame.onclick=startGame;

}

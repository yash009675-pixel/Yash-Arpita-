"use strict";

const scenes = Array.from(document.querySelectorAll(".scene"));
let currentScene = 0;
let playing = false;
let timer = null;
let speed = 1;
let volume = 0.28;
let audioContext = null;
let masterGain = null;
let ambientNodes = [];

const sceneNames = [
 "Opening",
 "2021 — The Beginning",
 "2022 — Something More",
 "Interlude — The Funny Part",
 "Our Little Movie Moment",
 "2023 — More Memories",
 "2024 — Part of My Life",
 "The Purple Chapter",
 "2025 — Another Chapter",
 "2026 — Still Us",
 "Still Choosing You",
 "A Letter From Yash",
 "The Beginning Continues"
];

function showScene(index) {
 if (!scenes.length) return;
 currentScene = Math.max(0, Math.min(index, scenes.length - 1));
 scenes.forEach((scene, i) => scene.classList.toggle("active", i === currentScene));
 updateControls();
}

function nextScene() {
 if (currentScene < scenes.length - 1) {
 showScene(currentScene + 1);
 } else {
 stopMovie();
 }
}

function previousScene() {
 if (currentScene > 0) showScene(currentScene - 1);
}

function continueMovie() {
 nextScene();
}

function restartMovie() {
 stopMovie();
 showScene(0);
 window.scrollTo({ top: 0, behavior: "smooth" });
}

function scheduleNext() {
 clearTimeout(timer);
 if (!playing) return;
 const duration = 6500 / speed;
 timer = setTimeout(() => {
 if (currentScene < scenes.length - 1) {
 nextScene();
 scheduleNext();
 } else {
 stopMovie();
 }
 }, duration);
}

function startMovie() {
 playing = true;
 ensureAmbient();
 setAmbient(true);
 updatePlayButton();
 scheduleNext();
}

function stopMovie() {
 playing = false;
 clearTimeout(timer);
 setAmbient(false);
 updatePlayButton();
}

function toggleMovie() {
 playing ? stopMovie() : startMovie();
}

function updatePlayButton() {
 const button = document.getElementById("moviePlay");
 if (!button) return;
 button.textContent = playing ? "Ⅱ" : "▶";
 button.setAttribute("aria-label", playing ? "Pause movie" : "Play movie");
 button.title = playing ? "Pause movie" : "Play movie";
}

function updateControls() {
 const progress = document.getElementById("movieProgress");
 const label = document.getElementById("movieSceneLabel");
 const count = document.getElementById("movieSceneCount");
 const pct = ((currentScene + 1) / scenes.length) * 100;
 if (progress) progress.style.width = `${pct}%`;
 if (label) label.textContent = sceneNames[currentScene] || `Scene ${currentScene + 1}`;
 if (count) count.textContent = `${String(currentScene + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
 if (playing) scheduleNext();
}

function createSvg(kind) {
 if (kind === "moon") {
 return `<svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.6 8.6 0 1 0 20.5 15.2Z"/></svg>`;
 }
 return `<svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>`;
}

function setupTheme() {
 const button = document.getElementById("movieThemeButton");
 const icon = document.getElementById("movieThemeIcon");
 const saved = localStorage.getItem("love-site-theme");
 if (saved === "light") document.body.classList.add("light-theme");

 const update = () => {
 const light = document.body.classList.contains("light-theme");
 if (icon) icon.innerHTML = createSvg(light ? "moon" : "sun");
 if (button) {
 button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
 button.title = light ? "Switch to dark theme" : "Switch to light theme";
 }
 };

 update();
 button?.addEventListener("click", () => {
 document.body.classList.toggle("light-theme");
 localStorage.setItem("love-site-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
 update();
 });
}

/* A very soft optional ambient tone so the Netflix-style sound control actually has a job. */
function ensureAmbient() {
 if (audioContext) return;
 const AudioCtx = window.AudioContext || window.webkitAudioContext;
 if (!AudioCtx) return;
 audioContext = new AudioCtx();
 masterGain = audioContext.createGain();
 masterGain.gain.value = volume;
 masterGain.connect(audioContext.destination);

 [110, 164.81].forEach((frequency, index) => {
 const osc = audioContext.createOscillator();
 const gain = audioContext.createGain();
 osc.type = "sine";
 osc.frequency.value = frequency;
 gain.gain.value = index === 0 ? 0.018 : 0.010;
 osc.connect(gain).connect(masterGain);
 osc.start();
 ambientNodes.push({ osc, gain });
 });
}

function setAmbient(active) {
 if (!masterGain || !audioContext) return;
 const target = active ? volume : 0;
 masterGain.gain.cancelScheduledValues(audioContext.currentTime);
 masterGain.gain.linearRampToValueAtTime(target, audioContext.currentTime + 0.35);
}

function setVolume(value) {
 volume = Number(value);
 if (masterGain && audioContext) masterGain.gain.value = playing ? volume : 0;
}

function toggleMute() {
 const input = document.getElementById("movieVolume");
 if (!input) return;
 if (Number(input.value) > 0) {
 input.dataset.previous = input.value;
 input.value = "0";
 } else {
 input.value = input.dataset.previous || "0.28";
 }
 setVolume(input.value);
 const button = document.getElementById("movieMute");
 if (button) button.textContent = Number(input.value) === 0 ? "×" : "";
}

function setupControls() {
 document.getElementById("moviePlay")?.addEventListener("click", toggleMovie);
 document.getElementById("movieNext")?.addEventListener("click", nextScene);
 document.getElementById("moviePrev")?.addEventListener("click", previousScene);
 document.getElementById("movieMute")?.addEventListener("click", toggleMute);
 document.getElementById("movieVolume")?.addEventListener("input", (event) => setVolume(event.target.value));
 document.getElementById("movieSpeed")?.addEventListener("change", (event) => {
 speed = Number(event.target.value) || 1;
 if (playing) scheduleNext();
 });
}

document.addEventListener("keydown", (event) => {
 if (event.key === "ArrowRight") nextScene();
 if (event.key === "ArrowLeft") previousScene();
 if (event.code === "Space" && !/input|select|button/i.test(event.target.tagName)) {
 event.preventDefault();
 toggleMovie();
 }
});

showScene(0);
setupTheme();
setupControls();
updatePlayButton();

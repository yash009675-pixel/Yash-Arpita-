"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movie = document.getElementById("movie");
  const scenes = [...document.querySelectorAll(".scene")];
  const fill = document.getElementById("progressFill");
  const dots = document.getElementById("progressDots");
  const label = document.getElementById("sceneLabel");
  const pause = document.getElementById("pauseMovie");
  const prev = document.getElementById("prevScene");
  const next = document.getElementById("nextScene");
  const start = document.querySelector("[data-start]");
  const replay = document.getElementById("replay");
  const skip = document.getElementById("skipIntro");
  const tapNext = document.getElementById("tapNext");
  const exit = document.getElementById("exitMovie");

  if (!scenes.length) return;

  let index = 0;
  let playing = false;
  let started = false;
  let raf = 0;
  let startedAt = 0;
  let elapsedBeforePause = 0;

  const durations = scenes.map(scene => Number(scene.dataset.duration) || 6500);
  const totalDuration = durations.reduce((a, b) => a + b, 0);

  scenes.forEach((_, i) => {
    const dot = document.createElement("i");
    dot.setAttribute("aria-hidden", "true");
    dot.addEventListener("click", () => goTo(i, true));
    dots.appendChild(dot);
  });

  function render() {
    scenes.forEach((scene, i) => scene.classList.toggle("active", i === index));
    [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === index));
    label.textContent = `${String(index + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
    skip.style.display = index === 0 ? "block" : "none";
    if (index === scenes.length - 1) tapNext.style.display = "none";
    else tapNext.style.display = started ? "block" : "none";
  }

  function setProgress(ms) {
    const before = durations.slice(0, index).reduce((a, b) => a + b, 0);
    const current = Math.min(ms, durations[index]);
    fill.style.width = `${((before + current) / totalDuration) * 100}%`;
  }

  function stopTimer() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function tick(now) {
    if (!playing) return;
    const current = elapsedBeforePause + (now - startedAt);
    setProgress(current);
    if (current >= durations[index]) {
      if (index < scenes.length - 1) {
        index += 1;
        elapsedBeforePause = 0;
        startedAt = performance.now();
        render();
      } else {
        playing = false;
        elapsedBeforePause = durations[index];
        pause.textContent = "▶";
        pause.setAttribute("aria-label", "Replay movie");
        setProgress(durations[index]);
        return;
      }
    }
    raf = requestAnimationFrame(tick);
  }

  function play() {
    if (index === scenes.length - 1 && elapsedBeforePause >= durations[index]) {
      index = 0;
      elapsedBeforePause = 0;
      render();
    }
    playing = true;
    started = true;
    movie.classList.add("user-started");
    startedAt = performance.now();
    pause.textContent = "Ⅱ";
    pause.setAttribute("aria-label", "Pause movie");
    stopTimer();
    raf = requestAnimationFrame(tick);
  }

  function pauseMovie() {
    if (!playing) return play();
    elapsedBeforePause += performance.now() - startedAt;
    playing = false;
    stopTimer();
    pause.textContent = "▶";
    pause.setAttribute("aria-label", "Play movie");
    setProgress(elapsedBeforePause);
  }

  function goTo(target, autoplay = false) {
    index = Math.max(0, Math.min(target, scenes.length - 1));
    elapsedBeforePause = 0;
    render();
    if (autoplay) play();
    else {
      playing = false;
      stopTimer();
      pause.textContent = "▶";
      setProgress(0);
    }
  }

  start.addEventListener("click", play);
  replay.addEventListener("click", () => goTo(0, true));
  pause.addEventListener("click", pauseMovie);
  prev.addEventListener("click", () => goTo(index - 1, started));
  next.addEventListener("click", () => goTo(index + 1, started));
  tapNext.addEventListener("click", () => goTo(index + 1, true));
  skip.addEventListener("click", () => goTo(1, true));
  exit.addEventListener("click", () => { window.location.href = "index.html"; });

  document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") goTo(index + 1, started);
    if (event.key === "ArrowLeft") goTo(index - 1, started);
    if (event.code === "Space") { event.preventDefault(); pauseMovie(); }
    if (event.key === "Escape") window.location.href = "index.html";
  });

  render();
  setProgress(0);
});

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* Theme */
  const themeButton = document.getElementById("themeButton");
  const themeIcon = document.getElementById("themeIcon");
  const savedTheme = localStorage.getItem("story-theme");

  if (savedTheme === "light") body.classList.add("light-theme");

  function updateThemeButton() {
    if (!themeButton || !themeIcon) return;
    const light = body.classList.contains("light-theme");
    themeIcon.textContent = light ? "🌙" : "☀️";
    themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    themeButton.setAttribute("title", light ? "Switch to dark theme" : "Switch to light theme");
  }

  updateThemeButton();

  themeButton?.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    localStorage.setItem("story-theme", body.classList.contains("light-theme") ? "light" : "dark");
    updateThemeButton();
  });

  /* Scroll hint */
  const scrollHint = document.getElementById("scrollHint");
  const timeline = document.getElementById("timeline");

  scrollHint?.addEventListener("click", () => {
    timeline?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Memory dialog */
  const dialog = document.getElementById("memoryDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogMessage = document.getElementById("dialogMessage");
  const dialogClose = document.getElementById("dialogClose");

  document.querySelectorAll(".memory-box").forEach((card) => {
    card.addEventListener("click", () => {
      if (!dialog || !dialogTitle || !dialogMessage) return;

      dialogTitle.textContent = card.dataset.title || "A beautiful memory";
      dialogMessage.textContent = card.dataset.message || "Every moment with you is precious.";

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
  });

  dialogClose?.addEventListener("click", () => {
    if (typeof dialog?.close === "function") dialog.close();
    else dialog?.removeAttribute("open");
  });

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  });

  /* Intro */
  const intro = document.getElementById("storyIntro");
  intro?.addEventListener("animationend", () => intro.remove(), { once: true });

  /* Current year */
  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  /* Premium atmosphere */
  const fireflies = document.querySelector(".fireflies");
  if (fireflies) {
    for (let i = 0; i < 25; i++) {
      const dot = document.createElement("span");
      dot.className = "firefly";
      dot.style.left = Math.random() * 100 + "vw";
      dot.style.animationDuration = 10 + Math.random() * 10 + "s";
      dot.style.animationDelay = Math.random() * 10 + "s";
      fireflies.appendChild(dot);
    }
  }

  const shootingLayer = document.querySelector(".shooting-stars");
  function createStar() {
    if (!shootingLayer) return;

    const star = document.createElement("span");
    star.className = "shooting-star";
    star.style.top = Math.random() * 40 + "vh";
    star.style.left = (80 + Math.random() * 20) + "vw";
    star.title = "Make a Wish ❤️";

    star.addEventListener("click", () => {
      star.style.boxShadow = "0 0 40px #ffffff";
      star.style.transform += " scale(1.3)";
      setTimeout(() => star.remove(), 300);
    });

    shootingLayer.appendChild(star);
    setTimeout(() => star.remove(), 1500);
  }
  if (shootingLayer) setInterval(createStar, 9000);

  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    document.addEventListener("mousemove", (event) => {
      glow.style.opacity = "1";
      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
    });
    document.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });
  }

  const petals = document.querySelector(".petals");
  function createPetal() {
    if (!petals) return;

    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 8 + Math.random() * 8 + "s";
    petals.appendChild(petal);
    setTimeout(() => petal.remove(), 16000);
  }
  if (petals) setInterval(createPetal, 2200);

  /* Rotating love quotes */
  const quoteBox = document.querySelector(".love-quotes");
  const quotes = [
    "Every love story is beautiful, but ours is my favorite ❤️",
    "You are my today and all of my tomorrows ❤️",
    "In every lifetime, I'd still choose you ❤️",
    "Together is my favorite place to be ❤️"
  ];
  let quoteIndex = 0;

  function showQuote() {
    if (!quoteBox) return;

    quoteBox.textContent = quotes[quoteIndex];
    quoteBox.style.opacity = "1";
    quoteBox.style.transform = "translateY(0)";

    setTimeout(() => {
      if (!quoteBox) return;
      quoteBox.style.opacity = "0";
      quoteBox.style.transform = "translateY(20px)";
    }, 6000);

    quoteIndex = (quoteIndex + 1) % quotes.length;
  }

  if (quoteBox) {
    showQuote();
    setInterval(showQuote, 9000);
  }

  /* Reveal animation */
  const revealItems = document.querySelectorAll(".timeline-card,.glass-card,.memory-card,.section");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    }, { threshold: .2 });

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("active"));
  }

  /* Memory spotlight */
  const viewer = document.getElementById("memoryViewer");
  const viewerImg = document.getElementById("memoryImage");
  const viewerTitle = document.getElementById("memoryTitle");
  const viewerText = document.getElementById("memoryText");
  const viewerClose = document.getElementById("memoryClose");

  window.openMemory = function (img, title, text) {
    if (!viewer) return;

    if (viewerImg) {
      viewerImg.src = img;
      viewerImg.alt = title || "Memory";
    }
    if (viewerTitle) viewerTitle.textContent = title || "";
    if (viewerText) viewerText.textContent = text || "";

    viewer.classList.add("active");
    viewer.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  };

  function closeMemory() {
    if (!viewer) return;
    viewer.classList.remove("active");
    viewer.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  }

  viewerClose?.addEventListener("click", closeMemory);
  viewer?.addEventListener("click", (event) => {
    if (event.target === viewer) closeMemory();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (viewer?.classList.contains("active")) closeMemory();
      if (dialog?.open) dialog.close();
    }
  });

  /* Time machine */
  document.querySelectorAll(".time-machine button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
});

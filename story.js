"use strict";

/* =====================================
   STORY PAGE — SAFE INTERACTIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeButton = document.getElementById("themeButton");
  const themeIcon = document.getElementById("themeIcon");
  const savedTheme = localStorage.getItem("love-site-theme");

  if (savedTheme === "light") body.classList.add("light-theme");

  function updateTheme() {
    const light = body.classList.contains("light-theme");
    if (themeIcon) themeIcon.textContent = light ? "🌙" : "☀️";
    if (themeButton) {
      themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      themeButton.setAttribute("title", light ? "Switch to dark theme" : "Switch to light theme");
    }
  }

  updateTheme();
  themeButton?.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    localStorage.setItem("love-site-theme", body.classList.contains("light-theme") ? "light" : "dark");
    updateTheme();
  });

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const scrollHint = document.getElementById("scrollHint");
  const timeline = document.getElementById("timeline");
  scrollHint?.addEventListener("click", () => {
    timeline?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll(".time-machine button[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  const dialog = document.getElementById("memoryDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogMessage = document.getElementById("dialogMessage");
  const dialogClose = document.getElementById("dialogClose");

  function openDialog(title, message) {
    if (!dialog || !dialogTitle || !dialogMessage) return;
    dialogTitle.textContent = title;
    dialogMessage.textContent = message;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  document.querySelectorAll(".story-card").forEach((card) => {
    card.setAttribute("tabindex", "0");
    const title = card.querySelector("h2")?.textContent?.replace(/\s+/g, " ").trim() || "A beautiful memory";
    const text = [...card.querySelectorAll(".story-content p:not(.story-date)")]
      .map((p) => p.textContent.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" ");

    const open = () => openDialog(title, text || "Every moment with you is precious.");
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  dialogClose?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog?.open) dialog.close();
  });

  const intro = document.getElementById("storyIntro");
  if (intro) {
    window.setTimeout(() => intro.classList.add("is-hidden"), 1800);
    window.setTimeout(() => intro.remove(), 2400);
  }

  setupAtmosphere();
  setupScrollReveal();
});

function setupAtmosphere() {
  const fireflies = document.querySelector(".fireflies");
  if (fireflies && !fireflies.children.length) {
    for (let i = 0; i < 25; i++) {
      const dot = document.createElement("span");
      dot.className = "firefly";
      dot.style.left = `${Math.random() * 100}vw`;
      dot.style.animationDuration = `${10 + Math.random() * 10}s`;
      dot.style.animationDelay = `${Math.random() * 10}s`;
      fireflies.appendChild(dot);
    }
  }

  const shootingLayer = document.querySelector(".shooting-stars");
  if (shootingLayer) {
    const createStar = () => {
      const star = document.createElement("span");
      star.className = "shooting-star";
      star.style.top = `${Math.random() * 40}vh`;
      star.style.left = `${80 + Math.random() * 20}vw`;
      star.title = "Make a Wish ❤️";
      shootingLayer.appendChild(star);
      window.setTimeout(() => star.remove(), 1500);
    };
    window.setInterval(createStar, 9000);
  }

  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    document.addEventListener("mousemove", (event) => {
      glow.style.opacity = "1";
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });
    document.addEventListener("mouseleave", () => { glow.style.opacity = "0"; });
  }

  const petals = document.querySelector(".petals");
  if (petals) {
    const createPetal = () => {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${8 + Math.random() * 8}s`;
      petals.appendChild(petal);
      window.setTimeout(() => petal.remove(), 16000);
    };
    window.setInterval(createPetal, 2200);
  }

  const quoteBox = document.querySelector(".love-quotes");
  if (quoteBox) {
    const quotes = [
      "Every love story is beautiful, but ours is my favorite ❤️",
      "You are my today and all of my tomorrows ❤️",
      "In every lifetime, I'd still choose you ❤️",
      "Together is my favorite place to be ❤️"
    ];
    let index = 0;
    const showQuote = () => {
      quoteBox.textContent = quotes[index];
      quoteBox.style.opacity = "1";
      quoteBox.style.transform = "translateY(0)";
      window.setTimeout(() => {
        quoteBox.style.opacity = "0";
        quoteBox.style.transform = "translateY(20px)";
      }, 6000);
      index = (index + 1) % quotes.length;
    };
    showQuote();
    window.setInterval(showQuote, 9000);
  }
}

function setupScrollReveal() {
  const items = document.querySelectorAll(".timeline-card,.glass-card,.memory-card,.section");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("active"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
}

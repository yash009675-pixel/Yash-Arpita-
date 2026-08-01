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

    const open = () => openDialog(title, text || "Every moment is precious.");
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

  setupScrollReveal();
});

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

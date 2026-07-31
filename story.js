"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     CURRENT YEAR
  ====================================== */

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      String(new Date().getFullYear());
  }


  /* =====================================
     DAY / NIGHT THEME
  ====================================== */

  const themeButton =
    document.getElementById("themeButton");

  const themeIcon =
    document.getElementById("themeIcon");

  const savedTheme =
    localStorage.getItem("story-theme");

  function updateThemeButton() {

    const lightMode =
      document.body.classList.contains("light-theme");

    if (!themeButton || !themeIcon) {
      return;
    }

    if (lightMode) {

      themeIcon.textContent = "🌙";

      themeButton.setAttribute(
        "aria-label",
        "Switch to dark theme"
      );

      themeButton.setAttribute(
        "title",
        "Switch to dark theme"
      );

    } else {

      themeIcon.textContent = "☀️";

      themeButton.setAttribute(
        "aria-label",
        "Switch to light theme"
      );

      themeButton.setAttribute(
        "title",
        "Switch to light theme"
      );
    }
  }


  /* Restore saved theme */

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  updateThemeButton();


  /* Theme button click */

  themeButton?.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light-theme"
      );

      const isLight =
        document.body.classList.contains(
          "light-theme"
        );

      localStorage.setItem(
        "story-theme",
        isLight ? "light" : "dark"
      );

      updateThemeButton();
    }
  );


  /* =====================================
     SCROLL SLOWLY BUTTON
  ====================================== */

  const scrollHint =
    document.getElementById("scrollHint");

  const timeline =
    document.getElementById("timeline");

  scrollHint?.addEventListener(
    "click",
    () => {

      timeline?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );


  /* =====================================
     MEMORY DIALOG
  ====================================== */

  const dialog =
    document.getElementById("memoryDialog");

  const dialogTitle =
    document.getElementById("dialogTitle");

  const dialogMessage =
    document.getElementById("dialogMessage");

  const dialogClose =
    document.getElementById("dialogClose");


  /* =====================================
     MEMORY CARDS
  ====================================== */

  document
    .querySelectorAll(".memory-box")
    .forEach((card) => {

      card.addEventListener(
        "click",
        () => {

          if (
            !dialog ||
            !dialogTitle ||
            !dialogMessage
          ) {
            return;
          }

          const title =
            card.dataset.title ||
            "A beautiful memory";

          const message =
            card.dataset.message ||
            "Every moment with you is precious.";

          dialogTitle.textContent =
            title;

          dialogMessage.textContent =
            message;

          openDialog(dialog);

        }
      );

    });


  /* =====================================
     CLOSE DIALOG
  ====================================== */

  dialogClose?.addEventListener(
    "click",
    () => {

      dialog?.close();

    }
  );


  /* =====================================
     CLICK OUTSIDE DIALOG
  ====================================== */

  dialog?.addEventListener(
    "click",
    (event) => {

      if (event.target === dialog) {
        dialog.close();
      }

    }
  );


  /* =====================================
     ESCAPE KEY
  ====================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        dialog?.open
      ) {
        dialog.close();
      }

    }
  );


  /* =====================================
     INTRO CLEANUP
  ====================================== */

  const intro =
    document.getElementById("storyIntro");

  if (intro) {

    intro.addEventListener(
      "animationend",
      () => {
        intro.remove();
      },
      { once: true }
    );

  }

});


/* =====================================
   OPEN DIALOG
===================================== */

function openDialog(dialog) {

  if (!dialog) {
    return;
  }

  if (
    typeof dialog.showModal ===
    "function"
  ) {

    dialog.showModal();

  } else {

    dialog.setAttribute(
      "open",
      ""
    );

  }

}
/*====================================
PREMIUM ATMOSPHERE
====================================*/

const fireflies=document.querySelector(".fireflies");

for(let i=0;i<25;i++){

const dot=document.createElement("span");

dot.className="firefly";

dot.style.left=Math.random()*100+"vw";

dot.style.animationDuration=

10+Math.random()*10+"s";

dot.style.animationDelay=

Math.random()*10+"s";

fireflies.appendChild(dot);

}

const shootingLayer=document.querySelector(".shooting-stars");

function createStar(){

const star=document.createElement("span");

star.className="shooting-star";

star.style.top=Math.random()*40+"vh";

star.style.left=(80+Math.random()*20)+"vw";

shootingLayer.appendChild(star);

setTimeout(()=>{

star.remove();

},1500);

}

setInterval(createStar,9000);
/*=========================
CURSOR GLOW
=========================*/

const glow=document.querySelector(".cursor-glow");

document.addEventListener("mousemove",e=>{

glow.style.opacity="1";

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

document.addEventListener("mouseleave",()=>{

glow.style.opacity="0";

});
/*=========================
ROSE PETALS
=========================*/

const petals=document.querySelector(".petals");

function createPetal(){

const p=document.createElement("span");

p.className="petal";

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=

8+Math.random()*8+"s";

petals.appendChild(p);

setTimeout(()=>{

p.remove();

},16000);

}

setInterval(createPetal,2200);

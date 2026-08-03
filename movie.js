const scenes =
  document.querySelectorAll(".scene");

let currentScene = 0;

function showScene(index){

  scenes.forEach((scene, i) => {

    scene.classList.toggle(
      "active",
      i === index
    );

  });

}

function nextScene(){

  if(currentScene < scenes.length - 1){

    currentScene++;

    showScene(currentScene);

  }

}

function restartMovie(){

  currentScene = 0;

  showScene(currentScene);

}

document.addEventListener(
  "keydown",
  function(event){

    if(
      event.key === "ArrowRight" ||
      event.key === "Enter"
    ){

      nextScene();

    }

    if(event.key === "ArrowLeft"){

      if(currentScene > 0){

        currentScene--;

        showScene(currentScene);

      }

    }

  }
);

showScene(0);
/* ==========================================
   🎬 CONTINUE OUR MOVIE
========================================== */

function continueMovie() {

  const button = document.querySelector(".continue-movie-btn");

  if (button) {
    button.innerHTML = "🎬 Loading...";
    button.disabled = true;
  }

  const movieMoment = document.getElementById("cuteMovieMoment");

  if (movieMoment) {
    movieMoment.style.transition = "opacity .5s ease";
    movieMoment.style.opacity = "0";

    setTimeout(() => {

      const nextSection =
        movieMoment.nextElementSibling;

      if (nextSection) {

        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      } else {

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });

      }

      movieMoment.style.opacity = "1";

      if (button) {
        button.innerHTML = "▶ Continue Our Movie";
        button.disabled = false;
      }

    }, 500);
  }
}

const scenes = document.querySelectorAll(".scene");
let currentScene = 0;

function showScene(index) {
  if (!scenes.length) return;
  scenes.forEach((scene, i) => {
    scene.classList.toggle("active", i === index);
  });
  currentScene = index;
}

function nextScene() {
  if (currentScene < scenes.length - 1) {
    showScene(currentScene + 1);
  }
}

function restartMovie() {
  showScene(0);
}

function continueMovie() {
  nextScene();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "Enter") nextScene();
  if (event.key === "ArrowLeft" && currentScene > 0) showScene(currentScene - 1);
});

showScene(0);

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

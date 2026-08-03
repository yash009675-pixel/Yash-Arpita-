"use strict";

function revealReason(card){

  card.classList.toggle("revealed");

}


function showFunny(button, person){

  const result = document.getElementById("funnyResult");

  if(person === "Yash"){

    result.innerHTML =
      "Interesting answer... Yash has been added to the investigation. 😂";

  }

  else if(person === "Arpita"){

    result.innerHTML =
      "The court has received a very convincing answer. 👀😂";

  }

  else{

    result.innerHTML =
      "<strong>Both.</strong> Case closed. 😂❤️";

  }

}


function lying(index){

  const result = document.getElementById("lyingResult");

  if(index === 0){

    result.innerHTML =
      "<strong>Guilty! 😂</strong><br>Food evidence is overwhelming.";

  }

  else{

    result.innerHTML =
      "Suspicious... but we need more evidence. 🕵️😂";

  }

}


function lastBite(person){

  const result = document.getElementById("biteResult");

  if(person === "Arpita"){

    result.innerHTML =
      "<strong>Correct answer. ❤️</strong><br>Arpita gets the last bite anyway. 😂";

  }

  else if(person === "Yash"){

    result.innerHTML =
      "Bold choice. Please prepare your defense. 😂";

  }

  else{

    result.innerHTML =
      "Diplomatic solution. The United Nations approves. 😂🤝";

  }

}


/* Smooth navigation */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if(!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

});

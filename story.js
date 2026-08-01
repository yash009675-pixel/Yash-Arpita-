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


/* =====================================
   GAMES HUB
===================================== */

(() => {
  const modal = document.getElementById("gameModal");
  const body = document.getElementById("gameBody");
  const cards = document.querySelectorAll(".game-card");
  const completedEl = document.getElementById("gamesCompleted");

  if (!modal || !body || !cards.length) return;

  let completed = Number(localStorage.getItem("yaGamesCompleted") || 0);
  if (completedEl) completedEl.textContent = completed;

  const completeGame = () => {
    completed += 1;
    localStorage.setItem("yaGamesCompleted", String(completed));
    if (completedEl) completedEl.textContent = completed;
  };

  const openGame = (name) => {
    const games = {
      quiz: renderQuiz,
      puzzle: renderPuzzle,
      matching: renderMatching,
      year: renderYear,
      bingo: renderBingo,
      dice: renderDice,
      scramble: renderScramble,
      unlock: renderUnlock,
      hidden: renderHidden,
      challenge: renderChallenge
    };

    if (!games[name]) return;
    body.innerHTML = "";
    games[name]();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeGame = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-game-close]").forEach(el => {
    el.addEventListener("click", closeGame);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeGame();
  });

  cards.forEach(card => {
    card.addEventListener("click", () => openGame(card.dataset.game));
  });

  const shell = (title, subtitle) => {
    body.innerHTML = `
      <h2 class="game-title">${title}</h2>
      <p class="game-subtitle">${subtitle}</p>
    `;
  };

  function renderQuiz() {
    shell("How Well Do You Know Us? 🧠", "Four questions. No pressure — just memories.");
    const questions = [
      {
        q:"What year does our story begin?",
        options:["2020","2021","2022","2023"],
        answer:"2021"
      },
      {
        q:"What is the exact beginning date shown in our story?",
        options:["22 January 2021","14 February 2021","22 January 2022","1 January 2021"],
        answer:"22 January 2021"
      },
      {
        q:"How many years are currently shown on our timeline?",
        options:["4","5","6","7"],
        answer:"6"
      },
      {
        q:"Which is the latest year on our timeline?",
        options:["2024","2025","2026","2027"],
        answer:"2026"
      }
    ];

    let index=0, score=0;
    const render=()=>{
      if(index>=questions.length){
        completeGame();
        body.innerHTML=`
          <h2 class="game-title">Quiz complete ❤️</h2>
          <p class="game-subtitle">Your score is ${score}/${questions.length}.</p>
          <div class="game-result">${score===questions.length ? "Perfect memory. You know this story by heart. ✨" : "Every answer is another little memory. ❤️"}</div>
          <button class="game-action" data-retry>Play Again</button>`;
        body.querySelector("[data-retry]").onclick=renderQuiz;
        return;
      }
      const item=questions[index];
      body.innerHTML=`
        <h2 class="game-title">How Well Do You Know Us? 🧠</h2>
        <p class="game-subtitle">Question ${index+1} of ${questions.length}</p>
        <div class="game-question"><strong>${item.q}</strong></div>
        <div class="game-options">${item.options.map(o=>`<button class="game-option" data-answer="${o}">${o}</button>`).join("")}</div>`;
      body.querySelectorAll("[data-answer]").forEach(btn=>{
        btn.onclick=()=>{
          if(btn.dataset.answer===item.answer) score++;
          index++;
          render();
        };
      });
    };
    render();
  }

  function renderPuzzle() {
    shell("Memory Puzzle 🧩","Click two tiles to swap them. Rebuild the photo.");
    const order=[0,1,2,3,4,5,6,7,8];
    let first=null, moves=0;
    const board=document.createElement("div");
    board.className="game-puzzle";
    body.appendChild(board);
    const result=document.createElement("div");
    result.className="game-result";
    body.appendChild(result);

    const draw=()=>{
      board.innerHTML="";
      order.forEach((pos,i)=>{
        const tile=document.createElement("button");
        tile.className="puzzle-tile";
        tile.style.backgroundPosition=`${(pos%3)*50}% ${Math.floor(pos/3)*50}%`;
        tile.setAttribute("aria-label",`Puzzle tile ${i+1}`);
        if(first===i) tile.classList.add("selected");
        tile.onclick=()=>{
          if(first===null){ first=i; draw(); return; }
          if(first===i){ first=null; draw(); return; }
          [order[first],order[i]]=[order[i],order[first]];
          first=null;
          moves++;
          draw();
          if(order.every((v,i)=>v===i)){
            completeGame();
            result.innerHTML=`<strong>Memory restored! ❤️</strong><br>Completed in ${moves} moves.`;
          }
        };
        board.appendChild(tile);
      });
    };
    // Shuffle while guaranteeing the starting board is not already solved.
    for(let i=order.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [order[i],order[j]]=[order[j],order[i]];
    }
    if(order.every((v,i)=>v===i)) [order[0],order[1]]=[order[1],order[0]];
    draw();
  }

  function renderMatching() {
    shell("Memory Matching 💝","Find all eight matching pairs.");
    const symbols=["❤️","📸","💌","✨","🌙","🎵","🫶","💍"];
    const deck=[...symbols,...symbols].sort(()=>Math.random()-.5);
    const grid=document.createElement("div");
    grid.className="match-grid";
    body.appendChild(grid);
    const status=document.createElement("div");
    status.className="game-result";
    body.appendChild(status);
    let open=[], matched=0, locked=false;

    deck.forEach((symbol,i)=>{
      const btn=document.createElement("button");
      btn.className="match-card";
      btn.textContent="?";
      btn.dataset.index=i;
      btn.dataset.symbol=symbol;
      btn.onclick=()=>{
        if(locked || btn.classList.contains("matched") || open.includes(i)) return;
        btn.classList.add("flipped");
        btn.textContent=symbol;
        open.push(i);
        if(open.length===2){
          locked=true;
          const [a,b]=open;
          const ca=grid.children[a], cb=grid.children[b];
          if(deck[a]===deck[b]){
            ca.classList.add("matched"); cb.classList.add("matched");
            matched++;
            open=[]; locked=false;
            status.textContent=`${matched}/8 pairs found`;
            if(matched===8){
              completeGame();
              status.innerHTML="<strong>All memories matched! ❤️</strong>";
            }
          }else{
            setTimeout(()=>{
              ca.classList.remove("flipped"); cb.classList.remove("flipped");
              ca.textContent="?"; cb.textContent="?";
              open=[]; locked=false;
            },650);
          }
        }
      };
      grid.appendChild(btn);
    });
    status.textContent="0/8 pairs found";
  }

  function renderYear() {
    shell("Guess the Year 📅","Place each story milestone in the correct year.");
    const rounds=[
      {text:"The beginning of our story.", answer:"2021"},
      {text:"The next chapter after 2024.", answer:"2025"},
      {text:"The latest chapter on the timeline.", answer:"2026"}
    ];
    let i=0, score=0;
    const render=()=>{
      if(i===rounds.length){
        completeGame();
        body.innerHTML=`<h2 class="game-title">Timeline complete 📅</h2>
          <p class="game-subtitle">Score: ${score}/${rounds.length}</p>
          <div class="game-result">The years are all in their place. ❤️</div>
          <button class="game-action" data-retry>Play Again</button>`;
        body.querySelector("[data-retry]").onclick=renderYear;
        return;
      }
      const r=rounds[i];
      body.innerHTML=`<h2 class="game-title">Guess the Year 📅</h2>
        <p class="game-subtitle">Round ${i+1} of ${rounds.length}</p>
        <div class="game-question"><strong>${r.text}</strong></div>
        <div class="game-options">${["2021","2022","2023","2024","2025","2026"].map(y=>`<button class="game-option" data-y="${y}">${y}</button>`).join("")}</div>`;
      body.querySelectorAll("[data-y]").forEach(btn=>btn.onclick=()=>{
        if(btn.dataset.y===r.answer) score++;
        i++; render();
      });
    };
    render();
  }

  function renderBingo() {
    shell("Love Bingo ❤️","Tap the memories that feel true for your story. Complete any row.");
    const items=[
      "A first memory","A favorite photo","A special date",
      "A funny moment","A long conversation","A song",
      "A little surprise","A place to remember","A future plan"
    ];
    const grid=document.createElement("div");
    grid.className="bingo-grid";
    body.appendChild(grid);
    const status=document.createElement("div");
    status.className="game-result";
    body.appendChild(status);
    items.forEach(text=>{
      const b=document.createElement("button");
      b.className="bingo-cell"; b.textContent=text;
      b.onclick=()=>{b.classList.toggle("done"); check();};
      grid.appendChild(b);
    });
    const check=()=>{
      const cells=[...grid.children];
      const done=cells.map(x=>x.classList.contains("done"));
      const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      if(lines.some(line=>line.every(i=>done[i]))){
        status.innerHTML="<strong>Bingo! 🏆❤️</strong> You completed a memory line.";
        if(!grid.dataset.completed){ grid.dataset.completed="1"; completeGame(); }
      }else{
        status.textContent=`${done.filter(Boolean).length}/9 memories selected`;
      }
    };
    status.textContent="0/9 memories selected";
  }

  function renderDice() {
    shell("Roll the Memory 🎲","Roll once and let the timeline choose your memory.");
    const years=["2021","2022","2023","2024","2025","2026"];
    const count=document.createElement("div");
    count.className="challenge-count";
    count.textContent="🎲";
    body.appendChild(count);
    const result=document.createElement("div");
    result.className="game-result";
    result.textContent="Ready?";
    body.appendChild(result);
    const btn=document.createElement("button");
    btn.className="game-action"; btn.textContent="Roll the Memory";
    body.appendChild(btn);
    btn.onclick=()=>{
      const year=years[Math.floor(Math.random()*years.length)];
      count.textContent=year;
      result.innerHTML=`Your memory year is <strong>${year}</strong>. ❤️`;
      if(!btn.dataset.done){btn.dataset.done="1"; completeGame();}
    };
  }

  function renderScramble() {
    shell("Word Scramble 🔤","Unscramble the word before revealing the answer.");
    const words=["ARPITA","YASH","MEMORY","STORY","TOGETHER","LOVE"];
    const answer=words[Math.floor(Math.random()*words.length)];
    const scrambled=answer.split("").sort(()=>Math.random()-.5).join("");
    body.innerHTML+=`<div class="scramble-word">${scrambled}</div>
      <input id="scrambleInput" class="game-option" style="box-sizing:border-box;text-transform:uppercase" maxlength="${answer.length}" placeholder="Type your answer">
      <button class="game-action" id="scrambleCheck">Check Answer</button>
      <div class="game-result" id="scrambleResult"></div>`;
    document.getElementById("scrambleCheck").onclick=()=>{
      const value=document.getElementById("scrambleInput").value.trim().toUpperCase();
      const out=document.getElementById("scrambleResult");
      if(value===answer){
        completeGame();
        out.innerHTML="<strong>Correct! 🎉</strong> You unscrambled it.";
      }else out.textContent="Not quite. Try again.";
    };
  }

  function renderUnlock() {
    shell("Unlock the Memory 🔐","The code is hidden in the beginning of our story.");
    body.innerHTML+=`<div class="game-question"><strong>Hint:</strong> Use the year our story began.</div>
      <input id="unlockInput" class="game-option" style="box-sizing:border-box" inputmode="numeric" maxlength="4" placeholder="Enter 4-digit code">
      <button class="game-action" id="unlockCheck">Unlock</button>
      <div class="game-result" id="unlockResult"></div>`;
    document.getElementById("unlockCheck").onclick=()=>{
      const out=document.getElementById("unlockResult");
      if(document.getElementById("unlockInput").value.trim()==="2021"){
        completeGame();
        out.innerHTML="<strong>Unlocked! 🔓❤️</strong><br>The first page of the story is 22 January 2021.";
      }else out.textContent="That code didn't unlock it. Look at the beginning of the timeline.";
    };
  }

  function renderHidden() {
    shell("Find the Hidden Heart 🕵️","One square hides the heart. Find it.");
    const board=document.createElement("div");
    board.className="hidden-board";
    body.appendChild(board);
    const result=document.createElement("div");
    result.className="game-result";
    result.textContent="0/1 found";
    body.appendChild(result);
    const target=Math.floor(Math.random()*25);
    for(let i=0;i<25;i++){
      const b=document.createElement("button");
      b.className="hidden-cell"; b.textContent="❤️";
      b.onclick=()=>{
        if(i===target){
          b.classList.add("found");
          result.innerHTML="<strong>Found it! ❤️</strong>";
          if(!board.dataset.done){board.dataset.done="1";completeGame();}
        }else{
          b.textContent="×";
          setTimeout(()=>{b.textContent="❤️";},400);
        }
      };
      board.appendChild(b);
    }
  }

  function renderChallenge() {
    shell("Memory Challenge ⏱️","Look at the photo for 5 seconds. Then answer one question.");
    body.innerHTML+=`<img class="memory-preview" src="photo1.jpg" alt="Memory challenge photo">
      <div class="challenge-count" id="challengeCount">5</div>
      <div class="game-result" id="challengeStatus">Remember the image...</div>`;
    let n=5;
    const timer=setInterval(()=>{
      n--;
      const el=document.getElementById("challengeCount");
      if(el) el.textContent=n;
      if(n<=0){
        clearInterval(timer);
        const img=document.querySelector(".memory-preview");
        if(img) img.style.visibility="hidden";
        const status=document.getElementById("challengeStatus");
        status.innerHTML=`<strong>What did you notice first?</strong>
          <div class="game-options" style="margin-top:12px">
            <button class="game-option" data-ch="photo">The photo</button>
            <button class="game-option" data-ch="details">The little details</button>
            <button class="game-option" data-ch="everything">Everything ❤️</button>
          </div>`;
        status.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>{
          completeGame();
          status.innerHTML="<strong>Challenge complete! ❤️</strong> The best memories are the ones you notice.";
        });
      }
    },1000);
  }
})();

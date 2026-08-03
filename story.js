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
    if (themeIcon) themeIcon.textContent = light ? "◑" : "◐";
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
    body.innerHTML+=`<img class="memory-preview" src="photo-placeholder.svg" alt="Memory challenge photo">
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


/* =====================================
   SPECIAL MOMENTS + FUN ZONE
   Safe: isolated from the existing games/timeline code.
===================================== */
(() => {
  const init = () => {
    const modal=document.getElementById('specialModal'), body=document.getElementById('specialBody');
    if(!modal||!body)return;
    const close=()=>{modal.classList.remove('active');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    document.querySelectorAll('[data-special-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('active'))close();});
    const shell=(t,s)=>{body.innerHTML=`<h2 class="special-title" id="specialTitle">${t}</h2><p class="special-subtitle">${s}</p>`;};
    const show=(type)=>{
      body.innerHTML='';
      const f={tell,reasons,ending,before,never,remember,changed,choose,thanks,more,lying,court,reply,bite,fight,champion,sentence,emergency,mood}[type];
      if(f)f(); modal.classList.add('active');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
    };
    document.querySelectorAll('[data-special]').forEach(x=>x.addEventListener('click',()=>show(x.dataset.special)));

    function tell(){shell('If I Could Tell You One Thing... ❤️','Some things are too important to leave unsaid.');body.innerHTML+=`<div class="special-message">If I could tell you just one thing, it would be this:<br><br><strong>You make ordinary moments feel like memories worth keeping.</strong><br><br>Through every year, every laugh, every little disagreement and every beautiful day, I am grateful that our story kept becoming <em>our</em> story.<br><br>And if I ever forget to say it out loud... I hope you always know it. ❤️</div>`;}
    function reasons(){shell('Reasons I Love You 💎','Open the cards one by one.');const a=[['Your smile','It can change the whole mood of a day.'],['Your heart','You care in ways that are easy to remember.'],['Your patience','Even when I probably deserve a little less of it. 😂'],['Your craziness','Because life with you is never boring.'],['Your presence','You make normal days feel special.'],['The little things','Tiny moments often mean the most.'],['The way you understand','Sometimes you know before I finish speaking.'],['Simply you','No complicated reason. I just love you. ❤️']];const g=document.createElement('div');g.className='special-reasons';a.forEach(([t,m])=>{const b=document.createElement('button');b.className='reason-card';b.innerHTML=`<strong>${t}</strong><small>Tap to reveal...</small>`;b.onclick=()=>{b.classList.add('revealed');b.innerHTML=`<strong>${t}</strong><small>${m}</small>`};g.appendChild(b)});body.appendChild(g);}
    function ending(){shell('Final Cinematic Ending 🎬','For the last scene, slow down and let the story speak.');body.innerHTML+=`<div class="cinematic-stage"><div class="cinematic-content"><div class="cinematic-line" data-line>6 years.</div><div class="cinematic-line" data-line>Hundreds of memories.</div><div class="cinematic-line" data-line>Countless smiles.</div><div class="cinematic-line" data-line>And still...</div><div class="cinematic-final" data-final>This is only the beginning. ❤️</div><div class="cinematic-heart" data-heart>♥</div></div></div>`;const ls=[...body.querySelectorAll('[data-line]')];ls.forEach((x,i)=>setTimeout(()=>x.classList.add('show'),600+i*1100));setTimeout(()=>{body.querySelector('[data-final]').classList.add('show');body.querySelector('[data-heart]').classList.add('show')},600+ls.length*1100);}
    function before(){shell('Before You Go... 🫶','One more thing before you leave.');body.innerHTML+=`<div class="special-message special-center">Do not just remember the big days.<br><br>Remember the random laughs, silly conversations, comfortable silence, and tiny moments nobody else noticed.<br><br><strong>Those are the moments I would choose again. ❤️</strong></div>`;}
    function never(){shell('Things I Never Said 💭','A few thoughts that deserve their own little space.');const a=['I notice more of the little things you do than I probably say.','Some of my favorite memories are the ones that were never planned.','You became part of my idea of what home feels like.','I hope we never become too busy to make new silly memories.','There are still so many chapters I want to write with you.'];body.innerHTML+=`<div class="special-message special-center" id="neverText">${a[0]}</div><button class="special-action" id="neverNext">Tell me another</button>`;let i=0;document.getElementById('neverNext').onclick=()=>{i=(i+1)%a.length;document.getElementById('neverText').textContent=a[i]};}
    function remember(){shell('Do You Remember? 🥹','A tiny clue can bring back a whole chapter.');body.innerHTML+=`<div class="special-message special-center"><strong>22 January 2021</strong><br><br>A date on a screen became the beginning of a story.<br><br>And somehow, one beginning turned into six years of memories. ❤️</div>`;}
    function changed(){shell('You Changed My Life ✨','Three little chapters.');body.innerHTML+=`<div class="special-message"><strong>Before you...</strong><br>Life was just life.<br><br><strong>Then you came along...</strong><br>Ordinary days started collecting memories.<br><br><strong>Now...</strong><br>I look forward to the next chapter with you. ❤️</div>`;}
    function choose(){shell('If I Had To Choose Again ♾️','Imagine we could go right back to the beginning.');body.innerHTML+=`<div class="special-message special-center">Different year.<br>Different day.<br>Different circumstances.<br><br><strong>My answer would still be you.</strong><br><br>Every time. ❤️</div>`;}
    function thanks(){shell('Thank You For... 🫂','For the things you did, said, and simply were.');const a=['Thank you for staying.','Thank you for understanding.','Thank you for making me laugh.','Thank you for the patience.','Thank you for the memories.','Thank you for being you.'];body.innerHTML+=`<div class="special-message special-center" id="thanksText">${a[0]}</div><button class="special-action" id="thanksNext">Next</button>`;let i=0;document.getElementById('thanksNext').onclick=()=>{i++;if(i<a.length)document.getElementById('thanksText').textContent=a[i];else{document.getElementById('thanksText').innerHTML='<strong>Thank you for being part of my life. ❤️</strong>';document.getElementById('thanksNext').style.display='none'}};}
    function game(title,sub,q,opts,res){shell(title,sub);body.innerHTML+=`<div class="special-message"><strong>${q}</strong><div class="special-options">${opts.map((x,i)=>`<button class="special-option" data-o="${i}">${x}</button>`).join('')}</div><div class="special-result" id="sr">Choose wisely... 😂</div></div>`;body.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>document.getElementById('sr').innerHTML=res[+b.dataset.o]);}
    function more(){game('Who Is More...? 🏆','The official couple investigation begins.','Who is more likely to say “I am not angry” while clearly being angry? 😂',['Yash 😇','Arpita 😇','Both 😂'],['Interesting evidence. 😂','The court has received a convincing answer. ❤️','Case closed: both are professionals. 😂❤️']);}
    function lying(){shell('Who Is Lying? 🤥','Three statements. One suspicious one.');const a=['I never steal your food. 🍕','I do not get jealous. 👀','I always reply quickly. 📱'];body.innerHTML+=`<div class="special-message"><strong>Which sounds most suspicious?</strong><div class="special-options">${a.map((x,i)=>`<button class="special-option" data-l="${i}">${x}</button>`).join('')}</div><div class="special-result" id="lr">Your investigation starts now. 🕵️</div></div>`;body.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>document.getElementById('lr').innerHTML=(+b.dataset.l===0?'<strong>Guilty! 😂</strong> The food evidence is overwhelming.':'Suspicious... but we need more evidence. 😂'));}
    function court(){shell('Our Relationship Court ⚖️','The court is now in session.');body.innerHTML+=`<div class="invoice"><div class="invoice-row"><span>Case</span><strong>Who started the last fight?</strong></div><div class="invoice-row"><span>Evidence</span><strong>Insufficient 😂</strong></div><div class="invoice-row"><span>Judge</span><strong>Destiny</strong></div><div class="invoice-row"><span>Verdict</span><strong>Both are guilty of caring too much. ❤️</strong></div><div class="invoice-total">Case dismissed. Go hug each other. 🫂</div></div>`;}
    function reply(){shell('Reply Speed Test 📱','Tap the button when the reply arrives.');body.innerHTML+=`<div class="special-message special-center"><strong id="replyState">Ready...</strong></div><button class="special-action" id="replyStart">Start Test</button>`;document.getElementById('replyStart').onclick=()=>{const st=performance.now(),b=document.getElementById('replyStart');b.disabled=true;document.getElementById('replyState').textContent='📱 Waiting...';setTimeout(()=>{const s=((performance.now()-st)/1000).toFixed(1);document.getElementById('replyState').innerHTML=`💬 Reply detected in ${s}s.<br><strong>Suspiciously fast. 😂</strong>`;b.disabled=false;b.textContent='Test Again'},900+Math.random()*1800)};}
    function bite(){game('Who Gets the Last Bite? 🍕','One slice. Two people. No mercy.','There is one slice left. Who gets it?',['Yash 🍕','Arpita 🍕','Split 50/50 🤝'],['Bold choice. Prepare your defense. 😂','Correct answer. The pizza has spoken. ❤️','Diplomatic solution. 😂']);}
    function fight(){game('Fight Simulator 😤','Choose the reason. The simulator predicts the ending.','What started the fight?',['Late reply 📱','Food disappeared 🍕','Jealousy 👀','“Nothing” 😶','Random 😂'],['3 minutes of silence → sorry → hug. ❤️','Evidence reviewed → peace restored. 😂','Long explanation → smile. ❤️','“Nothing” officially means something. 😂','Nobody knows how it started. Everyone ends up laughing. 😂❤️']);}
    function champion(){game('Who Remembers Better? 🧠','Let us settle this scientifically.','Pick your champion.',['Yash 🏆','Arpita 🏆','Both ❤️'],['Yash has entered the Hall of Memory. 🏆😂','Arpita has entered the Hall of Memory. 🏆😂','Correct answer. Teamwork wins. ❤️']);}
    function sentence(){game('Complete My Sentence 🎤','There is definitely a correct answer.','If Arpita gets angry, I should...',['Run 🏃','Give chocolate 🍫','Stay quiet 🤐','Say sorry ❤️'],['Excellent survival strategy. 😂','Strong answer. 🍫❤️','Risky. Very risky. 😂','The safest answer in human history. ❤️']);}
    function emergency(){game('Relationship Emergency 🚨','Emergency protocol activated.','Choose the recovery protocol.',['🍫 Send Chocolate','❤️ Say Sorry','😂 Make Her Laugh','🫂 Give a Hug'],['Chocolate protocol activated. Situation improving. 🍫','Apology protocol activated. Excellent decision. ❤️','Comedy protocol activated. Smile levels rising. 😂','Hug protocol activated. Emergency downgraded. 🫂']);}
    function mood(){shell('Random Couple Mood 🎰','Let us see what the universe says.');body.innerHTML+=`<div class="special-message special-center" id="moodResult">🎰</div><button class="special-action" id="moodBtn">Generate Our Mood</button>`;const m=['😂 80% Madness + 20% Love','❤️ Romantic Mode Activated','🍕 Both Need Food','😴 Both Need Sleep','👀 Someone Is Definitely Jealous','🫶 Soft Couple Mode','🎉 Chaos But Make It Cute','💬 Talk All Night Mode'];document.getElementById('moodBtn').onclick=()=>document.getElementById('moodResult').textContent=m[Math.floor(Math.random()*m.length)];}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

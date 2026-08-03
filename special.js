<!doctype html>
<html lang="en">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width,initial-scale=1">

 <title>Special Moments — Yash Arpita</title>
<link rel="stylesheet" href="story.css">
 <link rel="stylesheet" href="special.css">
 <link rel="stylesheet" href="site-fix.css">
</head>

<body>

<header class="story-header">
 <a href="index.html" class="story-brand" aria-label="Back to home">Y<span aria-hidden="true">&hearts;</span>A</a>
 <nav class="story-nav" aria-label="Main navigation">
 <a href="index.html" class="story-nav-link">Home</a>
 <a href="story.html" class="story-nav-link">Our Story</a>
 <a href="memories.html" class="story-nav-link">Memories</a>
 <a href="special.html" class="story-nav-link active" aria-current="page">Special</a>
 <a href="bts.html" class="story-nav-link">BTS</a>
 <button class="story-theme-button" id="themeButton" type="button" aria-label="Switch theme" title="Switch theme"><span id="themeIcon" aria-hidden="true"></span></button>
 </nav>
</header>


<main class="special-page">

<div class="special-quick-nav">

 <a href="#letters">
 Letters
 </a>

 <a href="#never-said">
 Things I Never Said
 </a>

 <a href="#one-last-thing">
 One Last Thing
 </a>

 <a href="#secret-letter">
 Secret
 </a>

 <a href="bts.html">
 BTS World
 </a>

</div> 
 <!-- INTRO -->

 <section class="special-hero">

 <p class="eyebrow">
 A little more of us
 </p>

 <h1>
 The moments
 <em>between.</em>
 </h1>

 <p>
 Some are emotional.
 Some are ridiculous.
 Some are impossible to explain.
 And that's exactly what makes them ours. 
 </p>

 </section>


 <!-- EMOTIONAL -->

 <section class="feature-section emotional-section">

 <div class="section-heading">
 <span>01</span>
 <h2> If I Could Tell You One Thing... 💌</h2>
 </div>

 <div class="feature-letter">

 <p>
 If I could tell you just one thing,
 I would tell you this:
 </p>

 <h3>
 You make ordinary moments feel like
 memories worth keeping.
 </h3>

 <p>
 Through every year, every laugh,
 every silly conversation and every
 beautiful day, I'm grateful that
 our story became <strong>our story.</strong>
 </p>

 <p>
 And if I ever forget to say it out loud...
 I hope you always know it. 
 </p>

 </div>

 </section>


 <!-- FUNNY -->

 <section class="feature-section funny-section">

 <div class="section-heading">
 <span>02</span>
 <h2> Who Is More...? 😂</h2>
 </div>

 <div class="funny-box">

 <h3>
 Who is more likely to say
 "I'm not angry"
 while clearly being angry? 
 </h3>

 <div class="choice-grid">

 <button onclick="showFunny(this,'Yash')">
 Yash 
 </button>

 <button onclick="showFunny(this,'Arpita')">
 Arpita 
 </button>

 <button onclick="showFunny(this,'Both')">
 Both 
 </button>

 </div>

 <div class="funny-result" id="funnyResult">
 Choose carefully... 
 </div>

 </div>

 </section>


 <!-- REASONS -->

 <section class="feature-section emotional-section">

 <div class="section-heading">
 <span>03</span>
 <h2> Reasons I Love You ❤️</h2>
 </div>

 <div class="reasons-grid">

 <button class="reason" onclick="revealReason(this)">
 <strong>Your Smile</strong>
 <small>Tap to reveal</small>
 <p>
 Somehow it can change the mood
 of an entire day.
 </p>
 </button>

 <button class="reason" onclick="revealReason(this)">
 <strong>Your Heart</strong>
 <small>Tap to reveal</small>
 <p>
 You care in ways that are easy
 to remember.
 </p>
 </button>

 <button class="reason" onclick="revealReason(this)">
 <strong>Your Patience</strong>
 <small>Tap to reveal</small>
 <p>
 Even when I probably deserve
 a little less of it. 
 </p>
 </button>

 <button class="reason" onclick="revealReason(this)">
 <strong>Your Craziness</strong>
 <small>Tap to reveal</small>
 <p>
 Because life with you is never boring.
 </p>
 </button>

 <button class="reason" onclick="revealReason(this)">
 <strong>The Little Things</strong>
 <small>Tap to reveal</small>
 <p>
 The smallest moments often become
 the biggest memories.
 </p>
 </button>

 <button class="reason" onclick="revealReason(this)">
 <strong>Simply You</strong>
 <small>Tap to reveal</small>
 <p>
 No complicated reason.
 I just love you. 
 </p>
 </button>

 </div>

 </section>


 <!-- FUNNY -->

 <section class="feature-section funny-section">

 <div class="section-heading">
 <span>04</span>
 <h2> Who Is Lying? 👀</h2>
 </div>

 <div class="funny-box">

 <h3>
 Which statement sounds the most suspicious?
 </h3>

 <button onclick="lying(0)">
 I never steal your food. 
 </button>

 <button onclick="lying(1)">
 I don't get jealous. 
 </button>

 <button onclick="lying(2)">
 I always reply quickly. 
 </button>

 <div class="funny-result" id="lyingResult">
 Investigation started... 
 </div>

 </div>

 </section>


 <!-- LETTERS -->

 <section class="feature-section letter-section" id="letters">

 <div class="section-heading">
 <span>05</span>
 <h2>Letters 💌</h2>
 </div>

 <div class="letter-grid">

 <a href="#one-last-thing" class="letter-card">
 <span></span>
 <strong>One Last Thing</strong>
 <small>There's something I still want to tell you.</small>
 </a>

 <a href="#secret-letter" class="letter-card">
 <span></span>
 <strong>Secret Letter</strong>
 <small>A little secret waiting for you.</small>
 </a>

 <a href="#never-said" class="letter-card">
 <span></span>
 <strong>Things I Never Said</strong>
 <small>Things that deserve to be heard.</small>
 </a>

 </div>

 </section>


 <!-- FUNNY -->

 <section class="feature-section funny-section">

 <div class="section-heading">
 <span>06</span>
 <h2> Our Relationship Court ⚖️</h2>
 </div>

 <div class="court">

 <p>CASE:</p>

 <h3>
 Who started the last fight? 
 </h3>

 <hr>

 <p>
 Evidence:
 <strong>Insufficient.</strong>
 </p>

 <p>
 Judge:
 <strong>Destiny.</strong>
 </p>

 <p>
 Verdict:
 <strong>
 Both are guilty of caring too much. 
 </strong>
 </p>

 <h3>
 Case dismissed. Go hug each other. 
 </h3>

 </div>

 </section>


 <!-- EMOTIONAL -->

 <section
 class="feature-section emotional-section"
 id="never-said"
 >

 <div class="section-heading">
 <span>07</span>
 <h2>Things I Never Said 🤍</h2>
 </div>

 <div class="big-letter">

 <p>
 I notice more of the little things
 you do than I probably say.
 </p>

 <p>
 Some of my favorite memories are
 the ones that were never planned.
 </p>

 <p>
 You became part of my idea of
 what home feels like.
 </p>

 <p>
 There are still so many chapters
 I want to write with you.
 </p>

 </div>

 </section>


 <!-- FUNNY -->

 <section class="feature-section funny-section">

 <div class="section-heading">
 <span>08</span>
 <h2> Who Gets the Last Bite? 🍕</h2>
 </div>

 <div class="funny-box">

 <h3>
 One slice. Two people.
 Very serious business. 
 </h3>

 <div class="choice-grid">

 <button onclick="lastBite('Yash')">
 Yash 
 </button>

 <button onclick="lastBite('Arpita')">
 Arpita 
 </button>

 <button onclick="lastBite('Both')">
 50/50 
 </button>

 </div>

 <div class="funny-result" id="biteResult">
 Choose wisely...
 </div>

 </div>

 </section>


 <!-- ONE LAST THING -->

 <section
 class="feature-section one-last-thing"
 id="one-last-thing"
 >

 <div class="section-heading">
 <span>09</span>
 <h2>One Last Thing... ❤️</h2>
 </div>

 <div class="final-letter">

 <p class="letter-to">
 To Arpita,
 </p>

 <p>
 Six years gave us thousands of little
 moments.
 </p>

 <p>
 Some were perfect.
 Some were funny.
 Some were difficult.
 And some were completely unexpected.
 </p>

 <p>
 But every single one became part
 of the story I wouldn't want to change.
 </p>

 <p>
 If I could go back to the beginning,
 knowing everything I know today...
 </p>

 <h3>
 I would still choose you. 
 </h3>

 <p>
 This isn't the end.
 It's just another chapter.
 </p>

 <p class="signature">
 — Yash 
 </p>

 </div>

 </section>


 <!-- SECRET -->

 <section
 class="feature-section secret-section"
 id="secret-letter"
 >

 <div class="section-heading">
 <span>10</span>
 <h2>Secret Letter 🤫</h2>
 </div>

 <div class="secret-box">

 <p>
 You found the secret.
 </p>

 <h3>
 So here's something simple:
 </h3>

 <p>
 No matter how many pages we add,
 my favourite part of this website
 will always be the person it's made for.
 </p>

 <strong>
 Borahae, Arpita. 
 </strong>

 </div>

 </section>


 <!-- LITTLE CARTOON MOMENT -->
<section class="cartoon-feature" id="cartoon-moment">
  <div class="cartoon-feature-copy">
    <p class="eyebrow">A little visual pause ✨</p>
    <h2>Our Little Cartoon Moment <span aria-hidden="true">🧸</span></h2>
    <p>
      Even the smallest moments deserve a place in our story.
      A little smile, a little chaos, and a reminder that this is still our favourite corner. ❤️
    </p>
  </div>
  <div class="cartoon-feature-art">
    <img src="assets/cute-cartoon.png" alt="Cute cartoon moment for Yash and Arpita">
  </div>
</section>


 <!-- BTS LINK -->

<section class="bts-preview">

 <p class="eyebrow">
 A special corner for her 💜
 </p>

 <h2>
 Before the final chapter...
 <br>
 let's enter <em>her world.</em>
 </h2>

 <p>
 Because every love story should have
 a little purple corner too.
 </p>

 <a
 href="bts.html"
 class="special-main-button"
 >
 Enter Arpita's BTS World
 </a>

</section>


 <!-- FINAL -->

 <section class="cinematic-ending">

 <div class="cinematic-inner">

 <p>6 years.</p>

 <p>Hundreds of memories.</p>

 <p>Countless smiles.</p>

 <p>And still...</p>

 <h2>
 This is only the beginning. 
 </h2>

 </div>

 </section>

</main>


<script src="special.js"></script>

 <script src="story.js" defer></script>

</body>
</html>

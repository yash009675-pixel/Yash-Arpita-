
/* =========================================================
   YASH × ARPITA — GLOBAL LAYOUT / NAV FIX
   Keeps navigation together and prevents sections from
   appearing on the wrong page/viewport.
========================================================= */

:root{
  --ya-nav-bg: rgba(12,7,20,.82);
  --ya-nav-line: rgba(255,255,255,.12);
  --ya-nav-text: rgba(255,255,255,.76);
  --ya-nav-active: rgba(255,255,255,.11);
}

.site-header,
.story-header{
  position: sticky !important;
  top: 0 !important;
  z-index: 1000 !important;
  min-height: 72px !important;
  padding: 10px 0 !important;
  background: linear-gradient(
    180deg,
    rgba(8,5,14,.92),
    rgba(8,5,14,.68)
  ) !important;
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
  border-bottom: 1px solid var(--ya-nav-line);
}

.site-header > *,
.story-header > *{
  position: relative;
}

.yash-nav-links,
.story-nav{
  display:flex !important;
  align-items:center !important;
  justify-content:flex-end !important;
  gap:6px !important;
  flex-wrap:nowrap !important;
  max-width:calc(100vw - 120px);
  overflow-x:auto;
  scrollbar-width:none;
}

.yash-nav-links::-webkit-scrollbar,
.story-nav::-webkit-scrollbar{
  display:none;
}

.site-nav-link,
.yash-nav-link,
.story-nav-link{
  flex:0 0 auto !important;
  white-space:nowrap !important;
}

.site-nav-link{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:36px;
  padding:8px 12px;
  border:1px solid transparent;
  border-radius:999px;
  color:var(--ya-nav-text);
  text-decoration:none;
  font-size:.73rem;
  font-weight:700;
  transition:.25s ease;
}

.site-nav-link:hover,
.site-nav-link.active,
.site-nav-link:focus-visible{
  color:#fff;
  background:var(--ya-nav-active);
  border-color:var(--ya-nav-line);
  transform:translateY(-1px);
}

.site-header .header-actions{
  min-width:0;
  display:flex;
  align-items:center;
  gap:8px;
}

.site-header .brand,
.story-header .story-brand{
  flex:0 0 auto;
}

main{
  position:relative;
  z-index:1;
}

/* Make major content blocks arrive one-by-one instead of
   collapsing/overlapping visually. */
.special-page > .feature-section,
.special-page > .special-hero,
.special-page > .cinematic-ending,
.bts-page main > section{
  scroll-margin-top:90px;
}

@media (min-width: 801px){
  .special-page > .feature-section,
  .special-page > .special-hero,
  .special-page > .cinematic-ending{
    min-height:calc(100vh - 90px);
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  .bts-page main > section{
    min-height:calc(100vh - 72px);
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  .timeline{
    gap:70px !important;
  }

  .timeline .story-card{
    min-height:calc(100vh - 110px);
    scroll-margin-top:90px;
  }
}

@media (max-width: 1100px){
  .site-header,
  .story-header{
    width:min(100% - 24px, 1120px) !important;
  }

  .site-nav-link,
  .yash-nav-link,
  .story-nav-link{
    padding-left:9px !important;
    padding-right:9px !important;
    font-size:.69rem !important;
  }
}

@media (max-width: 720px){
  .site-header,
  .story-header{
    min-height:64px !important;
    padding:7px 0 !important;
  }

  .site-header .header-actions{
    flex:1 1 auto;
    justify-content:flex-end;
  }

  .yash-nav-links,
  .story-nav{
    max-width:calc(100vw - 90px);
    gap:4px !important;
  }

  .site-nav-link,
  .yash-nav-link,
  .story-nav-link{
    min-height:32px !important;
    padding:7px 9px !important;
    font-size:.66rem !important;
  }

  .special-page > .feature-section,
  .special-page > .special-hero,
  .special-page > .cinematic-ending,
  .bts-page main > section{
    min-height:auto !important;
    padding-top:90px !important;
    padding-bottom:90px !important;
  }

  .timeline{
    gap:55px !important;
  }

  .timeline .story-card{
    min-height:auto !important;
    scroll-margin-top:75px;
  }
}

/* Home navigation: all destinations stay in the first header. */
.local-home{
  display:inline-flex !important;
}

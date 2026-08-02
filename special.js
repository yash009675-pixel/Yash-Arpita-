/* Shared layout fixes */
*{scroll-behavior:smooth}
.site-header,.story-header{position:sticky!important;top:0!important;z-index:1000!important;background:rgba(8,5,14,.88)!important;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.10)}
.yash-nav-links,.story-nav{display:flex!important;align-items:center!important;gap:6px!important;flex-wrap:nowrap!important;overflow-x:auto!important;scrollbar-width:none}
.yash-nav-links::-webkit-scrollbar,.story-nav::-webkit-scrollbar{display:none}
.yash-nav-link,.story-nav-link{flex:0 0 auto!important;white-space:nowrap!important;text-decoration:none!important}
.timeline .story-card,.feature-section,.special-hero,.cinematic-ending{scroll-margin-top:90px}
@media(max-width:720px){.site-header,.story-header{padding:7px 10px!important}.yash-nav-links,.story-nav{max-width:calc(100vw - 75px)!important}.yash-nav-link,.story-nav-link{padding:7px 9px!important;font-size:.68rem!important}}

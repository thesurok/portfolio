---
title: Reel Room
slug: reel-room
summary: A reel and spin study. Three strips, a timed stop, and a single line check.
role: Reel system, timing, and UI
year: 2026
tech:
  - pixi
  - gsap
  - spine
tags:
  - casino-style
featured: false
order: 4
build:
  path: builds/reel-room/index.html
  orientation: portrait
  fpsTarget: 60
  loadTimeMs: 400
poster: ../../assets/posters/reel-room.png
highlights:
  - Three reels with staggered stops
  - Symbol strips drawn as shapes, not branded art
  - A center line check after the reels settle
challenges:
  - problem: A linear spin reads as a blur, not a reel.
    solution: Each reel eases out on its own clock so the stops land in sequence.
  - problem: Symbol art from a client often cannot be shown.
    solution: The study uses geometric symbols so the timing can be reviewed without the original assets.
---

Production reels of this kind sit in PixiJS, with GSAP or Spine on the symbols. This build is the mechanic only: spin, ease, stop, check the line.

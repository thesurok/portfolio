---
title: Driftline
slug: driftline
summary: A one-touch runner. Jump, read the gap, and keep the horizon moving.
role: Gameplay and scene motion
year: 2025
tech:
  - pixi
  - gsap
tags:
  - runner
featured: true
published: false
order: 2
build:
  path: builds/driftline/index.html
  orientation: landscape
  fpsTarget: 60
  loadTimeMs: 300
poster: ../../assets/posters/driftline.png
highlights:
  - One input, jump only
  - Parallax layers that stay cheap
  - Speed ramps without sudden difficulty spikes
challenges:
  - problem: A scrolling scene easily becomes fill-rate bound on mobile.
    solution: The ground and far hills are a few shapes, not a texture stack.
  - problem: Hitboxes that match the art feel unfair at speed.
    solution: The collision box is inset from the drawn body so near-misses survive.
---

Runners like this ship as PixiJS scenes. The embed is a single-file study of the jump, the scroll, and the fail state.

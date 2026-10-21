---
title: Signal Bloom
slug: signal-bloom
summary: A particle field that follows the pointer. Built as a cheap fullscreen pass.
role: Particles and shaders
year: 2026
tech:
  - three
  - webgl
tags:
  - 3d
featured: true
order: 6
build:
  path: builds/signal-bloom/index.html
  orientation: landscape
  fpsTarget: 60
  loadTimeMs: 500
poster: ../../assets/posters/signal-bloom.png
highlights:
  - Point sprites, not individual DOM nodes
  - Pointer attraction without a physics library
  - Motion pauses when reduced-motion is requested
challenges:
  - problem: Thousands of sprites upload too much data every frame.
    solution: Positions are computed in the vertex shader from an id and the time uniform.
  - problem: A full-bleed effect fights the page around it.
    solution: It only runs inside the device frame, and it is not created until Play.
---

Particle scenes like this are usually Three.js. The embed is a raw WebGL point field of the same idea, so the page does not have to ship a 3D runtime.

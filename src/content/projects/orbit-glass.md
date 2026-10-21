---
title: Orbit Glass
slug: orbit-glass
summary: A lit object study. One form, two lights, and a shader that stays cheap on mobile GPUs.
role: Real-time 3D and shaders
year: 2026
tech:
  - three
  - webgl
tags:
  - 3d
featured: true
published: false
order: 3
build:
  path: builds/orbit-glass/index.html
  orientation: both
  fpsTarget: 60
  loadTimeMs: 500
poster: ../../assets/posters/orbit-glass.png
highlights:
  - Drag to turn the object
  - Fresnel and a simple deform, no texture fetch
  - Works in portrait and landscape
challenges:
  - problem: A pretty shader is easy to make and hard to keep under a mobile budget.
    solution: The march loop is short, and the lighting is two directional terms.
  - problem: Fullscreen WebGL canvases blow the CSS pixel size on phones.
    solution: The drawing buffer is capped at devicePixelRatio 2.
---

Scenes like this are usually a Three.js project. The embed is a raw WebGL study of the same camera and lighting idea, kept as one file so the repo stays light.

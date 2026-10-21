---
title: Kinetic Stack
slug: kinetic-stack
summary: Drop shapes and keep the stack standing. A small physics loop with a hard ceiling.
role: Physics and game feel
year: 2024
tech:
  - pixi
tags:
  - physics
  - puzzle
featured: true
published: false
order: 5
build:
  path: builds/kinetic-stack/index.html
  orientation: portrait
  fpsTarget: 60
  loadTimeMs: 400
poster: ../../assets/posters/kinetic-stack.png
highlights:
  - Tap to drop a body at that x
  - Circle collisions against the floor and each other
  - The run ends when the stack reaches the top
challenges:
  - problem: Naive collision resolution jitters when bodies overlap.
    solution: Overlaps are separated along the contact normal and the vertical speed is killed on the floor.
  - problem: A tall stack gets expensive if every pair is tested forever.
    solution: The study caps the body count, which is also the fail state.
---

The production version of a toy like this is a PixiJS scene with a small custom solver. The embed is that solver, drawing its own circles.

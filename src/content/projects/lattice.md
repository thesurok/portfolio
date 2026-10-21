---
title: Lattice
slug: lattice
summary: A match-3 board tuned for one thumb, with cascades that stay readable on a phone.
role: Gameplay, board rendering, and juice
year: 2025
tech:
  - pixi
  - gsap
tags:
  - match-3
  - puzzle
featured: true
order: 1
build:
  path: builds/lattice/index.html
  orientation: portrait
  fpsTarget: 60
  loadTimeMs: 400
poster: ../../assets/posters/lattice.png
highlights:
  - Swap, match, and cascade on a 7 by 8 board
  - Illegal swaps return quickly so the rules stay obvious
  - Portrait layout with a 60fps target
challenges:
  - problem: A long cascade can stall the next input.
    solution: Clears are capped, and input stays locked only while tiles are still moving.
  - problem: Redrawing the whole board drops frames on low-end phones.
    solution: Only tiles that move are updated, and new tiles spawn just above the grid.
---

The production version of a board like this is a PixiJS scene, with GSAP driving the swap and the drop. This page runs a single-file study of the same rules so it can play inside the site with no asset pipeline.

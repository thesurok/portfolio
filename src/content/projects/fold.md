---
title: Fold
slug: fold
summary: A small lights puzzle. Tap a tile, flip its neighbors, clear the board.
role: Puzzle rules and UI
year: 2024
tech:
  - canvas
tags:
  - puzzle
featured: false
published: false
order: 7
build:
  path: builds/fold/index.html
  orientation: portrait
  fpsTarget: 60
  loadTimeMs: 250
poster: ../../assets/posters/fold.png
highlights:
  - Five by five board
  - Every deal is solvable
  - Clear state leads to a continue action
challenges:
  - problem: A random board can be unsolvable.
    solution: The deal starts solved and applies a handful of real moves, so a solution exists.
  - problem: Tiny tiles miss taps on a phone.
    solution: The board uses the full width, and each tile stays well above a 44px target.
---

Fold is a plain canvas puzzle, here as a lighter counterweight to the WebGL studies. The rules are the whole project.

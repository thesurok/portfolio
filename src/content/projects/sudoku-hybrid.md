---
title: Sudoku Hybrid
slug: sudoku-hybrid
summary: A logic-grid playable. Drag each fact onto the cell where it belongs.
role: Gameplay, board, and hints
year: 2026
tech:
  - pixi
tags:
  - puzzle
  - playable
featured: true
order: 3
build:
  path: builds/sudoku-hybrid/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/sudoku-hybrid.png
highlights:
  - Nine answers on a three by three grid, with row and column headers
  - Drag a word onto the cell where it belongs
  - A wrong cell flashes and counts as a miss
  - The first board is a cities grid, three countries and three facts each
  - The next board locks one cell until a neighbor is filled
  - A hint flies to an open answer and places it
challenges:
  - problem: Filling two cells beside a locked tile can start both unlock animations at once.
    solution: Unlock steps are queued, so the highlight, the chain, and the icon play one after another.
  - problem: A second hint tap can fire while the first answer is still popping into its cell.
    solution: Hints stay locked until that fill finishes.
---

This is a PixiJS playable. The file embedded here is the Unity Ads export. Store redirects stay on the download button, so the board can be played on the page.

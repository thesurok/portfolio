---
title: Mahjong Tile Tray
slug: mahjong-tile-tray
summary: A Mahjong solitaire playable. Free tiles go into a four-slot tray, and matching pairs clear.
role: Gameplay, board rules, and tray
year: 2026
tech:
  - pixi
tags:
  - puzzle
  - playable
featured: true
order: 1
build:
  path: builds/mahjong-tile-tray/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/mahjong-tile-tray.png
highlights:
  - 58 tiles on a stacked board, with a four-slot tray
  - A tile is free when nothing covers it and at least one side is open
  - Pairs clear from the tray; a full tray with no pair ends the run
  - Blocked taps shake the tile and the tiles holding it
  - Faces shuffle when the board has no match left
challenges:
  - problem: Tiles rest across two tiles below, so a square grid mis-reads what is covered.
    solution: The board is a half-tile lattice. A higher tile is covered only when all four of its half-cells are occupied.
  - problem: Clearing a pair on the landing tween drops the match when the next tile arrives early.
    solution: The tray snaps and clears pairs on its own clock, after the flight, so a fast tap cannot cancel the match.
---

This is a PixiJS playable for Mahjong Solitaire. The file embedded here is the Unity Ads export. Store redirects stay off so the board can be played on the page.

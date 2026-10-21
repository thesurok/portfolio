---
title: Splash Sort Water Guy
slug: splash-sort-water-guy
summary: A color-sort playable. Pour matching liquid between flasks, and feed the cyan into the water character.
role: Gameplay, pour rules, and the water character
year: 2026
tech:
  - pixi
tags:
  - puzzle
  - playable
featured: true
order: 2
build:
  path: builds/splash-sort-water-guy/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/splash-sort-water-guy.png
highlights:
  - Eleven flasks, four layers each, two of them empty
  - A top run of one color pours into a matching flask or an empty one
  - A finished flask seals, except the cyan one
  - Cyan pours into the water character, who fills over eleven steps
  - An idle hint points at the next pour
challenges:
  - problem: A second pour of the same color can land while the first stream is still running.
    solution: The destination counts in-flight pours and only seals, or returns to idle, when the last one finishes.
  - problem: A full single-color flask should seal, but the cyan flask still has to pour into the character.
    solution: Cyan stays open when the flask is full. A flask seals only when every cell matches and the color is not cyan.
---

This is a PixiJS playable for Splash Sort. The file embedded here is the AppLovin export. The default build does not start a store timer, so the board can be played on the page.

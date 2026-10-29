---
title: Coffee Mania
slug: coffee-mania
summary: A sort playable. Send colored trays to the counter so matching cups can fly off the belt.
role: Belt, tray placement, and cup flights
year: 2024
tech:
  - pixi
  - three
tags:
  - puzzle
  - playable
featured: true
order: 6
build:
  path: builds/coffee-mania/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/coffee-mania.png
highlights:
  - Red, pink, blue, and purple cups ride a belt. The front cup flies into a matching tray
  - Tap a tray to send it to an open slot. An upper tray blocks the one under it until it moves
  - A wide tray turns on its side as it lands
  - A full tray is boxed and slides off the counter
  - An idle hand points at a free tray that matches the front cup
  - Three boards. The store opens after the third
challenges:
  - problem: Each cup flies to its cell on its own tween while the belt steps on another clock, so the next cup leaves before the previous one has landed. The tray is already full in the logic, and the box close starts when the belt step ends, not when the cup arrives.
    solution: The cell is reserved when the flight starts, so two cups never share a hole. The box stays off the tray long enough for that flight to finish. On landing the cup is hidden for a frame, moved onto the tray, and scaled by the inverse of the tray scale. The flight ran in the belt's space, and a wide tray is smaller and turned sideways.
  - problem: The front cup can reach the counter while its tray is still sliding into a slot, or while a full tray is still leaving. A loss check at that moment ends the board in the middle of the animation.
    solution: A slot stays pending until the place tween finishes, and a full tray stays marked until the box is gone. The front cup waits and tries again once those flags clear.
---

This is a PixiJS and Three.js playable for Coffee Mania. The file embedded here is the AppLovin export from the older browserify build pipeline. Store taps stay on the download button and the end of the third board, so the belt can be played on the page.

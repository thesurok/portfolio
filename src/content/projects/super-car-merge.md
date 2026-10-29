---
title: Super Car Merge
slug: super-car-merge
summary: A merge-then-race playable. Open boxes, fuse matching parts onto the car, then hold to ride.
role: Merge board, 3D car preview, and race
year: 2023
tech:
  - pixi
  - three
tags:
  - merge
  - racing
  - playable
featured: true
order: 4
build:
  path: builds/super-car-merge/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/super-car-merge.png
highlights:
  - Tap boxes to reveal tires and body parts, then drag matching ones together
  - Each merge upgrades the 3D car on the desk behind the board
  - When tires and body both hit level one, Start Race opens
  - Hold to ride. Left and right arrows steer past traffic
  - Merge progress carries into the race car grade
challenges:
  - problem: The race has to feel contested, yet the playable must still put the player first every time.
    solution: Bots start ahead and run faster, then rubber-band. Far behind, they catch up and skip collisions. Far ahead, they ease off. Past thirty percent of the track the pack slows so the player can take the lead without the fight reading as scripted.
  - problem: A full track of roadside props, traffic cubes, and cars is too much to draw and test every frame on a phone.
    solution: Trees, rocks, rails, and signs share InstancedMesh draws. Obstacles far ahead or behind the player turn off, and hit tests only look at the nearby visible set.
---

This is a PixiJS and Three.js playable for Super Car Merge. The file embedded here is the AppLovin export from the older browserify build pipeline. Store taps stay on the download button and the end card, so the merge board and the race can be played on the page.

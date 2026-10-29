---
title: Turbo Race 3D
slug: turbo-race-3d
summary: A full 3D racer. Pick a world, upgrade the car, and finish ahead of the traffic.
role: Race, garage, and car upgrades
year: 2024
tech:
  - pixi
  - three
  - howler
tags:
  - racing
  - game
featured: true
order: -1
build:
  path: builds/turbo-race-3d/index.html
  folder: true
  orientation: landscape
  fpsTarget: 60
poster: ../../assets/posters/turbo-race-3d.png
highlights:
  - Fields, desert, and snow, eight tracks each, plus a random race
  - Finish first, beat a time, or win a duel
  - Three cars. Speed, acceleration, grip, and brakes are bought with cash
  - Body, paint, wheels, and decals in the garage
  - Nitro and a shield. A crash can be revived
  - Arrow keys steer and brake. Touch uses the on-screen arrows
challenges:
  - problem: A full track of traffic, obstacles, and roadside rocks is too much to draw and test every frame.
    solution: Traffic is a pool, and a hit test only looks at cars close along the track. Obstacles far ahead or behind the player are hidden. Roadside rocks share one instanced mesh.
  - problem: The car mesh is a poor hit shape, and testing that mesh against every other car is too expensive.
    solution: Each car and obstacle uses a box. Short rays leave the front, the sides, and the back of that box, and each ray only tests the other box. A front hit crashes, a side hit shoves, and a rear hit slows the car behind.
---

This is Turbo Race 3D, a full game. The race is Three.js. The garage, the map, and the HUD are PixiJS. The embed is the default export, the script and the asset folder together, so the tracks and the garage play on the page.

---
title: Wizario Repario
slug: wizario-repario
summary: A 3D arena playable. Steer the wizard, gather plants, bones, and crystals, then repair the altar.
role: Arena combat, resource gather, and altar repair
year: 2024
tech:
  - pixi
  - three
tags:
  - action
  - playable
featured: true
order: 3
build:
  path: builds/wizario-repario/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/wizario-repario.png
highlights:
  - A virtual stick moves the wizard through a circular arena
  - Spiders and bats drop dark plants, bones, and crystals into the wallet
  - Stand on the altar to spend resources and cast Repairo in three stages
  - Health bars and pickups track the 3D world from a Pixi overlay
  - After the third repair, the end card opens the store
challenges:
  - problem: Health bars and resource icons live in Pixi, while the fighters and pickups live in Three.js, so a camera move leaves the HUD behind.
    solution: Each tracked object projects its world position through the camera every frame, and the overlay scales with distance so bars stay over the models.
  - problem: Matter.js simulates physics on a flat plane, but the scene is drawn in 3D, so a hit or a shove must match what the player sees.
    solution: Each frame, physics x and y copy onto the mesh as x and z. Aim, movement, and collisions stay on that ground plane, so the wizard and the enemies move where the camera shows them.
---

This is a PixiJS and Three.js playable for Wizario. The file embedded here is the AppLovin export from the older browserify build pipeline. Store taps stay on the download button and the end card, so the arena can be played on the page.

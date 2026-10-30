---
title: Idle Bank Tycoon The Rival
slug: idle-bank-tycoon-the-rival
summary: A sabotage playable. Walk the rival bank, spill the pots, and stop the janitor from cleaning them up.
role: Sabotage path, customer line, and staff walks
year: 2025
tech:
  - pixi
  - three
tags:
  - action
  - playable
featured: true
order: 8
build:
  path: builds/idle-bank-tycoon-the-rival/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/idle-bank-tycoon-the-rival.png
highlights:
  - Drag the stick to walk the rival bank
  - Knock over two flower pots. Sitting customers get angry, and the janitor comes out to clean
  - Break the mop to stop the cleanup. The guard argues, and the mop goes back together
  - On the third try, pick up the donuts, hand them to the guard, break the mop again, and spill the pots while he eats
  - A line of customers keeps the counter busy the whole time
  - After the second spill the janitor storms off, and the end card opens the store
challenges:
  - problem: The counter needs a line that steps forward when someone is served, and a new customer has to join the back without landing on the person already waiting.
    solution: Waiting customers share one incoming spline. Each one stops at a progress cap one gap behind the person ahead. When the front customer leaves, every cap moves forward by that gap and the line walks. Anyone who finishes the exit path returns to a pool and can spawn at the rear.
  - problem: The player is a Matter.js body driven by the stick, while the janitor, the guard, and the queue are placed on splines. Bodies left at their spawn let the player walk through people, and a mesh that follows the body fights the scripted walk.
    solution: Spline actors write their world position onto the body each frame, divided by the scene scale, and skip the body-to-mesh sync. The player still reads the body and writes the mesh, so walls and people block the stick while the scripted walks stay on the path.
---

This is a PixiJS and Three.js playable for Idle Bank Tycoon. The file embedded here is the AppLovin export. Store taps stay on the download button and the end card, so the bank can be played on the page.

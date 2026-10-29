---
title: Jackpot Wins Slots Casino
slug: jackpot-wins-slots-casino
summary: A coin-pusher playable. Spin the prize wheel, drop a coin tower, and push the pile off the edge.
role: Gameplay, coin pusher, and the prize wheel
year: 2026
tech:
  - pixi
  - three
tags:
  - casino-style
  - playable
featured: true
order: 0
build:
  path: builds/jackpot-wins-slots-casino/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/jackpot-wins-slots-casino.png
highlights:
  - A 3D pusher shuttles forward and back across a coin table
  - Tap spin. A ring of twelve prizes steps until one lands
  - A coin value drops a tower of that size. Super Push sends the bar much farther
  - Loose coins drop onto the table and count when they fall off the front
  - After three towers fall away, a jackpot total counts up
challenges:
  - problem: The first spin can stop on Super Push before any coins are on the table.
    solution: That stop is skipped, and the highlight moves to the next prize.
  - problem: The pusher keeps sliding while the prize wheel is still stepping, so the next drop lands on a moving bar.
    solution: The bar pulls back, then its velocity is cleared and it stays paused until the tower or the super push is ready.
---

This is a Three.js coin pusher with a PixiJS end card. The file embedded here is the AppLovin export. The spin button plays the table. The download button opens the store.

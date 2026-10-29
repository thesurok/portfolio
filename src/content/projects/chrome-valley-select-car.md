---
title: Chrome Valley Select Car
slug: chrome-valley-select-car
summary: A restore playable. Pick a wreck, preview body parts, confirm the upgrades, and sell the rebuild.
role: Car select, part preview, and repair FX
year: 2023
tech:
  - pixi
tags:
  - playable
featured: true
order: 7
build:
  path: builds/chrome-valley-select-car/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/chrome-valley-select-car.png
highlights:
  - Tap Stronghold, Milia, or Whisper on the lot to enter the garage
  - Part buttons preview the upgrade on the car before Confirm commits it
  - Bumper, hood, roof, rims, side panels, and trunk climb a repair sequence per car
  - Each confirm fades the broken piece, flashes the new part, and sprays particles along its silhouette
  - Finished cars return to the lot with a higher sale price. After the third, the end card opens the store
challenges:
  - problem: Repair sparks have to follow the shape of each body panel, but every part is a different atlas frame with its own trim and anchor.
    solution: Sample the part texture alpha into a point cloud once, cache it by frame, and spawn particles only on opaque pixels. A matching white flash mask is built from the same alpha so the burst and the flash hug the panel.
  - problem: The lot and the garage each keep their own car scene graph, so a finished repair on one would leave the other looking wrecked.
    solution: On complete, copy which child sprites are visible from the garage car onto the matching intro car by part name, then reveal the lot car and animate the price bubble from the starting value to the sale value.
---

This is a PixiJS playable for Chrome Valley Customs. The file embedded here is the AppLovin export. Store taps stay on the download button and the end card, so the lot and the garage can be played on the page.

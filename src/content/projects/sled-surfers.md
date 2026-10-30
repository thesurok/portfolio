---
title: Sled Surfers
slug: sled-surfers
summary: A lane runner. Pull the slingshot, swipe between three rails, and ride the penguin to the finish.
role: Slingshot launch, lane changes, and roof landings
year: 2026
tech:
  - pixi
  - three
tags:
  - runner
  - playable
featured: true
order: 9
build:
  path: builds/sled-surfers/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/sled-surfers.png
highlights:
  - Pull the slingshot and release. A deeper pull is faster, and the sideways pull picks the starting lane
  - Three rails. A short swipe moves one lane. Hold and drag to step across without skipping the middle
  - Trains and cars block the rails. A ramp launches a backflip
  - On the way down, land on a roof and ride it, then drop off the end
  - An ice trail stamps on the snow while the sled stays on the ground
  - This export is the penguin with one life. A hit tumbles him. The finish line opens the win card
challenges:
  - problem: A new mesh for every ice stamp is a draw call per stamp, and the trail would keep growing for the whole run.
    solution: The trail is one instanced mesh of 260 planes. Each stamp writes the next instance, and the cursor wraps, so the oldest stamp is reused. Depth write is off, and an alpha test drops the soft edge. The mesh does not frustum-cull, because the stamps move and the bounds would not follow them. Stamps only land while the sled is on the snow and moving.
  - problem: Each lane repeats one rail piece forty-five times, and the camera runs from a near plane of 0.001 out to 10000. A linear depth buffer fights those rails, and a shadow from every copy is too many casters for a phone.
    solution: The repeats are clones, so they share the rail geometry and material. Logarithmic depth is on. Only the buildings cast shadows, and the rails do not. The directional light and its target keep a fixed offset from the penguin, so the shadow stays on the street around the rider. On a phone the 3D view draws at 1.2 pixels per CSS pixel.
---

This is a PixiJS and Three.js playable for Sled Surfers. The penguin and the track are Three.js. The download button and the end card are PixiJS. The file embedded here is the AppLovin export. Store taps stay on the download button and the end card, so the run can be played on the page.

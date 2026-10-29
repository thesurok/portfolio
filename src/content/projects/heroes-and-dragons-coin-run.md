---
title: Heroes and Dragons Coin Run
slug: heroes-and-dragons-coin-run
summary: A lane runner. Swipe between three lanes, gather coins to level up, and beat the bosses.
role: Gameplay, lane runner, and boss fights
year: 2026
tech:
  - pixi
  - spine
tags:
  - runner
  - playable
featured: true
order: 0
build:
  path: builds/heroes-and-dragons-coin-run/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/heroes-and-dragons-coin-run.png
highlights:
  - Three lanes. Tap to run, then swipe left or right to change lane
  - Coins, trees, and rocks across three stretches, then a boar, a spider, and a dragon
  - Coins fly to the level bar. Levels land at five, twenty, thirty-five, and fifty coins
  - A tree or a rock stuns the runner and breaks one of three hearts
  - A sideways hand hint plays until the first lane change
challenges:
  - problem: Tree and rock art is wider than a lane, so a near miss still reads as a hit.
    solution: A hit only counts in the runner's lane, and the box is a slice of the sprite. Trees use a tenth of the art, rocks about two fifths.
  - problem: The dragon exchange starts with the hero still centered on the track, so the breath and the body overlap.
    solution: The hero walks left of the dragon first, and the ground shifts with that move. Lane changes stay locked until the fight ends.
---

This is a PixiJS playable for Heroes and Dragons. The heroes and bosses are Spine. The file embedded here is the AppLovin export. Store taps stay on the download button and the end card, so the run can be played on the page.

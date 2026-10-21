---
title: Cribbage Big Board
slug: cribbage-big-board
summary: A cribbage playable against a bot. Discard to the crib, peg to thirty-one, then score the hand.
role: Gameplay, pegging, and the guided crib tutorial
year: 2026
tech:
  - pixi
tags:
  - puzzle
  - playable
featured: true
order: 5
build:
  path: builds/cribbage-big-board/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/cribbage-big-board.png
highlights:
  - Six cards dealt each round; discard two into the crib
  - Pegging plays to thirty-one with fifteens, pairs, runs, and go
  - A cut card starts the show, then each hand and the crib score
  - Pegs race around the board toward one hundred twenty-one
  - An idle pointer guides the first crib discard and later peg plays
challenges:
  - problem: A hint can fire while the bot is still playing or the peg score is still counting up.
    solution: Player hints stay blocked until score animations finish and the bot turn is clear.
  - problem: Pegging can start before the starter card finishes its reveal and slide.
    solution: The cut waits for the starter animation, then pegging opens only after that slide completes.
---

This is a PixiJS playable for Cribbage. The file embedded here is the AppLovin export. Store taps stay far out, so the board can be played on the page.

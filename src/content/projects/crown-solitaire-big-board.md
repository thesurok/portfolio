---
title: Crown Solitaire Big Board
slug: crown-solitaire-big-board
summary: A solitaire playable. Play a card one rank higher or lower onto the waste, and clear the tableau.
role: Gameplay, tableau layout, and tutorial
year: 2026
tech:
  - pixi
tags:
  - puzzle
  - playable
featured: true
order: 4
build:
  path: builds/crown-solitaire-big-board/index.html
  orientation: both
  fpsTarget: 60
poster: ../../assets/posters/crown-solitaire-big-board.png
highlights:
  - Seven face-up columns and a waste pile on a green felt board
  - Tap a top card that is one rank away from the waste, including king to ace
  - The stock stays locked until the first tableau card is played
  - Drawing from the stock resets the placement streak and score multiplier
  - An idle hint shows the next safe play, or a draw when the board is stuck
challenges:
  - problem: Removing cards from a tall column leaves empty gaps that make the next legal tops hard to read.
    solution: Each column squeezes upward after a play, so the remaining cards settle into one stack.
  - problem: A free hint can point at a dead end and leave the player with no win path.
    solution: The hint follows a solved path when one exists, and only falls back to a generic suggestion when it does not.
---

This is a PixiJS playable for Crown Solitaire. The file embedded here is the AppLovin export. The gameplay timer stays far out, so the board can be played on the page.

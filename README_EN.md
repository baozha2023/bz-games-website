# BZ-Games Official Website

[中文](./README.md) | English

Hey there, I'm the creator of [BZ-Games](https://github.com/baozha2023/bz-games). This site started as a product landing
page, but a plain static page felt too boring — so I stuffed it full of easter eggs and mini-games. It looks like a
serious marketing site, but it's actually a playground.

> 🌐 **Live Access**: http://www.bzgames.top/

---

## 🐍 There's a Snake Hidden in Here

Open the site and press **WASD** or the **arrow keys**. You'll find that every character on the page is "food". The
snake eats them one by one, and they disappear.

Here's the best part — when you eat **every single character** inside a card, the card itself vanishes! Devour the
entire page's text and you'll trigger the ultimate easter egg.

The nav bar shows your live progress: `🐍 × 42`.

---

## 🏆 The Ultimate Easter Egg: Eat Everything

When you've eaten every last character on the page, a giant **ASCII Art popup** appears — a pixel owl congratulating
you. Five seconds later, all the text regenerates in 5 waves, and your snake resets to the starting line, ready for
round two.

> 💡 Pro tip: If you're impatient, type `konami` in the developer console to trigger this instantly.

---

## 💥 Click the Logo Until It Explodes

That "BZ-Games" logo in the top-left corner? **Click it 3 times in a row.**

The letters will **explode**, flying to random spots across the entire page (some will end up where you can't even see
them). They drift for 10 seconds, then spend 30 seconds slowly floating back to their original positions. The whole
thing lasts 40 seconds — watching them reassemble is oddly satisfying.

---

## 🧱 404 Breakout Arcade

Visit any non-existent page (e.g. `/404`) and instead of a boring "Page Not Found", you'll get a **fully playable Breakout game**! Bricks are arranged in a "404" pattern — use your mouse to control the paddle, smash all the bricks, and a hidden download link appears. *"Lost? Why not play a round!"*

---

## 🖥️ Console Easter Egg

Hit `F12` to open DevTools and you'll find a colorful **ASCII Art recruitment ad** — *"Love building cool stuff? We're looking for fun people!"* A little smile for fellow developers peeking under the hood.

---

## 🧩 Tetris in the Bottom-Left Corner

There's a **purple gradient bubble** at the bottom-left. Click it to reveal a fully playable Tetris game!

WASD controls, score tracking, line-clear effects — and hitting certain scores unlocks achievements. When Tetris is
open, it takes over the keyboard from the snake so nothing clashes.

---

## ⌨️ A Hidden Developer Console

Press the **backtick key** `` ` `` (top-left of your keyboard, next to `1`) and a black terminal drops down from the
center of the screen. You can mess with the snake:

```
> snake.color(green)      # Turn the snake green
> snake.speed(50)         # Make it faster
> snake.size(40)          # Make it fatter
> food.count              # How many characters left to eat?
> konami                  # Instant easter egg
> clear                   # Clear the screen
> help                    # Show all commands
```

Supports 30+ color names: `red`, `blue`, `gold`, `cyan`, `pink`... go wild, it won't crash.

Press `Esc` to close.

---

## ✨ Mouse Trail Particles

Move your mouse around and watch a trail of **colorful glowing dots** fade behind it, like tiny meteors. Colors shift
between purple and blue, each particle has its own size, direction, and lifespan.

---

## 🔊 Eating Sounds 8-Bit Style

Every time you eat a character, the system plays an **8-bit chiptune sound**. The pitch changes based on the character —
Chinese, English, and emoji each make different tones. Audio only activates after your first click (browser autoplay
policy).

---

## 🏅 Achievement System

The site has **9 achievements**. When you unlock one, a golden toast notification slides in from the bottom-right. The
nav bar shows your live count: `🏆 X/9`.

| Achievement       | How to Unlock                                        |
|-------------------|------------------------------------------------------|
| ⭐ First Bite      | Eat your first character                             |
| 🧤 Cleaner        | Eat 100 characters total                             |
| 🏆 Big Eater      | Eat 500 characters total                             |
| 💥 Big Bang       | Click the logo 3 times to trigger the explosion      |
| ⌨️ Hacker 101     | Press `` ` `` to open the console for the first time |
| 🎛️ Terminal Master | Try every one of the 7 console commands              |
| 🧱 First Clear    | Score 100 points in Tetris                           |
| 🏗️ Builder        | Score 500 points in Tetris                           |
| 🏰 Brick Castle   | Score 1000 points in Tetris                          |

---

## 🌓 Dark / Light Theme

There's a little button on the right side of the nav bar. Click it to switch between dark and light themes. I'll
remember your preference and restore it next time you visit.

---

## 📱 Mobile Friendly

Open the site on your phone and the game interactions and particle effects will automatically hide, leaving a clean
product page. Let's be honest — playing snake by eating text on a phone doesn't really work anyway...

---

## 🎯 Found Any More Easter Eggs?

What I've shown you above is the "official" list. Think there's more? Try for yourself 😉

---

## 📦 Deployment

Pure static site, no frameworks needed. Drop the entire folder onto OSS + CDN, GitHub Pages, Vercel, or Netlify — you'll
be live in three minutes.

---

BZ-Games itself is a **Windows local gaming platform** — no servers needed, fully private data, supports online
multiplayer. Check it out on [GitHub](https://github.com/baozha2023/bz-games).

MIT License © BZ-Games

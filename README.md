# 🚲 Stephanie's Big Adventure

> *"Part comic book. Part video game. Part treasure map. Part fever dream."*

A fully hand-rolled, zero-dependency, zero-framework interactive web experience built as a personal gift. Inspired by Pee-Wee's Big Adventure. Ends with real GPS coordinates and a one-of-a-kind surprise hidden somewhere in the world — location TBD because the original plan was apparently **illegal** and the backup location is under **Safety Maintenance**. We're figuring it out.

No React. No Vue. No build step. No npm install. Just vibes, vanilla JS, and an AI that types fast.

---

## 💝 Supporting the Adventure

If you choose to sponsor this work, please know that all proceeds from this repository are dedicated to supporting Stephanie's journey. Your contributions go directly toward making her next "Big Adventure".

[💛 Sponsor via GitHub Sponsors](https://github.com/sponsors/Shannon-Goddard)

---

## Architecture

```
index.html          ← hub / main menu
├── setup.html      ← required pre-flight checklist (first visit only)
├── pee-wee.html    ← cinematic launch sequence
│   └── mario.html  ← fully playable platformer
│       └── map.html ← 4-quadrant panning adventure map
│           └── mission.html ← GPS mission briefing
├── maze.html       ← procedurally generated finger maze
├── word-search.html ← randomized word search, 80+ word pool
├── why-not.html    ← shuffled animal slideshow (150 images)
└── credits.html    ← star wars crawl credits with original score
```

All assets local. All audio HTML5. All animations CSS keyframes or rAF. Deployed as static files — throw it on any server, S3 bucket, or just open index.html.

---

## The Experience

### 🚲 Pre-Flight Checklist (`setup.html`)
Shows on first visit only — localStorage gates it forever after.

- 4-step gated flow — each step unlocks the next, can't skip anything
- **Step 1:** Lick your elbow. We'll wait. Checkbox required to proceed.
- **Step 2:** Donkey loyalty test — YES unlocks Step 3. NO triggers a popup: *"Incorrect. Donkeys are objectively cute. Try again. ...kinda."*
- **Step 3:** Identity verification — *"Are you Stef? (with a ph)"* — NOT TODAY triggers *"👀 Then what are you doing here? Put it down. Walk away."*
- **Step 4:** Add to Home Screen instructions for iOS + Android with confirmation checkbox
- **LET'S RIDE** button stays locked/dimmed until all 4 steps complete — then pulses to life
- `localStorage.setItem('sba-setup-done', '1')` on completion — never shows again

---

### 🏠 Hub — Main Menu (`index.html`)
- Retro arcade menu with CRT scanline overlay via `body::after` repeating-linear-gradient
- Gold sweep hover effect on menu items using `::before` translateX slide
- Press Start 2P + Bangers font combo for maximum comic book energy
- Every page has a back button with a unique label. They're all funny. Don't skip them.

---

### 🎬 Page 1 — The Launch (`pee-wee.html`)
- Comic book city background, responsive across desktop / landscape / portrait via orientation media queries
- Title image entrance: `scale(0) → scale(1)` keyframe + infinite float loop
- Two-stage button state machine:
  - Stage 0: plays `pee-wee-music.mp3`
  - Stage 1: triggers laugh SFX, fires `flyout` keyframe on the bike (`translate(150vw, -150vh) rotate(-25deg)`), redirects after 4s
- Back button: `← I Changed My Mind 🐔`

---

### 🎮 Page 2 — Mario Time (`mario.html`)
The one that took the most code. Worth it.

- **Renderer:** `requestAnimationFrame` game loop, no canvas — pure DOM `div` with `background-image` sprite swapping
- **Physics:** manual gravity accumulator, velocity vectors, AABB collision detection against platform array
- **Sprite system:** idle, 3-frame walk cycle, 5-frame jump cycle, crouch, fall, sit — all preloaded on init
- **Coordinate system:** all platform positions defined in 1080×1920 design space, scaled to screen via `scale` + `offsetX/offsetY` at load time
- **NES Controller:** PNG image with pixel-mapped hit zones via `getBoundingClientRect()` + natural image coordinate math — works on touch and mouse
- **Multi-touch tracking:** `activeTouches` object keyed by `touch.identifier` — left + jump simultaneously works correctly
- **? Block popups:** 30 custom messages, randomly selected, 2s auto-dismiss
- **Pause menu:** keyboard + controller navigable, 3 options including...
- **Bohemian Rhapsody easter egg:** full video overlay, theme pauses, resumes on end
- **Fart button:** `B` on keyboard or B button on controller. Non-negotiable feature.
- **Win condition:** Mario must be standing on pipe AND press down → pipe-entry animation → `map.html`
- Back button: `← I Quit. Mario Can Walk.`

---

### 🗺️ Page 3 — The Map (`map.html`)
- **Layout:** 200vw × 200vh absolutely positioned background div — 4 quadrants, each 100vw × 100vh
- **Panning:** CSS `transition: top/left 1.5s ease-in-out` driven by JS `setTimeout` chain
- **Sequence per quadrant:** comic panel image fades in at `opacity: 0.5` → crossfades to video clip → video stays at 50% opacity
- **Video masking:** `mask-image: radial-gradient(ellipse 80% 80% at center, black 50%, transparent 100%)` — soft edges, no hard borders
- **End button — 3-click state machine:**
  - Click 1: Goonies SFX plays, text → `"Okay. You're ready. Click me"`
  - Click 2: SFX replays, text → `"Okay. Serious this time. Let's go"`
  - Click 3: `window.location.href = 'mission.html'`
- Back button: `← I'm Bad At Maps`

---

### 📍 Page 4 — Mission Briefing (`mission.html`)
- Forest background, portrait/landscape responsive
- Pee-Wee on bike animating across the sky on infinite loop (`cruise` keyframe: left: -30% → 130%`)
- Comic book panel with offline map download instructions
- `startAdventure()`: button goes red, text → `COORDINATES LOCKED...`, 2s delay → Google Maps deep link with hardcoded lat/lon
- Transparent notice overlay: honest disclosure that Forest Falls is under maintenance, the original plan was illegal, and the surprise location is TBD
- Back button: `← This Seems Dangerous`

---

### 🌀 Bonus — The Maze (`maze.html`)
- **Algorithm:** recursive backtracker — carves a perfect maze (no loops, one solution) via DFS with shuffled direction array
- **Rendering:** Canvas 2D API, redraws every frame via `requestAnimationFrame`
- **End marker:** pulsing radial animation via `Math.sin(winPulse)` on arc radius
- **Trail:** `Set` of visited cell keys (`"r,c"` strings), rendered as semi-transparent gold fill
- **Input:** Pointer Events API — `pointerdown` to start on the GO cell, `pointermove` to trace, `pointerup`/`pointerleave` to trigger fail
- **Fail detection:** lift finger = fail. Move to non-adjacent cell = fail. 20 custom fail messages, randomly selected
- **Win reward:** random meme image from 150-image pool (donkeys / kittens / puppies)
- **Responsive:** `calcSize()` recalculates cell size and regenerates maze on every resize
- Back button: `← My Finger Needs A Break`

---

### 🔤 Bonus — Word Search (`word-search.html`)
- **Grid:** 18×18, filled via word placement + random alpha noise
- **Word placement:** 8-directional (horizontal, vertical, all diagonals, all reversed) with 500-attempt retry per word
- **Word pool:** 80+ words across 4 categories — big vocabulary, adventure/travel, pop culture (Goonies, Mario, Pee-Wee), good vibes
- **Per-puzzle selection:** 7 random words from pool + `ZION` + `SISTINE` — always, on every puzzle, no exceptions
- **Selection mechanic:** Pointer Events with `setPointerCapture` — drag to select, `getLinePath()` enforces straight-line constraint, checks forward + reverse match
- **Win state:** all words found → blinking gold win message
- Back button: `← These Aren't Real Words`

---

### 🐾 Bonus — Stephanie's Mix (`why-not.html`)
- 150 images (donkeys, kittens, puppies) shuffled via Fisher-Yates on load
- Two-image crossfade slideshow using alternating `img` elements + CSS `opacity` transition
- Category label updates per slide
- `Weightless` by Marconi Union plays on toggle (user gesture required for audio unlock)
- Progress counter: `n / 150`
- Back button: `← Too Many Feelings`

---

### 🎬 Credits (`credits.html`)
- **Star Wars-style scroll crawl** — full content breakdown, tech stack, credits, shoutout, love note
- **Starfield:** Canvas 2D, 180 stars with individual twinkle speeds via `Math.sin` on per-star phase offset
- **Scroll:** CSS `animation` with `--scroll-dist` CSS custom property set dynamically from `scrollWrap.scrollHeight + window.innerHeight` — no hardcoded distances, works on any screen
- **Duration:** `Math.max(150, dist / 6)` seconds — scales with content, always readable
- **Music:** Star Wars theme, plays on "ROLL CREDITS" button click (user gesture audio unlock)
- **Replay:** removes class, forces reflow, re-adds class, resets music
- CRT scanlines. Obviously.
- Back button: `← Back To HQ`

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | None | Faster to ship, zero overhead |
| Styling | Vanilla CSS | Keyframes, custom properties, mask-image |
| Scripting | Vanilla JS | rAF loops, Pointer Events, Web Audio |
| Fonts | Google Fonts | Bangers + Press Start 2P |
| Audio | HTML5 `<audio>` | Simple, works everywhere |
| Canvas | Canvas 2D API | Maze rendering + starfield |
| Maps | Google Maps URL scheme | No API key needed |
| Deployment | Static files | S3, Netlify, GitHub Pages, literally anything |

---

## File Structure

```
/
├── index.html
├── pee-wee.html
├── mario.html
├── map.html
├── mission.html
├── maze.html
├── word-search.html
├── why-not.html
├── credits.html
└── assets/
    ├── img/
    │   ├── background-image.png
    │   ├── background-image-portrait.png
    │   ├── forest-background.png
    │   ├── forest-background-portraite.png
    │   ├── map.png
    │   ├── map1-4.png
    │   ├── title.png
    │   ├── bike.png
    │   ├── apple-touch.png
    │   ├── donkeys/  (01-50.jpg)
    │   ├── kittens/  (01-50.jpg)
    │   └── puppies/  (01-50.jpg)
    ├── mario/
    │   ├── mario-background.png
    │   ├── controller.png
    │   └── mario-*.png  (sprite sheets)
    ├── mp3/
    │   ├── pee-wee-music.mp3
    │   ├── pee-wees-laugh.mp3
    │   ├── mario-theme.mp3
    │   ├── mario-jump.mp3
    │   ├── mario-down-pipe.mp3
    │   ├── fart.mp3
    │   ├── indiana-jones-theme.mp3
    │   ├── goonies-hey-you-guys.mp3
    │   ├── weightless.mp3
    │   └── star-wars.mp3
    ├── mp4/
    │   └── bohemian-rhapsody.mp4
    └── webm/
        ├── goonies-clip.webm
        ├── adventure-clip.webm
        ├── indiana-jones-clip.webm
        └── big-trouble-clip.webm
```

---

## Credits

- **Visionary & Creative Director** — Shannon Goddard, [Loyal9 LLC](https://loyal9.com)
  *Had an idea or two. I guess.*

- **Built entirely by** — [Amazon Q Developer](https://aws.amazon.com/q/developer/), AWS AI Assistant
  *Every line of code. Every collision box. Every fart.*

---

## A Note

This is made with love for Stef (with a ph). Strong roots. Always. 🌿

---

## License

Personal gift. Not for redistribution. Just smiles.

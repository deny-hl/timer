# Timer

A lightweight countdown timer built with vanilla HTML, CSS, and JavaScript. It ships with preset durations and simple controls so you can start, pause, and reset a session in a single click.

## Features

- Preset buttons for 1, 2, 3, and 5 minute sessions (customizable in `index.html`).
- Start/Pause/Reset controls that always resume from the last selected preset, with button states that reflect the current timer state.
- Accessible status updates that announce when the timer starts, pauses, or finishes and a subtle visual flash when a session completes.
- The page title updates to show the remaining time so you can keep an eye on progress from another tab.

## Getting started

1. Open `index.html` in any modern browser.
2. Pick a preset duration or let the default two minute timer stand.
3. Use **Start** to begin counting down, **Pause** to hold the countdown in place, and **Reset** to jump back to the most recently selected preset.

Prefer a hosted demo? Try the live preview at https://deny-hl.github.io/timer/.

To adjust the look and feel, edit `style.css`. To change timer behavior, tweak `main.js` or the presets in `index.html`.

## Running tests

This project includes a small test for the shared `formatTime` utility. With Node.js installed, run:

```bash
npm test
```

The tests rely on the built-in Node `assert` module, so no additional dependencies are required.

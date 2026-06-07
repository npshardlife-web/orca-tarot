# ORCA AI Tarot Reader — Animated Shuffle + Cut + Audio Build

This version adds a complete animated and voiced reading ritual to the ORCA AI Tarot Reader app.

## Added in this build

- **Animated shuffling** deck-stack motion before a draw
- **Animated card cutting** with the top and bottom packets separating, then recombining
- **Shuffle-only** button
- **Cut-only** button
- **Shuffle + Cut + Draw** full ritual button
- **Atmospheric background sound** generated locally with the browser Web Audio API
- **Ritual sound cues** for shuffle, cut, draw, and card selection
- **Card narration** using the browser Speech Synthesis API
- **Full vocal interpretation** for the generated ORCA reading
- **Auto Cards** option to narrate drawn cards after a spread opens
- **Auto Reading** option to narrate the full interpretation after a spread opens
- **Voice rate control** and atmosphere volume control
- Spread layout, card detail view, reversals, fallback art, and ORCA interpretation export

## Notes on audio

Browser security blocks autoplay audio until the user taps/clicks a control. Use **Enable Audio** or **Atmosphere** first. The app does not require uploaded audio files: atmosphere and ritual sounds are synthesized in-app. Vocal narration uses whatever system/browser voices are available.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite local URL shown in the terminal.

## Build for deployment

```bash
npm run build
```

Deploy the `dist` directory.

## Where the features live

- Main animated ritual UI and audio engine: `src/App.jsx`
- Animation and audio panel styling: `src/styles.css`
- Deck data: `src/data/orca_master_deck.js`
- Spread geometry: `src/data/spread_engine.js`
- Reading engine: `src/data/interpretation_engine.js`

The animated sequence is controlled by the `stage` state:

- `idle`
- `shuffling`
- `cutting`
- `drawing`

The deck is actually reordered after shuffle and cut, so the animation is not cosmetic only.

Audio visibility fix: audio controls now appear twice — in a top audio control bar directly under the hero and inside the Reading Controls sidebar.

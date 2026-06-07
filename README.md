# ORCA AI Tarot Reader — Animated Shuffle + Cut Build

This version adds a complete animated reading ritual to the tarot reader app:

- **Animated shuffling** deck-stack motion before a draw
- **Animated card cutting** with the top and bottom packets separating, then recombining
- **Shuffle-only** button
- **Cut-only** button
- **Shuffle + Cut + Draw** full ritual button
- Spread layout, card detail view, reversals, fallback art, and ORCA interpretation export
- Included Major Arcana art, ORCA card back, Two of Foundations, and Flame court card images that were available in the current build assets

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

## Where the animation lives

- Main animated ritual UI: `src/App.jsx`
- Animation styling: `src/styles.css`
- Deck data: `src/data/orca_master_deck.js`
- Spread geometry: `src/data/spread_engine.js`
- Reading engine: `src/data/interpretation_engine.js`

The animated sequence is controlled by the `stage` state:

- `idle`
- `shuffling`
- `cutting`
- `drawing`

The deck is actually reordered after shuffle and cut, so the animation is not cosmetic only. The app draws from the reordered deck.

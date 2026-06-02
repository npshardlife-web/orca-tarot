# ORCA AI Tarot Reader

Corrected deployable Vite + React app.

## Required structure

- `src/App.jsx`
- `src/main.jsx`
- `src/styles.css`
- `src/data/orca_master_deck.js`
- `public/images/orca-tarot/`

## Add your images

Put all GUID-named PNG card files in:

```text
public/images/orca-tarot/
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Vercel/Netlify build settings:

```text
Build command: npm run build
Output directory: dist
```

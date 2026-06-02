# ORCA AI Tarot Reader — Deployable System

This ZIP contains a complete Vite + React app with:

- Full ORCA deck mapping layer
- Major Arcana, suits, Shadow expansion, Apocalypse expansion
- GUID-based image paths
- Spread layouts including Celtic Cross and ORCA Systems Diagnostic
- Card flip animation
- Reversal support
- Seeded draws
- Missing-image diagnostics
- Text export for readings
- CSS-only full UI; no Tailwind setup required

## Install

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://localhost:5173
```

## Images

Put all generated tarot PNG files here:

```text
public/images/orca-tarot/
```

The app expects filenames exactly as mapped in:

```text
src/data/orca_master_deck.js
```

Some court-card images are intentionally marked as missing because their GUID filenames were not confidently identifiable from the supplied file list.
They will still draw and display a glyph fallback.

## Build for deployment

```bash
npm run build
```

Then deploy the project to Vercel, Netlify, Cloudflare Pages, or any static host.

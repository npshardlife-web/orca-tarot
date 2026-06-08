# ORCA AI Tarot Reader — Audio Dock Fixed

This build includes a persistent fixed **AUDIO** dock in the top-right corner of the app. It is rendered with inline styles so it remains visible even if the normal panel layout or CSS sidebar does not show.

Controls included:
- Enable Audio / Audio On
- Atmosphere
- Voice
- Auto Cards
- Auto Reading
- Say Card
- Say Reading
- Stop
- Atmosphere volume
- Voice Rate

Run locally:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Latest update
- Mobile Chrome audio unlock is now handled by a persistent bottom audio dock.
- The dock uses a real tap to resume Web Audio and prime browser speech narration.
- A deck flipbook is included at `public/flipbook.html` and copied to `dist/flipbook.html` during build.
- The main UI includes buttons to launch the flipbook.
- Detail cards now include a zoom modal with + / - / reset controls.

# Resume

Personal resume website built with React, Vite, Tailwind CSS, and Lucide icons.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Pages

The build has three independent HTML entries, not one SPA with routes:

- `/` — the public portfolio (`index.html`, `app.jsx`)
- `/scrapbook/` — the design and motion gallery (`scrapbook/index.html`,
  `scrapbook.jsx`). Its contents are listed in `scrapbook-data.js`; the images and
  films live in `public/scrapbook/`. To add a piece, export it as WebP at two sizes
  (`<slug>.webp`, long side up to 2000 px, and `<slug>-thumb.webp`, up to 800 px
  wide), drop both in that folder, and add an entry to the data file. Films are
  540 × 960 H.264 MP4s in `public/scrapbook/video/` with a WebP poster of the same
  name.
- `/c/<slug>/` — an unlisted contact card reached only by scanning the QR on a
  printed complimentary card. See [CONTACT-CARD.md](CONTACT-CARD.md).

In `vite dev` the scrapbook and the private page must be opened **with** their
trailing slash (`http://localhost:5173/scrapbook/`, `http://localhost:5173/c/<slug>/`); without one, the dev server's history
fallback serves the portfolio instead. Production does not have this quirk.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run vcard` | Regenerate the contact card's `.vcf` from `scripts/build-vcard.mjs` |
| `npm run botanicals` | Redraw the faint palms behind the pages (`public/botanicals/`); their opacity is set in `styles.css` under `.botanicals` |

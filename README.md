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

The build has two independent HTML entries, not one SPA with routes:

- `/` — the public portfolio (`index.html`, `app.jsx`)
- `/c/<slug>/` — an unlisted contact card reached only by scanning the QR on a
  printed complimentary card. See [CONTACT-CARD.md](CONTACT-CARD.md).

In `vite dev` the private page must be opened **with** its trailing slash
(`http://localhost:5173/c/<slug>/`); without one, the dev server's history
fallback serves the portfolio instead. Production does not have this quirk.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run vcard` | Regenerate the contact card's `.vcf` from `scripts/build-vcard.mjs` |

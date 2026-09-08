# Print assets — complimentary card QR

These files are **not published**. They live outside `public/`, so Vercel never serves
them; they are here so the artwork is versioned alongside the page it points at.

## What the QR points to

```
https://kennedyabubakar.com/c/kwavir462gj
```

That is the unlisted contact card. It is deliberately not linked from anywhere on the
site, is not in `sitemap.xml`, and is served with `noindex` — so the QR is effectively
the only way in. Treat the URL like a key: if it ever leaks, change the folder name in
`c/`, the `input.card` entry in `vite.config.js`, and regenerate the QR.

## Files

| File | Use |
| --- | --- |
| `qr-contact-card.svg` | **Use this for print.** Vector, white quiet zone baked in, ink `#14110d`. |
| `qr-contact-card-transparent.svg` | Same, transparent background — only if you are placing it on a light, flat area. |
| `qr-contact-card.png` | 2400 × 2400 raster fallback for tools that refuse SVG. |

Error correction is level **H** (~30% of the code can be damaged or covered and it still
scans), which is why the pattern looks dense. That is the point: it survives a scuffed
card, a fold, or a small logo dropped in the centre.

## Printing rules that actually matter

1. **Minimum size: 20 mm × 20 mm.** Below that, phone cameras start failing in poor light.
   25 mm is the comfortable size for a business card.
2. **Keep the quiet zone.** The white border in the SVG is part of the code. Do not crop
   it, and do not let artwork or a card edge intrude into it.
3. **Dark on light, never inverted.** Many scanners will not read a light-on-dark code.
   Keep it `#14110d` on `#f6f4ec` (the site cream) or on white.
4. **No gradients, no screening, no rotation onto a busy photo.** Flat solid ink only.
5. **Vector into the layout.** Place the `.svg` in InDesign / Illustrator / Canva rather
   than scaling the PNG, so the module edges stay razor sharp at any size.
6. **Test the printed proof**, not the screen — with both an iPhone camera and an Android
   camera, indoors under warm light. That is the failure case, not daylight.

## Regenerating

The URL is fixed, so this should not be needed unless the slug changes:

```bash
npx qrcode --output print/qr-contact-card.png --error-correction H --width 2400 \
  "https://kennedyabubakar.com/c/kwavir462gj"
```

For the SVG, `npx qrcode -t svg -e H "…"`.

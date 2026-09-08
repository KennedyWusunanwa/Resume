# The contact card

An unlisted page that exists for one moment: someone scans the QR on your printed
complimentary card, and one tap puts you in their phone.

```
https://kennedyabubakar.com/c/kwavir462gj
```

It is linked from nowhere, absent from `sitemap.xml`, and served `noindex`. The
QR is the door; everything else is a lock on the windows.

## Where things live

| Path | What it is |
| --- | --- |
| `c/kwavir462gj/index.html` | The page's own HTML document — its own `<head>`, its own bundle |
| `card.jsx` | The page |
| `card.css` | Styles only this page needs, plus three cascade corrections |
| `card-main.jsx` | Mount point |
| `card-qr.js` | The QR, inlined as one SVG path (generated) |
| `public/c/kwavir462gj/kennedy-abubakar.vcf` | The file the button downloads (generated) |
| `scripts/build-vcard.mjs` | Builds that file — `npm run vcard` |
| `scripts/vcard-photo.jpg` | 400×400 source for the photo embedded in the vCard |
| `public/portrait-card.jpg` | 800×800, 78 KB. **Never** reference `portrait.png` here — it is 1.1 MB |
| `print/` | Print-ready QR artwork, not served |
| `vercel.json` | The headers that make the whole thing work |

It is a second Vite entry, not a route: `vite.config.js` lists both HTML files as
inputs, and Vite preserves the nested directory, emitting `dist/c/kwavir462gj/index.html`.
The portfolio is untouched and still builds exactly as before.

## The three headers that matter

In `vercel.json`:

1. **`Content-Type: text/vcard; charset=utf-8` on `*.vcf`.** Without it the file
   ships as `text/x-vcard` or `application/octet-stream`, and iOS Safari will not
   open the Add Contact sheet — the one tap the page exists for.
2. **`X-Robots-Tag: noindex…` on `/c(/.*)?`.** Belt to the meta tag's braces, and
   the only one of the two a non-HTML fetch (the `.vcf` itself) will ever see.
3. **`X-Robots-Tag: noindex` on any `*.vercel.app` host.** Vercel's current
   production `.vercel.app` URL is indexable by default and serves this same path,
   which would otherwise be an indexable duplicate of both pages.

## Why there is no `Disallow` in robots.txt

Because it would do the opposite of what it looks like it does.

`Disallow` blocks *crawling*; `noindex` blocks *indexing* and can only be read
after a crawl. Disallowing the path means Googlebot never reads the `noindex`, so
if the URL is ever discovered through a link it can be indexed URL-only — and then
cannot be removed, because the directive that would remove it is unreadable.

And `Disallow: /c/kwavir462gj/` would publish the secret path in the first file
every scraper fetches.

So `public/robots.txt` stays exactly as it is: `Allow: /`. Crawlable plus noindex
means discoverable-but-unindexable, which is the property we actually want. The
unguessable slug does the hiding; `noindex` is the safety net for when it fails.

## Why the save link has no `download` attribute

Because on iOS 13+ `download` makes Safari file the `.vcf` away in Files instead
of opening the contact sheet. The user then has to leave the browser, find the
download, and open it — three steps instead of zero.

A plain same-tab link to a real static file, with `Content-Disposition: inline`,
is the only approach with no version-dependent branch: iOS hands it to Quick Look
and shows the Add Contact sheet; Android Chrome downloads it and the notification
opens the import flow. Do not add `download`, do not add `target`, do not
`preventDefault()`, and do not switch to a Blob or `data:` URI.

One iOS quirk worth knowing: on that contact sheet, **"Create New Contact" sits
below the fold**. People tap Done, believe they saved, and did not. That is why
the button changes state and the page then coaches them to scroll.

## Rotating the slug

If the URL ever leaks, it is cheap to change and the old one dies permanently
(unknown paths 404 — there is no SPA catch-all rewrite, deliberately):

1. Rename `c/kwavir462gj/` and `public/c/kwavir462gj/`.
2. Update `input.card` in `vite.config.js`.
3. Update `SLUG` in `scripts/build-vcard.mjs`, then `npm run vcard`.
4. Update `VCARD` and `CARD_URL` in `card.jsx`.
5. Regenerate `card-qr.js` and everything in `print/`.
6. Reprint the card.

## Before you print anything

The QR artwork is generated and verified to decode to the exact URL, but a printed
card cannot be patched. Test the deployed page first:

- [ ] iPhone, Safari, scanned from the actual camera app — does the contact sheet appear?
- [ ] Android Chrome, scanned from the camera — does the download and import work?
- [ ] Open the saved contact on each and confirm all eleven fields plus the photo
- [ ] Confirm the name reads `MSc, BSc` and not `MSc BSc` or just `MSc`
- [ ] `curl -sI https://kennedyabubakar.com/c/kwavir462gj/kennedy-abubakar.vcf` —
      `content-type: text/vcard`, and no `Location:` redirect
- [ ] The link pasted into a WhatsApp chat, opened on both phones
- [ ] The printed proof, indoors, under warm light — not just on screen

## One thing this does not fix

`kennedyabu85@gmail.com` already appears twice in the served HTML of the public
homepage — in the `<noscript>` block and in the JSON-LD `"email"` field. That
address is long since harvested. Keeping it there is a reasonable trade for the
Knowledge Graph, but it does mean the private card buys nothing for *that*
address specifically. If you want a genuinely private, revocable address on the
card, use a fresh one there and leave the public one where it is.

import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const entry = (p) => fileURLToPath(new URL(p, import.meta.url));

// Three independent HTML documents, not one SPA with routes:
//   /                 the public portfolio
//   /scrapbook/       the design and motion gallery
//   /c/kwavir462gj/   the unlisted contact card reached only by QR
// Keeping them separate means the private page carries its own <head>
// (noindex, no-referrer) and never ships the portfolio's bundle.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: entry('./index.html'),
        scrapbook: entry('./scrapbook/index.html'),
        card: entry('./c/kwavir462gj/index.html'),
      },
    },
  },
});

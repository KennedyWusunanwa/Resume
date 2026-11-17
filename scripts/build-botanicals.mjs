// Draws the palms and plants that sit, very faintly, behind the site.
//
// Run with:  npm run botanicals
//
// The output (public/botanicals/*.svg) is committed, so this only needs
// re-running to change the drawings. Everything is generated from a seeded
// random number generator, so the same seed always gives the same plant.
// Each file is a single-colour silhouette; how faint it appears is decided in
// styles.css (.botanicals), not here.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const OUT = path.join(root, 'public', 'botanicals');

const rng = (seed) => () => {
  // mulberry32
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const f = (n) => n.toFixed(1);
const rad = (deg) => (deg * Math.PI) / 180;
const norm = ([x, y]) => {
  const l = Math.hypot(x, y) || 1;
  return [x / l, y / l];
};

// One pinnate palm frond: an arching midrib with leaflets down both sides.
// `angle` is the direction it leaves the base (0 = right, 90 = up); `droop`
// is how far, as a fraction of its length, the tip falls under its own weight.
function frond({ base, angle, length, droop = 0.3, leaflets = 30, leaf = 0.34, rand }) {
  const [bx, by] = base;
  const dx = Math.cos(rad(angle));
  const dy = -Math.sin(rad(angle));
  const p0 = [bx, by];
  const p1 = [bx + dx * length * 0.55, by + dy * length * 0.55 - length * 0.06];
  const p2 = [bx + dx * length, by + dy * length + droop * length];
  const at = (t) => [
    (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
    (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
  ];
  const tan = (t) =>
    norm([
      2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]),
      2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]),
    ]);

  let d = '';

  // Midrib: a thin tapering sliver.
  const left = [];
  const right = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const [x, y] = at(t);
    const [tx, ty] = tan(t);
    const w = length * (0.011 * (1 - t) + 0.0015);
    left.push([x - ty * w, y + tx * w]);
    right.push([x + ty * w, y - tx * w]);
  }
  d += `M${left.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}L${right
    .reverse()
    .map(([x, y]) => `${f(x)} ${f(y)}`)
    .join('L')}Z`;

  // Leaflets: slim lenses, angled toward the tip and pulled down by gravity.
  for (let i = 1; i <= leaflets; i++) {
    const t = Math.min(1, 0.1 + (0.9 * i) / leaflets);
    const [x, y] = at(t);
    const [tx, ty] = tan(t);
    const size = length * leaf * Math.max(0, Math.sin(Math.PI * t ** 0.72)) ** 0.6;
    for (const side of [-1, 1]) {
      const spread = rad((64 - 30 * t) * side + (rand() - 0.5) * 9);
      let dir = [
        tx * Math.cos(spread) - ty * Math.sin(spread),
        tx * Math.sin(spread) + ty * Math.cos(spread),
      ];
      dir = norm([dir[0], dir[1] + 0.42]);
      const len = size * (0.82 + rand() * 0.3);
      if (!(len >= 4)) continue;
      const tip = [x + dir[0] * len, y + dir[1] * len + len * 0.1];
      const mid = [x + dir[0] * len * 0.45, y + dir[1] * len * 0.45];
      const w = len * 0.06 + 1.1;
      const px = -dir[1] * w;
      const py = dir[0] * w;
      d += `M${f(x)} ${f(y)}Q${f(mid[0] + px)} ${f(mid[1] + py)} ${f(tip[0])} ${f(tip[1])}Q${f(
        mid[0] - px
      )} ${f(mid[1] - py)} ${f(x)} ${f(y)}Z`;
    }
  }
  return d;
}

// A leaning trunk: a tapering ribbon along a gentle curve.
function trunk({ foot, crown, lean, width }) {
  const [x0, y0] = foot;
  const [x1, y1] = crown;
  const c = [x0 + lean, (y0 + y1) / 2];
  const left = [];
  const right = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * c[0] + t ** 2 * x1;
    const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * c[1] + t ** 2 * y1;
    const [tx, ty] = norm([
      2 * (1 - t) * (c[0] - x0) + 2 * t * (x1 - c[0]),
      2 * (1 - t) * (c[1] - y0) + 2 * t * (y1 - c[1]),
    ]);
    const w = width * (1 - 0.5 * t) * (t < 0.08 ? 1.35 - t * 4.4 : 1);
    left.push([x - ty * w, y + tx * w]);
    right.push([x + ty * w, y - tx * w]);
  }
  return `M${left.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}L${right
    .reverse()
    .map(([x, y]) => `${f(x)} ${f(y)}`)
    .join('L')}Z`;
}

function palmTree({ seed, foot, crown, lean, width, reach, count = 11 }) {
  const rand = rng(seed);
  let d = trunk({ foot, crown, lean, width });
  for (let i = 0; i < count; i++) {
    const angle = -28 + (236 * i) / (count - 1) + (rand() - 0.5) * 10;
    const up = Math.sin(rad(angle));
    d += frond({
      base: crown,
      angle,
      length: reach * (0.78 + rand() * 0.3) * (0.8 + 0.2 * Math.max(up, 0)),
      droop: 0.16 + 0.5 * (1 - Math.max(up, 0)) + rand() * 0.08,
      leaflets: 26,
      leaf: 0.3,
      rand,
    });
  }
  return d;
}

// A clump of upright fronds, like an areca palm in a pot.
function clump({ seed, base, reach, count = 8, from = 28, to = 152 }) {
  const rand = rng(seed);
  let d = '';
  for (let i = 0; i < count; i++) {
    const angle = from + ((to - from) * i) / (count - 1) + (rand() - 0.5) * 8;
    const up = Math.sin(rad(angle));
    d += frond({
      base: [base[0] + (rand() - 0.5) * 16, base[1]],
      angle,
      length: reach * (0.62 + 0.38 * up) * (0.85 + rand() * 0.25),
      droop: 0.08 + 0.3 * (1 - up) + rand() * 0.06,
      leaflets: 22,
      leaf: 0.26,
      rand,
    });
  }
  return d;
}

const svg = (w, h, d, fill) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><path fill="${fill}" d="${d}"/></svg>\n`;

// Emerald for light pages; a pale version for the dark band.
const INK = '#047857';
const PALE = '#f6f4ec';

const drawings = {
  // A tall palm leaning in from the left.
  'palm-tree': [
    640,
    1000,
    palmTree({ seed: 7, foot: [250, 1000], crown: [330, 330], lean: -70, width: 17, reach: 300 }),
  ],
  // A pair: one tall, one shorter, for the bottom corner of a section.
  'palm-pair': [
    900,
    900,
    palmTree({ seed: 21, foot: [560, 900], crown: [600, 300], lean: 60, width: 15, reach: 270 }) +
      palmTree({ seed: 4, foot: [250, 900], crown: [290, 520], lean: -40, width: 12, reach: 210, count: 9 }),
  ],
  // Fronds hanging in from the top-right corner, as if from a tree out of frame.
  canopy: [
    760,
    620,
    (() => {
      const rand = rng(12);
      let d = '';
      for (const [angle, length, droop] of [
        [196, 520, 0.42],
        [214, 470, 0.5],
        [236, 400, 0.52],
        [258, 330, 0.3],
        [178, 430, 0.3],
      ]) {
        d += frond({ base: [770, -20], angle, length, droop, leaflets: 30, leaf: 0.32, rand });
      }
      return d;
    })(),
  ],
  // A low clump of upright fronds.
  clump: [700, 560, clump({ seed: 33, base: [350, 570], reach: 470 })],
};

fs.mkdirSync(OUT, { recursive: true });
for (const [name, [w, h, d]] of Object.entries(drawings)) {
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg(w, h, d, INK));
  fs.writeFileSync(path.join(OUT, `${name}-pale.svg`), svg(w, h, d, PALE));
  console.log(`${name}.svg  ${(d.length / 1024).toFixed(0)} KB`);
}

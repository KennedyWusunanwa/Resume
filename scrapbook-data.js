// The scrapbook's contents. A selection, not an archive.
//
// Each image lives in public/scrapbook/ twice: `<slug>.webp` (long side up to
// 2000 px, opened in the lightbox) and `<slug>-thumb.webp` (up to 800 px wide,
// shown in the grid). `w` and `h` are the full image's pixel size and are what
// keep the grid from jumping while images load, so keep them accurate.
//
// To add a piece: export both sizes as WebP, drop them in public/scrapbook/,
// and add an entry to the right group below.

const img = (slug, w, h, title, note) => ({ slug, w, h, title, note });

export const sections = [
  {
    id: 'summit',
    nav: 'Summit',
    eyebrow: 'Event identity · 2026',
    title: 'Boardroom Governance Summit',
    body:
      'Africa’s annual boardroom summit — 12 November 2026, Labadi Beach Hotel, Accra. I led the creative and digital side: event branding and print from the stage backdrop to the delegate brochure, the speaker and panel screens, the digital pull-up content, social media and the website.',
    link: { label: 'boardroomgovsummit.com', href: 'https://boardroomgovsummit.com/' },
    groups: [
      {
        items: [
          img('bgs-stage', 2000, 1125, 'The stage', 'Three LED screens · 3 m × 4 m each'),
          img('bgs-billboard', 1333, 2000, 'Billboard', '“One Summit” · 6 m × 9 m'),
          img('bgs-main-screen', 2000, 1500, 'Main screen', 'LED artwork · 4 m × 3 m'),
          img('bgs-stage-backdrop', 2000, 990, 'Stage backdrop', '44 ft × 10 ft, printed in one piece'),
          img('bgs-speaker-screen', 2000, 1500, 'Speaker screens', 'One per speaker · 4 m × 3 m'),
          img('bgs-entrance-arch', 2000, 1333, 'Entrance arch', 'Front view, to scale'),
          img('bgs-brochure', 1413, 2000, 'Delegate brochure', 'Cover · A4'),
          img('bgs-programme', 1414, 2000, 'On-the-day programme', 'A4'),
          img('bgs-panel-screen', 2000, 1500, 'Panel screens', 'One per panel · 4 m × 3 m'),
          img('bgs-pullups', 2000, 1333, 'Pull-up banners', '80 × 200 cm'),
          img('bgs-digital-pullups', 2000, 1600, 'Digital pull-ups', 'Three of 55 slides for the pull-up screens'),
          img('bgs-registration-desk', 2000, 1333, 'Registration desk', 'Front 400 × 97 cm'),
          img('bgs-flags', 2000, 1333, 'Telescopic flags', '39 × 157.5 in'),
          img('bgs-tags', 2000, 1333, 'Delegate tags', '4.13 × 4.66 in'),
        ],
      },
    ],
  },
  {
    id: 'flyers',
    nav: 'Flyers',
    eyebrow: 'Flyers · 2026',
    title: 'CEM New York',
    body:
      'Event flyers and daily countdown series for Charismatic Evangelistic Ministry, New York, where I run media.',
    link: { label: 'cemnewyork.com', href: 'https://cemnewyork.com/' },
    groups: [
      {
        items: [
          img('cem-finish-well', 1080, 1440, 'Prophetic Finish Well Conference', 'Main flyer · November'),
          img('cem-leadership-meeting', 1080, 1350, 'Leadership Meeting', 'November'),
          img('cem-pastoral-induction', 1254, 1254, 'Pastoral Induction Weekend', 'August'),
          img('cem-countdown', 1080, 1440, 'Conference countdown', 'A flyer a day, from 34 days out'),
          img('cem-womens-ministry', 2000, 2000, 'Women’s Ministry at 10', 'Anniversary weekend · May'),
          img('cem-apostolic-visitation', 1254, 1254, 'Apostolic Visitation', 'New Jersey branch · August'),
        ],
      },
    ],
  },
  {
    id: 'brands',
    nav: 'Brands',
    eyebrow: 'Identity · print · packaging',
    title: 'Brands',
    body:
      'Logos, launch material and packaging for companies I run, partner in, or was hired by.',
    groups: [
      {
        label: 'Hayame',
        note: 'Car-sharing marketplace, Ghana · founder',
        items: [
          img('hayame-next-chapter', 2000, 2000, 'Hayame 2.0 teaser', 'Social'),
          img('hayame-going-live', 1500, 2000, 'Launch poster', '12 November 2026'),
          img('hayame-pullups', 2000, 1333, 'Pull-up banners', 'Hayame × AutoDiaries · 80 × 200 cm'),
        ],
      },
      {
        label: 'Checkmate Vehicle Inspections',
        note: 'Identity and price-list flyers',
        items: [
          img('checkmate-packages', 1600, 2000, 'Inspection packages', 'Flyer 1 of 5'),
          img('checkmate-history', 1600, 2000, 'History packages', 'Flyer 2 of 5'),
          img('checkmate-logo', 1536, 1024, 'Wordmark', 'Reversed'),
        ],
      },
      {
        label: 'Marks',
        note: 'Logos and concept rounds',
        items: [
          img('logo-kingsley-basintale', 1994, 2000, 'Kingsley Basintale', 'Personal mark · black, gold, white'),
          img('logo-godfather', 2000, 2000, 'Godfather', 'Script wordmark'),
          img('logo-gabriel-basintale', 2000, 1663, 'Gabriel Basintale', 'Twenty concepts, one round'),
        ],
      },
      {
        label: 'Gennaio Naturals',
        note: 'Packaging and Amazon storefront · partner',
        items: [
          img('gennaio-labels', 2000, 710, 'Label system', 'Four of the nineteen front labels'),
          img('gennaio-brochure', 2000, 1333, 'Bi-fold brochure', 'Print'),
          img('gennaio-store-banner', 2000, 400, 'Amazon store banner', 'Storefront header'),
        ],
      },
    ],
  },
];

// Short films. Each is a 540 × 960 H.264 MP4 in public/scrapbook/video/ with a
// WebP poster of the same name. `href` is optional: set it to the post's public
// URL (Instagram, TikTok, YouTube) and the tile gains a "Watch on …" link.
export const films = [
  { slug: 'hayame-app-ad', title: 'Hayame — app ad', note: 'Motion graphics · 64 s' },
  { slug: 'hayame-launch', title: 'Hayame — launch film', note: '38 s' },
  { slug: 'chequer-wraps-ppf', title: 'Chequer Automotive — Wraps & PPF', note: '49 s' },
  { slug: 'chequer-rims', title: 'Chequer Automotive — Rims', note: '43 s' },
  { slug: 'chequer-port-of-tema', title: 'Chequer Automotive — Port of Tema', note: '41 s' },
];

export const logoAnimation = {
  slug: 'chequer-logo-animation',
  title: 'Chequer Automotive — logo animation',
  note: '5 s · delivered with a transparent background for overlaying on footage',
};

// Four tiles for the teaser on the portfolio's front page.
export const teaser = [
  { slug: 'cem-finish-well', label: 'Flyers', to: '/scrapbook/#flyers' },
  { slug: 'checkmate-packages', label: 'Brands', to: '/scrapbook/#brands' },
  { slug: 'logo-kingsley-basintale', label: 'Marks', to: '/scrapbook/#brands' },
  { slug: 'hayame-app-ad', label: 'Motion', to: '/scrapbook/#motion', video: true },
];

// Four tiles for the summit band on the portfolio's front page.
export const summitTiles = [
  { slug: 'bgs-stage-backdrop', label: 'Stage' },
  { slug: 'bgs-brochure', label: 'Brochure' },
  { slug: 'bgs-speaker-screen', label: 'Screens' },
  { slug: 'bgs-billboard', label: 'Billboard' },
];

// Institutions I have worked with: 28 institutions and partners, and 7 media
// houses.
//
// Each logo in public/partners/ is not a picture but an alpha mask: a WebP whose
// only information is how opaque each pixel is. The page paints one flat colour
// through it (see .logo-mask in styles.css), which is what makes logos from
// dozens of brand palettes sit together as one set. To add one, save any logo
// as a transparent single-colour WebP of about 320 x 170 px and add a row here;
// `r` is its width divided by its height, used to give every logo the same
// visual weight rather than the same box.

export const institutions = [
  { slug: 'volta-river-authority', name: 'Volta River Authority', short: 'VRA', r: 1.159 },
  { slug: 'ghana-bar-association', name: 'Ghana Bar Association', short: 'GBA', r: 1.035 },
  { slug: 'institute-of-chartered-accountants-ghana', name: 'Institute of Chartered Accountants, Ghana', short: 'ICAG', r: 1.141 },
  { slug: 'ghana-institution-of-engineering', name: 'Ghana Institution of Engineering', short: 'GhIE', r: 3.077 },
  { slug: 'labadi-beach-hotel', name: 'Labadi Beach Hotel', r: 1.928 },
  { slug: 'ghana-national-chamber-of-commerce-and-industry', name: 'Ghana National Chamber of Commerce and Industry', short: 'GNCCI', r: 2.336 },
  { slug: 'panavest-international-partners', name: 'PanAvest International & Partners', r: 2.119 },
  { slug: 'ghana-chamber-of-bulk-oil-distributors', name: 'Ghana Chamber of Bulk Oil Distributors', short: 'CBOD', r: 2.162 },
  { slug: 'sustainable-development-goals', name: 'Sustainable Development Goals', short: 'SDGs', r: 1.905 },
  { slug: 'ghana-institute-of-procurement-and-supply', name: 'Ghana Institute of Procurement and Supply', short: 'GIPS', r: 1.329 },
  { slug: 'state-interests-and-governance-authority', name: 'State Interests and Governance Authority', short: 'SIGA', r: 0.929 },
  { slug: 'the-bank-hospital', name: 'The Bank Hospital', r: 1.0 },
  { slug: 'ghana-institution-of-surveyors', name: 'Ghana Institution of Surveyors', short: 'GhIS', r: 0.841 },
  { slug: 'institute-of-directors-ghana', name: 'Institute of Directors-Ghana', short: 'IoD', r: 0.976 },
  { slug: 'african-supply-chain-confederation', name: 'African Supply Chain Confederation', short: 'ASCON', r: 0.947 },
  { slug: 'african-corporate-governance-network', name: 'African Corporate Governance Network', short: 'ACGN', r: 0.735 },
  { slug: 'chartered-institute-of-logistics-and-transport', name: 'Chartered Institute of Logistics and Transport', short: 'CILT', r: 2.667 },
  { slug: 'african-continental-free-trade-area', name: 'African Continental Free Trade Area', short: 'AfCFTA', r: 0.988 },
  { slug: 'chartered-institute-of-directors-nigeria', name: 'Chartered Institute of Directors Nigeria', short: 'CIoD', r: 0.976 },
  { slug: 'ghana-south-africa-business-chamber', name: 'Ghana South Africa Business Chamber', short: 'GSABC', r: 3.137 },
  { slug: 'african-union', name: 'African Union', short: 'AU', r: 1.118 },
  { slug: 'vice-chancellors-ghana', name: 'Vice Chancellors Ghana', short: 'VCG', r: 0.882 },
  { slug: 'federation-of-associations-of-ghanaian-exporters', name: 'Federation of Associations of Ghanaian Exporters', short: 'FAGE', r: 3.107 },
  { slug: 'association-of-ghana-industries', name: 'Association of Ghana Industries', short: 'AGI', r: 2.667 },
  { slug: 'uk-ghana-chamber-of-commerce', name: 'UK-Ghana Chamber of Commerce', short: 'UKGCC', r: 2.689 },
  { slug: 'agenda-2063', name: 'Agenda 2063', r: 1.482 },
  { slug: 'public-procurement-authority', name: 'Public Procurement Authority', short: 'PPA', r: 1.012 },
  { slug: 'nvame', name: 'NVAME', r: 3.019 },
];

export const media = [
  { slug: 'global-media-alliance', name: 'Global Media Alliance', short: 'GMA', r: 3.721 },
  { slug: 'tv3', name: 'TV3', r: 1.365 },
  { slug: 'yfm-ghana', name: 'YFM Ghana', r: 1.424 },
  { slug: 'happy-98-9-fm', name: 'Happy 98.9 FM', r: 1.905 },
  { slug: 'ghone-tv', name: 'GHOne TV', r: 1.676 },
  { slug: 'business24', name: 'Business24', r: 1.088 },
  { slug: 'investment-times', name: 'Investment Times', r: 3.205 },
];

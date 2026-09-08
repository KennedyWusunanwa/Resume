// Builds the .vcf served by the contact card.
//
// Run with:  npm run vcard
//
// The output is committed, so this only needs re-running when the details or the
// photo change. Everything fiddly about vCard lives here rather than in the page.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const SLUG = 'kwavir462gj';
const OUT = path.join(root, 'public', 'c', SLUG, 'kennedy-abubakar.vcf');
const PHOTO = path.join(root, 'scripts', 'vcard-photo.jpg');

// --- vCard primitives -------------------------------------------------------

// Within a value these four characters carry structural meaning and must be
// escaped. Backslash goes first, or we would escape our own escapes.
const esc = (v) =>
  String(v)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');

// RFC 2426 / 6350: lines fold at 75 octets and continuations begin with one
// space. The limit counts octets, not characters, so we fold over a byte buffer
// and back off any UTF-8 continuation byte rather than splitting a sequence.
// This matters most for the base64 PHOTO, which is one enormous line.
function fold(line) {
  const bytes = Buffer.from(line, 'utf8');
  if (bytes.length <= 75) return line;

  const out = [];
  let start = 0;
  let limit = 75;
  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length);
    while (end > start && end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    out.push((start === 0 ? '' : ' ') + bytes.subarray(start, end).toString('utf8'));
    start = end;
    limit = 74; // continuation lines spend one octet on the leading space
  }
  return out.join('\r\n');
}

const card = (lines) => lines.map(fold).join('\r\n') + '\r\n';

// --- the details ------------------------------------------------------------

const photo = fs.readFileSync(PHOTO).toString('base64');

const lines = [
  'BEGIN:VCARD',
  // 3.0, not 4.0: iOS, Android, Outlook and Gmail all import 3.0 cleanly, and
  // 3.0 is the version whose base64 PHOTO actually renders on both phones.
  'VERSION:3.0',
  // family;given;additional;prefix;suffix. The comma is escaped so the suffix
  // is one literal string; unescaped it is a two-value list, and importers then
  // disagree — some render 'MSc BSc', some drop 'BSc' entirely.
  `N:Abubakar;Kennedy;Wusunanwa;;${esc('MSc, BSc')}`,
  'FN:Kennedy Wusunanwa Abubakar',
  `ORG:${esc('PanAvest International & Partners')}`,
  `TITLE:${esc('Lead Software Engineer')}`,
  `ROLE:${esc('Full Stack & Digital Systems')}`,
  'TEL;TYPE=CELL,VOICE,PREF:+233202337612',
  'TEL;TYPE=CELL,VOICE:+233545173885',
  'EMAIL;TYPE=INTERNET,PREF:kennedyabu85@gmail.com',
  'EMAIL;TYPE=INTERNET,WORK:kennedy@panavest.com',
  'URL:https://kennedyabubakar.com',
  'URL:https://www.panavest.com',
  `NOTE:${esc('Lead Software Engineer, Full Stack & Digital Systems. MSc, BSc.')}`,
  `PHOTO;ENCODING=b;TYPE=JPEG:${photo}`,
  // A fixed REV keeps the build reproducible; bump it when the details change.
  'REV:2026-09-08T00:00:00Z',
  'END:VCARD',
];

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, card(lines), 'utf8');

const size = fs.statSync(OUT).size;
console.log(`wrote ${path.relative(root, OUT)} — ${(size / 1024).toFixed(1)} KB`);
console.log(`photo ${(photo.length / 1024).toFixed(1)} KB base64`);

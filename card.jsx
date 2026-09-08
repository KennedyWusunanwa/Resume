import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  Share2,
  UserPlus,
} from 'lucide-react';
import { QR_PATH, QR_SIZE } from './card-qr.js';

// Reached by scanning the QR on a printed card and nothing else, so it is
// designed backwards from that moment: a stranger, one hand, thirty seconds
// after a handshake. One tap saves everything; the rest is a quiet ledger.

const VCARD = '/c/kwavir462gj/kennedy-abubakar.vcf';
const CARD_URL = 'https://kennedyabubakar.com/c/kwavir462gj';

// Assembled at runtime rather than written out whole. The page is client-rendered
// and noindexed, so none of this reaches the served HTML — this just means a
// regex sweep over the JS bundle does not come back with a harvestable address
// either. It stops harvesters, not people, which is the honest goal.
const mail = (user, domain) => `${user}@${domain}`;
const dial = (rest) => `+233${rest}`;

const IDENTITY = {
  first: 'Kennedy',
  middle: 'Wusunanwa',
  last: 'Abubakar.',
  quals: 'MSc, BSc',
  title: 'Lead Software Engineer',
  focus: 'Full Stack & Digital Systems',
  company: 'PanAvest International & Partners',
};

const PHONE_1 = dial('202337612');
const PHONE_2 = dial('545173885');
const EMAIL_1 = mail('kennedyabu85', 'gmail.com');
const EMAIL_2 = mail('kennedy', 'panavest.com');

const GROUPS = [
  {
    label: 'Call',
    rows: [
      {
        key: 'Mobile · primary',
        value: '+233 20 233 7612',
        href: `tel:${PHONE_1}`,
        copy: PHONE_1,
        wa: `https://wa.me/${PHONE_1.slice(1)}`,
        numeric: true,
      },
      {
        key: 'Mobile · alternate',
        value: '+233 54 517 3885',
        href: `tel:${PHONE_2}`,
        copy: PHONE_2,
        wa: `https://wa.me/${PHONE_2.slice(1)}`,
        numeric: true,
      },
    ],
  },
  {
    label: 'Write',
    rows: [
      { key: 'Personal', value: EMAIL_1, href: `mailto:${EMAIL_1}`, copy: EMAIL_1 },
      { key: 'PanAvest', value: EMAIL_2, href: `mailto:${EMAIL_2}`, copy: EMAIL_2 },
    ],
  },
  {
    label: 'On the web',
    rows: [
      {
        key: 'Portfolio',
        value: 'www.kennedyabubakar.com',
        href: 'https://www.kennedyabubakar.com',
        copy: 'https://www.kennedyabubakar.com',
        external: true,
      },
      {
        key: 'Company',
        value: 'www.panavest.com',
        href: 'https://www.panavest.com',
        copy: 'https://www.panavest.com',
        external: true,
      },
    ],
  },
];

const PLAIN_TEXT = [
  `Kennedy Wusunanwa Abubakar (${IDENTITY.quals})`,
  `${IDENTITY.title} — ${IDENTITY.focus}`,
  IDENTITY.company,
  '',
  ...GROUPS.flatMap((g) => g.rows.map((r) => r.value)),
].join('\n');

// ---------- helpers ----------

// navigator.clipboard needs a secure context and is quietly missing from a few
// in-app webviews, which is exactly where this page often gets opened.
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function buzz() {
  try {
    navigator.vibrate?.(12);
  } catch {
    /* not available, and not important enough to care */
  }
}

function useAccraTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Accra',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
}

// Instagram and Facebook on Android embed a raw WebView where file downloads are
// restricted or dropped silently — the save tap simply appears to do nothing. No
// clever download trick fixes that; telling the person is the fix.
function useInAppBrowser() {
  const [trapped, setTrapped] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent || '';
    setTrapped(/FBAN|FBAV|FB_IAB|Instagram|Line\/|Twitter|Snapchat/i.test(ua));
  }, []);
  return trapped;
}

// ---------- pieces ----------

function SaveButton({ onSave, saved }) {
  return (
    <a
      // No `download` attribute and no target, on purpose. With `download`, iOS
      // Safari files the .vcf away in Files instead of opening the Add Contact
      // sheet — which is the one tap this whole page exists for.
      href={VCARD}
      type="text/vcard"
      onClick={onSave}
      className={`btn btn-primary save-btn w-full justify-center ${saved ? 'btn-saved' : ''}`}
    >
      {saved ? <Check size={19} /> : <UserPlus size={19} />}
      {saved ? 'Saved — check your contacts' : 'Save to contacts'}
    </a>
  );
}

function Row({ row, onCopy }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    const ok = await copyText(row.copy);
    if (ok) buzz();
    onCopy(ok ? 'Copied' : 'Could not copy — long-press the text instead');
    if (!ok) return;
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className="tap-row flex items-center gap-2 px-2 sm:px-3">
      <a
        href={row.href}
        {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="tap-target flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-2 py-3.5"
      >
        <span className="eyebrow key flex items-center gap-1.5">
          {row.key}
          {row.external && <ArrowUpRight size={11} />}
        </span>
        {/* Wraps rather than truncates. An ellipsis on kennedy@panavest.com when
            the row maths is a few pixels off is silent data loss. */}
        <span
          className={`break-words font-mono text-[0.875rem] leading-snug tracking-tight text-[var(--ink)] min-[360px]:text-base ${
            row.numeric ? 'tabular-nums' : ''
          }`}
        >
          {row.value}
        </span>
      </a>

      {row.wa && (
        <a
          href={row.wa}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-icon"
          aria-label={`Message ${row.key} on WhatsApp`}
        >
          <MessageCircle size={17} />
        </a>
      )}

      <button type="button" onClick={copy} className="tap-icon" aria-label={`Copy ${row.key}`}>
        {done ? <Check size={17} className="text-[var(--emerald)]" /> : <Copy size={16} />}
      </button>
    </div>
  );
}

// ---------- page ----------

export default function Card() {
  const time = useAccraTime();
  const trapped = useInAppBrowser();

  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState('');
  const [inlineVisible, setInlineVisible] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const inlineSave = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => setCanShare(typeof navigator !== 'undefined' && !!navigator.share), []);

  const say = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1900);
  }, []);

  // The dock stands down only while the inline button is genuinely on screen —
  // never the other way round, so there is no phone on which the page can paint
  // without a visible save target.
  useEffect(() => {
    const el = inlineSave.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInlineVisible(e.intersectionRatio >= 0.6), {
      threshold: [0, 0.6, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const onSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 8000);
  };

  const copyAll = async () => {
    const ok = await copyText(PLAIN_TEXT);
    if (ok) buzz();
    say(ok ? 'All details copied' : 'Could not copy — select the text instead');
  };

  const copyLink = async () => {
    const ok = await copyText(CARD_URL);
    if (ok) buzz();
    say(ok ? 'Link copied' : 'Could not copy the link');
  };

  const share = async () => {
    try {
      await navigator.share({ title: 'Kennedy Wusunanwa Abubakar', url: CARD_URL });
    } catch {
      /* the sheet was dismissed — nothing to report */
    }
  };

  return (
    <div className="screen-md px-3 sm:px-5 md:grid md:place-items-center md:py-12">
      <main className="mx-auto w-full max-w-[560px] pb-32 md:max-w-[680px] plate-md md:p-10 md:pb-10 lg:p-12 lg:pb-12">
        {trapped && (
          <div className="card mt-4 flex flex-col gap-3 p-4 md:mt-0">
            <p className="text-[0.8125rem] leading-relaxed text-[var(--ink-soft)]">
              You opened this inside an app’s built-in browser, which often blocks
              file downloads. If saving does nothing, open this link in Safari or
              Chrome.
            </p>
            <button type="button" onClick={copyLink} className="btn btn-ghost h-11 justify-center">
              <Copy size={15} /> Copy the link
            </button>
          </div>
        )}

        {/* ---- first screen: who, and the one button ---- */}
        <section className="screen flex flex-col justify-between py-6 md:block md:py-0">
          <div className="eyebrow flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="dot" /> Accra · {time}
            </span>
            <span>Complimentary card</span>
          </div>

          <div className="text-center md:mt-10 md:grid md:grid-cols-[168px_1fr] md:items-center md:gap-9 md:text-left">
            <div className="relative mx-auto w-[clamp(112px,26svh,156px)] md:mx-0 md:w-[168px]">
              {/* The halo is z-index:-1, so inside the white plate it would paint
                  behind the plate's own fill and vanish. It only belongs on the
                  cream background. */}
              <div className="portrait-halo md:hidden" aria-hidden="true" />
              <div className="portrait aspect-square">
                <img
                  src="/portrait-card.jpg"
                  alt="Kennedy Wusunanwa Abubakar"
                  width="800"
                  height="800"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <h1 className="font-display text-[clamp(1.9rem,8.6vw,2.9rem)] leading-[0.94] tracking-[-0.045em] md:text-[2.5rem] lg:text-[2.9rem]">
                <span className="split-word">
                  <span style={{ animationDelay: '60ms' }}>{IDENTITY.first}</span>
                </span>
                <br />
                <span className="split-word text-[var(--ink-mute)]">
                  <span style={{ animationDelay: '150ms' }}>{IDENTITY.middle}</span>
                </span>
                <br />
                <span className="split-word">
                  <span style={{ animationDelay: '240ms' }}>{IDENTITY.last}</span>
                </span>
              </h1>

              <p className="eyebrow mt-3">{IDENTITY.quals}</p>

              <div className="hairline mx-auto my-5 w-[160px] md:mx-0 md:w-[120px]" />

              <p className="font-display text-[1.0625rem] md:text-lg">{IDENTITY.title}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{IDENTITY.focus}</p>
              <p className="mt-2 text-sm font-medium text-[var(--emerald)]">{IDENTITY.company}</p>
            </div>
          </div>

          <div className="md:mt-10">
            <div ref={inlineSave}>
              <SaveButton onSave={onSave} saved={saved} />
            </div>

            {/* Naming the payload is what converts the tap. */}
            <p className="eyebrow whisper mt-3 text-center text-[var(--ink-soft)] md:text-left">
              Saves name, both numbers, both emails and both sites.
            </p>

            {saved && (
              <p className="eyebrow whisper mt-2 text-center text-[var(--ink-mute)] md:text-left">
                On iPhone, scroll down inside the sheet and tap “Create New Contact”.
              </p>
            )}

            {/* Someone who wants to dial right now should not have to scroll. */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <a href={`tel:${PHONE_1}`} className="btn btn-ghost h-12 justify-center">
                <Phone size={15} /> Call
              </a>
              <a href={`mailto:${EMAIL_1}`} className="btn btn-ghost h-12 justify-center">
                <Mail size={15} /> Email
              </a>
            </div>

            <a href="#details" className="eyebrow mt-6 flex items-center justify-center gap-2 md:hidden">
              All details <ChevronDown size={13} className="bob" />
            </a>
          </div>
        </section>

        {/* ---- the ledger ---- */}
        <section id="details" className="pt-10 md:pt-12">
          <div className="hairline mb-10 hidden md:block" />

          <div className="space-y-7">
            {GROUPS.map((group) => (
              <div key={group.label}>
                <p className="eyebrow mb-2.5">{group.label}</p>
                <div className="card overflow-hidden">
                  {group.rows.map((row) => (
                    <Row key={row.value} row={row} onCopy={say} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Escape hatches. Some in-app browsers refuse file downloads outright,
              and this is the way out for someone who cannot get the .vcf open. */}
          <div className="mt-8 space-y-2.5">
            <button type="button" onClick={copyAll} className="btn btn-ghost h-12 w-full justify-center">
              <Copy size={15} /> Copy all details as text
            </button>
            {canShare && (
              <button type="button" onClick={share} className="btn btn-ghost h-12 w-full justify-center">
                <Share2 size={15} /> Share this card
              </button>
            )}
            <a
              href="https://kennedyabubakar.com"
              rel="noreferrer"
              className="btn btn-ghost h-12 w-full justify-center"
            >
              See the full portfolio <ArrowUpRight size={15} />
            </a>
          </div>

          {/* A stranger is about to put an unknown man in their address book from
              a QR code. Saying exactly what lands there is the least we can do. */}
          <details className="card mt-7 p-5">
            <summary className="eyebrow cursor-pointer list-none">What gets saved ↓</summary>
            <ul className="mt-4 space-y-1.5 font-mono text-[0.8125rem] leading-relaxed text-[var(--ink-soft)]">
              <li>Kennedy Wusunanwa Abubakar · {IDENTITY.quals}</li>
              <li>{IDENTITY.title}</li>
              <li>{IDENTITY.focus}</li>
              <li>{IDENTITY.company}</li>
              {GROUPS.flatMap((g) => g.rows).map((r) => (
                <li key={r.value}>{r.value}</li>
              ))}
              <li>A photo, so the name has a face against it.</li>
            </ul>
            <p className="eyebrow whisper mt-4 text-[var(--ink-mute)]">
              Nothing is uploaded and nothing is tracked. The file downloads
              straight to your phone.
            </p>
          </details>

          {/* Pass-it-on: open the card and let someone scan it off the screen
              when there is no printed card to hand. */}
          <details className="card mt-3 p-5">
            <summary className="eyebrow cursor-pointer list-none">Pass it on — show this code ↓</summary>
            <div className="mt-5 flex flex-col items-center gap-3">
              <div className="rounded-2xl bg-white p-4">
                <svg
                  viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
                  shapeRendering="crispEdges"
                  className="h-[168px] w-[168px]"
                  role="img"
                  aria-label="QR code that opens this contact card"
                >
                  <path stroke="#14110d" d={QR_PATH} />
                </svg>
              </div>
              <p className="eyebrow whisper text-center text-[var(--ink-mute)]">
                Anyone who scans this lands on the same card.
              </p>
              <button type="button" onClick={copyLink} className="btn btn-ghost h-11 justify-center">
                <ExternalLink size={15} /> Copy the link instead
              </button>
            </div>
          </details>

          <footer className="mt-10 border-t border-[var(--line)] pt-6 text-center md:text-left">
            <p className="eyebrow">Kennedy Wusunanwa Abubakar · {IDENTITY.quals}</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--ink-mute)]">
              This page is unlisted. It exists because we met.
            </p>
          </footer>
        </section>
      </main>

      {/* ---- overlays ---- */}
      <div className={`dock md:hidden ${inlineVisible ? 'is-down' : ''}`}>
        <div className="mx-auto max-w-[560px]">
          <SaveButton onSave={onSave} saved={saved} />
        </div>
      </div>

      <div className={`toast ${toast ? 'is-up' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

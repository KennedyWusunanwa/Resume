import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Reveal, ScrollProgress, useActiveSection, useHashScroll } from './reveal.jsx';
import { films, logoAnimation, sections } from './scrapbook-data.js';

const src = (slug) => `/scrapbook/${slug}.webp`;
const thumb = (slug) => `/scrapbook/${slug}-thumb.webp`;
const film = (slug) => `/scrapbook/video/${slug}.mp4`;
const poster = (slug) => `/scrapbook/video/${slug}.webp`;

const navIds = [...sections.map((s) => s.id), 'motion'];
const navNames = {
  ...Object.fromEntries(sections.map((s) => [s.id, s.nav])),
  motion: 'Motion',
};

// ---------- Lightbox ----------

function Lightbox({ items, index, onClose, onStep }) {
  const closeRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onStep(1);
      else if (e.key === 'ArrowLeft') onStep(-1);
      else if (e.key === 'Tab') {
        // Three controls and nothing else: keep focus inside the dialog.
        const nodes = [...document.querySelectorAll('.lightbox button')];
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — ${item.group}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close">
        <X size={18} />
      </button>
      <button className="lightbox-btn lightbox-prev" onClick={() => onStep(-1)} aria-label="Previous">
        <ArrowLeft size={18} />
      </button>
      <button className="lightbox-btn lightbox-next" onClick={() => onStep(1)} aria-label="Next">
        <ArrowRight size={18} />
      </button>

      <figure className="lightbox-figure">
        <img
          key={item.slug}
          src={src(item.slug)}
          width={item.w}
          height={item.h}
          alt={`${item.title} — ${item.group}`}
        />
        <figcaption>
          <span className="lightbox-title">{item.title}</span>
          <span className="eyebrow">
            {item.group} · {item.note} · {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

// ---------- Tiles ----------

function Tile({ item, onOpen }) {
  return (
    <button type="button" className="tile" onClick={onOpen} aria-label={`Open ${item.title}`}>
      <span className="tile-frame">
        <img
          src={thumb(item.slug)}
          width={item.w}
          height={item.h}
          alt={`${item.title} — ${item.group}`}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="tile-caption">
        <span className="tile-title">{item.title}</span>
        <span className="eyebrow">{item.note}</span>
      </span>
    </button>
  );
}

function Film({ item, wide = false }) {
  const onPlay = (e) => {
    // One at a time: starting a film pauses whichever was playing.
    document.querySelectorAll('.film video').forEach((v) => {
      if (v !== e.currentTarget) v.pause();
    });
  };
  return (
    <figure className={`film ${wide ? 'film-wide' : ''}`}>
      <video
        controls
        playsInline
        preload="none"
        poster={poster(item.slug)}
        onPlay={onPlay}
        aria-label={item.title}
      >
        <source src={film(item.slug)} type="video/mp4" />
      </video>
      <figcaption className="tile-caption">
        <span className="tile-title">{item.title}</span>
        <span className="eyebrow">{item.note}</span>
        {item.href && (
          <a className="link eyebrow" href={item.href} target="_blank" rel="noopener noreferrer">
            Watch the post ↗
          </a>
        )}
      </figcaption>
    </figure>
  );
}

// ---------- Page ----------

export default function Scrapbook() {
  useHashScroll();
  const active = useActiveSection(navIds);

  // One flat list drives the lightbox, so the arrows walk the whole page.
  const all = useMemo(
    () =>
      sections.flatMap((s) =>
        s.groups.flatMap((g) =>
          g.items.map((it) => ({ ...it, group: g.label ? g.label : s.title }))
        )
      ),
    []
  );
  const indexOf = useMemo(() => Object.fromEntries(all.map((it, i) => [it.slug, i])), [all]);

  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + all.length) % all.length)),
    [all.length]
  );

  return (
    <div className="relative">
      <div className="botanicals" aria-hidden="true" />
      <ScrollProgress />

      <nav className="nav-pill" aria-label="Scrapbook">
        <a href="/" className="nav-home" aria-label="Back to the portfolio">
          <ArrowLeft size={13} /> Home
        </a>
        {navIds.map((id) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
            {navNames[id]}
          </a>
        ))}
      </nav>

      <main className="page px-5 md:px-10 lg:px-16 max-w-[1240px] mx-auto">
        {/* ---- Intro ---- */}
        <header className="pt-36 md:pt-44 pb-6">
          <Reveal>
            <p className="eyebrow mark mb-6">Scrapbook · Design &amp; motion</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] max-w-4xl">
              Things I’ve designed, printed, and{' '}
              <span className="accent">put on a stage</span>.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed max-w-2xl">
              The other half of the work: event identities, flyers, logos, packaging and
              short films, usually made alongside the software. A selection, not an
              archive — {all.length} pieces and {films.length + 1} films.
            </p>
          </Reveal>
        </header>

        {/* ---- Image sections ---- */}
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="section">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-10 md:mb-14">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="eyebrow mark mb-3">{s.eyebrow}</p>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="font-display text-3xl md:text-5xl leading-[1.02]">{s.title}</h2>
                </Reveal>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal delay={120}>
                  <p className="text-[var(--ink-soft)] text-base md:text-lg leading-relaxed">
                    {s.body}
                  </p>
                  {s.link && (
                    <a
                      href={s.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link eyebrow mt-5"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {s.link.label} <ArrowUpRight size={13} />
                      </span>
                    </a>
                  )}
                </Reveal>
              </div>
            </div>

            {s.groups.map((g, gi) => (
              <div key={g.label || gi} className={g.label ? 'mt-14 first:mt-0' : ''}>
                {g.label && (
                  <Reveal>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-4 mb-6 border-b border-[var(--line)]">
                      <h3 className="font-display text-xl md:text-2xl">{g.label}</h3>
                      <span className="eyebrow">{g.note}</span>
                    </div>
                  </Reveal>
                )}
                <div className="tiles">
                  {g.items.map((it) => (
                    <Tile
                      key={it.slug}
                      item={{ ...it, group: g.label || s.title }}
                      onOpen={() => setOpen(indexOf[it.slug])}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}

        {/* ---- Motion ---- */}
        <section id="motion" className="section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-10 md:mb-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow mark mb-3">Film · 2026</p>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.02]">Motion</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={120}>
                <p className="text-[var(--ink-soft)] text-base md:text-lg leading-relaxed">
                  Vertical ads cut for Instagram and TikTok — for Hayame, and for Chequer
                  Automotive in Accra. Sound on.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="films">
            {films.map((f) => (
              <Film key={f.slug} item={f} />
            ))}
          </div>

          <div className="mt-10 md:mt-14 max-w-3xl">
            <Film item={logoAnimation} wide />
          </div>
        </section>

        {/* ---- Close ---- */}
        <section className="section pt-0">
          <div className="card p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="eyebrow mb-4">Need something made?</p>
              <h2 className="font-display text-3xl md:text-5xl leading-[1] max-w-xl">
                Software, a stage, or the flyer for both.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/#contact" className="btn btn-primary">
                Get in touch <ArrowUpRight size={16} />
              </a>
              <a href="/#work" className="btn btn-ghost">
                See the software
              </a>
            </div>
          </div>
        </section>

        <footer className="py-10 border-t border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-4 eyebrow">
          <a href="/" className="link">
            ← kennedyabubakar.com
          </a>
          <p className="normal-case tracking-normal text-[var(--ink-soft)] text-sm">
            Designed &amp; built by Kennedy.
          </p>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>

      {open !== null && <Lightbox items={all} index={open} onClose={close} onStep={step} />}
    </div>
  );
}

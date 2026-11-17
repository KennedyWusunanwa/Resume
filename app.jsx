import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Download,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
} from 'lucide-react';
import { Reveal, ScrollProgress, useActiveSection, useHashScroll } from './reveal.jsx';
import { summitTiles, teaser } from './scrapbook-data.js';

// ---------- Hooks ----------

function useAccraTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Accra',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
  return time;
}

// ---------- Data ----------

const stats = [
  { value: '15+', label: 'Shipped products' },
  { value: '2', label: 'Apps on the App Store' },
  { value: '3', label: 'Continents' },
  { value: '44 ft', label: 'Widest thing I’ve designed' },
];

// What I led at the Boardroom Governance Summit 2026.
const summit = [
  {
    title: 'Branding & print',
    body: 'Event branding and print, from the stage backdrop to the delegate brochure.',
  },
  {
    title: 'Screens',
    body: 'Speaker and panel screens, and the digital pull-up content.',
  },
  {
    title: 'Social & web',
    body: 'Social media and the summit website.',
  },
  {
    title: 'Coordination',
    body: 'Event coordination with the printers, the AV team and the organisers.',
  },
];

const hayame = {
  appStore: 'https://apps.apple.com/gh/app/hayame/id6760410961',
  apk: 'https://www.hayamegh.com/downloads/hayame-android.apk',
  site: 'https://www.hayamegh.com',
  shots: [
    ['02-find-your-next-ride', 'Find your next ride'],
    ['03-book-in-minutes', 'Book in minutes'],
    ['04-pay-safely', 'Pay safely in the app'],
    ['05-every-trip-on-track', 'Every trip, on track'],
    ['06-chat-with-your-host', 'Chat with your host'],
    ['07-your-car-your-income', 'Your car, your income'],
  ],
};

const kds = {
  appStore: 'https://apps.apple.com/gh/app/panavest-kds/id6755534884',
  site: 'https://panavestkds.com',
};

const featured = [
  {
    name: 'SCMpedia',
    role: 'Reference · Knowledge platform',
    tagline:
      'A launched supply-chain encyclopedia at scmpedia.org — structured for students, professionals, and the curious.',
    href: 'https://www.scmpedia.org/',
    stack: ['Reference', 'Knowledge', 'Web'],
    year: '2026',
  },
  {
    name: 'HumanClarity AI',
    role: 'AI tool · Consumer SaaS',
    tagline:
      'Turn AI-written text into undetectable, human-sounding content. Bypasses Turnitin, GPTZero, Originality.ai and the rest — instantly.',
    href: 'https://www.humanclarityai.com/',
    stack: ['AI', 'SaaS', 'Web'],
    year: '2026',
  },
  {
    name: 'Opsara',
    role: 'Industrial SaaS · B2B',
    tagline:
      'Real-time operations visibility for fuel logistics and mining — built for the people running the yard, not the people on the slide deck.',
    href: 'https://opsara.vercel.app',
    stack: ['SaaS', 'B2B', 'Realtime'],
    year: '2026',
  },
  {
    name: 'Jano Hospital',
    role: 'Healthcare · Management System',
    tagline:
      'A management layer and digital front door for a working hospital. Designed for clinicians, not committees.',
    href: 'https://www.janoms.com',
    stack: ['Healthcare', 'Web', 'Systems'],
    year: '2024',
  },
];

const projects = [
  { name: 'FERN', link: 'https://hospital-ref.vercel.app/', tag: 'Hospital referrals', live: true },
  { name: 'KudiDash', link: 'https://kudidash.vercel.app/', tag: 'Accounting SaaS', live: true },
  { name: 'Wusu Humanizer', link: 'https://wusu-humanizer-one.vercel.app/', tag: 'AI tool', live: true },
  { name: 'PassportSnap', link: 'https://quickpass-lyart.vercel.app/', tag: 'Utility', live: true },
  { name: 'Leti Arts', link: 'https://www.letiarts.com/', tag: 'Studio', live: true },
  { name: 'Gennaio Naturals', link: 'https://gennaionaturals.com/', tag: 'E-commerce', live: true },
  { name: 'CEM New York', link: 'https://cemnewyork.com/', tag: 'Ministry', live: true },
  { name: 'Charismatic Holdings', link: 'https://charismaticholdingsllc.com/', tag: 'Portfolio', live: true },
  { name: 'Gida Ruddy', link: 'https://gida-ruddy.vercel.app/', tag: 'Personal R&D', live: false },
];

const companies = [
  'PanAvest International & Partners',
  'Boardroom Governance Summit',
  'MYO Global',
  'NyansaKasa',
  'Gennaio Naturals',
  'Hayame',
  'Leti Arts',
  'CEM New York',
  'Chequer Automotive',
  'Ashesi University',
  'Infinix Mobile',
  'Transsion Holdings',
];

const experience = [
  {
    role: 'Senior Associate Software Engineer · Full Stack & Digital Systems',
    company: 'PanAvest International & Partners',
    span: '2025 — Now',
    detail:
      'Web, app and event systems across the PanAvest group — the KDS learning platform, the Boardroom Governance Summit, MYO and NyansaKasa. Accra and Johannesburg.',
  },
  {
    role: 'Creative & digital lead',
    company: 'Boardroom Governance Summit 2026',
    span: '2026',
    detail:
      'Event branding and print, speaker and panel screens, digital pull-up content, social media and the website, and coordination with the printers, the AV team and the organisers. Also built the organising team’s planning dashboard.',
  },
  {
    role: 'Web Developer · Marketing · Designer',
    company: 'MYO Global Organization',
    span: '2025 — Now',
    detail: 'Digital strategy, web architecture, and design for global outreach.',
  },
  {
    role: 'Web Developer · Marketing · Designer',
    company: 'NyansaKasa',
    span: '2025 — Now',
    detail: 'Digital presence, web platforms, and strategy.',
  },
  {
    role: 'Partner',
    company: 'Gennaio Naturals',
    span: '2024 — Now',
    detail: 'Brand presence, e-commerce platform, and business partnership.',
  },
  {
    role: 'Founder',
    company: 'Hayame',
    span: '2023 — Now',
    detail:
      'Started as car rental, sale and logistics; now a car-sharing marketplace on the web, iOS and Android.',
  },
  {
    role: 'Lead Web Manager',
    company: 'Leti Arts',
    span: '2023 — Now',
    detail: 'Web architecture and digital presence for a premier African game studio.',
  },
  {
    role: 'Media Manager',
    company: 'CEM New York INC',
    span: '2024 — Now',
    detail: 'Digital media operations, content strategy, platform presence.',
  },
  {
    role: 'Software QA Analyst',
    company: 'Transsion Holdings',
    span: '2023 — 2025',
    detail: 'Testing and QA protocols for high-quality software delivery.',
  },
  {
    role: 'Event Organizer',
    company: 'Infinix Mobile',
    span: '2023 — 2025',
    detail: 'Corporate events, promotional activities, tech showcases.',
  },
  {
    role: 'Teaching Assistant',
    company: 'Ashesi University',
    span: '2025',
    detail: 'Supported a TEDx event for the Department of Law.',
  },
];

const organisations = [
  {
    name: 'PanAvest International & Partners',
    kind: 'The firm',
    body: 'Supply-chain advisory with offices in Accra and Johannesburg. I’m the Senior Associate Software Engineer — full stack and digital systems.',
    href: 'https://www.panavest.com/',
    site: 'panavest.com',
  },
  {
    name: 'Boardroom Governance Summit',
    kind: 'Annual summit',
    body: 'Board chairs, directors and regulators in one room in Accra, once a year. I led the creative and digital side of the 2026 edition.',
    href: 'https://boardroomgovsummit.com/',
    site: 'boardroomgovsummit.com',
  },
  {
    name: 'My Future, Your Future, Our Future',
    kind: 'MYO · Non-profit',
    body: 'A youth-focused organisation building the future we want, starting with Africa. Web, design and digital outreach.',
    href: 'https://myoglobal.org/',
    site: 'myoglobal.org',
  },
  {
    name: 'NyansaKasa',
    kind: 'Words of wisdom',
    body: 'Akan for “words of wisdom” — a platform for the mindset the continent’s future needs. Digital presence and design.',
  },
];

const education = [
  {
    school: 'University of Professional Studies, Accra',
    degree: 'MBA, Information Systems',
    span: '2025 — 2027 (expected)',
    note: 'Strategic IT, enterprise architecture, data governance.',
    current: true,
  },
  {
    school: 'Ghana Communication Technology University',
    degree: 'B.Sc. Information Technology',
    span: 'Completed 2023',
    note: 'Second-Class Upper. Organizer, Association of Computing Students.',
  },
  {
    school: 'IPMC Ghana',
    degree: 'AWS Certified',
    span: 'Certified',
    note: 'Cloud architecture, AWS services.',
  },
  {
    school: 'NIIT Ghana',
    degree: 'Python & Programming',
    span: 'Certified',
    note: 'Software programming concepts.',
  },
];

const capabilities = [
  { title: 'Full-stack web', body: 'React, modern build tooling, and a habit of shipping.' },
  { title: 'Mobile', body: 'iOS and Android apps — App Store deployments, not prototypes.' },
  { title: 'Desktop', body: 'Cross-platform desktop apps where the web doesn’t quite reach.' },
  { title: 'Digital strategy', body: 'Brand systems, growth motions, and the operational glue.' },
  { title: 'Design', body: 'UI, identity, print and motion — from an app screen to a 44-foot stage backdrop.' },
  { title: 'Ownership', body: 'Founder, partner, lead — comfortable holding the whole thing, not just a slice.' },
];

const socials = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/kennedy-abubakar-919834189' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/kennedy_abubakar/?hl=en' },
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/p/Kennedyabubakar-61560112862267/' },
];

// Every tracked section, in document order — the active-section tracker depends
// on the order. Only the ones with a name appear in the nav; the rest exist so
// the pill un-highlights while you read them.
const sectionIds = ['top', 'about', 'summit', 'apps', 'work', 'design', 'trajectory', 'contact'];
const sectionNames = {
  top: 'Intro',
  about: 'About',
  summit: 'Summit',
  apps: 'Apps',
  work: 'Work',
  design: 'Design',
  contact: 'Contact',
};

// ---------- App ----------

export default function App() {
  useHashScroll();
  const time = useAccraTime();
  const active = useActiveSection(sectionIds);

  return (
    <div className="relative">
      <div className="botanicals" aria-hidden="true" />
      <ScrollProgress />

      {/* Floating nav */}
      <nav className="nav-pill" aria-label="Primary">
        {sectionIds
          .filter((id) => sectionNames[id])
          .map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              {sectionNames[id]}
            </a>
          ))}
      </nav>

      <main className="page px-5 md:px-10 lg:px-16 max-w-[1240px] mx-auto">
        {/* ---- HERO ---- */}
        <section id="top" className="min-h-screen flex flex-col justify-center pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <p className="eyebrow flex items-center gap-3 mb-8">
                  <span className="dot" />
                  <span>Available · Accra · {time}</span>
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-[clamp(3rem,8.5vw,7rem)] leading-[0.95]">
                  Kennedy
                  <br />
                  <span className="text-[var(--ink-mute)]">Wusunanwa</span>
                  <br />
                  Abubakar.
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-8 text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed max-w-xl">
                  Senior Associate Software Engineer at PanAvest International &amp;
                  Partners, and a founder. I design and build calm, considered software —
                  and the brands, stages and films around it — from Accra, for the world.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#work" className="btn btn-primary">
                    See selected work <ArrowUpRight size={16} />
                  </a>
                  <a href="/scrapbook/" className="btn btn-ghost">
                    Design scrapbook <ArrowUpRight size={16} />
                  </a>
                  <a href="mailto:kennedyabu85@gmail.com" className="btn btn-ghost">
                    <Mail size={15} /> Get in touch
                  </a>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <dl className="hero-meta">
                  <div>
                    <dt className="eyebrow">Now</dt>
                    <dd>Full stack &amp; digital systems</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Based</dt>
                    <dd>Accra, Ghana</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Credentials</dt>
                    <dd>BSc IT · MIIPGH · MIAENG</dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="relative max-w-md mx-auto lg:ml-auto lg:mr-0">
                <span className="orb orb-a" aria-hidden="true" />
                <span className="orb orb-b" aria-hidden="true" />
                <div className="portrait portrait-arch">
                  <img src="/portrait.png" alt="Kennedy Abubakar" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Stats ---- */}
        <section aria-label="In numbers">
          <Reveal>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd className="metric">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ---- Marquee ---- */}
        <section className="pt-16 pb-6 md:pt-20 overflow-hidden">
          <Reveal>
            <p className="eyebrow text-center mb-6">
              People and organisations I’ve worked with
            </p>
          </Reveal>
          <div className="marquee-mask">
            <div className="marquee">
              {[...companies, ...companies].map((c, i) => (
                <span
                  key={i}
                  className="font-display text-2xl md:text-3xl text-[var(--ink-mute)]"
                >
                  {c}
                  <span className="mx-6 text-[var(--line-strong)]">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---- About ---- */}
        <section id="about" className="section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mark mb-3">About</p>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.05]">
                  Building software that <span className="accent">feels considered</span>.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 space-y-5 text-[var(--ink-soft)] text-lg leading-relaxed">
              <Reveal delay={120}>
                <p>
                  I write code, run companies, and design the small things between them.
                  Most of my work lives in Ghana but reaches further — apps on the App Store,
                  e-commerce in New York, learning platforms used by Pan-African educators,
                  and a governance summit that convenes in Accra every year.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  I’m partway through an MBA in Information Systems at UPSA, a member of
                  IAENG, IIPGH, and the Internet Society. I show up early, ship calmly,
                  and prefer one well-made thing over ten half-made ones.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Organisations ---- */}
        <section className="section pt-0">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <Reveal>
              <div>
                <p className="eyebrow mark mb-3">Day job</p>
                <h2 className="font-display text-3xl md:text-4xl max-w-2xl leading-[1.05]">
                  One firm, and the organisations around it.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow">Accra · Johannesburg</span>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {organisations.map((o, i) => {
              const inner = (
                <>
                  <p className="eyebrow">{o.kind}</p>
                  <h3 className="font-display text-xl md:text-2xl mt-3 leading-tight">{o.name}</h3>
                  <p className="text-[var(--ink-soft)] text-sm md:text-base leading-relaxed mt-3">
                    {o.body}
                  </p>
                  {o.href && (
                    <p className="eyebrow mt-auto pt-6 flex items-center gap-1.5 text-[var(--emerald)]">
                      {o.site} <ArrowUpRight size={13} />
                    </p>
                  )}
                </>
              );
              return (
                <Reveal key={o.name} delay={i * 50}>
                  {o.href ? (
                    <a
                      href={o.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-6 md:p-7 h-full flex flex-col"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="card p-6 md:p-7 h-full flex flex-col">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ---- Summit band ---- */}
        <section id="summit" className="band">
          <div className="band-plants" aria-hidden="true" />
          <div className="band-inner px-5 md:px-10 lg:px-16 max-w-[1240px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow mark mb-5">BGS 2026 in review</p>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="font-display text-4xl md:text-6xl leading-[0.98]">
                    I led the creative and digital side of the summit.
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={120}>
                  <p className="band-lead">
                    The Boardroom Governance Summit 2026 — 12 November, Labadi Beach Hotel,
                    Accra. Africa’s board chairs, directors and regulators in one room, and
                    everything they looked at that day.
                  </p>
                </Reveal>
              </div>
            </div>

            <Reveal delay={160}>
              <ol className="steps">
                {summit.map((s, i) => (
                  <li key={s.title}>
                    <span className="steps-n">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-10 md:mt-12">
              {summitTiles.map((t, i) => (
                <Reveal key={t.slug} delay={i * 60}>
                  <a href="/scrapbook/#summit" className="teaser-tile">
                    <img
                      src={`/scrapbook/${t.slug}-thumb.webp`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{t.label}</span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="/scrapbook/#summit" className="btn btn-light">
                  See all the summit designs <ArrowUpRight size={16} />
                </a>
                <a
                  href="https://boardroomgovsummit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                >
                  boardroomgovsummit.com <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Apps ---- */}
        <section id="apps" className="section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow mark mb-5">Pet project · iOS · Android · Web</p>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="font-display text-4xl md:text-5xl leading-[1] flex items-center gap-4">
                  <img
                    src="/apps/hayame-icon.webp"
                    alt=""
                    width="56"
                    height="56"
                    className="app-icon"
                  />
                  Hayame
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 text-[var(--ink-soft)] text-lg leading-relaxed">
                  Ghana’s car-sharing marketplace: rent a car from someone down the road,
                  or put your own car to work. I founded it, and I design and build all of
                  it — the web platform and the iOS and Android apps.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={hayame.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    App Store <ArrowUpRight size={16} />
                  </a>
                  <a href={hayame.apk} className="btn btn-ghost">
                    <Download size={15} /> Android APK
                  </a>
                  <a
                    href={hayame.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    hayamegh.com <ArrowUpRight size={16} />
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8 min-w-0">
              <Reveal delay={100}>
                <ul className="shots" aria-label="Hayame app screenshots" tabIndex={0}>
                  {hayame.shots.map(([file, label]) => (
                    <li key={file}>
                      <img
                        src={`/apps/hayame-${file}.webp`}
                        width="660"
                        height="1434"
                        alt={`Hayame app — ${label}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-4">Scroll sideways · the screens on the App Store listing</p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={80}>
            <div className="card mt-14 p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              <div className="md:col-span-8">
                <p className="eyebrow">Also in the App Store · Learning platform · Web + iOS</p>
                <h3 className="font-display text-3xl md:text-4xl mt-3">PanAvest KDS</h3>
                <p className="mt-4 text-[var(--ink-soft)] text-base md:text-lg leading-relaxed max-w-2xl">
                  The Knowledge Development Series as a learning system: assessments,
                  e-books, and verifiable certificates. Web platform and iOS app, both live.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
                <a
                  href={kds.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  App Store <ArrowUpRight size={16} />
                </a>
                <a
                  href={kds.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  panavestkds.com <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---- Selected Work ---- */}
        <section id="work" className="section">
          <div className="flex items-baseline justify-between mb-10 md:mb-14">
            <Reveal>
              <div>
                <p className="eyebrow mark mb-3">Selected work</p>
                <h2 className="font-display text-3xl md:text-4xl">
                  A few things I’m proud of.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <a href="#index" className="link eyebrow hidden md:inline-block">
                All projects ↘
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 md:gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card block p-6 md:p-10 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                    <div className="md:col-span-1 eyebrow">{String(i + 1).padStart(2, '0')}</div>
                    <div className="md:col-span-7">
                      <h3 className="font-display text-3xl md:text-4xl leading-tight">
                        {p.name}
                        <ArrowUpRight
                          className="inline-block ml-2 align-middle text-[var(--ink-mute)] group-hover:text-[var(--emerald)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                          size={24}
                        />
                      </h3>
                      <p className="eyebrow mt-2">{p.role} · {p.year}</p>
                      <p className="mt-4 text-[var(--ink-soft)] text-base md:text-lg leading-relaxed max-w-2xl">
                        {p.tagline}
                      </p>
                    </div>
                    <div className="md:col-span-4 flex flex-wrap gap-2 md:justify-end md:items-start">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs font-mono text-[var(--ink-soft)] px-2.5 py-1 border border-[var(--line)] rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* ---- Project Index ---- */}
          <div id="index" className="mt-20 md:mt-28">
            <Reveal>
              <div className="flex items-baseline justify-between mb-8">
                <h3 className="font-display text-2xl md:text-3xl">More projects</h3>
                <span className="eyebrow">{String(projects.length).padStart(2, '0')} entries</span>
              </div>
            </Reveal>

            <div className="border-t border-[var(--line)]">
              {projects.map((p, i) => (
                <Reveal key={p.name} delay={i * 40}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="row group"
                  >
                    <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                    <span className="row-title">{p.name}</span>
                    <span className="eyebrow row-tag">{p.tag}</span>
                    <span className="eyebrow flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: p.live ? 'var(--emerald-bright)' : 'var(--ink-mute)' }}
                      />
                      {p.live ? 'Live' : 'In dev'}
                      <ArrowUpRight
                        size={16}
                        className="ml-1 text-[var(--ink-mute)] group-hover:text-[var(--emerald)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Design & motion ---- */}
        <section id="design" className="section">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
            <Reveal>
              <div>
                <p className="eyebrow mark mb-3">Design &amp; motion</p>
                <h2 className="font-display text-3xl md:text-4xl max-w-2xl leading-[1.05]">
                  The half that isn’t code: flyers, brands, logos, film.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <a href="/scrapbook/" className="btn btn-primary">
                Open the scrapbook <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {teaser.map((t, i) => (
              <Reveal key={t.slug} delay={i * 60}>
                <a href={t.to} className="teaser-tile">
                  <img
                    src={t.video ? `/scrapbook/video/${t.slug}.webp` : `/scrapbook/${t.slug}-thumb.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{t.label}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Capabilities ---- */}
        <section className="section">
          <Reveal>
            <p className="eyebrow mark mb-3">Capabilities</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display text-3xl md:text-4xl max-w-2xl leading-[1.05] mb-12">
              The full surface area — done quietly, and on time.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ol className="steps steps-light">
              {capabilities.map((c, i) => (
                <li key={c.title}>
                  <span className="steps-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* ---- Trajectory ---- */}
        <section id="trajectory" className="section">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
            <div className="side-meta">
              <Reveal>
                <p className="eyebrow mark mb-3">Trajectory</p>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.05]">
                  Rooms I’ve been in, and what I built while I was there.
                </h2>
              </Reveal>
            </div>
            <div>
              {experience.map((e, i) => (
                <Reveal key={i} delay={Math.min(i, 6) * 40}>
                  <div className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-2 md:gap-10 py-5 border-b border-[var(--line)]">
                    <p className="eyebrow self-start pt-1">{e.span}</p>
                    <div>
                      <h4 className="font-display text-lg md:text-xl leading-tight">
                        {e.role}
                      </h4>
                      <p className="text-[var(--emerald)] text-sm font-medium mt-0.5">
                        {e.company}
                      </p>
                      <p className="text-[var(--ink-soft)] mt-2 text-sm md:text-base leading-relaxed">
                        {e.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Education ---- */}
        <section className="section">
          <Reveal>
            <p className="eyebrow mark mb-3">Foundation</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-2xl leading-[1.05]">
              Education, certifications, memberships.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {education.map((e, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="card p-6 md:p-7 h-full flex flex-col relative">
                  {e.current && (
                    <span className="absolute top-5 right-5 eyebrow flex items-center gap-2 text-[var(--emerald)]">
                      <span className="dot" /> In progress
                    </span>
                  )}
                  <p className="eyebrow">{e.span}</p>
                  <h4 className="font-display text-xl md:text-2xl mt-3">{e.degree}</h4>
                  <p className="text-[var(--emerald)] text-sm font-medium mt-1">
                    {e.school}
                  </p>
                  <p className="text-[var(--ink-soft)] text-sm md:text-base leading-relaxed mt-3">
                    {e.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section id="contact" className="section">
          <Reveal>
            <p className="eyebrow mark mb-6">Contact</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
              Tell me what you’re <span className="accent">trying to make</span>.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <a
              href="mailto:kennedyabu85@gmail.com"
              className="inline-flex items-center gap-3 mt-10 link font-display text-2xl md:text-3xl"
            >
              kennedyabu85@gmail.com
              <ArrowUpRight size={26} className="text-[var(--emerald)]" />
            </a>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link eyebrow flex items-center gap-2"
                >
                  <s.icon size={14} /> {s.name}
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---- Footer ---- */}
        <footer className="py-10 border-t border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-4 eyebrow">
          <div className="flex items-center gap-3">
            <span className="dot" />
            <span>Accra · {time}</span>
          </div>
          <p className="normal-case tracking-normal text-[var(--ink-soft)] text-sm">
            Designed &amp; built by Kennedy.
          </p>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()}</span>
            <span>v 3.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

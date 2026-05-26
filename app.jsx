import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, Linkedin, Instagram, Facebook } from 'lucide-react';

// ---------- Hooks ----------

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

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

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [ids]);
  return active;
}

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (ref.current) ref.current.style.width = `${p * 100}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={ref} className="scroll-progress" />;
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------- Data ----------

const featured = [
  {
    n: '01',
    name: 'HumanClarity AI',
    role: 'AI tool · Consumer SaaS',
    tagline:
      'Turn AI-written text into undetectable, human-sounding content. Bypasses Turnitin, GPTZero, Originality.ai and the rest — instantly.',
    href: 'https://www.humanclarityai.com/',
    stack: ['AI', 'SaaS', 'Web'],
    year: '2026',
  },
  {
    n: '02',
    name: 'SCMpedia',
    role: 'Reference · Knowledge platform',
    tagline:
      'An encyclopedic reference for the supply-chain discipline — structured for students, professionals, and the curious.',
    href: 'https://scmpedia.vercel.app/',
    stack: ['Reference', 'Knowledge', 'Web'],
    year: '2026',
  },
  {
    n: '03',
    name: 'PanAvest KDS',
    role: 'Learning platform · Web + iOS',
    tagline:
      'A learning system for assessments, e-books, and verifiable certificates. Web platform and a native iOS app, both live.',
    href: 'https://panavestkds.com',
    stack: ['React', 'Capacitor', 'iOS'],
    year: '2025',
  },
  {
    n: '04',
    name: 'Opsara',
    role: 'Industrial SaaS · B2B',
    tagline:
      'Real-time operations visibility for fuel logistics and mining — built for the people running the yard, not the people on the slide deck.',
    href: 'https://opsara.vercel.app',
    stack: ['SaaS', 'B2B', 'Realtime'],
    year: '2026',
  },
  {
    n: '05',
    name: 'Hayame',
    role: 'Founder · Mobility',
    tagline:
      'Car rental, sale, and logistics in Ghana. Built from a blank canvas into a working business.',
    href: 'https://www.hayamegh.com',
    stack: ['Founder', 'Web', 'Strategy'],
    year: '2023 →',
  },
  {
    n: '06',
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
  'PanAvest International',
  'MYO Global',
  'NyansaKasa',
  'Gennaio Naturals',
  'Hayame',
  'Leti Arts',
  'CEM New York',
  'Ashesi University',
  'Infinix Mobile',
  'Transsion Holdings',
];

const experience = [
  {
    role: 'Web Developer · Marketing · Designer',
    company: 'PanAvest International',
    span: '2025 — Now',
    detail: 'Web and app products across the PanAvest ecosystem.',
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
    detail: 'Car rental, sale, and logistics — strategy and tech.',
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
  { title: 'Mobile', body: 'iOS apps with React + Capacitor — App Store deployments, not prototypes.' },
  { title: 'Desktop', body: 'Cross-platform desktop apps where the web doesn’t quite reach.' },
  { title: 'Digital strategy', body: 'Brand systems, growth motions, and the operational glue.' },
  { title: 'Design', body: 'UI, identity, and the small decisions that decide whether a product feels considered.' },
  { title: 'Ownership', body: 'Founder, partner, lead — comfortable holding the whole thing, not just a slice.' },
];

const socials = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/kennedy-abubakar-919834189' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/kennedy_abubakar/?hl=en' },
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/p/Kennedyabubakar-61560112862267/' },
];

const sectionIds = ['top', 'work', 'about', 'trajectory', 'contact'];
const sectionNames = {
  top: 'Intro',
  work: 'Work',
  about: 'About',
  trajectory: 'Path',
  contact: 'Contact',
};

// ---------- App ----------

export default function App() {
  const time = useAccraTime();
  const active = useActiveSection(sectionIds);

  return (
    <div className="relative">
      <ScrollProgress />

      {/* Floating nav */}
      <nav className="nav-pill" aria-label="Primary">
        {sectionIds.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : ''}
          >
            {sectionNames[id]}
          </a>
        ))}
      </nav>

      <main className="px-5 md:px-10 lg:px-16 max-w-[1240px] mx-auto">
        {/* ---- HERO ---- */}
        <section id="top" className="min-h-screen flex flex-col justify-center pt-32 pb-20">
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
                  Full-stack developer and founder. I design and build calm, considered
                  software — web, mobile, and desktop — from Accra, for the world.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#work" className="btn btn-primary">
                    See selected work <ArrowUpRight size={16} />
                  </a>
                  <a href="mailto:kennedyabu85@gmail.com" className="btn btn-ghost">
                    <Mail size={15} /> Get in touch
                  </a>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 eyebrow">
                  <span>BSc IT</span>
                  <span>MBA in progress · UPSA</span>
                  <span>MIIPGH · MIAENG</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="relative max-w-md mx-auto lg:ml-auto lg:mr-0">
                <div className="portrait-halo" aria-hidden="true" />
                <div className="portrait">
                  <img src="/portrait.png" alt="Kennedy Abubakar" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Marquee ---- */}
        <section className="py-10 md:py-14 overflow-hidden">
          <Reveal>
            <p className="eyebrow text-center mb-6">
              People and organisations I’ve worked with
            </p>
          </Reveal>
          <div className="relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
            />
            <div
              className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
            />
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

        {/* ---- About / Currently ---- */}
        <section id="about" className="section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-3">About</p>
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
                  e-commerce in New York, learning platforms used by Pan-African educators.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  I’m partway through an MBA in Information Systems at UPSA, a member of
                  IAENG, IIPGH, and the Internet Society. I show up early, ship calmly,
                  and prefer one well-made thing over ten half-made ones.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-[var(--line)]">
                  <div>
                    <p className="metric">15+</p>
                    <p className="eyebrow mt-2">Shipped products</p>
                  </div>
                  <div>
                    <p className="metric">3</p>
                    <p className="eyebrow mt-2">Continents</p>
                  </div>
                  <div>
                    <p className="metric">1</p>
                    <p className="eyebrow mt-2">App Store app</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Selected Work ---- */}
        <section id="work" className="section">
          <div className="flex items-baseline justify-between mb-10 md:mb-14">
            <Reveal>
              <div>
                <p className="eyebrow mb-3">Selected work</p>
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
              <Reveal key={p.n} delay={i * 60}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card block p-6 md:p-10 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                    <div className="md:col-span-1 eyebrow">{p.n}</div>
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

        {/* ---- Capabilities ---- */}
        <section className="section">
          <Reveal>
            <p className="eyebrow mb-3">Capabilities</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display text-3xl md:text-4xl max-w-2xl leading-[1.05] mb-12">
              The full surface area — done quietly, and on time.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <div className="card h-full p-6 md:p-7">
                  <p className="eyebrow mb-3">{String(i + 1).padStart(2, '0')} / 06</p>
                  <h4 className="font-display text-xl md:text-2xl mb-2">{c.title}</h4>
                  <p className="text-[var(--ink-soft)] leading-relaxed text-sm md:text-base">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Trajectory ---- */}
        <section id="trajectory" className="section">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
            <div className="side-meta">
              <Reveal>
                <p className="eyebrow mb-3">Trajectory</p>
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
            <p className="eyebrow mb-3">Foundation</p>
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
            <p className="eyebrow mb-6">Contact</p>
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
            <span>v 2.1</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import heroCutout from '@/assets/images/hero-cutout.png';
import gearEpic from '@/assets/gear/epic-sworks.jpg';
import gearGarmin from '@/assets/gear/garmin-edge-840.jpg';
import gearHeadset from '@/assets/gear/arctis-nova-pro.webp';
import gearKeyboard from '@/assets/gear/corsair-vanguard-96.jpg';
import gearLaptop from '@/assets/gear/rog-zephyrus-g16.jpg';
import gearMouse from '@/assets/gear/logitech-g-pro.jpg';
import gearScicon from '@/assets/gear/scicon-aeroshade.jpg';
import gearWilier from '@/assets/gear/wilier-rave.png';
import gearMonitor from '@/assets/gear/alienware-aw2725dm.jpg';
import gearLightBar from '@/assets/gear/xiaomi-monitor-light-bar.jpg';
import gearHelmet from '@/assets/gear/met-manta.jpg';
import gearShoes from '@/assets/gear/shimano-sh-xc903.jpg';
import gearVictus from '@/assets/gear/hp-victus-15.jpg';
import trailseekerWellington from '@/assets/images/trailseeker-wellington.jpg';
import deskSetup from '@/assets/images/desk-setup.jpg';
import raceReady from '@/assets/images/race-ready.jpg';
import longRide from '@/assets/images/long-ride.jpg';
import sworksUpgrades from '@/assets/images/sworks-upgrades.jpg';
import graduationPhoto from '@/assets/images/graduation-kyle.jpg';
import graduationSolo from '@/assets/images/graduation.jpg';
import topAchieverPhoto from '@/assets/images/top-achiever.jpg';
import goldenKeyBadge from '@/assets/images/golden-key.png';
import bigBen from '@/assets/images/big-ben.jpg';
import skillanceMark from '@/assets/images/skillance-mark.png';
import kcsMark from '@/assets/projects/kcs.webp';
import afrisistMark from '@/assets/projects/afrisist.png';
import afrisistFleet from '@/assets/projects/afrisist-fleet.jpg';
import rmsHome from '@/assets/projects/rms-home.jpg';
import skillanceHome from '@/assets/projects/skillance-home.jpg';
import rdaMark from '@/assets/projects/rda-logo.svg';
import eridgeRda from '@/assets/projects/eridge-rda.jpg';
import capePeninsula from '@/assets/video/cape-peninsula.mp4';
import capePeninsulaPoster from '@/assets/video/cape-peninsula.jpg';
import capeFriends from '@/assets/images/cape-friends.jpg';
import { BrandMark, type BrandMarkName } from '@/components/BrandMark';
import { fetchStravaSummary, type StravaStatBlock, type StravaUnavailable } from '@/lib/strava';
import { fetchContent } from '@/lib/content';
import { apiUrl } from '@/lib/api';
import { GithubActivity } from '@/components/GithubActivity';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useLenisEnter<T extends HTMLElement>(line = 0.88) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const check = () => {
      if (el.getBoundingClientRect().top >= window.innerHeight * line) return;
      setInView(true);
      window.removeEventListener('scroll', check);
      window.removeEventListener('lenis-frame', check);
    };
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('lenis-frame', check);
    check();
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('lenis-frame', check);
    };
  }, [line]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useLenisEnter<HTMLDivElement>(0.88);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = [
  ['#about', 'About', '01'],
  ['#journey', 'Journey', '02'],
  ['#projects', 'Work', '07'],
  ['#stack', 'Stack', '08'],
  ['#docs', 'Docs', '10'],
  ['#contact', 'Contact', '11'],
] as const;

function EdNav() {
  const drawer = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = drawer.current;
    if (!el) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') el.open = false;
    };
    const onPointer = (event: PointerEvent) => {
      if (!el.open || !(event.target instanceof Node) || el.contains(event.target)) return;
      el.open = false;
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  const closeDrawer = () => {
    if (drawer.current) drawer.current.open = false;
  };

  return (
    <nav className="ed-nav">
      <div className="ed-nav-inner">
        <a href="#top" className="ed-nav-brand">Markus Fourie</a>
        <div className="ed-nav-links">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <a className="ed-nav-cta" href="#contact">Get in touch</a>
        <details className="ed-nav-drawer" ref={drawer}>
          <summary>
            <span className="ed-nav-burger" aria-hidden="true"><i /><i /><i /></span>
            <span className="ed-nav-summary-label">Menu</span>
          </summary>
          <div className="ed-nav-drawer-links">
            {NAV_LINKS.map(([href, label, num]) => (
              <a key={href} href={href} onClick={closeDrawer}>
                <span>{num}</span>
                {label}
              </a>
            ))}
          </div>
        </details>
      </div>
    </nav>
  );
}

type HeroContent = {
  imageUrl?: string;
  imageAlt?: string;
  kicker?: string;
  lead?: string;
  sub?: string;
  work?: string;
  employment?: string;
};

function Hero({ ytdDistanceKm, content }: { ytdDistanceKm: string | null; content?: HeroContent | null }) {
  const year = new Date().getFullYear();
  const heroImg = content?.imageUrl || heroCutout;
  const heroAlt = content?.imageAlt || 'Markus Fourie';
  return (
    <section id="top" className="hero">
      <div className="ed-shell">
        <Reveal className="hero-main" delay={180}>
          <h1 className="hero-name">Markus Fourie</h1>
          <p className="hero-kicker">{content?.kicker || 'Full-stack developer · Pretoria, ZA'}</p>
          <div className="hero-text">
            <p className="hero-lead">
              {content?.lead || 'I build structured systems for the real world: resource platforms, operational tooling, and charity sites.'}
            </p>
            <p className="hero-sub">
              {content?.sub || 'React, Node.js, and ASP.NET. BSc Computer & Information Sciences.'}
            </p>
          </div>
          <div className="hero-actions">
            <a className="btn-solid" href="#projects">View work</a>
            <a className="btn-text" href="#contact">Get in touch</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><span>Work</span><span className="v">{content?.work || 'Rimitso · KCS'}</span></div>
            <div className="hero-stat"><span>Employment</span><span className="v">{content?.employment || 'Full time'}</span></div>
            <div className="hero-stat"><span>Km / {year}</span><span className="v">{ytdDistanceKm ?? '-'} km</span></div>
          </div>
        </Reveal>
        <Reveal className="hero-media" delay={0}>
          <img src={heroImg} alt={heroAlt} />
        </Reveal>
      </div>
    </section>
  );
}

type AboutContent = {
  ledeHtml?: string;
  sideHtml?: string[];
  images?: Array<{ slot: 'one' | 'two' | 'three'; url: string; label: string; meta: string }>;
};

type JourneyItem = {
  year: string;
  chip: string;
  title: string;
  desc: string;
  tags: string[];
};

type StackCat = { name: string; items: Array<{ n: string; y: string }> };
type GearItemT = { name: string; spec: string; cat: string; href: string };

function About({ content }: { content?: AboutContent | null }) {
  const side = content?.sideHtml?.length ? content.sideHtml : null;
  const sideNamesKyle = side?.some((html) => /kyle nel/i.test(html)) ?? false;
  const img = (slot: 'one' | 'two' | 'three') => content?.images?.find((i) => i.slot === slot) || null;
  const gradLabel = img('one')?.label;
  const gradCaption = !gradLabel || gradLabel === 'Graduation';
  return (
    <section id="about">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">01 · About</span>
          <span className="num">Biographical · v1.1</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="about-lede">
            {content?.ledeHtml ? (
              <p dangerouslySetInnerHTML={{ __html: content.ledeHtml }} />
            ) : (
              <p>
                I build operational software, and I race.
                Small steps, a long view.
              </p>
            )}
          </Reveal>
          <Reveal className="about-side" delay={120}>
            {side ? (
              <>
                {side.map((html, i) => <p key={i} dangerouslySetInnerHTML={{ __html: html }} />)}
                {!sideNamesKyle && (
                  <p>
                    <a href="https://skillance.co.za/" target="_blank" rel="noopener noreferrer">Skillance</a>
                    , a side hustle with{' '}
                    <a href="https://www.linkedin.com/in/kyle-nel-026742193/" target="_blank" rel="noopener noreferrer">Kyle Nel</a>
                    , a good friend and colleague. Launch still to come.
                  </p>
                )}
              </>
            ) : (
              <>
                <p>
                  Operational platforms for Rimitso Management Services and Katanga Contracting Services.
                  BSc Computer and Information Sciences, Varsity College (now Emeris), final year 2025. Top Achiever, 2025.
                  {' '}<a href="https://golden-key-international-honou.verified.cv/en/verify/20892159851455" target="_blank" rel="noopener noreferrer">Golden Key</a>
                  {' '}Top Performer, 23 April 2025.
                </p>
                <p>
                  <a href="https://skillance.co.za/" target="_blank" rel="noopener noreferrer">Skillance</a>
                  , a side hustle with{' '}
                  <a href="https://www.linkedin.com/in/kyle-nel-026742193/" target="_blank" rel="noopener noreferrer">Kyle Nel</a>
                  , a good friend and colleague. Launch still to come.
                </p>
              </>
            )}
          </Reveal>
          <div className="about-visual">
            <Reveal className="about-img one ph">
              <img src={img('one')?.url || graduationPhoto} alt={gradCaption ? 'Markus Fourie at graduation with Kyle Nel' : gradLabel} />
              <span>{img('one')?.meta || 'BSc · 2025'}</span>
              <span className="ph-label">
                {gradCaption ? (
                  <a href="https://www.linkedin.com/in/kyle-nel-026742193/" target="_blank" rel="noopener noreferrer">With Kyle Nel</a>
                ) : gradLabel}
              </span>
            </Reveal>
            <Reveal className="about-img two ph" delay={140}>
              <img src={img('two')?.url || topAchieverPhoto} alt={img('two')?.label || 'Varsity College Top Achiever award, 2025'} />
              <span>{img('two')?.meta || 'Varsity College'}</span>
              <span className="ph-label">{img('two')?.label || 'Top Achiever · 2025'}</span>
            </Reveal>
            <Reveal className="about-img three ph" delay={260}>
              <a className="cred-link" href="https://golden-key-international-honou.verified.cv/en/verify/20892159851455" target="_blank" rel="noopener noreferrer">
                <img src={img('three')?.url || goldenKeyBadge} alt={img('three')?.label || 'Golden Key International Honour Society, Top Performer, issued 23 April 2025'} />
              </a>
              <span>{img('three')?.meta || '23 Apr 2025'}</span>
              <span className="ph-label">{img('three')?.label || 'Golden Key · Top Performer'}</span>
            </Reveal>
            <Reveal className="about-graph" delay={280}>
              <GithubActivity />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const JOURNEY: JourneyItem[] = [
  { year: '2021', chip: 'Potchefstroom', title: 'Physics and mathematics at North-West University',
    desc: 'Started in 2020 on the Potchefstroom campus. Passed 8 semester subjects, then left the degree. The first plan was mechanical engineering. Software was the wider brief.',
    tags: ['NWU', 'Physics', 'Mathematics'] },
  { year: '2023', chip: 'Varsity College', title: 'Started the BSc in Computer and Information Sciences',
    desc: 'Pretoria campus, now Emeris. C#, Java, and the web stack. Tutored first-year students in the IT department through 2024.',
    tags: ['Emeris', 'C#', 'Java'] },
  { year: '2024', chip: 'First production work', title: 'Eridge RDA, then Afrisist',
    desc: 'Shipped the Eridge RDA site for a UK charity: React, Node, and Supabase, with a CMS for volunteers, programmes, and events. Built the Afrisist fleet alarm desk. Rode the Trans Baviaans, the 24-hour mountain bike marathon.',
    tags: ['React', 'Afrisist', 'Trans Baviaans'] },
  { year: '2025', chip: 'Final year', title: 'The degree, between the UK and South Africa',
    desc: 'Final year of the BSc at Varsity College, now Emeris. Full time software developer at Rimitso Management Services for Katanga Contracting Services. Moved between the UK and South Africa for networking and experience.',
    tags: ['Rimitso', 'KCS', 'Emeris'] },
  { year: '2026', chip: 'Full time', title: 'Rimitso and KCS',
    desc: 'No longer studying. Full time with Rimitso Management Services and Katanga Contracting Services. Rode the full Ford Trailseeker series, including #6 Wellington at Bosman Family Vineyards on 12 September.',
    tags: ['Rimitso', 'KCS', 'Trailseeker'] },
];

type JourneyStill = { src: string; alt: string; pos?: string; fit?: 'cover' | 'contain' };

const JOURNEY_STILLS: Record<string, JourneyStill[]> = {
  '2024': [
    { src: eridgeRda, alt: 'Eridge RDA site' },
  ],
  '2025': [
    { src: graduationPhoto, alt: 'Markus Fourie at graduation with Kyle Nel', pos: 'center 40%' },
    { src: graduationSolo, alt: 'Markus Fourie in his graduation gown', fit: 'contain' },
    { src: topAchieverPhoto, alt: 'Varsity College Top Achiever award, 2025', pos: 'center 55%' },
    { src: goldenKeyBadge, alt: 'Golden Key Top Performer certificate, 23 April 2025', fit: 'contain' },
    { src: bigBen, alt: 'Elizabeth Tower in London, from a trip to England', fit: 'contain' },
  ],
  '2026': [
    { src: rmsHome, alt: 'Katanga RMS home screen' },
    { src: trailseekerWellington, alt: 'Markus Fourie at Ford Trailseeker #6 Wellington' },
  ],
};

const WHEEL_PER_IMAGE = 90;
const MAX_IMAGES_PER_SEC = 4;
const STACK_PARK = 0.2;

function paintStack(frames: HTMLImageElement[], progress: number) {
  const end = frames.length - 1;
  const shown = Math.min(end, Math.max(0, progress));
  frames.forEach((img, i) => {
    const dist = Math.abs(shown - i);
    const opacity = dist >= 1 ? 0 : dist <= 0.22 ? 1 : (1 - dist) / 0.78;
    img.style.opacity = opacity.toFixed(3);
    img.toggleAttribute('aria-hidden', opacity < 0.55);
  });
}

function YearStack({ year, stills }: { year: string; stills: JourneyStill[] }) {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const el = root.current;
    if (!el || stills.length < 2 || prefersReducedMotion()) return;
    const frames = [...el.querySelectorAll<HTMLImageElement>('img')];
    const end = frames.length - 1;
    const fine = window.matchMedia('(pointer: fine)').matches;
    let progress = 0;
    let active = false;
    let armed = true;
    let lastTick = 0;
    let raf = 0;

    const release = () => {
      if (!active) return;
      active = false;
      armed = false;
      progress = Math.min(end, Math.max(0, progress));
      paintStack(frames, progress);
      lenis?.start();
    };

    const engage = () => {
      if (!lenis || active) return;
      active = true;
      lastTick = 0;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      lenis.scrollTo(lenis.animatedScroll + (rect.top - view * STACK_PARK), { immediate: true, force: true });
      lenis.stop();
    };

    const onVirtual = (data: { deltaY: number; event: Event }) => {
      if (!active || data.event.type.includes('touch')) return;
      const now = performance.now();
      const dt = lastTick ? (now - lastTick) / 1000 : 0.05;
      lastTick = now;
      const budget = Math.max(dt, 0.016) * MAX_IMAGES_PER_SEC;
      const step = Math.sign(data.deltaY) * Math.min(Math.abs(data.deltaY) / WHEEL_PER_IMAGE, budget);
      progress += step;
      if (progress > end + 0.08 || progress < -0.08) {
        progress = progress > end ? end : 0;
        paintStack(frames, progress);
        release();
        return;
      }
      paintStack(frames, progress);
    };

    const onKey = (event: KeyboardEvent) => {
      if (!active) return;
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, button, a')) return;
      const down = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ';
      const up = event.key === 'ArrowUp' || event.key === 'PageUp';
      if (!down && !up) return;
      event.preventDefault();
      progress += down ? 0.34 : -0.34;
      if (progress > end + 0.2 || progress < -0.2) {
        progress = progress > end ? end : 0;
        paintStack(frames, progress);
        release();
        return;
      }
      paintStack(frames, progress);
    };

    const onClick = (event: MouseEvent) => {
      if (!active) return;
      const anchor = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
      if (anchor?.hash) release();
    };

    const syncLinked = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const travel = Math.max(view * 1.6, end * view * 0.95);
      const raw = (view * 0.62 - rect.top) / travel;
      progress = Math.min(end, Math.max(0, raw * end));
      paintStack(frames, progress);
    };

    const sync = () => {
      raf = 0;
      if (!fine) {
        syncLinked();
        return;
      }
      if (active || !lenis) return;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const inBand = rect.top < view * 0.55 && rect.bottom > view * 0.4;
      if (!inBand) armed = true;
      if (!armed) return;
      const dir = lenis.direction;
      const parked = rect.top <= view * STACK_PARK && rect.bottom > view * 0.45;
      if (dir > 0 && progress < end - 0.02 && parked) engage();
      else if (dir < 0 && progress > 0.02 && rect.bottom > view * 0.45 && rect.top < view * 0.55) engage();
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(sync);
    };

    paintStack(frames, 0);
    lenis?.on('virtual-scroll', onVirtual);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('lenis-frame', onScroll);
    window.addEventListener('resize', onScroll);
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick, true);
    return () => {
      if (active) lenis?.start();
      lenis?.off('virtual-scroll', onVirtual);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('lenis-frame', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick, true);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [lenis, stills.length, year]);

  if (stills.length === 1) {
    const still = stills[0];
    return (
      <img
        className={`m-photo${still.fit === 'contain' ? ' is-contain' : ''}`}
        src={still.src}
        alt={still.alt}
        style={still.pos ? { objectPosition: still.pos } : undefined}
      />
    );
  }

  return (
    <div className="m-stack" ref={root} aria-label={`${year} photos`}>
      {stills.map((still, i) => (
        <img
          key={still.src}
          className={still.fit === 'contain' ? 'is-contain' : undefined}
          src={still.src}
          alt={still.alt}
          aria-hidden={i === 0 ? undefined : true}
          style={{
            opacity: i === 0 ? 1 : 0,
            ...(still.pos ? { objectPosition: still.pos } : {}),
          }}
        />
      ))}
    </div>
  );
}

function Milestone({ year, chip, title, desc, tags }: JourneyItem) {
  const { ref, inView } = useLenisEnter<HTMLDivElement>(0.82);
  const stills = JOURNEY_STILLS[year];
  return (
    <div ref={ref} className={`milestone ${inView ? 'is-in' : ''}`}>
      <div className="m-year" style={{ transitionDelay: '0ms' }}>
        {year}
        <span className="m-chip">{chip}</span>
        {stills?.length ? <YearStack year={year} stills={stills} /> : null}
      </div>
      <div className="m-anchor" style={{ transitionDelay: '120ms' }}><span className="m-node" /></div>
      <div className="m-card" style={{ transitionDelay: '220ms' }}>
        <h3 className="m-title">{title}</h3>
        <p className="m-desc">{desc}</p>
        <div className="m-tags">
          {tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Journey({ items }: { items: JourneyItem[] }) {
  return (
    <section id="journey">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">02 · Journey</span>
          <span className="num">Timeline · 2021-2026</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="journey-title">
            <h2 className="section-title">
              A <em>disciplined</em> progression, one milestone at a time.
            </h2>
          </Reveal>
          <Reveal className="journey-intro" delay={120}>
            <p className="section-intro">
              Each node below marks a decision that compounded: a project, a lesson,
              a discipline adopted. No shortcuts, no resets.
            </p>
          </Reveal>
          <div className="timeline">
            <div className="timeline-rail" />
            {items.map((m) => <Milestone key={`${m.year}-${m.chip}`} {...m} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cycling() {
  const filmRef = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [stats, setStats] = useState<StravaStatBlock[] | null>(null);
  const [meta, setMeta] = useState<{ updatedAt: string } | null>(null);
  const [error, setError] = useState<{ message: string; authUrl?: string } | null>(null);
  const [introHtml, setIntroHtml] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setError(null);
    fetchStravaSummary(ac.signal)
      .then((data) => {
        setStats(data.blocks);
        setMeta({ updatedAt: data.updatedAt });
      })
      .catch((e: unknown) => {
        // React dev (and quick route changes) can abort in-flight requests.
        // Treat AbortError as a non-error so we don't flash warnings.
        if (e instanceof DOMException && e.name === 'AbortError') return;
        const err = e as (Error & { detail?: StravaUnavailable });
        const detail = err.detail;
        setError({
          message: detail?.code === 'STRAVA_UNAVAILABLE'
            ? 'Strava needs a fresh connection'
            : (err?.message || 'Strava data unavailable'),
          authUrl: detail?.setup?.authUrl,
        });
        setStats(null);
        setMeta(null);
      });
    fetchContent<{ introHtml?: string }>('cycling', ac.signal)
      .then((r) => {
        if (r.value?.introHtml) setIntroHtml(r.value.introHtml);
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const el = filmRef.current;
    if (!el) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (mq.matches) {
        el.pause();
        return;
      }
      el.play().catch(() => {});
    };
    const onVisible = () => {
      if (document.hidden) return;
      sync();
    };
    el.addEventListener('canplay', sync);
    document.addEventListener('visibilitychange', onVisible);
    sync();
    mq.addEventListener('change', sync);
    return () => {
      el.removeEventListener('canplay', sync);
      document.removeEventListener('visibilitychange', onVisible);
      mq.removeEventListener('change', sync);
    };
  }, []);

  const onFilmControl = () => {
    const el = filmRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      return;
    }
    const next = !sound;
    el.muted = !next;
    setSound(next);
  };

  const fallbackStats: StravaStatBlock[] = [
    { label: `Kilometres · ${new Date().getFullYear()}`, val: '-', unit: 'km', sub: 'Connecting to Strava' },
    { label: 'Elevation', val: '-', unit: 'm', sub: ' ' },
    { label: 'Time in saddle', val: '-', unit: 'h', sub: ' ' },
    { label: 'Last ride', val: '-', unit: 'km', sub: ' ' },
  ];
  const blocks = stats ?? fallbackStats;
  return (
    <section id="cycling">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">03 · Cycling</span>
          <span className="num">Season · Live from Strava</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="cycling-head">
            <h2 className="section-title">
              Trained <em>by the hills</em>, tracked by data.
            </h2>
          </Reveal>
          <Reveal className="cycling-intro" delay={120}>
            {introHtml ? (
              <p dangerouslySetInnerHTML={{ __html: introHtml }} />
            ) : (
              <p>
                Cross-country marathon and endurance.
                In 2024 I rode the <a href="https://transbaviaans.co.za/" target="_blank" rel="noopener noreferrer">Trans Baviaans</a>.
                In 2026 I rode the full <a href="https://trailseeker.co.za/mtb/events/6-wellington-2026/" target="_blank" rel="noopener noreferrer">Ford Trailseeker</a> series, including #6 Wellington on 12 September at Bosman Family Vineyards.
                The film is a ride along the Cape Peninsula with Matthew Waldeck. The metrics update after every ride.
              </p>
            )}
          </Reveal>
          <Reveal className="cycling-visual">
            <figure className="cycling-film">
              <video
                ref={filmRef}
                src={capePeninsula}
                poster={capePeninsulaPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Markus Fourie cycling the Cape Peninsula"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
              <figcaption>
                <span>Cape Peninsula</span>
                <button type="button" onClick={onFilmControl} aria-pressed={sound}>
                  {playing ? (sound ? 'Sound on' : 'Sound off') : 'Play'}
                </button>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="cycling-still" delay={80}>
            <figure className="cycling-shot">
              <img src={capeFriends} alt="Markus Fourie and Matthew Waldeck cycling on the Cape Peninsula" />
              <figcaption>With Matthew Waldeck</figcaption>
            </figure>
          </Reveal>
          <div className="cycling-data">
            {blocks.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="stat-block">
                  <span className="s-label">{s.label}</span>
                  <span className="s-val">{s.val}<span className="unit">{s.unit}</span></span>
                  <span className="s-sub">{s.sub}</span>
                </div>
              </Reveal>
            ))}
            <Reveal delay={blocks.length * 80}>
              <div className="stat-block" style={{ borderBottom: '0', paddingBottom: 0 }}>
                {error ? (
                  <span className="s-sub">
                    {error.message}
                    {error.authUrl ? (
                      <>
                        {' '}·{' '}
                        <a href={error.authUrl.startsWith('http') ? error.authUrl : apiUrl(error.authUrl)} target="_blank" rel="noopener noreferrer">Connect Strava</a>
                      </>
                    ) : null}
                  </span>
                ) : (
                  <span className="s-sub">
                    {meta?.updatedAt ? `Updated · ${new Date(meta.updatedAt).toLocaleString('en-ZA', { hour: '2-digit', minute: '2-digit' })}` : ' '}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

type GalleryItem = { cls: string; n: string; l: string; url?: string };

function Gallery() {
  const defaultItems: GalleryItem[] = [
    { cls: 'g-1', n: '12 Sep 2026', l: 'Trailseeker · Wellington', url: trailseekerWellington },
    { cls: 'g-2', n: 'Studio', l: 'Work from home desk setup', url: deskSetup },
    { cls: 'g-3', n: 'Bike', l: 'S-Works MTB with new upgrades', url: sworksUpgrades },
    { cls: 'g-4', n: 'Race', l: 'Always race ready', url: raceReady },
    { cls: 'g-5', n: 'Ride', l: 'Long gravel ride', url: longRide },
    { cls: 'g-6', n: 'IMG / 15', l: 'Jotting · Field book' },
    { cls: 'g-7', n: 'IMG / 16', l: 'Sunset · Descent' },
  ];
  const [items, setItems] = useState<GalleryItem[]>(defaultItems);

  useEffect(() => {
    const ac = new AbortController();
    fetchContent<GalleryItem[]>('gallery', ac.signal)
      .then((r) => {
        if (!Array.isArray(r.value) || !r.value.length) return;
        setItems(r.value.map((item) => {
          if (item.url) return item;
          if (item.cls === 'g-1') return { ...item, url: trailseekerWellington };
          if (item.cls === 'g-2') {
            const placeholder = !item.l || item.n === 'IMG / 11' || /6:42/i.test(item.l);
            return placeholder
              ? { ...item, n: 'Studio', l: 'Work from home desk setup', url: deskSetup }
              : { ...item, url: deskSetup };
          }
          if (item.cls === 'g-3') {
            const placeholder = !item.l || item.n === 'IMG / 12' || /chain, worn/i.test(item.l);
            return placeholder
              ? { ...item, n: 'Bike', l: 'S-Works MTB with new upgrades', url: sworksUpgrades }
              : { ...item, url: sworksUpgrades };
          }
          if (item.cls === 'g-4') {
            const placeholder = !item.l || item.n === 'IMG / 13' || /nº 97/i.test(item.l);
            return placeholder
              ? { ...item, n: 'Race', l: 'Always race ready', url: raceReady }
              : { ...item, url: raceReady };
          }
          if (item.cls === 'g-5') {
            const placeholder = !item.l || item.n === 'IMG / 14' || /rock garden/i.test(item.l);
            return placeholder
              ? { ...item, n: 'Ride', l: 'Long gravel ride', url: longRide }
              : { ...item, url: longRide };
          }
          return item;
        }));
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);
  return (
    <section id="gallery">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">04 · Gallery</span>
          <span className="num">Field · Studio · Trail</span>
        </div>
        <div className="ed-grid12">
          <div className="gallery-head">
            <Reveal>
              <h2 className="section-title">Visual <em>field notes</em>.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-intro">
                Moments from the studio and the trail. Captured on a phone,
                colour-corrected lightly, honest about the light.
              </p>
            </Reveal>
          </div>
          <div className="gallery-grid">
            {items.map((g, i) => (
              <Reveal key={g.cls} className={`g-item ${g.cls} ph`} delay={i * 60}>
                {g.url ? <img src={g.url} alt={g.l} /> : null}
                <span>{g.n}</span>
                <span className="ph-label">{g.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalLine({ children }: { children: ReactNode }) {
  return <span className="t-line">{children}</span>;
}

function FedoraPrompt() {
  return (
    <>
      <span className="pr-user">[markus@fedora</span>
      <span className="pr-path"> ~</span>
      <span className="pr-user">]$</span>
    </>
  );
}

function Engineering() {
  return (
    <section id="engineering">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">05 · Engineering</span>
          <span className="num">Craft · Day-to-day</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="eng-head">
            <h2 className="section-title">
              Structured tools for <em>real</em> operations.
            </h2>
          </Reveal>
          <Reveal className="eng-intro" delay={120}>
            <p>
              Resource management, audit trails, billing reconciliation.
              The glue code between field operations and back-office systems.
              Built to survive rough conditions, network dropouts, and the
              long tail of edge cases real businesses live with.
            </p>
          </Reveal>
          <div className="eng-grid">
            <Reveal>
              <div className="eng-terminal">
                <div className="t-bar">
                  <span className="t-title">Terminal</span>
                  <span className="t-label">markus@fedora: ~</span>
                </div>
                <TerminalLine><FedoraPrompt /> ./deploy rms --env prod</TerminalLine>
                <TerminalLine><span className="dim">→ building 3 artefacts…</span></TerminalLine>
                <TerminalLine><span className="dim">→ running migrations (017_audit_trail)</span></TerminalLine>
                <TerminalLine><span className="dim">→ health check: api, worker, gateway</span></TerminalLine>
                <TerminalLine><span className="ok">✓ deploy complete · 14.2s · 0 errors</span></TerminalLine>
                <TerminalLine>&nbsp;</TerminalLine>
                <TerminalLine><FedoraPrompt /> tail -f /var/log/rms/audit.log</TerminalLine>
                <TerminalLine><span className="dim">[08:42:01]</span> OP_CHECKOUT · user:214 · asset:crane-07 · ok</TerminalLine>
                <TerminalLine><span className="dim">[08:42:09]</span> OP_CHECKOUT · user:198 · asset:wheel-12 · ok</TerminalLine>
                <TerminalLine><span className="dim">[08:42:17]</span> OP_RETURN   · user:214 · asset:crane-07 · 4.2h</TerminalLine>
                <TerminalLine><span className="dim">[08:42:44]</span> <span className="egg">OP_CHECKOUT · user:markus · asset:legs · zone:4 · hill:accepted</span></TerminalLine>
                <TerminalLine>&nbsp;</TerminalLine>
                <TerminalLine><FedoraPrompt /> which weekend</TerminalLine>
                <TerminalLine><span className="egg">/usr/local/bin/long-ride</span></TerminalLine>
                <TerminalLine><FedoraPrompt /> <span className="t-cursor" /></TerminalLine>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="eng-copy">
                <h3>The <em>quiet</em> infrastructure that keeps real businesses running.</h3>
                <p>
                  I build the systems that don't get shown in demos: the audit layer,
                  the reconciliation jobs, the offline-first client that keeps a site
                  foreman working through a dead signal. Fewer features, more surface reliability.
                </p>
                <ul>
                  <li><span className="idx">01</span><strong>Resource mgmt</strong><span className="d">Checkouts, returns, compliance.</span></li>
                  <li><span className="idx">02</span><strong>Audit trails</strong><span className="d">Append-only, field-safe, queryable.</span></li>
                  <li><span className="idx">03</span><strong>Billing recon</strong><span className="d">Matching field ops against invoices.</span></li>
                  <li><span className="idx">04</span><strong>Ops dashboards</strong><span className="d">React + TS, built for bad screens.</span></li>
                  <li><span className="idx">05</span><strong>Offline-first</strong><span className="d">Sync queues, conflict resolution.</span></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const GEAR_CODING: GearItemT[] = [
  { name: 'ROG Zephyrus G16', spec: '16-inch daily driver', cat: 'Compute', href: 'https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g16-2025-gu605/' },
  { name: 'HP Victus 15', spec: '15-inch home lab', cat: 'Lab', href: 'https://www.hp.com/us-en/shop/pdp/victus-gaming-laptop-15-fb3025nr' },
  { name: 'Alienware AW2725DM', spec: 'Dell · 27-inch QHD', cat: 'Display', href: 'https://www.dell.com/en-us/shop/alienware-27-gaming-monitor-aw2725dm/apd/210-bpky/monitors-monitor-accessories' },
  { name: 'Xiaomi Monitor Light Bar', spec: 'Mounts on the monitor', cat: 'Light', href: 'https://www.mi.com/uk/product/mi-computer-monitor-light-bar/' },
  { name: 'Corsair Vanguard 96', spec: '96% mechanical · 8,000 Hz', cat: 'Input', href: 'https://www.corsair.com/us/en/p/keyboards/ch-91e911e-na/vanguard-96-mechanical-gaming-keyboard-corsair-mlx-quantum-ch-91e911e-na' },
  { name: 'Logitech G Pro', spec: 'LIGHTSPEED wireless', cat: 'Input', href: 'https://www.logitechg.com/en-us/shop/p/pro-wireless-mouse' },
  { name: 'Arctis Nova Pro Wireless', spec: 'SteelSeries · ANC · hot-swap battery', cat: 'Audio', href: 'https://steelseries.com/gaming-headsets/arctis-nova-pro' },
];

const GEAR_CYCLING: GearItemT[] = [
  { name: 'Epic S-Works 7', spec: 'Specialized · full-suspension XC', cat: 'MTB', href: 'https://www.specialized.com/us/en/s-works-epic-sram-xx1-axs-rockshox-ultimate-brain/p/205828' },
  { name: 'Rave SLR ID2', spec: 'Wilier · gravel race bike', cat: 'Gravel', href: 'https://www.wilier.com/en/bikes/gravel/rave-slr-id2' },
  { name: 'MET Manta', spec: 'Holographic colour helmet', cat: 'Helmet', href: 'https://www.met-helmets.com/en/shop/cycling-helmets/tri-aero-helmets/manta-mips/' },
  { name: 'Shimano SH-XC903', spec: 'Wide unisex MTB shoes', cat: 'Shoes', href: 'https://ride.shimano.com/products/sh-xc903' },
  { name: 'Aeroshade 2.0 Titanium', spec: 'Scicon · cycling eyewear', cat: 'Eyewear', href: 'https://sciconsports.com/en/products/aeroshade-2-0-titanium-ey440801' },
  { name: 'Garmin Edge 840', spec: 'GPS bike computer', cat: 'Compute', href: 'https://www.garmin.com/en-US/p/798777/' },
];

const GEAR_MARKS: Record<string, BrandMarkName> = {
  'Corsair Vanguard 96': 'corsair',
  'Logitech G Pro': 'logitech',
  'Arctis Nova Pro Wireless': 'steelseries',
  'Garmin Edge 840': 'garmin',
};

const GEAR_IMAGES: Record<string, string> = {
  'ROG Zephyrus G16': gearLaptop,
  'HP Victus 15': gearVictus,
  'Alienware AW2725DM': gearMonitor,
  'Xiaomi Monitor Light Bar': gearLightBar,
  'Corsair Vanguard 96': gearKeyboard,
  'Logitech G Pro': gearMouse,
  'Arctis Nova Pro Wireless': gearHeadset,
  'Epic S-Works 7': gearEpic,
  'Rave SLR ID2': gearWilier,
  'MET Manta': gearHelmet,
  'Shimano SH-XC903': gearShoes,
  'Aeroshade 2.0 Titanium': gearScicon,
  'Garmin Edge 840': gearGarmin,
};

function GearItem({ item, idx }: { item: GearItemT; idx: number }) {
  const image = GEAR_IMAGES[item.name];
  const mark = GEAR_MARKS[item.name];
  return (
    <Reveal delay={idx * 60}>
      <article className="gear-item">
        <div className="gear-render">
          {image ? <img src={image} alt={item.name} /> : null}
        </div>
        <div className="gear-body">
          <div>
            <h4>{mark ? <BrandMark name={mark} /> : null}{item.name}</h4>
            <p className="gear-spec">{item.spec}</p>
          </div>
          <div className="gear-meta">
            <span className="gm-cat">{item.cat}</span>
            {item.href !== '#' ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">View →</a>
            ) : (
              <span className="gm-cat">Internal</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Gear({ coding, cycling }: { coding: GearItemT[]; cycling: GearItemT[] }) {
  return (
    <section id="gear">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">06 · My gear</span>
          <span className="num">Tools in hand · 2026</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="gear-head">
            <h2 className="section-title">
              The <em>tools</em> I reach for: desk and dirt.
            </h2>
          </Reveal>
          <Reveal className="gear-intro" delay={120}>
            <p>
              Two tracks, same philosophy: buy once, use daily, maintain it well.
            </p>
          </Reveal>

          <div className="gear-tracks">
            <div className="gear-track">
              <Reveal>
                <div className="gear-track-head">
                  <h3>Coding <em>kit</em></h3>
                  <span className="cnt">{coding.length} items</span>
                </div>
              </Reveal>
              {coding.map((item, i) => (
                <GearItem key={`${item.name}-${i}`} item={item} idx={i} />
              ))}
            </div>

            <div className="gear-track">
              <Reveal>
                <div className="gear-track-head">
                  <h3>Cycling <em>kit</em></h3>
                  <span className="cnt">{cycling.length} items</span>
                </div>
              </Reveal>
              {cycling.map((item, i) => (
                <GearItem key={`${item.name}-${i}`} item={item} idx={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { n: '01', name: 'Katanga RMS', href: 'https://rms.rimitso.com/', mark: kcsMark, shot: rmsHome, desc: 'Operations system for Katanga Contracting Services, hosted on Azure. Sites, assets, teams, and shift transactions such as hours and meter readings, reviewed through approval before they reach reports.', tags: 'React · ASP.NET Core · EF Core · Postgres · Azure' },
  { n: '02', name: 'Afrisist', mark: afrisistMark, markFit: 'word', shot: afrisistFleet, desc: 'Alarm monitoring dashboard for vehicle fleets, hosted on Azure. Operators watch incoming alarms, assign them, and get notified as the events arrive.', tags: 'React · Node · Supabase · WebSocket · Azure' },
  { n: '03', name: 'Eridge RDA', href: 'https://www.eridgerda.org.uk/', mark: rdaMark, shot: eridgeRda, desc: 'Site and CMS for the Eridge group of Riding for the Disabled. Programmes, a photo gallery, volunteer applications, and a protected admin for the people who keep it current.', tags: 'React · Vite · Supabase' },
  { n: '04', name: 'Skillance', href: 'https://skillance.co.za/', mark: skillanceMark, shot: skillanceHome, desc: 'Verified freelance marketplace for South Africa. Discover a professional, review the profile, and book with payment held until the work is approved. Coming soon on iOS and Android. Built with Kyle Nel.', tags: 'React · Fastify · Postgres' },
  { n: '05', name: 'Home lab + tooling', desc: 'An HP Victus 15, used as the home server. It hosts Plex, and local models on Ollama, including Gemma and Qwen.', tags: 'Ollama · Plex · Linux' },
];

function Projects() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="projects">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">07 · Projects</span>
          <span className="num">Selected work · {PROJECTS.length}</span>
        </div>
        <div className="ed-grid12">
          <div className="proj-head">
            <Reveal>
              <h2 className="section-title">Selected work</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-intro">
                Platforms and tools shipped for operations, fleets, charities, and marketplaces.
              </p>
            </Reveal>
          </div>
          <div className="proj-list" onMouseLeave={() => setHover(null)}>
            {PROJECTS.map((p, i) => {
              const shot = 'shot' in p ? p.shot : undefined;
              const mark = 'mark' in p ? p.mark : undefined;
              const href = 'href' in p ? p.href : undefined;
              const word = 'markFit' in p && p.markFit === 'word';
              return (
                <div
                  key={p.name}
                  className={`proj-row${shot ? ' has-shot' : ''}${hover !== null && hover !== i ? ' is-dim' : ''}`}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                >
                  {shot ? <img className="proj-shot" src={shot} alt="" /> : null}
                  <div className="proj-body">
                    <span className="proj-name">
                      {mark ? <img className={`proj-mark${word ? ' is-word' : ''}`} src={mark} alt="" /> : null}
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer">{p.name}</a>
                      ) : p.name}
                    </span>
                    <span className="proj-desc">{p.desc}</span>
                  </div>
                  <span className="proj-tags">{p.tags}</span>
                  <span className="proj-arrow" aria-hidden="true">→</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const STACK: StackCat[] = [
  { name: 'Web', items: [
    { n: 'HTML, CSS, JavaScript', y: '5 yrs' },
    { n: 'TypeScript', y: '4 yrs' },
    { n: 'React', y: '4 yrs' },
    { n: 'Tailwind', y: '3 yrs' },
    { n: 'Node.js / Express', y: '4 yrs' },
    { n: 'SQL', y: '4 yrs' },
    { n: 'PostgreSQL', y: '3 yrs' },
    { n: 'C#', y: '4 yrs' },
    { n: 'ASP.NET Core', y: '3 yrs' },
    { n: 'Entity Framework', y: '3 yrs' },
    { n: 'REST / OpenAPI', y: 'in use' },
    { n: 'Next.js', y: '2 yrs' },
    { n: 'Supabase', y: '2 yrs' },
    { n: 'GSAP', y: '2 yrs' },
    { n: 'Three.js', y: '1 yr' },
    { n: 'Python', y: '2 yrs' },
    { n: 'Go', y: 'learning' },
  ]},
  { name: 'Mobile', items: [
    { n: 'iOS and Android', y: 'in progress' },
  ]},
  { name: 'Cloud and network', items: [
    { n: 'Linux', y: 'in use' },
    { n: 'Docker', y: '2 yrs' },
    { n: 'Nginx', y: '2 yrs' },
    { n: 'GitHub Actions', y: '2 yrs' },
    { n: 'Azure', y: '1 yr' },
    { n: 'Cloudflare tunnels', y: '1 yr' },
  ]},
  { name: 'Security', items: [
    { n: 'Environment secrets', y: 'in use' },
    { n: 'Role-based access', y: 'in use' },
  ]},
];

const STACK_MARKS: Partial<Record<string, BrandMarkName>> = {
  TypeScript: 'typescript',
  'C#': 'csharp',
  JavaScript: 'javascript',
  'HTML, CSS, JavaScript': 'javascript',
  Python: 'python',
  Go: 'go',
  React: 'react',
  'Next.js': 'nextdotjs',
  Tailwind: 'tailwindcss',
  'Three.js': 'threedotjs',
  GSAP: 'greensock',
  'Node.js / Express': 'nodedotjs',
  'ASP.NET Core': 'dotnet',
  PostgreSQL: 'postgresql',
  Supabase: 'supabase',
  'REST / OpenAPI': 'openapiinitiative',
  Docker: 'docker',
  Nginx: 'nginx',
  'GitHub Actions': 'github',
  'Cloudflare tunnels': 'cloudflare',
  Linux: 'linux',
  Azure: 'microsoftazure',
};

function Stack({ cats }: { cats: StackCat[] }) {
  return (
    <section id="stack">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">08 · Stack</span>
          <span className="num">Roadmap · learned in order</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="stack-head">
            <h2 className="section-title">
              The road, <em>in order</em>.
            </h2>
          </Reveal>
          <Reveal className="stack-intro" delay={120}>
            <p>
              Web first, the way it is actually learned: the page, then the typed language, then the server and the database. Cloud and network come after something is worth hosting. Security is the lock on that door. Mobile is the next build.
            </p>
          </Reveal>
          <div className="stack-grid">
            {cats.map((cat, i) => (
              <Reveal key={cat.name} className="stack-cat" delay={i * 80}>
                <h4>
                  <span className="road-kicker">{String(i + 1).padStart(2, '0')}</span>
                  {cat.name}
                  <span className="cnt">[{cat.items.length}]</span>
                </h4>
                <ol className="road">
                  {cat.items.map((it, step) => (
                    <li key={it.n}>
                      <span className="road-node" aria-hidden="true">{String(step + 1).padStart(2, '0')}</span>
                      <span className="stack-name">
                        {STACK_MARKS[it.n] ? <BrandMark name={STACK_MARKS[it.n]!} /> : null}
                        {it.n}
                      </span>
                      <span className={`yr${it.y === 'learning' || it.y === 'in progress' ? ' is-next' : ''}`}>{it.y}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">09 · Philosophy</span>
          <span className="num">How I work · Why</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="philo-inner">
            <p className="philo-quote">
              Discipline is a chain of <em>small, repeated decisions</em>.
              The 5 am ride, the log line written for the version of you debugging at 2.
              The shape is built the same way.
            </p>
            <div className="philo-attr">Operating principles</div>
          </Reveal>
          <div className="philo-pillars">
            <Reveal className="pillar">
              <h5>01 · Long view</h5>
              <p>Optimise for the version of the system that exists in three years, under a team that isn't me.</p>
            </Reveal>
            <Reveal className="pillar" delay={100}>
              <h5>02 · Shape over feature</h5>
              <p>Get the primitives right and features come cheaply. Get them wrong and every feature costs twice.</p>
            </Reveal>
            <Reveal className="pillar" delay={200}>
              <h5>03 · Honest tools</h5>
              <p>The system should tell you what it's actually doing. Audit logs, health checks, dashboards that earn their glance.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Docs() {
  const [intro, setIntro] = useState<string | null>(null);
  const [items, setItems] = useState<Array<{ label: string; href: string; note: string }> | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    fetchContent<{ intro?: string; items?: Array<{ label: string; href: string; note: string }> }>('docs', ac.signal)
      .then((r) => {
        if (r.value?.intro) setIntro(r.value.intro);
        if (Array.isArray(r.value?.items) && r.value.items.length) setItems(r.value.items);
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);
  const rows = items ?? [
    { label: 'CV', href: '/cert-docs/251024%20Markus%20Fourie%20CV.pdf', note: 'October 2025 · Full' },
    { label: 'Abridged CV', href: '/cert-docs/251024%20Markus%20Fourie%20Abridged%20Resume.pdf', note: 'October 2025 · One page' },
    { label: 'Golden Key', href: '/cert-docs/VC_GoldenKey.pdf', note: 'Top Performer · 23 April 2025' },
    { label: 'Golden Key verify', href: 'https://golden-key-international-honou.verified.cv/en/verify/20892159851455', note: 'External record' },
    { label: 'Academic results', href: '/cert-docs/VarsityCollege_Results.zip', note: 'Varsity College · ZIP' },
  ];
  return (
    <section id="docs">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">10 · Docs</span>
          <span className="num">Paper · Download</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="docs-head">
            <h2 className="section-title">The record, on paper.</h2>
          </Reveal>
          <Reveal className="docs-intro" delay={120}>
            <p>
              {intro || 'CV from October 2025, the Golden Key record, and the Varsity College results. The college is now Emeris. The degree\'s final year was 2025.'}
            </p>
          </Reveal>
          <div className="docs-list">
            {rows.map((row) => (
              <div className="doc-row" key={row.href}>
                <a href={row.href} {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}>{row.label}</a>
                <span>{row.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const email = 'markusfourie@icloud.com';
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(() => {
        const area = document.createElement('textarea');
        area.value = email;
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        if (ok) done();
      });
      return;
    }
    const area = document.createElement('textarea');
    area.value = email;
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    if (ok) done();
  };

  return (
    <section id="contact">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">11 · Contact</span>
          <span className="num">Available · Q2 2026</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="contact-head">
            <h2 className="contact-title">
              Let's <em>work</em> <br/>together.
            </h2>
          </Reveal>
          <Reveal className="contact-primary">
            <div className="contact-mail">
              <a className="email" href={`mailto:${email}`}>{email}</a>
              <button type="button" className="copy-mail" onClick={copyEmail}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="availability">
              <span className="status-dot" />
              Available for new engagements from May 2026
            </div>
          </Reveal>
          <Reveal className="contact-side" delay={120}>
            <a href="https://www.linkedin.com/in/markus-fourie/" target="_blank" rel="noopener noreferrer"><span className="contact-name"><BrandMark name="linkedin" />LinkedIn</span><span className="lbl">Profile</span></a>
            <a href="https://github.com/ThePedalingDev" target="_blank" rel="noopener noreferrer"><span className="contact-name"><BrandMark name="github" />GitHub</span><span className="lbl">ThePedalingDev</span></a>
            <a href="https://www.strava.com/athletes/7756913" target="_blank" rel="noopener noreferrer"><span className="contact-name"><BrandMark name="strava" />Strava</span><span className="lbl">Rides · Nº 97</span></a>
            <a href="https://www.instagram.com/markuss.fourie/" target="_blank" rel="noopener noreferrer"><span className="contact-name"><BrandMark name="instagram" />Instagram</span><span className="lbl">@markuss.fourie</span></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EdFooter() {
  return (
    <footer className="ed-footer">
      <div className="ed-shell">
        <div className="ed-footer-inner">
          <div className="footer-mark">MF<em>.</em></div>
          <div className="footer-meta">
            <p>Markus Fourie</p>
            <p>Full-stack developer</p>
            <p>Pretoria · ZA</p>
            <p style={{ marginTop: 12 }}>© {new Date().getFullYear()}</p>
          </div>
          <div className="footer-right">
            <a href="#top">↑ Top</a>
            <a href="#docs">Docs</a>
            <a href="#contact">Contact</a>
            <a href="mailto:markusfourie@icloud.com">markusfourie@icloud.com</a>
          </div>
        </div>
      </div>
      <p className="footer-word" aria-hidden="true">Fourie</p>
    </footer>
  );
}

export function Home() {
  const [heroKm, setHeroKm] = useState<string | null>(null);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>(JOURNEY);
  const [stackCats, setStackCats] = useState<StackCat[]>(STACK);
  const [gearCoding, setGearCoding] = useState<GearItemT[]>(GEAR_CODING);
  const [gearCycling, setGearCycling] = useState<GearItemT[]>(GEAR_CYCLING);

  useEffect(() => {
    const ac = new AbortController();
    fetchStravaSummary(ac.signal)
      .then((data) => {
        if (!data.ytd) return;
        const km = new Intl.NumberFormat('en-ZA').format(Math.round(data.ytd.distanceKm));
        setHeroKm(km);
      })
      .catch(() => {
        // Silently ignore; keep fallback "-"
      });
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    fetchContent<HeroContent>('hero', ac.signal)
      .then((r) => setHeroContent(r.value))
      .catch(() => {});
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const [about, journey, stack, gc, gr] = await Promise.all([
          fetchContent<AboutContent>('about', ac.signal),
          fetchContent<JourneyItem[]>('journey', ac.signal),
          fetchContent<StackCat[]>('stack', ac.signal),
          fetchContent<GearItemT[]>('gearCoding', ac.signal),
          fetchContent<GearItemT[]>('gearCycling', ac.signal),
        ]);

        if (about.value) setAboutContent(about.value);
        if (Array.isArray(journey.value) && journey.value.length) {
          const stale = journey.value.some((item) =>
            (item.year === '2021' && /computer/i.test(item.title))
            || (item.year === '2026' && /graduat/i.test(`${item.title} ${item.desc}`)),
          );
          if (!stale) setJourneyItems(journey.value);
        }
        if (Array.isArray(stack.value) && stack.value.length) {
          const stale = stack.value.some((cat) => /languages|frontend|ops/i.test(cat.name));
          if (!stale) setStackCats(stack.value);
        }
        if (Array.isArray(gc.value) && gc.value.some((item) => /alienware|victus/i.test(item.name))) setGearCoding(gc.value);
        if (Array.isArray(gr.value) && gr.value.some((item) => /manta|xc903/i.test(item.name))) setGearCycling(gr.value);
      } catch {
        // Keep fallbacks when backend is down.
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <div className="editorial">
      <EdNav />
      <Hero ytdDistanceKm={heroKm} content={heroContent} />
      <About content={aboutContent} />
      <Journey items={journeyItems} />
      <Cycling />
      <Gallery />
      <Engineering />
      <Gear coding={gearCoding} cycling={gearCycling} />
      <Projects />
      <Stack cats={stackCats} />
      <Philosophy />
      <Docs />
      <Contact />
      <EdFooter />
    </div>
  );
}

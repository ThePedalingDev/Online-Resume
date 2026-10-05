import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import trailseekerWellington from '@/assets/images/trailseeker-wellington.webp';
import deskSetup from '@/assets/images/desk-setup.webp';
import raceReady from '@/assets/images/race-ready.webp';
import longRide from '@/assets/images/long-ride.webp';
import sworksUpgrades from '@/assets/images/sworks-upgrades.webp';
import graduationPhoto from '@/assets/images/graduation-kyle.webp';
import graduationSolo from '@/assets/images/graduation.webp';
import topAchieverPhoto from '@/assets/images/top-achiever.webp';
import goldenKeyBadge from '@/assets/images/golden-key.webp';
import bigBen from '@/assets/images/big-ben.webp';
import skillanceMark from '@/assets/images/skillance-mark.png';
import kcsMark from '@/assets/projects/kcs.webp';
import afrisistMark from '@/assets/projects/afrisist.webp';
import afrisistFleet from '@/assets/projects/afrisist-fleet.webp';
import rmsHome from '@/assets/projects/rms-home.webp';
import skillanceHome from '@/assets/projects/skillance-home.webp';
import rdaMark from '@/assets/projects/rda-logo.svg';
import eridgeRda from '@/assets/projects/eridge-rda.webp';
import capePeninsula from '@/assets/video/cape-peninsula.mp4';
import capePeninsulaPoster from '@/assets/video/cape-peninsula.jpg';
import capeFriends from '@/assets/images/cape-friends.webp';

const HERO_AVIF_SRCSET = '/images/hero/hero-480.avif 480w, /images/hero/hero-720.avif 720w, /images/hero/hero-1024.avif 1024w';
const HERO_WEBP_SRCSET = '/images/hero/hero-480.webp 480w, /images/hero/hero-720.webp 720w, /images/hero/hero-1024.webp 1024w';
const HERO_SIZES = '(max-width: 1023px) min(100vw, 420px), min(42vw, 560px)';
const HERO_FALLBACK = '/images/hero/hero-720.webp';
const HERO_ALT = 'Markus Fourie in profile, wearing a cap and a dark polo shirt';
const CV_HREF = '/cert-docs/251024%20Markus%20Fourie%20CV.pdf';
const EMAIL = 'markusfourie@icloud.com';
import { BrandMark, type BrandMarkName } from '@/components/BrandMark';
import { fetchStravaSummary, type StravaStatBlock, type StravaUnavailable } from '@/lib/strava';
import { fetchContent } from '@/lib/content';
import { apiUrl } from '@/lib/api';
import { GithubActivity } from '@/components/GithubActivity';
import { availability, availabilityLine } from '@/config/availability';
import { getProjectTags, joinProjectTags } from '@/data/projectTags';
import {
  approachCopy,
  contactCopy,
  galleryCaptions,
  heroCopy,
  journeyCopy,
  journeyNodes,
  lifeCopy,
  paperTrail,
  projectCopy,
  stackCopy,
  stackGroups,
  workCopy,
  type JourneyNode,
  type StackCat,
} from '@/content/site';

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
  ['#work', 'Work', '01'],
  ['#approach', 'Approach', '02'],
  ['#stack', 'Stack', '03'],
  ['#journey', 'Journey', '04'],
  ['#life', 'Life', '05'],
  ['#contact', 'Contact', '06'],
] as const;

function EdNav() {
  const drawer = useRef<HTMLDetailsElement>(null);
  const [brandVisible, setBrandVisible] = useState(false);

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

  useEffect(() => {
    const heading = document.getElementById('hero-name');
    if (!heading) {
      setBrandVisible(true);
      return;
    }
    if (prefersReducedMotion()) {
      // Still hide while the H1 is on screen; skip only the fade animation via CSS.
      const sync = () => {
        const rect = heading.getBoundingClientRect();
        setBrandVisible(rect.bottom <= 0);
      };
      window.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
      return () => {
        window.removeEventListener('scroll', sync);
        window.removeEventListener('resize', sync);
      };
    }
    const io = new IntersectionObserver(
      ([entry]) => setBrandVisible(!(entry?.isIntersecting ?? true)),
      { threshold: 0, rootMargin: '0px' },
    );
    io.observe(heading);
    return () => io.disconnect();
  }, []);

  const closeDrawer = () => {
    if (drawer.current) drawer.current.open = false;
  };

  return (
    <nav className="ed-nav">
      <div className="ed-nav-inner">
        <a
          href="#top"
          className={`ed-nav-brand${brandVisible ? ' is-visible' : ''}`}
          tabIndex={brandVisible ? 0 : -1}
          aria-hidden={brandVisible ? undefined : true}
        >
          Markus Fourie
        </a>
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

function Hero({ content }: { content?: HeroContent | null }) {
  const cmsHero = content?.imageUrl?.trim() || '';
  const heroAlt = content?.imageAlt || HERO_ALT;
  const photo = cmsHero ? (
    <img src={cmsHero} alt={heroAlt} fetchPriority="high" decoding="async" width={1024} height={1536} />
  ) : (
    <>
      <source type="image/avif" srcSet={HERO_AVIF_SRCSET} sizes={HERO_SIZES} />
      <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
      <img
        src={HERO_FALLBACK}
        srcSet={HERO_WEBP_SRCSET}
        sizes={HERO_SIZES}
        alt={heroAlt}
        fetchPriority="high"
        decoding="async"
        width={1024}
        height={1536}
      />
    </>
  );
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-intro">
            <h1 id="hero-name" className="hero-name">{heroCopy.name}</h1>
            <p className="hero-role">{heroCopy.role}</p>
            <p className="hero-status">
              <span className="hero-status-dot" aria-hidden="true" />
              {availabilityLine()}
            </p>
            <p className="hero-tagline">{heroCopy.tagline}</p>
          </div>
          <div className="hero-below">
            <p className="hero-subline">{heroCopy.subline}</p>
            <ul className="hero-ctas">
              <li>
                <a className="hero-pill primary" href="#work">
                  See what I&apos;ve built <span aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a className="hero-pill" href={`mailto:${EMAIL}`}>
                  Start a conversation <span aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a className="hero-pill" href={CV_HREF} download>
                  Download my CV (PDF) <span aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
            <nav className="hero-icons" aria-label="Quick links">
              <a href={`mailto:${EMAIL}`} aria-label="Email Markus">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </a>
              <span aria-hidden="true">·</span>
              <a href="https://www.linkedin.com/in/markus-fourie/" target="_blank" rel="noopener noreferrer" aria-label="Markus on LinkedIn (opens in a new tab)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6V21h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.71 0-1.97 1.33-1.97 2.7V21h-4z" /></svg>
              </a>
              <span aria-hidden="true">·</span>
              <a href="https://github.com/ThePedalingDev" target="_blank" rel="noopener noreferrer" aria-label="Markus on GitHub (opens in a new tab)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>
              </a>
            </nav>
          </div>
        </div>
        <picture className="hero-photo">{photo}</picture>
      </div>
    </section>
  );
}

type JourneyItem = JourneyNode;

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
    { src: rmsHome, alt: 'Resource Management System home screen' },
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
        loading="lazy"
        decoding="async"
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
          loading="lazy"
          decoding="async"
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

function Milestone({ year, chip, title, desc, tags, project }: JourneyItem) {
  const { ref, inView } = useLenisEnter<HTMLDivElement>(0.82);
  const stills = JOURNEY_STILLS[year];
  const stack = project ? getProjectTags(project) : null;
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
        {stack ? (
          <div className="m-tags m-stack-tags" aria-label="Stack">
            {stack.map((t) => <span key={t}>{t}</span>)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Journey({ items }: { items: JourneyItem[] }) {
  return (
    <section id="journey">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">04 · Journey</span>
          <span className="num">Timeline · Credentials · 2020-2026</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="journey-title">
            <h2 className="section-title">{journeyCopy.title}</h2>
          </Reveal>
          <Reveal className="journey-intro" delay={120}>
            <p className="section-intro">{journeyCopy.intro}</p>
          </Reveal>
          <div className="timeline">
            <div className="timeline-rail" />
            {items.map((m) => {
              const tags = m.year === '2025'
                ? Array.from(new Set([...m.tags, 'Top Achiever', 'Golden Key']))
                : m.tags;
              return <Milestone key={`${m.year}-${m.chip}`} {...m} tags={tags} />;
            })}
          </div>
          <Reveal className="paper-trail">
            <h3 className="section-title paper-trail-title">{journeyCopy.paperTrailTitle}</h3>
            <p className="section-intro">{journeyCopy.paperTrailIntro}</p>
            <div className="docs-list">
              {paperTrail.map((row) => (
                <div className="doc-row" key={row.href}>
                  <a
                    href={row.href}
                    {...(row.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : { download: true })}
                  >
                    {row.label}
                  </a>
                  <span>{row.note}</span>
                </div>
              ))}
            </div>
          </Reveal>
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
  const [ytd, setYtd] = useState<{ distanceKm: number; rideCount: number } | null>(null);
  const [error, setError] = useState<{ message: string; authUrl?: string } | null>(null);
  const [introHtml, setIntroHtml] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setError(null);
    fetchStravaSummary(ac.signal)
      .then((data) => {
        setStats(data.blocks);
        setMeta({ updatedAt: data.updatedAt });
        if (data.ytd) setYtd({ distanceKm: data.ytd.distanceKm, rideCount: data.ytd.rideCount });
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
    let inView = false;
    const sync = () => {
      if (mq.matches || document.hidden || !inView) {
        el.pause();
        return;
      }
      el.play().catch(() => {});
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: '120px 0px', threshold: 0.2 },
    );
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    mq.addEventListener('change', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      mq.removeEventListener('change', sync);
      el.pause();
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
    <section id="life" className="off-clock">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">05 · Life</span>
          <span className="num">Off the clock · Strava</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="cycling-head">
            <h2 className="section-title">{lifeCopy.title}</h2>
          </Reveal>
          <Reveal className="life-quote" delay={40}>
            <blockquote>
              <p>{lifeCopy.quote}</p>
              <footer>{lifeCopy.quoteAttr}</footer>
            </blockquote>
          </Reveal>
          <Reveal className="cycling-intro" delay={120}>
            {introHtml ? (
              <p dangerouslySetInnerHTML={{ __html: introHtml }} />
            ) : (
              <p>
                When I close the laptop, I ride: mostly cross-country marathons and long endurance days. In 2024 I rode the{' '}
                <a href="https://transbaviaans.co.za/" target="_blank" rel="noopener noreferrer">Trans Baviaans</a>, the 24-hour mountain bike marathon. This year I rode the full{' '}
                <a href="https://trailseeker.co.za/mtb/events/6-wellington-2026/" target="_blank" rel="noopener noreferrer">Ford Trailseeker</a>
                {' '}series, including #6 Wellington at Bosman Family Vineyards on 12 September.
              </p>
            )}
            <p className="uses-link">
              <a href="/uses">{lifeCopy.usesLabel} <span aria-hidden="true">→</span></a>
            </p>
            <p className="life-social">
              {lifeCopy.socialLabel}:{' '}
              <a href="https://www.strava.com/athletes/7756913" target="_blank" rel="noopener noreferrer">Strava <span aria-hidden="true">↗</span></a>
              {' · '}
              <a href="https://www.instagram.com/markuss.fourie/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
            </p>
          </Reveal>
          {ytd ? (
            <Reveal className="life-lead-stat">
              <p>
                {new Intl.NumberFormat('en-ZA').format(Math.round(ytd.distanceKm))} km so far in {new Date().getFullYear()}, across {new Intl.NumberFormat('en-ZA').format(ytd.rideCount)} rides.
              </p>
            </Reveal>
          ) : null}
          <Reveal className="cycling-visual">
            <figure className="cycling-film">
              <video
                ref={filmRef}
                src={capePeninsula}
                poster={capePeninsulaPoster}
                muted
                loop
                playsInline
                preload="none"
                aria-label="Markus Fourie cycling the Cape Peninsula"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
              <figcaption>
                <span>Cape Peninsula, with Matthew Waldeck</span>
                <button type="button" onClick={onFilmControl} aria-pressed={sound}>
                  {playing ? (sound ? 'Sound on' : 'Sound off') : 'Play the ride'}
                </button>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="cycling-still" delay={80}>
            <figure className="cycling-shot">
              <img src={capeFriends} alt="Markus Fourie and Matthew Waldeck cycling on the Cape Peninsula" loading="lazy" decoding="async" />
              <figcaption>Out with Matthew Waldeck</figcaption>
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
          <GalleryGrid />
        </div>
      </div>
    </section>
  );
}

type GalleryItem = { cls: string; n: string; l: string; url?: string };

function GalleryGrid() {
  const urls: Record<string, string> = {
    'g-1': trailseekerWellington,
    'g-2': deskSetup,
    'g-3': sworksUpgrades,
    'g-4': raceReady,
    'g-5': longRide,
  };
  const defaultItems: GalleryItem[] = galleryCaptions.map((g) => ({
    ...g,
    url: urls[g.cls],
  }));
  const [items, setItems] = useState<GalleryItem[]>(defaultItems);

  useEffect(() => {
    const ac = new AbortController();
    const isEmptyTile = (item: GalleryItem) =>
      /^IMG\s*\/\s*(15|16)$/i.test(item.n)
      || /jotting|field book|sunset|descent/i.test(item.l)
      || (!item.url && (item.cls === 'g-6' || item.cls === 'g-7'));

    fetchContent<GalleryItem[]>('gallery', ac.signal)
      .then((r) => {
        if (!Array.isArray(r.value) || !r.value.length) return;
        const mapped = r.value
          .filter((item) => !isEmptyTile(item))
          .map((item) => {
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
          })
          .filter((item) => Boolean(item.url));
        if (mapped.length) setItems(mapped);
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);
  return (
    <>
      <div className="gallery-head">
        <Reveal>
          <h3 className="section-title">{lifeCopy.galleryTitle}</h3>
        </Reveal>
        <Reveal delay={120}>
          <p className="section-intro">{lifeCopy.galleryIntro}</p>
        </Reveal>
      </div>
      <div className="gallery-grid">
        {items.map((g, i) => (
          <Reveal key={g.cls} className={`g-item ${g.cls} ph`} delay={i * 60}>
            {g.url ? <img src={g.url} alt={g.l} loading="lazy" decoding="async" /> : null}
            <span>{g.n}</span>
            <span className="ph-label">{g.l}</span>
          </Reveal>
        ))}
      </div>
    </>
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

function HowIBuild() {
  return (
    <section id="approach">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">02 · Approach</span>
          <span className="num">How I work · Craft</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="eng-head">
            <h2 className="section-title">{approachCopy.title}</h2>
          </Reveal>
          <Reveal className="eng-intro" delay={120}>
            <p>{approachCopy.intro}</p>
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
                <TerminalLine><FedoraPrompt /> <span className="t-cursor" /></TerminalLine>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="eng-copy">
                <ul>
                  {approachCopy.capabilities.map((cap, i) => (
                    <li key={cap.name}>
                      <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                      <strong>{cap.name}</strong>
                      <span className="d">{cap.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal className="philo-inner build-principles">
            <p className="philo-quote">{approachCopy.quote}</p>
            <div className="philo-attr">{approachCopy.principlesLabel}</div>
          </Reveal>
          <div className="philo-pillars">
            {approachCopy.principles.map((p, i) => (
              <Reveal key={p.title} className="pillar" delay={i * 100}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ProjectCase = {
  n: string;
  name: string;
  href?: string;
  mark?: string;
  markFit?: 'word';
  shot?: string;
  shotW?: number;
  shotH?: number;
  role: string;
  problem: string;
  built: string;
  result: string;
  tags: string[];
  cta: 'visit' | 'private';
  ctaLabel?: string;
};

const PROJECT_MEDIA: Record<string, Partial<ProjectCase>> = {
  'katanga-rms': { mark: kcsMark, shot: rmsHome, shotW: 906, shotH: 566 },
  afrisist: { mark: afrisistMark, markFit: 'word', shot: afrisistFleet, shotW: 1200, shotH: 675 },
  'eridge-rda': { mark: rdaMark, shot: eridgeRda, shotW: 1200, shotH: 878 },
  skillance: { mark: skillanceMark, shot: skillanceHome, shotW: 1200, shotH: 626 },
};

const PROJECTS: ProjectCase[] = projectCopy.map((p) => ({
  n: p.n,
  name: p.name,
  href: p.href,
  role: p.role,
  problem: p.problem,
  built: p.built,
  result: p.result,
  tags: getProjectTags(p.id),
  cta: p.cta,
  ctaLabel: p.ctaLabel,
  ...PROJECT_MEDIA[p.id],
}));

function Projects() {
  return (
    <section id="work">
      <div className="ed-shell">
        <div className="eyebrow-row">
          <span className="section-marker">01 · Work</span>
          <span className="num">Shipped · {PROJECTS.length}</span>
        </div>
        <div className="ed-grid12">
          <div className="proj-head">
            <Reveal>
              <h2 className="section-title">{workCopy.title}</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-intro">{workCopy.intro}</p>
            </Reveal>
          </div>
          <div className="proj-cards">
            {PROJECTS.map((p, i) => {
              const word = p.markFit === 'word';
              return (
                <Reveal key={p.name} className="proj-card" delay={i * 60}>
                  {p.shot ? (
                    <img
                      className="proj-shot"
                      src={p.shot}
                      alt=""
                      width={p.shotW}
                      height={p.shotH}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <div className="proj-card-body">
                    <div className="proj-card-top">
                      <span className="proj-n">{p.n}</span>
                      <span className="proj-name">
                        {p.mark ? (
                          <img className={`proj-mark${word ? ' is-word' : ''}`} src={p.mark} alt="" loading="lazy" decoding="async" />
                        ) : null}
                        {p.name}
                      </span>
                    </div>
                    <dl className="proj-case">
                      <div><dt>Role</dt><dd>{p.role}</dd></div>
                      <div><dt>Problem</dt><dd>{p.problem}</dd></div>
                      <div><dt>Built</dt><dd>{p.built}</dd></div>
                      <div><dt>Result</dt><dd>{p.result}</dd></div>
                    </dl>
                    <span className="proj-tags">{joinProjectTags(p.tags)}</span>
                    {p.cta === 'visit' && p.href ? (
                      <a className="btn-solid proj-cta" href={p.href} target="_blank" rel="noopener noreferrer">
                        Visit site
                      </a>
                    ) : (
                      <a className="btn-text proj-cta" href="#contact">
                        {p.ctaLabel || 'Private system, ask for a demo'}
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const STACK: StackCat[] = stackGroups;

const STACK_MARKS: Partial<Record<string, BrandMarkName>> = {
  TypeScript: 'typescript',
  'C#': 'csharp',
  JavaScript: 'javascript',
  'HTML, CSS, JavaScript': 'javascript',
  Python: 'python',
  Go: 'go',
  React: 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
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
          <span className="section-marker">03 · Stack</span>
          <span className="num">Tools · learned in order</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="stack-head">
            <h2 className="section-title">{stackCopy.title}</h2>
          </Reveal>
          <Reveal className="stack-intro" delay={120}>
            <p>{stackCopy.intro}</p>
          </Reveal>
          <div className="stack-grid">
            {cats.map((cat, i) => (
              <Reveal key={cat.name} className="stack-cat" delay={i * 80}>
                <h3>
                  <span className="road-kicker" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {cat.name}
                  <span className="cnt" aria-hidden="true">[{cat.items.length}]</span>
                </h3>
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
          <Reveal className="stack-activity" delay={120}>
            <GithubActivity />
          </Reveal>
          <Reveal className="stack-home-lab" delay={180}>
            <p className="section-intro">{stackCopy.atHome}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


function Contact() {
  const email = contactCopy.email;
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
          <span className="section-marker">06 · Contact</span>
          <span className="num">{availability.status}</span>
        </div>
        <div className="ed-grid12">
          <Reveal className="contact-head">
            <h2 className="contact-title">{contactCopy.title}</h2>
          </Reveal>
          <Reveal className="contact-intro" delay={60}>
            <p className="section-intro">{contactCopy.intro}</p>
          </Reveal>
          <Reveal className="contact-primary">
            <div className="contact-mail">
              <a className="email" href={`mailto:${email}`}>{email}</a>
              <button type="button" className="copy-mail" onClick={copyEmail} aria-live="polite">
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
            <div className="availability">
              <span className="status-dot" />
              {availabilityLine()}
            </div>
          </Reveal>
          <Reveal className="contact-side" delay={120}>
            <a href="https://www.linkedin.com/in/markus-fourie/" target="_blank" rel="noopener noreferrer"><span className="contact-name"><BrandMark name="linkedin" />LinkedIn</span><span className="lbl">Work history</span></a>
            <a href="https://github.com/ThePedalingDev" target="_blank" rel="noopener noreferrer"><span className="contact-name"><BrandMark name="github" />GitHub</span><span className="lbl">Code</span></a>
            <a href={CV_HREF} download><span className="contact-name">CV</span><span className="lbl">Download (PDF)</span></a>
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
            <p>Markus Fourie · Full-stack developer · Pretoria</p>
            <p style={{ marginTop: 12 }}>© {new Date().getFullYear()}</p>
          </div>
          <div className="footer-right">
            <a href="#top">Back to top ↑</a>
            <a href="#contact">Contact</a>
            <a href={CV_HREF} download>CV</a>
          </div>
        </div>
      </div>
      <p className="footer-word" aria-hidden="true">Fourie</p>
    </footer>
  );
}

export function Home() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>(journeyNodes);
  const [stackCats, setStackCats] = useState<StackCat[]>(STACK);
  const [showMobileBar, setShowMobileBar] = useState(false);

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
        const [journey, stack] = await Promise.all([
          fetchContent<JourneyItem[]>('journey', ac.signal),
          fetchContent<StackCat[]>('stack', ac.signal),
        ]);

        if (Array.isArray(journey.value) && journey.value.length) {
          const stale = journey.value.some((item) =>
            (item.year === '2021' && /physics|nwu|computer/i.test(`${item.title} ${item.desc}`))
            || (item.year === '2020' && /computer/i.test(item.title))
            || (item.year === '2026' && /graduat|trailseeker/i.test(`${item.title} ${item.desc}`))
            || /Katanga RMS|Rimitso RMS/i.test(`${item.title} ${item.desc}`),
          );
          if (!stale) setJourneyItems(journey.value);
        }
        if (Array.isArray(stack.value) && stack.value.length) {
          const stale = stack.value.some((cat) => /languages|frontend|ops/i.test(cat.name));
          if (!stale) setStackCats(stack.value);
        }
      } catch {
        // Keep fallbacks when backend is down.
      }
    })();
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const hero = document.getElementById('top');
    const contact = document.getElementById('contact');
    if (!hero || !contact) return;
    const sync = () => {
      const heroGone = hero.getBoundingClientRect().bottom <= 0;
      const contactVisible = contact.getBoundingClientRect().top < window.innerHeight * 0.85;
      setShowMobileBar(heroGone && !contactVisible);
    };
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return (
    <div className="editorial">
      <EdNav />
      <Hero content={heroContent} />
      <Projects />
      <HowIBuild />
      <Stack cats={stackCats} />
      <Journey items={journeyItems} />
      <Cycling />
      <Contact />
      <EdFooter />
      <div className={`mobile-contact-bar${showMobileBar ? ' is-visible' : ''}`}>
        <a className="btn-solid" href={`mailto:${EMAIL}`}>Email me</a>
        <a className="btn-outline" href={CV_HREF} download>Download CV</a>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/portfolio-redesign.css';
import capeFriends from '@/assets/images/cape-friends.webp';
import graduation from '@/assets/images/graduation.webp';
import { GitHubMark, InstagramMark, LinkedInMark, MailMark, StravaMark, WhatsAppMark } from '@/components/BrandMarks';
import { CountUpText } from '@/components/motion/CountUp';
import { CONTACT_EMAIL, CONTACT_WHATSAPP, contactMailto } from '@/config/contact';
import { availability } from '@/config/availability';
import {
  approachCopy,
  heroCopy,
  heroCtas,
  journeyCopy,
  journeyNodes,
  lifeCopy,
  paperTrail,
  stackCopy,
  stackGroups,
  workCopy,
} from '@/content/site';
import { workProjects, type WorkProject } from '@/content/work';
import type { CSSProperties } from 'react';
import { FramedImage } from '@/pages/home/FramedImage';
import { lifeGallery, type GalleryItem } from '@/pages/home/gallery';
import { Lightbox } from '@/pages/home/Lightbox';
import { TypedText } from '@/pages/home/TypedText';
import { WorkShot } from '@/pages/home/WorkShot';
import {
  useCopyEmail,
  useHeroLogLines,
  useNavSectionActive,
  useReveal,
} from '@/pages/home/usePortfolioPage';

const HERO_AVIF_SRCSET = '/images/hero/hero-480.avif 480w, /images/hero/hero-720.avif 720w, /images/hero/hero-1024.avif 1024w';
const HERO_WEBP_SRCSET = '/images/hero/hero-480.webp 480w, /images/hero/hero-720.webp 720w, /images/hero/hero-1024.webp 1024w';
const HERO_SIZES = '(max-width: 1023px) min(100vw, 420px), min(42vw, 560px)';
const HERO_FALLBACK = '/images/hero/hero-720.webp';
const HERO_ALT = 'Markus Fourie in profile, wearing a cap and a dark polo shirt';

const GITHUB = 'https://github.com/ThePedalingDev';
const LINKEDIN = 'https://www.linkedin.com/in/markus-fourie/';
const STRAVA = 'https://www.strava.com/athletes/7756913';
const INSTAGRAM = 'https://www.instagram.com/markuss.fourie/';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#approach', label: 'Approach' },
  { href: '#stack', label: 'Stack' },
  { href: '#journey', label: 'Journey' },
  { href: '#life', label: 'Life' },
] as const;

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function stackLabel(project: WorkProject) {
  return project.stack.join(' · ');
}

function tileKind(project: WorkProject) {
  const bits = [project.kind, project.private ? 'Private' : '', project.year].filter(Boolean);
  return bits.join(' · ');
}

function WorkTile({
  className,
  project,
  shotPosition,
  uiFrame,
}: {
  className: string;
  project: WorkProject;
  shotPosition?: string;
  uiFrame?: boolean;
}) {
  const external = Boolean(project.cta.external);

  return (
    <article className={`tile ${className} reveal`}>
      {project.image ? (
        <div
          className={`media${uiFrame ? ' is-ui' : ''}`}
          style={shotPosition ? ({ ['--shot-pos' as string]: shotPosition } as CSSProperties) : undefined}
        >
          {uiFrame ? (
            <div className="work-browser">
              <div className="work-browser-frame">
                <WorkShot image={project.image} eager={className.includes('t-rms')} objectPosition="left top" />
              </div>
            </div>
          ) : (
            <WorkShot image={project.image} objectPosition={shotPosition} />
          )}
        </div>
      ) : null}
      <div className="body">
        <p className="kind">
          {project.id === 'katanga-rms'
            ? `Featured · For ${project.client ?? 'Katanga'} · ${project.year ?? 'Since 2025'}`
            : tileKind(project)}
        </p>
        <h3 className="h3">{project.name}</h3>
        <p>{project.caseStudy ?? project.outcome}</p>
        {project.stats?.length ? (
          <div className="rms-stats-row" aria-label="Running on RMS today">
            {project.stats.map(([value, label]) => (
              <div key={label}>
                <strong><CountUpText text={value} /></strong>
                {label}
              </div>
            ))}
          </div>
        ) : null}
        <p className="stack">{stackLabel(project)}</p>
        <p className="go">
          {external ? (
            <a className="tlink" href={project.cta.href} target="_blank" rel="noopener noreferrer">
              {project.cta.label}
            </a>
          ) : (
            <a className="tlink" href={project.cta.href}>{project.cta.label}</a>
          )}
        </p>
      </div>
    </article>
  );
}

export function Home() {
  useReveal();
  useNavSectionActive();
  useHeroLogLines();
  const { label: copyLabel, copy } = useCopyEmail();
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomed, setZoomed] = useState<GalleryItem | null>(null);
  const zoomTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const rms = workProjects.find((p) => p.id === 'katanga-rms')!;
  const gridProjects = workProjects.filter((p) => p.id !== 'home-lab');
  const lab = workProjects.find((p) => p.id === 'home-lab')!;
  const primaryCta = heroCtas.find((c) => c.primary) ?? heroCtas[0];
  const secondaryCtas = heroCtas.filter((c) => !c.primary).slice(0, 2);

  return (
    <div className="portfolio-redesign" id="top">
      <a className="skip" href="#main">Skip to content</a>

      <header className={`hdr${menuOpen ? ' is-open' : ''}`}>
        <div className="wrap">
          <a className="mark" href="#top" aria-label="Markus Fourie, back to top" onClick={() => setMenuOpen(false)}>
            Markus Fourie <span>{heroCopy.role}</span>
          </a>
          <nav className="nav" aria-label="Sections">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <a className="btn btn-dark hdr-cta" href="#contact">Get in touch</a>
          <button
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
        <nav className="mob" id="mobile-menu" aria-label="Sections (mobile)" hidden={!menuOpen}>
          {[...NAV_LINKS, { href: '#contact', label: 'Contact' }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="h1">
          <div className="wrap">
            <div>
              <h1 id="h1">{heroCopy.tagline}</h1>
              <p className="hero-subline">{heroCopy.subline}</p>
              <div className="ctas">
                <a
                  className="btn btn-primary"
                  href={primaryCta.href}
                  {...(primaryCta.download ? { download: true } : {})}
                >
                  {primaryCta.href.startsWith('mailto:') ? <EnvelopeIcon /> : null}
                  {primaryCta.label}
                </a>
                {secondaryCtas.map((cta) => (
                  <a
                    key={cta.href}
                    className="btn btn-ghost"
                    href={cta.href}
                    {...(cta.download ? { download: true } : {})}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
              <div className="meta">
                <a className="tlink ico" href={GITHUB} target="_blank" rel="noopener noreferrer"><GitHubMark />GitHub</a>
                <a className="tlink ico" href={LINKEDIN} target="_blank" rel="noopener noreferrer"><LinkedInMark />LinkedIn</a>
              </div>
            </div>
            <div className="visual">
              <div className="block" aria-hidden="true" />
              <div className="photo">
                <picture>
                  <source type="image/avif" srcSet={HERO_AVIF_SRCSET} sizes={HERO_SIZES} />
                  <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
                  <img
                    src={HERO_FALLBACK}
                    srcSet={HERO_WEBP_SRCSET}
                    sizes={HERO_SIZES}
                    width={720}
                    height={1080}
                    alt={HERO_ALT}
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="panel" aria-label="Example deploy log from the Resource Management System">
                <div className="ttl">
                  <span>markus@fedora: ~</span>
                  <span>rms</span>
                </div>
                <div className="line">$ ./deploy rms --env prod</div>
                <div className="line">→ running migrations (017_audit_trail)</div>
                <div className="line">→ health check: api, worker, gateway</div>
                <div className="line ok">✓ deploy complete · 14.2s · 0 errors</div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec edge edge-s edge-lg" id="work" aria-labelledby="work-h">
          <div className="wrap">
            <div className="work-head reveal">
              <h2 className="h2" id="work-h">{workCopy.title}</h2>
              <p className="muted">{workCopy.intro}</p>
            </div>
            <div className="bento">
              <WorkTile className="t-rms" project={rms} uiFrame />
              {gridProjects
                .filter((p) => p.id !== 'katanga-rms')
                .map((project) => (
                  <WorkTile
                    key={project.id}
                    className={
                      project.id === 'afrisist'
                        ? 't-a'
                        : project.id === 'eridge-rda'
                          ? 't-b'
                          : 't-c'
                    }
                    project={project}
                    shotPosition={project.id === 'afrisist' ? 'center 35%' : 'top center'}
                    uiFrame={project.id !== 'afrisist'}
                  />
                ))}
              <article className="tile t-lab reveal">
                <div className="body">
                  <div>
                    <p className="kind">Personal infrastructure · Ongoing</p>
                    <h3 className="h3" style={{ margin: '8px 0 12px' }}>Home lab</h3>
                    <p>{lab.outcome}</p>
                    <div className="lab-terminal" aria-hidden="true">
                      <p>home-lab:~$ systemctl is-active plex</p>
                      <p className="ok">active</p>
                      <p>home-lab:~$ ollama list</p>
                      <p>gemma · qwen</p>
                    </div>
                  </div>
                  <div>
                    <p className="stack">Linux · Plex · Ollama (Gemma, Qwen)</p>
                    <p className="go">
                      <a className="tlink" href="#stack">See my stack</a>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="sec appr edge edge-diag" id="approach" aria-labelledby="appr-h">
          <div className="wrap grid">
            <div className="side reveal">
              <h2 className="h2" id="appr-h">{approachCopy.title}</h2>
              <p className="muted" style={{ marginTop: 24 }}>{approachCopy.intro}</p>
            </div>
            <div>
              <ol className="rows">
                {approachCopy.capabilities.map((c) => (
                  <li key={c.name} className="reveal">
                    <span className="nm">{c.name}</span>
                    <p>{c.line}</p>
                  </li>
                ))}
              </ol>
              <p className="quote reveal">{approachCopy.quote}</p>
              <div className="princ">
                {approachCopy.principles.map((p) => (
                  <div key={p.title} className="reveal">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="band edge edge-hill" aria-labelledby="band-h">
          <div className="wrap">
            <div>
              <h2 className="h2" id="band-h" style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
                Want to see RMS running?
              </h2>
              <p>
                I&apos;m happy to walk you through the Resource Management System, from the approval step to the audit log.
              </p>
            </div>
            <a
              className="btn btn-primary"
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Walkthrough: Resource Management System')}`}
            >
              Ask for a walkthrough
            </a>
          </div>
        </section>

        <section className="sec stk edge edge-s" id="stack" aria-labelledby="stk-h">
          <div className="wrap grid">
            <div className="reveal">
              <h2 className="h2" id="stk-h">{stackCopy.title}</h2>
              <p style={{ marginTop: 24 }}>{stackCopy.intro}</p>
              <div className="note small">
                {stackCopy.atHome}
                <br />
                <br />
                <a className="tlink ico" href={GITHUB} target="_blank" rel="noopener noreferrer">
                  <GitHubMark />GitHub · ThePedalingDev
                </a>
              </div>
            </div>
            <div className="groups">
              {stackGroups.map((group) => (
                <div key={group.name} className="group reveal">
                  <h3>{group.name}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.n}>
                        <span>{item.n}</span>
                        <span>{item.y}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec jr edge edge-diag" id="journey" aria-labelledby="jr-h">
          <div className="wrap grid">
            <div>
              <div className="reveal">
                <h2 className="h2" id="jr-h">{journeyCopy.title}</h2>
                <p className="lead" style={{ marginTop: 24 }}>{journeyCopy.intro}</p>
              </div>
              <ol className="tl">
                {journeyNodes.map((j) => (
                  <li key={`${j.year}-${j.chip}`} className="reveal">
                    <span className="yr">{j.year}</span>
                    <div>
                      <p className="where">{j.chip}</p>
                      <h3>{j.title}</h3>
                      <p>{j.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="jr-side">
              <figure className="reveal">
                <div className="fr">
                  <FramedImage
                    src={graduation}
                    width={459}
                    height={1024}
                    alt="Markus Fourie in his graduation gown"
                    fit="contain"
                    objectPosition="center bottom"
                  />
                </div>
                <figcaption>Graduation, Varsity College (now Emeris)</figcaption>
              </figure>
              <div className="reveal">
                <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>{journeyCopy.paperTrailTitle}</h3>
                <ul className="paper">
                  {paperTrail.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {item.label} <span>{item.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="sec life edge edge-hill" id="life" aria-labelledby="life-h">
          <div className="wrap">
            <div className="head reveal">
              <h2 className="h2" id="life-h">{lifeCopy.title}</h2>
              <blockquote className="life-quote">
                <p>{lifeCopy.quote}</p>
                <footer>{lifeCopy.quoteAttr}</footer>
              </blockquote>
              <p style={{ marginTop: 24 }}>
                When I close the laptop, I ride: mostly cross-country marathons and long endurance days. In 2024 I rode the{' '}
                <a className="tlink" href="https://transbaviaans.co.za/" target="_blank" rel="noopener noreferrer">
                  Trans Baviaans
                </a>
                , the 24-hour mountain bike marathon. This year I rode the full Ford Trailseeker series, including #6 Wellington at Bosman Family Vineyards on 12 September.
              </p>
            </div>
            <div className="life-gallery-head reveal">
              <h3>{lifeCopy.galleryTitle}</h3>
              <p className="muted small">{lifeCopy.galleryIntro}</p>
            </div>
            <div className="gal">
              {lifeGallery.map((g) => (
                <figure key={g.caption} className="reveal">
                  <div className="fr">
                    <button
                      type="button"
                      className="zoom"
                      aria-label={`View larger: ${g.caption}`}
                      onClick={(e) => {
                        zoomTrigger.current = e.currentTarget;
                        setZoomed(g);
                      }}
                    >
                      <FramedImage
                        src={g.thumb}
                        width={g.width}
                        height={g.height}
                        alt={g.alt}
                        fit={g.fit ?? 'cover'}
                        objectPosition={g.objectPosition}
                      />
                    </button>
                  </div>
                  <figcaption>
                    {g.captionLink && g.caption.includes(g.captionLink.text) ? (
                      <>
                        {g.caption.split(g.captionLink.text)[0]}
                        <a className="tlink" href={g.captionLink.href} target="_blank" rel="noopener noreferrer">
                          {g.captionLink.text}
                        </a>
                        {g.caption.split(g.captionLink.text)[1]}
                      </>
                    ) : (
                      g.caption
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="links">
              <a className="tlink ico" href={STRAVA} target="_blank" rel="noopener noreferrer">
                <StravaMark />{lifeCopy.socialLabel} on Strava
              </a>
              <a className="tlink ico" href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><InstagramMark />Instagram</a>
              <Link className="tlink" to="/uses">{lifeCopy.usesLabel}</Link>
            </div>
          </div>
        </section>

        <section className="closer edge edge-diag" id="contact" aria-labelledby="ct-h">
          <div className="wrap">
            <div className="closer-copy">
              <h2 id="ct-h">Let&apos;s talk.</h2>
              <p>
                Building something that has to work in the real world, or hiring someone who enjoys that kind of problem? Email me.
              </p>
              <p className="addr">{CONTACT_EMAIL}</p>
              <div className="ctas">
                <a className="btn btn-primary" href={contactMailto}>
                  <EnvelopeIcon />
                  Email me
                </a>
                <button className="btn btn-ghost-light" type="button" onClick={() => void copy()} aria-live="polite">
                  {copyLabel}
                </button>
              </div>
              <ul className="chans" aria-label="Other ways to reach me">
                <li>
                  <a className="chan" href={contactMailto}>
                    <span className="chip"><MailMark /></span>Email
                  </a>
                </li>
                <li>
                  <a className="chan" href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer">
                    <span className="chip"><WhatsAppMark /></span>WhatsApp
                  </a>
                </li>
                <li>
                  <a className="chan" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    <span className="chip"><LinkedInMark /></span>LinkedIn
                  </a>
                </li>
                <li>
                  <a className="chan" href={GITHUB} target="_blank" rel="noopener noreferrer">
                    <span className="chip"><GitHubMark /></span>GitHub
                  </a>
                </li>
              </ul>
            </div>
            <figure className="closer-photo">
              <FramedImage
                src={capeFriends}
                width={960}
                height={1280}
                alt="Markus Fourie and Matthew Waldeck cycling on the Cape Peninsula"
                objectPosition="center 42%"
              />
            </figure>
          </div>
        </section>
      </main>

      <footer className="ftr edge edge-s">
        <div className="wrap">
          <p className="big" aria-hidden="true"><TypedText text="Markus Fourie" /></p>
          <div className="cols">
            <div>
              <p>Full-stack developer · Pretoria</p>
              <p className="muted">{availability.employer} · {availability.status}.</p>
            </div>
            <div>
              <h3>Sections</h3>
              <ul>
                <li><a href="#work">Work</a></li>
                <li><a href="#approach">Approach</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="#journey">Journey</a></li>
              </ul>
            </div>
            <div>
              <h3>Elsewhere</h3>
              <ul>
                <li><a className="ico" href={LINKEDIN} target="_blank" rel="noopener noreferrer"><LinkedInMark />LinkedIn</a></li>
                <li><a className="ico" href={GITHUB} target="_blank" rel="noopener noreferrer"><GitHubMark />GitHub</a></li>
                <li><a className="ico" href={STRAVA} target="_blank" rel="noopener noreferrer"><StravaMark />Strava</a></li>
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul>
                <li><a className="ico" href={contactMailto}><MailMark />Email</a></li>
                <li><a className="ico" href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer"><WhatsAppMark />WhatsApp</a></li>
                <li><a href="/cert-docs/markus-fourie-resume.pdf">Resume</a></li>
                <li><a href="#top">Back to top</a></li>
              </ul>
            </div>
          </div>
          <p className="small muted" style={{ marginTop: 40 }}>© 2026 Markus Fourie</p>
        </div>
      </footer>
      <Lightbox
        item={zoomed}
        onClose={() => {
          setZoomed(null);
          zoomTrigger.current?.focus({ preventScroll: true });
        }}
      />
    </div>
  );
}

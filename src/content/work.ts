import { getProjectTags, type ProjectTagId } from '@/data/projectTags';

const CONTACT_EMAIL = 'markusfourie@icloud.com';

export type WorkImage = {
  srcsetAvif: string;
  srcsetWebp: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
};

export type WorkProject = {
  id: ProjectTagId;
  n: string;
  name: string;
  client?: string;
  kind: string;
  year?: string;
  outcome: string;
  role: string;
  stack: string[];
  image?: WorkImage;
  labTerminal?: boolean;
  stats?: [value: string, label: string][];
  caseStudy?: string;
  featuredEyebrow?: string;
  cta: { label: string; href: string; external?: boolean; mailto?: boolean };
  private?: boolean;
};

const WORK_SIZES_FEATURED = '(min-width: 1024px) min(52vw, 720px), 100vw';
const WORK_SIZES_TILE = '(min-width: 768px) min(44vw, 640px), 100vw';

function shot(
  slug: 'rms' | 'afrisist' | 'eridge' | 'skillance',
  alt: string,
  sizes: string,
): WorkImage {
  return {
    srcsetAvif: `/images/work/${slug}-800.avif 800w, /images/work/${slug}-1600.avif 1600w`,
    srcsetWebp: `/images/work/${slug}-800.webp 800w, /images/work/${slug}-1600.webp 1600w`,
    src: `/images/work/${slug}-1600.webp`,
    width: 1600,
    height: 1000,
    alt,
    sizes,
  };
}

/** Selected work display model for Option B (featured + grid). */
export const workProjects: WorkProject[] = [
  {
    id: 'katanga-rms',
    n: '01',
    name: 'Resource Management System',
    client: 'Katanga Contracting Services',
    kind: 'Operations platform',
    year: 'Since 2025',
    featuredEyebrow: 'Featured · Since 2025',
    outcome:
      'Every shift on a Katanga site produces numbers: hours worked, meter readings, which asset went where. I built the system that holds all of it, end to end, with an approval step so unchecked numbers never reach a report.',
    caseStudy:
      'Every shift on a Katanga site produces numbers: hours worked, meter readings, which asset went where. I built the system that holds all of it, end to end, with an approval step so unchecked numbers never reach a report.',
    role: 'Full-stack software developer at Katanga Contracting Services (KCS) / Rimitso',
    stack: getProjectTags('katanga-rms'),
    image: shot(
      'rms',
      'Resource Management System landing page with sign-in, API and system health links',
      WORK_SIZES_FEATURED,
    ),
    stats: [
      ['388', 'assets'],
      ['46', 'users'],
    ],
    cta: {
      label: 'Visit site',
      href: 'https://rms.rimitso.com/',
      external: true,
    },
  },
  {
    id: 'afrisist',
    n: '02',
    name: 'Afrisist',
    kind: 'Fleet alarm desk',
    year: '2025',
    outcome:
      'A limited-duration engagement I handed over in October 2025. Operators see each alarm as it lands, own it, and follow it through.',
    role: 'Full-stack developer',
    stack: getProjectTags('afrisist'),
    image: shot(
      'afrisist',
      'A truck on a mountain pass at sunrise, from the Afrisist brand imagery',
      WORK_SIZES_TILE,
    ),
    private: true,
    cta: {
      label: 'Ask me for a walkthrough',
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Walkthrough: Afrisist')}`,
      mailto: true,
    },
  },
  {
    id: 'eridge-rda',
    n: '03',
    name: 'Eridge RDA',
    kind: 'UK charity site and CMS',
    year: '2024',
    outcome:
      'A public site for a UK riding charity, with a CMS its volunteers keep current themselves.',
    role: 'Full-stack developer',
    stack: getProjectTags('eridge-rda'),
    image: shot(
      'eridge',
      'Eridge RDA home page: More than a ride, with volunteers in yellow beside a pony',
      WORK_SIZES_TILE,
    ),
    cta: {
      label: 'Visit site',
      href: 'https://www.eridgerda.org.uk/',
      external: true,
    },
  },
  {
    id: 'skillance',
    n: '04',
    name: 'Skillance',
    kind: 'Freelance marketplace',
    year: 'Ongoing',
    outcome:
      'Verified South African freelancers, with payment held until the client approves the work.',
    role: 'Co-built with Kyle Nel',
    stack: getProjectTags('skillance'),
    image: shot(
      'skillance',
      'Skillance home page: The community designed for trust',
      WORK_SIZES_TILE,
    ),
    cta: {
      label: 'Visit site',
      href: 'https://skillance.co.za/',
      external: true,
    },
  },
  {
    id: 'home-lab',
    n: '05',
    name: 'Home lab',
    kind: 'Personal infrastructure',
    year: 'Ongoing',
    outcome:
      'An HP Victus 15 running Plex and local models on Ollama. I try things here before a client sees them.',
    role: 'Just me, on my own time',
    stack: getProjectTags('home-lab'),
    labTerminal: true,
    cta: {
      label: 'See my stack',
      href: '#stack',
    },
  },
];

export const workSectionCopy = {
  marker: '01 · Work',
  countLabel: 'Selected work · 05',
  title: "Things I've shipped",
  intro:
    "Software for very different people: a contractor's site teams, fleet operators, a UK charity's volunteers and South African freelancers. Plus the home server where I try things first.",
  statsLabel: 'Running on it today',
  frameHost: 'rms.rimitso.com',
};

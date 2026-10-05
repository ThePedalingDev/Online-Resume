import { availability, siteMetaDescription } from '@/config/availability';
import { getProjectTags, type ProjectTagId } from '@/data/projectTags';

export type Status = {
  role: string;
  employer: string;
  client: string;
  availability: string;
  location: string;
  timezone: string;
};

export const siteMeta = {
  title: 'Markus Fourie · Full-stack developer in Pretoria',
  description: siteMetaDescription(),
  ogTitle: 'Markus Fourie · Software that holds up outside the office',
  locale: 'en_ZA' as const,
};

export const siteStatus: Status = {
  role: 'Full-stack developer',
  employer: availability.employer,
  client: availability.client,
  availability: availability.status,
  location: availability.location,
  timezone: availability.timezone,
};

export const heroCopy = {
  name: 'Markus Fourie',
  role: 'Full-stack developer in Pretoria',
  tagline: 'Software that holds up outside the office.',
  subline:
    "Right now that's the Resource Management System Katanga Contracting Services (KCS) runs its sites, assets and shifts on. Before it: a fleet alarm desk, a UK charity's website and a freelance marketplace.",
};

export const workCopy = {
  nav: 'Work',
  title: "Things I've shipped",
  intro:
    "Software for very different people: a contractor's site teams, fleet operators, a UK charity's volunteers and South African freelancers. Plus the home server where I try things first.",
};

/** Card body text only — layout stays on the existing Role/Problem/Built/Result cards. */
export const projectCopy: Array<{
  id: ProjectTagId;
  n: string;
  name: string;
  role: string;
  problem: string;
  built: string;
  result: string;
  href?: string;
  cta: 'visit' | 'private';
  ctaLabel?: string;
}> = [
  {
    id: 'katanga-rms',
    n: '01',
    name: 'Resource Management System',
    role: 'Full-stack software developer at Katanga Contracting Services (KCS) / Rimitso',
    problem:
      'Katanga Contracting Services (KCS) needed sites, assets, teams, and shift transactions such as hours and meter readings reviewed through approval before they reach reports.',
    built: 'RMS for Katanga Contracting Services (KCS), hosted on Azure.',
    result: '388 assets and 46 users run on it.',
    href: 'https://rms.rimitso.com/',
    cta: 'visit',
  },
  {
    id: 'afrisist',
    n: '02',
    name: 'Afrisist',
    role: 'Full-stack developer',
    problem:
      'Vehicle fleet operators needed a desk to watch incoming alarms, assign them, and stay notified as events arrive.',
    built: 'Alarm monitoring dashboard for vehicle fleets, hosted on Azure, with WebSocket updates.',
    result: 'Handed over in October 2025 after a limited-duration engagement. Operators can watch, assign, and get notified as fleet alarms arrive.',
    cta: 'private',
    ctaLabel: 'Ask me for a walkthrough',
  },
  {
    id: 'eridge-rda',
    n: '03',
    name: 'Eridge RDA',
    role: 'Full-stack developer',
    problem:
      'The Eridge group of Riding for the Disabled needed a public site and a way for volunteers to keep programmes and events current.',
    built: 'Site and CMS with programmes, a photo gallery, volunteer applications, and a protected admin.',
    result: 'Public site and volunteer CMS in use at eridgerda.org.uk.',
    href: 'https://www.eridgerda.org.uk/',
    cta: 'visit',
  },
  {
    id: 'skillance',
    n: '04',
    name: 'Skillance',
    role: 'Co-built with Kyle Nel',
    problem:
      'South African freelancers and clients needed a verified marketplace to discover professionals, review profiles, and book with payment held until work is approved.',
    built: 'Verified freelance marketplace for South Africa, co-built with Kyle, with iOS and Android apps still to come.',
    result: 'Web product live at skillance.co.za; mobile launch still to come.',
    href: 'https://skillance.co.za/',
    cta: 'visit',
  },
];

export const approachCopy = {
  nav: 'Approach',
  title: 'The unglamorous parts, done properly.',
  intro:
    "Most of what I build never makes it into a demo. It's the approval step before a report, the audit log that shows who changed what, and the dashboard someone reads on a bad screen in a site office. That's the part of the job I enjoy, because it's where software earns people's trust.",
  capabilities: [
    { name: 'Resource management', line: "Who has which asset, where, and whether it's compliant." },
    { name: 'Audit trails', line: 'Append-only records you can query later.' },
    { name: 'Billing reconciliation', line: 'What happened in the field, matched to what was invoiced.' },
    { name: 'Ops dashboards', line: 'React and TypeScript, readable on a bad screen.' },
    { name: 'Offline-first', line: "Work keeps going without a signal and syncs when it's back." },
  ],
  quote:
    'Good systems are a chain of small, repeated decisions. The log line written for whoever is debugging at 2 am. The edge case handled before it becomes a ticket.',
  principlesLabel: 'How I work',
  principles: [
    {
      title: '01 · Build for the next team',
      body: "I write for the version of the system that exists in three years, run by people who aren't me.",
    },
    {
      title: '02 · Get the shape right first',
      body: 'With the right data model, features come cheaply. With the wrong one, every feature costs twice.',
    },
    {
      title: '03 · Make it tell the truth',
      body: 'Audit logs, health checks and dashboards should show what is actually happening, not what you hope is.',
    },
  ],
};

export const stackCopy = {
  nav: 'Stack',
  title: 'What I work in',
  intro:
    "My day to day is React and TypeScript at the front, and ASP.NET Core or Node with Postgres behind it. I learned it in that order: the page, then a typed language, then the server and the database. Cloud came once I had something worth hosting, and mobile is what I'm learning next.",
  atHome:
    "At home: an HP Victus 15 runs as my home server, with Plex and local models (Gemma, Qwen) on Ollama. It's where I try things before they go near a client.",
};

export type StackCat = { name: string; items: Array<{ n: string; y: string }> };

export const stackGroups: StackCat[] = [
  {
    name: 'Front end and web',
    items: [
      { n: 'HTML, CSS, JavaScript', y: '5 yrs' },
      { n: 'TypeScript', y: '4 yrs' },
      { n: 'React', y: '4 yrs' },
      { n: 'Tailwind CSS', y: '3 yrs' },
      { n: 'Next.js', y: '2 yrs' },
      { n: 'GSAP', y: '2 yrs' },
      { n: 'Three.js', y: '1 yr' },
    ],
  },
  {
    name: 'Back end and data',
    items: [
      { n: 'Node.js / Express', y: '4 yrs' },
      { n: 'C#', y: '4 yrs' },
      { n: 'ASP.NET Core', y: '3 yrs' },
      { n: 'EF Core', y: '3 yrs' },
      { n: 'SQL', y: '4 yrs' },
      { n: 'PostgreSQL', y: '3 yrs' },
      { n: 'Supabase', y: '2 yrs' },
      { n: 'REST / OpenAPI', y: 'in use' },
      { n: 'Python', y: '2 yrs' },
    ],
  },
  {
    name: 'Cloud and ops',
    items: [
      { n: 'Linux', y: 'in use' },
      { n: 'Docker', y: '2 yrs' },
      { n: 'Nginx', y: '2 yrs' },
      { n: 'GitHub Actions', y: '2 yrs' },
      { n: 'Azure', y: '1 yr' },
      { n: 'Cloudflare tunnels', y: '1 yr' },
    ],
  },
  {
    name: 'Security',
    items: [
      { n: 'Environment secrets', y: 'in use' },
      { n: 'Role-based access', y: 'in use' },
    ],
  },
  {
    name: 'Learning now',
    items: [
      { n: 'Go', y: 'learning' },
      { n: 'iOS and Android', y: 'in progress' },
    ],
  },
];

export const journeyCopy = {
  nav: 'Journey',
  title: 'How I got here',
  intro:
    "I didn't take the straight road into software. I started in physics and maths, switched to a computing degree, and was shipping production work before I graduated.",
  paperTrailTitle: 'The paper trail',
  paperTrailIntro: "If you'd rather read it than scroll it, it's all here.",
};

export type JourneyNode = {
  year: string;
  chip: string;
  title: string;
  desc: string;
  tags: string[];
  project?: ProjectTagId;
};

export const journeyNodes: JourneyNode[] = [
  {
    year: '2020',
    chip: 'Potchefstroom',
    title: 'Physics and maths at NWU',
    desc: 'I went to North-West University planning on mechanical engineering. I passed eight semester subjects, then left, because software was the bigger brief.',
    tags: ['NWU', 'Physics', 'Mathematics'],
  },
  {
    year: '2023',
    chip: 'Pretoria',
    title: 'Switching to computing',
    desc: 'I started a BSc in Computer and Information Science at Varsity College (now Emeris) in Pretoria, learning C#, Java and the web stack. I was a student tutor there from 2023 to 2025.',
    tags: ['Emeris', 'C#', 'Java'],
  },
  {
    year: '2024',
    chip: 'First production work',
    title: 'Real users, real stakes',
    desc: 'I shipped the Eridge RDA site and CMS for a UK charity, so volunteers could keep programmes and events current.',
    tags: ['Eridge RDA'],
    project: 'eridge-rda',
  },
  {
    year: '2025',
    chip: 'Degree and first role',
    title: 'Cum Laude, and a first full-time role',
    desc: 'I completed my BSc in Computer and Information Science in December 2025, Cum Laude, at Varsity College (now Emeris) in Pretoria. I was a Varsity College Top Achiever in 2025 and a Golden Key member. I started as a full-stack software developer at Katanga Contracting Services (KCS) / Rimitso, and I handed over the Afrisist fleet alarm desk in October 2025 after a limited-duration engagement that year.',
    tags: ['KCS', 'Rimitso', 'Emeris', 'Afrisist'],
  },
  {
    year: '2026',
    chip: 'Now',
    title: 'All in on operations software',
    desc: "It's October 2026. I'm a full-stack software developer at Katanga Contracting Services (KCS) / Rimitso, 2025 to present, and RMS is live in production. I'm open to new work and new experiences.",
    tags: ['KCS', 'Rimitso'],
    project: 'katanga-rms',
  },
];

export { lunoReferral } from './lunoReferral';

export const lifeCopy = {
  nav: 'Life',
  title: 'Off the clock, on the bike',
  quote: "I don't ride a bike to add days to my life. I ride a bike to add life to my days.",
  quoteAttr: 'Markus Fourie',
  intro:
    'When I close the laptop, I ride: mostly cross-country marathons and long endurance days. In 2024 I rode the Trans Baviaans, the 24-hour mountain bike marathon. This year I rode the full Ford Trailseeker series, including #6 Wellington at Bosman Family Vineyards on 12 September.',
  galleryTitle: 'Field notes',
  galleryIntro: 'Race days, long rides and the desk where the other half happens. All shot on my phone.',
  usesLabel: 'Curious about the kit? See my desk and bike setup',
  socialLabel: 'Follow the riding',
};

export const galleryCaptions = [
  { cls: 'g-1', n: '12 Sep 2026', l: 'Trailseeker #6, Wellington' },
  { cls: 'g-2', n: 'Studio', l: 'The home desk' },
  { cls: 'g-3', n: 'Bike', l: 'My S-Works, freshly upgraded' },
  { cls: 'g-4', n: 'Race', l: 'Race morning' },
  { cls: 'g-5', n: 'Ride', l: 'A long gravel day' },
];

export const contactCopy = {
  nav: 'Contact',
  title: "Let's talk",
  intro:
    'Building something that has to work in the real world, or hiring someone who enjoys that kind of problem? Email me.',
  email: 'markusfourie@icloud.com',
};

export const paperTrail: Array<{ label: string; href: string; note: string; external?: boolean }> = [
  { label: 'Resume (PDF)', href: '/cert-docs/markus-fourie-resume.pdf', note: 'October 2026' },
  { label: 'Golden Key certificate', href: '/cert-docs/VC_GoldenKey.pdf', note: 'Top Performer · 23 April 2025' },
  {
    label: 'Verify on Golden Key',
    href: 'https://golden-key-international-honou.verified.cv/en/verify/20892159851455',
    note: 'External record',
    external: true,
  },
  { label: 'Academic results (ZIP)', href: '/cert-docs/VarsityCollege_Results.zip', note: 'Varsity College · ZIP' },
];

export function projectTags(id: ProjectTagId): string[] {
  return getProjectTags(id);
}

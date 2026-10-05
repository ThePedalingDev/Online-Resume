/**
 * Single source of truth for Markus's availability / employment status.
 *
 * Edit `status` (and optionally `employer`) when this changes. The hero
 * Employment stat, the contact availability line, and the HTML meta
 * description all read from here.
 */
export const availability = {
  /** Hire-facing availability (hero status + contact). */
  status: 'Open to new work and new experiences',
  /** Employer shown in status/meta. */
  employer: 'Katanga Contracting Services',
  /** Client relationship shorthand when needed. */
  client: 'KCS',
  location: 'Pretoria',
  timezone: 'UTC+2',
} as const;

export function availabilityLine(): string {
  return `${availability.employer} · ${availability.status}`;
}

export function siteMetaDescription(): string {
  return `I'm Markus, a full-stack developer in Pretoria. I build operations software for Katanga Contracting Services, plus sites and tools for fleets, a UK charity and a freelance marketplace.`;
}

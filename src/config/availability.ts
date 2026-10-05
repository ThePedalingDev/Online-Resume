/**
 * Single source of truth for Markus's availability / employment status.
 *
 * Edit `status` (and optionally `employer`) when this changes. The hero
 * Employment stat, the contact availability line, and the HTML meta
 * description all read from here.
 */
export const availability = {
  /** Hire-facing availability (hero status + contact). */
  status: 'open to new work and new experiences',
  /** Employer shown beside the availability line. */
  employer: 'Katanga Contracting Services (KCS) / Rimitso',
  /** Short client / employer label when space is tight. */
  client: 'KCS',
  location: 'Pretoria',
  timezone: 'UTC+2',
} as const;

export function availabilityLine(): string {
  return `${availability.employer} · ${availability.status}`;
}

export function siteMetaDescription(): string {
  return `I'm Markus, a full-stack software developer at Katanga Contracting Services (KCS) / Rimitso in Pretoria. I build operations software, including RMS, plus sites and tools for fleets, a UK charity and a freelance marketplace.`;
}

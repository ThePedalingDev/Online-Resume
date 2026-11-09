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
  return 'Markus Fourie is a full-stack developer in Pretoria building operations software: the Resource Management System for Katanga site teams, fleet alarms, a UK charity site and a freelance marketplace.';
}

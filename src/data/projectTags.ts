/** Canonical project tech tags — single source for Home cards, Journey stack rows, and /projects. */
export const PROJECT_TAGS = {
  'katanga-rms': ['React', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'SignalR', 'Azure'],
  afrisist: ['React', 'Node.js', 'Supabase', 'WebSocket', 'Azure'],
  'eridge-rda': ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'],
  skillance: ['React', 'Fastify', 'PostgreSQL'],
  'home-lab': ['Linux', 'Plex', 'Ollama'],
} as const;

export type ProjectTagId = keyof typeof PROJECT_TAGS;

export function getProjectTags(id: ProjectTagId): string[] {
  return [...PROJECT_TAGS[id]];
}

export function joinProjectTags(tags: readonly string[]): string {
  return tags.join(' · ');
}

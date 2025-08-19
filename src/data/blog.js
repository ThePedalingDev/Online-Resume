/**
 * Markus' real starlogs. Short, honest write-ups from recent work.
 */
export const posts = [
  {
    id: 'post-1',
    title: 'Shipping the RDA site, Stripe and Supabase included',
    date: '2025-08-01',
    excerpt:
      'Took the RDA website live with donations, volunteer sign-ups, and a simple CMS. Notes on Stripe, Supabase, and frontend polish.',
    content:
      'I pushed the RDA site live at https://www.eridgerda.org.uk/ with Stripe donations, volunteer sign-ups, a programmes section, and a small admin CMS. Frontend is React with Vite and Tailwind. Data lives in Supabase.\n\nBig wins. Clean forms with Formik and Yup, safe file uploads, and simple admin flows for non-technical users. Lessons. Keep Stripe webhooks in their own service, validate everything at the edge, and cache images for a fast gallery. Next up. Better transitions, gallery likes, and programme colors on the calendar.',
  },
 
  {
    id: 'post-3',
    title: 'Alarm Dashboard, faster sidebar and saner sockets',
    date: '2025-07-29',
    excerpt:
      'Rebuilt the sidebar state, optimistic updates, and socket logic for real-time alarms.',
    content:
      'I refactored the Alarm Dashboard sidebar. Tabs for New, Assigned, and Dropbox now use a single state flow, consistent keys, and optimistic UI updates. I fixed duplication and stale state by centralizing socket handlers and adding a safe getAlarmKey utility. The context menu lets me assign to users or Dropbox without blocking the UI.\n\nResult. Lower jank, instant feedback on assignment, and clear active tab styling. Next. Loader on tab switches and unified close logic from the navbar.',
  },
  {
    id: 'post-4',
    title: 'RaceReady v0.1, fueling math that matches the legs',
    date: '2025-07-20',
    excerpt:
      'Prototype that turns FTP, weight, and duration into bottles, gels, and solids you can follow.',
    content:
      'I started RaceReady. Frontend is React with Tailwind. Backend is a .NET 8 Web API. The first pass converts weight, FTP, and race duration into carbs per hour, gel timing, bottle mix, and sodium targets. My current FTP is 305 W, so I tested the plan on familiar routes. The numbers line up well with how I feel.\n\nNext. Add weather and elevation modifiers, then Strava import for route duration and intensity.',
  },
  {
    id: 'post-5',
    title: 'Home lab, private access without open ports',
    date: '2025-07-25',
    excerpt:
      'Got Tailscale running, moved services behind a proxy, and cleaned up access.',
    content:
      'I set up Tailscale for private access to my home lab. Docker and Portainer manage services. I run Nginx Proxy Manager for clean hostnames and TLS. Heimdall gives me a simple dashboard. I used Cloudflare Tunnel on earlier tests, but Tailscale fits this network better and keeps ports closed.\n\nResult. Safe remote access, easy service routing, and fewer firewall headaches. Next steps. Add a local AI model and a small monitoring stack.',
  },
];

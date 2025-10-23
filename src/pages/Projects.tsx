import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import SplitText from '@/components/animations/SplitText';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

const PROJECTS = [
  {
    title: 'Katanga Contracting Services - Resource Management System',
    period: '2025 to Present',
    description: 'Designed and implemented an enterprise-level asset management and operations platform using ASP.NET MVC, SQL Server, and EF Core. Developed multi-role access control, Tailwind-styled admin dashboards, and comprehensive data validation logic.',
    highlights: [
      'Collaborated directly with stakeholders to translate complex business workflows into automated digital processes',
      'Improved asset tracking efficiency and data accuracy',
      'Integrated modular controllers and seeding logic for roles, sites and transactions'
    ],
    technologies: ['ASP.NET MVC', 'C#', 'SQL Server', 'Entity Framework Core', 'Tailwind CSS'],
    link: '#',
    github: '#',
  },
  {
    title: 'Afrisist - Alarm Monitoring System',
    period: '2025 Limited Duration Project',
    description: 'Built a self-hosted, real-time web application using React, Node.js, and Supabase for managing vehicle alarms for large fleets. Implemented WebSocket-based live updates, context-based alarm assignment and automated notification logic.',
    highlights: [
      'Developed an intuitive operator dashboard with Tailwind + DaisyUI',
      'Supporting animated tabs, filtering and real-time event streams',
      'Enhanced reliability and speed with webhook-driven automation and optimised API routes'
    ],
    technologies: ['React', 'Node.js', 'Supabase', 'WebSocket', 'Tailwind CSS', 'DaisyUI'],
    link: '#',
    github: '#',
  },
  {
    title: 'Eridge Branch of RDA Non-Profit Charity',
    period: '2024',
    description: 'Developed a full-stack web solution for a UK-based charity using React (Vite), Node.js (Express), and PostgreSQL (Supabase). Delivered CMS functionality for managing volunteers, gallery content, and programmes.',
    highlights: [
      'Designed accessible, responsive UI components matching the organization\'s branding',
      'Implemented custom admin dashboard and contact form management',
      'Dynamic program/event listings for better content control'
    ],
    technologies: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'DaisyUI'],
    link: 'https://www.eridgerda.org.uk/',
    github: '#',
  },
] as const;

export function Projects() {

  return (
    <div className="min-h-screen">
      {/* Global Scroll Indicator */}
      <ScrollIndicator variant="glossy" />
      {/* Projects Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <SplitText
              text="My Projects"
              className="text-4xl md:text-5xl font-bold"
              splitType="words"
              delay={100}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 50, scale: 0.9 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              tag="h1"
              threshold={0.2}
            />
            <FadeIn direction="up" delay={0.3}>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                A collection of real-world applications I've built, showcasing my full-stack development capabilities and problem-solving skills.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-8" stagger={0.15}>
            {PROJECTS.map((project, index) => (
              <div key={index} className="h-full">
                <Card className="h-full flex flex-col hover:shadow-xl transition-all hover:-translate-y-1 group cursor-default bg-card/50 backdrop-blur-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="group-hover:text-primary transition-colors text-xl leading-tight">
                        {project.title}
                      </CardTitle>
                      <span className="text-xs text-muted-foreground whitespace-nowrap bg-primary/10 px-2 py-1 rounded-full">
                        {project.period}
                      </span>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">Key Highlights:</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:scale-105 transition-transform"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        {project.link !== '#' && (
                          <Button size="sm" variant="outline" className="flex-1 hover:scale-105 transition-transform" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Live
                            </a>
                          </Button>
                        )}
                        {project.github !== '#' && (
                          <Button size="sm" variant="outline" className="flex-1 hover:scale-105 transition-transform" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-12 text-center hover:scale-[1.01] transition-transform">
              <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <Button size="lg" asChild className="hover:scale-105 transition-transform">
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

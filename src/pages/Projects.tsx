import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import MagicBento from '@/components/effects/MagicBento';

export function Projects() {
  const projects = [
    {
      title: 'Rimitso RMS System',
      description: 'Full-stack ASP.NET MVC application for mining asset and transaction management with site-based user roles and audit logging.',
      technologies: ['ASP.NET', 'C#', 'MVC', 'Entity Framework', 'Azure'],
      link: '#',
      github: '#',
    },
    {
      title: 'Afrisist Alarm Dashboard',
      description: 'Real-time MERN-based dashboard for vehicle alarm management with WebSocket updates and role-based actions.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Real-time'],
      link: '#',
      github: '#',
    },
    {
      title: 'RDA Charity Website',
      description: 'Full-featured charity site with React, Node.js, Supabase, Stripe integration, admin CMS, and volunteer signups.',
      technologies: ['React', 'Node.js', 'Supabase', 'Stripe', 'TypeScript'],
      link: 'https://rda-foundation.co.uk',
      github: '#',
    },
    {
      title: 'BudgetPiggy App',
      description: 'Personal finance tracker built with React Native for managing expenses, savings goals, and notifications.',
      technologies: ['React Native', 'Firebase', 'TypeScript', 'Mobile'],
      link: '#',
      github: '#',
    },
    {
      title: 'Star Wars x Cycling Portfolio',
      description: 'Creative personal portfolio built with React, Three.js, and TailwindCSS, featuring an interactive light/dark theme.',
      technologies: ['React', 'Three.js', 'TailwindCSS', 'Creative'],
      link: '#',
      github: '#',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Projects Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">My Projects</h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                A collection of real-world applications I've built, showcasing my full-stack development capabilities and problem-solving skills.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.15}>
            {projects.map((project, index) => (
              <MagicBento
                key={index}
                particleCount={15}
                particleSpeed={0.3}
                particleSize={1.5}
                particleColor="#3b82f6"
                hoverIntensity={2}
                className="h-full"
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition hover:-translate-y-2 group cursor-pointer bg-transparent border-none shadow-none">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:scale-105 transition-transform"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 hover:scale-105 transition-transform" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 hover:scale-105 transition-transform" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </MagicBento>
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

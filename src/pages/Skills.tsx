import { Zap, Award, TrendingUp, Code2, Database, Server, Wrench } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';

export function Skills() {
  const skillCategories = [
    {
      category: 'Languages',
      icon: Code2,
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'C#', 'Java', 'Kotlin', 'SQL'],
    },
    {
      category: 'Frontend',
      icon: Code2,
      skills: ['React', 'Next.js', 'Tailwind CSS', 'DaisyUI', 'Shadcn/ui', 'Three.js', 'Framer Motion', 'Redux'],
    },
    {
      category: 'Backend',
      icon: Server,
      skills: ['Node.js', 'Express', 'ASP.NET Core', '.NET MVC', 'Entity Framework', 'RESTful APIs', 'WebSocket', 'Swagger'],
    },
    {
      category: 'Databases',
      icon: Database,
      skills: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Firebase', 'Supabase', 'MySQL'],
    },
    {
      category: 'DevOps & Tools',
      icon: Wrench,
      skills: ['Docker', 'Azure', 'Nginx', 'Linux', 'Git', 'GitHub Actions', 'CI/CD', 'Portainer', 'VS Code'],
    },
    {
      category: 'Other Skills',
      icon: Zap,
      skills: ['Web Performance', 'Responsive Design', 'UI/UX Design', 'Testing', 'Agile', 'Problem Solving', 'API Design', 'Security'],
    },
  ];

  const stats = [
    { icon: TrendingUp, label: 'Experience', value: '5+ Years' },
    { icon: Award, label: 'Projects', value: '5+' },
    { icon: Zap, label: 'Technologies', value: '40+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Skills Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                A comprehensive overview of the technologies and tools I use to build production-grade applications.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="p-6 rounded-lg border bg-background hover:shadow-md transition text-center hover:-translate-y-1">
                  <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4 hover:scale-110 hover:rotate-12 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Technical Expertise</h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Technologies organized by category and level of proficiency
              </p>
            </div>
          </FadeIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.12}>
            {skillCategories.map((skillGroup, index) => {
              const Icon = skillGroup.icon;
              return (
                <div key={index} className="p-6 rounded-lg border bg-background hover:shadow-md transition hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Additional Info */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
            {[
              {
                title: 'Real-World Experience',
                description: '5+ years building enterprise applications for mining, fleet management, and charity organizations.',
              },
              {
                title: 'Continuous Learning',
                description: 'BSc IT student (Cum Laude) staying current with modern frameworks and cloud technologies.',
              },
              {
                title: 'Full-Stack Expertise',
                description: 'Proficient across the entire development stack, from React UIs to ASP.NET backends and Azure deployments.',
              },
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-lg border bg-background hover:shadow-md transition hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-2 text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </div>
  );
}

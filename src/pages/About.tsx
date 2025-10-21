import { Button } from '@/components/ui/button';
import { Download, Sparkles, Target, Lightbulb, Award, BookOpen, Code2 } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';

export function About() {
  const education = [
    {
      degree: 'BSc. Computer and Information Science',
      status: 'Cum Laude (Expected December 2025)',
      school: 'Varsity College – Pretoria Campus',
      details: '19 of 20 completed modules with distinctions. Member of Golden Key International Honour Society (2025).',
      icon: BookOpen,
    },
    {
      degree: 'BSc. Physics and Mathematics (Incomplete)',
      status: '2020 - 2021',
      school: 'North-West University - Potchefstroom',
      details: 'Passed 8 semester subjects. Changed career path to specialize in Computer Science.',
      icon: Award,
    },
  ];

  const skills = [
    { category: 'Languages', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'C#', 'Java', 'Kotlin', 'SQL'] },
    { category: 'Frameworks & Tools', items: ['React', 'Node.js', 'Express', '.NET Core', 'Tailwind CSS', 'Docker', 'Azure', 'Supabase', 'Linux'] },
    { category: 'Databases', items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Firebase'] },
    { category: 'Other', items: ['Git', 'RESTful API Design', 'DaisyUI', 'Swagger', 'CI/CD'] },
  ];

  const interests = [
    'Mountain biking & road cycling',
    'Strength training & fitness',
    'Online research & continuous learning',
    'Traveling & spending time with family',
  ];

  const highlights = [
    {
      title: 'Experience',
      description: '5+ years of real-world development experience building enterprise solutions',
      icon: Target,
    },
    {
      title: 'Expertise',
      description: 'Full-stack development: React, Node.js, ASP.NET Core, and cloud platforms',
      icon: Sparkles,
    },
    {
      title: 'Passion',
      description: 'Creating scalable, user-centric web solutions that make a real impact',
      icon: Lightbulb,
    },
    {
      title: 'Philosophy',
      description: 'Clean code, attention to detail, continuous learning, and team collaboration',
      icon: Code2,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* About Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Full-stack software developer and BSc IT student specializing in Application Development. I build scalable enterprise solutions with a passion for elegant design and solid engineering.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional Summary</h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground max-w-4xl leading-relaxed">
              <p>
                Full-stack software- and applications developer, specialising in systems design, development, multi-disciplinary programming and systems maintenance, who will complete final year of BSc. Computer and Information Science Degree, expected to be received Cum Laude in December 2025.
              </p>
              <p>
                Already experienced in developing scalable, web-based, enterprise solutions, including the "Resource Management System" of Rimitso Mining Services (Pty) Ltd (being developed under Technical Services and Management Consulting Agreement for African Mining Solutions Ltd and its major subsidiary, Katanga Contracting Services SAS established in DRC) and the Afrisist Fleet Management Alarm Dashboard - both of which systems being developed whilst completing Final year of BSc. Degree.
              </p>
              <p>
                Always ready to take responsibility and initiative, to create high-quality and performance-driven systems and solutions, applying appropriate attention to critical details and pro-active problem-solving skills.
              </p>
              <p>
                Content to work unsupervised, if needed, but always focussed on working with, supporting and developing teams and mentoring-, developing and assisting others. Served as Varsity College student tutor, to both junior students and fellow students.
              </p>
              <p>
                Loyal, hard working and eager to make a difference, to grow and serve people, business and systems.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Education */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Education</h2>
          </FadeIn>
          <StaggerReveal className="space-y-5" stagger={0.15}>
            {education.map((edu, idx) => {
              const Icon = edu.icon;
              return (
                <div key={idx} className="p-6 rounded-lg border bg-background hover:shadow-md transition hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-primary font-medium">{edu.status}</p>
                      <p className="text-sm text-muted-foreground mt-1">{edu.school}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{edu.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Technical Skills</h2>
          </FadeIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1}>
            {skills.map((skill, idx) => (
              <div key={idx} className="p-5 rounded-lg border bg-background hover:shadow-md transition hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-3 text-primary">{skill.category}</h3>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <p key={item} className="text-sm text-muted-foreground hover:text-foreground transition hover:translate-x-1">
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What I Bring</h2>
          </FadeIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.15}>
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-6 rounded-lg border bg-background hover:shadow-md transition cursor-pointer hover:-translate-y-1">
                  <div className="inline-block p-3 rounded-lg bg-primary/10 mb-3 hover:scale-110 hover:rotate-6 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-base text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Interests & Hobbies */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interests & Hobbies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-background border hover:shadow-md transition hover:translate-x-1">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-base text-foreground">{interest}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Resume CTA */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-10 flex flex-col md:flex-row justify-between items-center gap-6 hover:scale-[1.01] transition-transform">
              <div>
                <h2 className="text-3xl font-bold mb-2">Want to know more?</h2>
                <p className="text-base text-muted-foreground">
                  Download my resume to see my complete experience, projects, and professional references.
                </p>
              </div>
              <Button size="lg" className="flex items-center gap-2 hover:scale-105 transition-transform">
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

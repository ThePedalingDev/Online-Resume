import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { Download, Sparkles, Target, Lightbulb, Award, BookOpen, Code2, GraduationCap } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import { ScaleIn } from '@/components/animations/ScaleIn';
import SplitText from '@/components/animations/SplitText';
import { ShinyText } from '@/components/animations/ShinyText';

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
      description: '5+ years of coding experience with real-world development projects and enterprise solutions',
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
      {/* Global Scroll Indicator */}
      <ScrollIndicator variant="glossy" />
      {/* About Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <SplitText
              text="About Me"
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
            <FadeIn delay={0.3} direction="up">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-sm md:text-base font-medium flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <ShinyText text="Full-Stack Developer" className="font-medium" />
                </div>
                <div className="px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-700 dark:text-blue-400 text-sm md:text-base font-medium">
                  <ShinyText text="BSc IT Student" className="font-medium" />
                </div>
                <div className="px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent-foreground text-sm md:text-base font-medium">
                  <ShinyText text="Application Development" className="font-medium" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                I build scalable enterprise solutions with a passion for elegant design and solid engineering. 
                <span className="text-primary font-semibold"> 5+ years</span> of coding experience with real-world projects, 
                specializing in full-stack web applications that make a real impact.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section id="professional-summary" className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-gradient-to-br from-card/30 via-card/50 to-card/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/50 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Professional Summary
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Card className="mt-8 bg-background/50 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
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
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Education
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
          </FadeIn>
          <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-6" stagger={0.15}>
            {education.map((edu, idx) => {
              const Icon = edu.icon;
              return (
                <ScaleIn key={idx} delay={idx * 0.1}>
                  <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {edu.degree}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              {edu.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{edu.school}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{edu.details}</p>
                    </CardContent>
                  </Card>
                </ScaleIn>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Technical Skills */}
      <section id="technical-skills" className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-gradient-to-b from-background to-card/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Technical Skills
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                A comprehensive toolkit for building modern, scalable applications
              </p>
            </div>
          </FadeIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {skills.map((skill, idx) => (
              <ScaleIn key={idx} delay={idx * 0.1}>
                <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Code2 className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {skill.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {skill.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-200" />
                          <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-200 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScaleIn>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                What I Bring
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                Key strengths and values that drive my work
              </p>
            </div>
          </FadeIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScaleIn key={index} delay={index * 0.1}>
                  <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 group-hover:rotate-6">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {item.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </ScaleIn>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Interests & Hobbies */}
      <section id="interests-hobbies" className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-gradient-to-br from-card/30 via-card/50 to-card/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/50 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Interests & Hobbies
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                Beyond code, here's what keeps me motivated and balanced
              </p>
            </div>
          </FadeIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
            {interests.map((interest, idx) => (
              <ScaleIn key={idx} delay={idx * 0.1}>
                <Card className="bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors group-hover:scale-110 group-hover:rotate-6">
                        <Sparkles className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base text-foreground font-medium group-hover:text-accent transition-colors">
                          {interest}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleIn>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Resume CTA */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <ScaleIn delay={0.2}>
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:shadow-xl transition-all hover:scale-[1.01] backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <Download className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Want to know more?</h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                      Download my resume to see my complete experience, projects, and professional references.
                    </p>
                  </div>
                  <Button size="lg" className="flex items-center gap-2 hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-white border-0 px-8 py-6 text-lg font-semibold" asChild>
                    <a href="/cert-docs/251023 Markus Fourie Resume.pdf" download>
                      <Download className="w-5 h-5" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}

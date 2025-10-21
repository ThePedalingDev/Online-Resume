import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Code2, Zap, Users, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import SplitText from '@/components/animations/SplitText';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { StravaIcon } from '@/components/icons/StravaIcon';
import bitmojiImage from '@/assets/images/bitmoji.png';
import GradualBlur from '@/components/effects/GradualBlur';
import LiquidEther from '@/components/effects/LiquidEther';

export function Home() {
  const containerRef = useRef(null);

  const featuredProjects = [
    {
      title: 'Rimitso RMS System',
      description: 'Full-stack ASP.NET MVC application for mining asset and transaction management with site-based user roles and audit logging.',
      tags: ['ASP.NET', 'C#', 'MVC', 'Entity Framework', 'Azure'],
      link: '#',
    },
    {
      title: 'Afrisist Alarm Dashboard',
      description: 'Real-time MERN-based dashboard for vehicle alarm management with WebSocket updates and role-based actions.',
      tags: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Real-time'],
    },
    {
      title: 'RDA Charity Website',
      description: 'Full-featured charity site with React, Node.js, Supabase, Stripe integration, admin CMS, and volunteer signups.',
      tags: ['React', 'Node.js', 'Supabase', 'Stripe', 'TypeScript'],
      link: 'https://rda-foundation.co.uk',
    },
  ];

  const technologies = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'TailwindCSS', 'Next.js', 'Three.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'ASP.NET Core', 'C#', 'Entity Framework'] },
    { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'SQL Server'] },
    { category: 'DevOps', items: ['Docker', 'Azure', 'Nginx', 'GitHub Actions', 'CI/CD'] },
  ];

  const stats = [
    { icon: Code2, label: 'Projects Completed', value: '5+' },
    { icon: Zap, label: 'Technologies', value: '15+' },
    { icon: Users, label: 'Real-World Clients', value: '3+' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/ThePedalingDev', color: 'hover:text-gray-800 dark:hover:text-white' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/markus-fourie/', color: 'hover:text-blue-600' },
    { icon: Mail, label: 'Email', href: 'mailto:markusfourie@icloud.com', color: 'hover:text-red-600' },
    { icon: StravaIcon, label: 'Strava', href: 'https://www.strava.com/athletes/7756913', color: 'hover:text-orange-600', isCustom: true },
  ];

  return (
    <div className="min-h-screen" ref={containerRef}>
      {/* Hero Section with LiquidEther Background */}
      <section className="w-full relative overflow-hidden min-h-screen flex items-center -mt-16 pt-16">
        {/* LiquidEther Background - Extended to cover navbar */}
        <div className="absolute inset-0 z-0" style={{ top: '-80px', height: 'calc(100% + 80px)' }}>
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={50}
            cursorSize={120}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.5}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
          />
        </div>

        {/* Hero Content */}
        <div className="w-full px-[var(--container-padding)] py-20 pt-32 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Bitmoji Avatar - Desktop version */}
              <div className="absolute top-0 right-0 lg:right-4 xl:right-8 z-20 hidden md:block">
                <ScaleIn delay={0.4} className="relative group">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
                    <img
                      src={bitmojiImage}
                      alt="Markus Fourie - Full-Stack Developer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Floating elements around the avatar */}
                    <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary/20 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-4 h-4 bg-accent/20 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 -left-6 w-3 h-3 bg-primary/30 rounded-full animate-pulse delay-500"></div>
                  </div>
                </ScaleIn>
              </div>

              {/* Main Content */}
              <div className="space-y-8 text-center lg:text-left max-w-4xl">
                {/* Mobile Bitmoji - Above text */}
                <div className="flex justify-center mb-6 md:hidden">
                  <ScaleIn delay={0.1} className="relative group">
                    <div className="relative w-32 h-32">
                      <img
                        src={bitmojiImage}
                        alt="Markus Fourie - Full-Stack Developer"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Floating elements around the avatar */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-accent/20 rounded-full animate-pulse delay-1000"></div>
                      <div className="absolute top-1/2 -left-3 w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-500"></div>
                    </div>
                  </ScaleIn>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <SplitText
                      text="Hi, I'm Markus" 
                      className="text-5xl md:text-7xl lg:text-8xl font-bold"
                      splitType="words"
                      delay={60}
                      duration={0.8}
                      ease="power3.out"
                      from={{ opacity: 0, y: 50, scale: 0.9 }}
                      to={{ opacity: 1, y: 0, scale: 1 }}
                      tag="h1"
                      threshold={0.1}
                      rootMargin="-50px"
                    />
                    <FadeIn delay={0.3} direction="up">
                      <div className="flex items-center gap-3 justify-center lg:justify-start flex-wrap">
                        <div className="px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-sm md:text-base font-medium flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          <span>Full-Stack Developer</span>
                        </div>
                        <div className="px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent-foreground text-sm md:text-base font-medium">
                          BSc IT Student
                        </div>
                      </div>
                    </FadeIn>
                  </div>

                  <FadeIn delay={0.5} direction="up">
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      I build scalable web solutions that make a real impact. Specializing in full-stack development with React, Node.js, and ASP.NET.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.7} direction="up">
                    <div className="flex gap-4 pt-4 justify-center lg:justify-start flex-wrap">
                      <Link to="/projects">
                        <Button size="lg" className="flex items-center gap-2 hover:scale-105 transition-transform text-base px-8 py-6">
                          View My Projects
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="hover:scale-105 transition-transform text-base px-8 py-6">
                          Get in Touch
                        </Button>
                      </Link>
                    </div>
                  </FadeIn>
                </div>

                {/* Stats Grid */}
                <FadeIn delay={0.9} direction="up">
                  <div className="pt-8 border-t border-border/50">
                    <StaggerReveal className="grid grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 mb-3 hover:scale-110 hover:rotate-6 transition-all">
                              <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                          </div>
                        );
                      })}
                    </StaggerReveal>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50 relative">
        <GradualBlur preset="top" strength={1.5} height="4rem" opacity={0.6} />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up" className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              I'm a passionate full-stack web developer and BSc IT student specializing in Application Development. I've worked on several real-world projects ranging from mining management systems to charity websites and alarm monitoring dashboards. I love building solutions that make a difference, combining clean design with solid backend logic. My goal is to grow into a Solutions Architect and design systems that scale globally.
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Beyond code, I'm an XC and road cycling enthusiast, strength training advocate, and home lab tinkerer. I believe in continuous learning and staying ahead of tech trends—whether that's experimenting with Docker and Nginx or following the latest in web development.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Projects</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              A selection of real-world projects that showcase my full-stack capabilities
            </p>
          </FadeIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.2}>
            {featuredProjects.map((project, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <Card className="hover:shadow-lg transition h-full flex flex-col group cursor-pointer hover:-translate-y-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:scale-105 transition-transform"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <div className="mt-4 flex items-center gap-2 text-primary hover:gap-3 transition-all">
                        <span className="text-sm font-medium">View Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScaleIn>
            ))}
          </StaggerReveal>

          <FadeIn direction="up" delay={0.4} className="mt-8 text-center">
            <Link to="/projects">
              <Button variant="outline" size="lg" className="flex items-center gap-2 mx-auto hover:scale-105 transition-transform">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50 relative">
        <GradualBlur preset="top" strength={1.2} height="3rem" opacity={0.5} />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Technologies & Skills</h2>
            <p className="text-muted-foreground text-base md:text-lg mt-2">
              Modern tools and frameworks I use to build production-grade applications
            </p>
          </FadeIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.12}>
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border bg-background hover:shadow-md transition cursor-pointer hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold mb-3 text-primary">{tech.category}</h3>
                <div className="space-y-2">
                  {tech.items.map((item) => (
                    <p
                      key={item}
                      className="text-sm text-muted-foreground hover:text-foreground transition hover:translate-x-1"
                    >
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Connect Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <ScaleIn delay={0.2} className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 md:p-12 text-center space-y-6 hover:scale-[1.01] transition-transform backdrop-blur-sm">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Let's Work Together</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're looking for a developer to join your team, collaborate on a project, or just want to chat about tech and cycling, I'd love to hear from you.
              </p>
            </div>

            {/* Social Links */}
            <StaggerReveal className="flex justify-center gap-4 flex-wrap pt-4" stagger={0.1}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg border bg-background hover:bg-primary/10 transition hover:scale-110 hover:rotate-6 ${social.color}`}
                    title={social.label}
                  >
                    {social.isCustom ? <Icon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </a>
                );
              })}
            </StaggerReveal>

            <div className="pt-4">
              <Link to="/contact">
                <Button size="lg" className="mx-auto flex items-center gap-2 hover:scale-105 transition-transform">
                  Send Me a Message
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}

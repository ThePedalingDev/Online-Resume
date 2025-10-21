import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Code2, Zap, Users, Github, Linkedin, Mail, ExternalLink, FileText, Award, Download } from 'lucide-react';
import { useRef } from 'react';
import SplitText from '@/components/animations/SplitText';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { ShinyText } from '@/components/animations/ShinyText';
import { StravaIcon } from '@/components/icons/StravaIcon';
import bitmojiImage from '@/assets/images/bitmoji.png';
import GradualBlur from '@/components/effects/GradualBlur';
import LiquidEther from '@/components/effects/LiquidEther';

export function Home() {
  const containerRef = useRef(null);

  const featuredProjects = [
    {
      title: 'Katanga Contracting Services - RMS',
      description: 'Enterprise-level asset management and operations platform with multi-role access control, Tailwind-styled admin dashboards, and comprehensive data validation logic.',
      tags: ['ASP.NET MVC', 'SQL Server', 'EF Core', 'Tailwind CSS'],
      link: '#',
    },
    {
      title: 'Afrisist Alarm Monitoring',
      description: 'Self-hosted, real-time web application for managing vehicle alarms for large fleets with WebSocket-based live updates and automated notification logic.',
      tags: ['React', 'Node.js', 'Supabase', 'WebSocket', 'DaisyUI'],
      link: '#',
    },
    {
      title: 'Eridge RDA Non-Profit Charity',
      description: 'Full-stack web solution for UK-based charity with CMS functionality for managing volunteers, gallery content, programmes, and dynamic event listings.',
      tags: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Supabase'],
      link: 'https://www.eridgerda.org.uk/',
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
        <div className="w-full px-[var(--container-padding)] py-20 pt-32 relative z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto pointer-events-none">
            <div className="relative pointer-events-none">
              {/* Bitmoji Avatar - Desktop version */}
              <div className="absolute top-0 right-0 lg:right-4 xl:right-8 z-20 hidden md:block pointer-events-none">
                <ScaleIn delay={0.4} className="relative group">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] pointer-events-none">
                    <img
                      src={bitmojiImage}
                      alt="Markus Fourie - Full-Stack Developer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                    {/* Floating elements around the avatar */}
                    <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary/20 rounded-full animate-pulse pointer-events-none"></div>
                    <div className="absolute -bottom-6 -left-6 w-4 h-4 bg-accent/20 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
                    <div className="absolute top-1/2 -left-6 w-3 h-3 bg-primary/30 rounded-full animate-pulse delay-500 pointer-events-none"></div>
                  </div>
                </ScaleIn>
              </div>

              {/* Main Content */}
              <div className="space-y-8 text-center lg:text-left max-w-4xl pointer-events-none">
                {/* Mobile Bitmoji - Above text */}
                <div className="flex justify-center mb-6 md:hidden pointer-events-none">
                  <ScaleIn delay={0.1} className="relative group">
                    <div className="relative w-32 h-32 pointer-events-none">
                      <img
                        src={bitmojiImage}
                        alt="Markus Fourie - Full-Stack Developer"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      />
                      {/* Floating elements around the avatar */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full animate-pulse pointer-events-none"></div>
                      <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-accent/20 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
                      <div className="absolute top-1/2 -left-3 w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-500 pointer-events-none"></div>
                    </div>
                  </ScaleIn>
                </div>

                <div className="space-y-6 pointer-events-none">
                  <div className="space-y-4 pointer-events-none">
                    <SplitText
                      text="Hi, I'm Markus" 
                      className="text-5xl md:text-7xl lg:text-8xl font-bold pointer-events-none"
                      splitType="words"
                      delay={230}
                      duration={1.2}
                      ease="power3.out"
                      from={{ opacity: 0, y: 50, scale: 0.9 }}
                      to={{ opacity: 1, y: 0, scale: 1 }}
                      tag="h1"
                      threshold={0.1}
                      rootMargin="-50px"
                    />
                    <FadeIn delay={0.3} direction="up">
                      <div className="flex items-center gap-3 justify-center lg:justify-start flex-wrap pointer-events-none">
                        <div className="px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-sm md:text-base font-medium flex items-center gap-2 pointer-events-none">
                          <Sparkles className="w-5 h-5" />
                          <ShinyText text="Full-Stack Developer" className="font-medium" />
                        </div>
                        <div className="px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-700 dark:text-blue-400 text-sm md:text-base font-medium pointer-events-none">
                          <ShinyText text="Graduate" className="font-medium" />
                        </div>
                        <div className="px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent-foreground text-sm md:text-base font-medium pointer-events-none">
                          <ShinyText text="BSc Computer & Information Sciences" className="font-medium" />
                        </div>
                      </div>
                    </FadeIn>
                  </div>

                  <FadeIn delay={0.5} direction="up">
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed pointer-events-none">
                      I build scalable web solutions that make a real impact. Specializing in full-stack development with React, Node.js, and ASP.NET.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.7} direction="up">
                    <div className="flex gap-4 pt-4 justify-center lg:justify-start flex-wrap pointer-events-none">
                      <Link to="/projects" className="pointer-events-auto">
                        <Button size="lg" className="flex items-center gap-2 hover:scale-105 transition-transform text-base px-8 py-6">
                          View My Projects
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Link to="/contact" className="pointer-events-auto">
                        <Button size="lg" variant="outline" className="hover:scale-105 transition-transform text-base px-8 py-6">
                          Get in Touch
                        </Button>
                      </Link>
                    </div>
                  </FadeIn>
                </div>

                {/* Stats Grid */}
                <FadeIn delay={0.9} direction="up">
                  <div className="pt-8 border-t border-border/50 pointer-events-none">
                    <StaggerReveal className="grid grid-cols-3 gap-6 lg:gap-8 pointer-events-none" stagger={0.1}>
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <div key={index} className="text-center pointer-events-none">
                            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 mb-3 hover:scale-110 hover:rotate-6 transition-all pointer-events-none">
                              <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground pointer-events-none">{stat.value}</p>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1 pointer-events-none">{stat.label}</p>
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
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20 bg-gradient-to-br from-card/30 via-card/50 to-card/30 relative overflow-hidden">
        <GradualBlur preset="top" strength={1.5} height="4rem" opacity={0.6} />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/50 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <FadeIn direction="up">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    About Me
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={0.2}>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    I'm a passionate <span className="text-primary font-semibold">full-stack web developer</span> and <span className="text-accent font-semibold">BSc IT student</span> specializing in Application Development. I've worked on several real-world projects ranging from mining management systems to charity websites and alarm monitoring dashboards.
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    I love building solutions that make a difference, combining clean design with solid backend logic. My goal is to grow into a <span className="text-primary font-semibold">Solutions Architect</span> and design systems that scale globally.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={0.4}>
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Beyond code, I'm an <span className="text-accent font-semibold">XC and road cycling enthusiast</span>, strength training advocate, and home lab tinkerer. I believe in continuous learning and staying ahead of tech trends.
                  </p>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {['Docker', 'Nginx', 'React', 'Node.js', 'ASP.NET'].map((skill) => (
                      <div key={skill} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
            
            {/* Visual Element */}
            <FadeIn direction="left" delay={0.3}>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/20 backdrop-blur-sm p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Code2 className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-primary">Full-Stack Developer</h3>
                      <p className="text-muted-foreground">Building the future, one line at a time</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-primary/30 rounded-full animate-pulse delay-500"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20 bg-gradient-to-b from-background to-card/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up" className="mb-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A selection of real-world projects that showcase my full-stack capabilities and problem-solving approach
              </p>
            </div>
          </FadeIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.15}>
            {featuredProjects.map((project, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <div className="group relative">
                  <Card className="h-full flex flex-col bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl overflow-hidden">
                    {/* Glare Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                      />
                    </div>
                    
                    <CardHeader className="pb-4 relative z-10">
                      <div className="space-y-3">
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col justify-between relative z-10">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 hover:scale-105 transition-all duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {project.link && (
                        <div className="mt-6 pt-4 border-t border-border/50">
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group/link"
                          >
                            <span className="text-sm font-medium">View Project</span>
                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Card>
                </div>
              </ScaleIn>
            ))}
          </StaggerReveal>

          <FadeIn direction="up" delay={0.6} className="mt-12 text-center">
            <Link to="/projects">
              <Button 
                size="lg" 
                className="flex items-center gap-3 mx-auto hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 px-8 py-6 text-lg font-semibold"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="w-5 h-5" />
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

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.12}>
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                {/* Glare Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      transform: 'translateX(-100%) skewX(-12deg)',
                      transition: 'transform 1s ease-out'
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-primary/80 transition-colors">
                    {tech.category}
                  </h3>
                  <div className="space-y-3">
                    {tech.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary/60 group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-200 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Docs CTA Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 md:p-12 text-center space-y-6 hover:scale-[1.01] transition-transform backdrop-blur-sm border border-primary/20 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-3 h-3 bg-purple-500/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-6 left-8 w-2 h-2 bg-pink-500/30 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-500/30 rounded-full animate-pulse delay-1500"></div>
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-500/30 rounded-full animate-pulse delay-3000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">View My Credentials</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Explore my academic achievements, certifications, and official documentation. Download transcripts, view certifications, and verify my qualifications.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/docs">
                    <Button size="lg" className="flex items-center gap-2 hover:scale-105 transition-transform bg-primary hover:bg-primary/90">
                      <Award className="w-5 h-5" />
                      View Documents
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>Certificates • Transcripts • Achievements</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
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

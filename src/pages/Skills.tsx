import { Zap, Award, TrendingUp, Code2, Database, Server, Wrench, Sparkles, Target, GraduationCap, ArrowUpDown } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import SplitText from '@/components/animations/SplitText';
import MagicBento from '@/components/effects/MagicBento';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type SkillLevel = 'core' | 'proficient' | 'learning';
type SortOption = 'level' | 'name' | 'category';

interface Skill {
  name: string;
  level: SkillLevel;
}

interface SkillCategory {
  category: string;
  icon: any;
  skills: Skill[];
  description: string;
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      category: 'Languages',
      icon: Code2,
      description: 'Programming and markup languages',
      skills: [
        { name: 'HTML', level: 'core' },
        { name: 'CSS', level: 'core' },
        { name: 'JavaScript', level: 'core' },
        { name: 'TypeScript', level: 'core' },
        { name: 'C#', level: 'core' },
        { name: 'Java', level: 'proficient' },
        { name: 'Kotlin', level: 'proficient' },
        { name: 'SQL', level: 'core' },
      ],
    },
    {
      category: 'Frameworks & Tools',
      icon: Wrench,
      description: 'Modern frameworks and development tools',
      skills: [
        { name: 'React', level: 'core' },
        { name: 'Node.js', level: 'core' },
        { name: 'Express', level: 'core' },
        { name: '.NET Core', level: 'core' },
        { name: 'Tailwind CSS', level: 'core' },
        { name: 'Docker', level: 'core' },
        { name: 'DaisyUI', level: 'core' },
        { name: 'Next.js', level: 'learning' },
        { name: 'Shadcn/ui', level: 'learning' },
        { name: 'Three.js', level: 'learning' },
        { name: 'GSAP', level: 'proficient' },
        { name: 'Vercel', level: 'proficient' },
      ],
    },
    {
      category: 'Backend & APIs',
      icon: Server,
      description: 'Server-side technologies and API development',
      skills: [
        { name: 'RESTful APIs', level: 'core' },
        { name: 'ASP.NET Core', level: 'core' },
        { name: '.NET MVC', level: 'core' },
        { name: 'Entity Framework', level: 'core' },
        { name: 'Swagger', level: 'proficient' },
        { name: 'Postman', level: 'proficient' },
      ],
    },
    {
      category: 'Databases',
      icon: Database,
      description: 'Database management and design',
      skills: [
        { name: 'PostgreSQL', level: 'core' },
        { name: 'SQL Server', level: 'core' },
        { name: 'Firebase', level: 'core' },
        { name: 'MongoDB', level: 'core' },
        { name: 'Supabase', level: 'core' },
        { name: 'MySQL', level: 'proficient' },
      ],
    },
    {
      category: 'DevOps & Infrastructure',
      icon: Server,
      description: 'Deployment, hosting, and infrastructure',
      skills: [
        { name: 'Azure', level: 'proficient' },
        { name: 'Linux Server', level: 'proficient' },
        { name: 'Git', level: 'core' },
        { name: 'Nginx', level: 'learning' },
        { name: 'GitHub Actions', level: 'proficient' },
        { name: 'CI/CD', level: 'proficient' },
        { name: 'Portainer', level: 'learning' },
        { name: 'Kubernetes', level: 'learning' },
        { name: 'Bash', level: 'proficient' },
      ],
    },
  ];

  const [sortBy, setSortBy] = useState<SortOption>('level');

  const getLevelConfig = (level: SkillLevel) => {
    switch (level) {
      case 'core':
        return {
          label: 'Core Skills',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-600/10',
          borderColor: 'border-green-600/30',
          icon: Sparkles,
          dots: 3,
        };
      case 'proficient':
        return {
          label: 'Proficient',
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-600/10',
          borderColor: 'border-blue-600/30',
          icon: Target,
          dots: 2,
        };
      case 'learning':
        return {
          label: 'Learning',
          color: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-600/10',
          borderColor: 'border-amber-600/30',
          icon: GraduationCap,
          dots: 1,
        };
    }
  };

  const sortSkills = (skills: Skill[]) => {
    switch (sortBy) {
      case 'level':
        return [...skills].sort((a, b) => {
          const levelOrder = { core: 3, proficient: 2, learning: 1 };
          return levelOrder[b.level] - levelOrder[a.level];
        });
      case 'name':
        return [...skills].sort((a, b) => a.name.localeCompare(b.name));
      case 'category':
        return skills; // Keep original order
      default:
        return skills;
    }
  };

  // Count total skills
  const totalSkills = skillCategories.reduce((total, category) => total + category.skills.length, 0);

  const stats = [
    { icon: TrendingUp, label: 'Coding Experience', value: '5+ Years' },
    { icon: Award, label: 'Industry Projects', value: '5+ Projects', subtitle: '3 for actual companies' },
    { icon: Zap, label: 'Technologies', value: `${totalSkills}+ Skills` },
  ];

  const proficiencyLegend = [
    { level: 'core' as SkillLevel, description: 'Core technical skills - Production-ready expertise' },
    { level: 'proficient' as SkillLevel, description: 'Solid working knowledge - Actively used in projects' },
    { level: 'learning' as SkillLevel, description: 'Currently expanding - Building proficiency' },
  ];

  return (
    <div className="min-h-screen">
      {/* Skills Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <SplitText
              text="Skills & Technologies"
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
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                A comprehensive overview of my technical expertise, organized by proficiency level and category.
              </p>
            </FadeIn>
          </div>
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
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1 opacity-75">{stat.subtitle}</p>
                  )}
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Proficiency Legend */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Proficiency Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {proficiencyLegend.map((item, index) => {
                const config = getLevelConfig(item.level);
                const Icon = config.icon;
                return (
                  <div key={index} className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor} transition-all hover:-translate-y-1`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-5 h-5 ${config.color}`} />
                      <span className={`font-bold ${config.color}`}>{config.label}</span>
                      <div className="flex gap-1 ml-auto">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < config.dots ? config.color.replace('text-', 'bg-') : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Technical Expertise</h2>
                  <p className="text-muted-foreground text-base md:text-lg">
                    Technologies organized by category and level of proficiency
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <div className="flex gap-1">
                    {[
                      { value: 'level', label: 'Level' },
                      { value: 'name', label: 'Name' },
                      { value: 'category', label: 'Category' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy(option.value as SortOption)}
                        className="text-xs px-2 py-1 h-7"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.12}>
            {skillCategories.map((skillGroup, index) => {
              const Icon = skillGroup.icon;
              return (
                <MagicBento
                  key={index}
                  particleCount={15}
                  particleSpeed={0.3}
                  particleSize={1.5}
                  particleColor="#8400ff"
                  hoverIntensity={1.5}
                  className="h-full"
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-lg bg-primary/10 transition-all group-hover:scale-110">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {skillGroup.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sortSkills(skillGroup.skills).map((skill) => {
                          const config = getLevelConfig(skill.level);
                          const LevelIcon = config.icon;
                          return (
                            <div
                              key={skill.name}
                              className={`group relative px-3 py-2 ${config.bgColor} border ${config.borderColor} rounded-lg text-sm font-medium transition-all hover:scale-105 cursor-pointer hover:shadow-md`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-foreground">{skill.name}</span>
                                <LevelIcon className={`w-3 h-3 ${config.color} opacity-70`} />
                              </div>
                              {/* Tooltip */}
                              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 ${config.bgColor} border ${config.borderColor} rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10`}>
                                <span className={config.color}>{config.label}</span>
                                <div className="flex gap-0.5 mt-1 justify-center">
                                  {[...Array(3)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-1.5 h-1.5 rounded-full ${i < config.dots ? config.color.replace('text-', 'bg-') : 'bg-muted'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </MagicBento>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Additional Info */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
              {[
                {
                  title: 'Real-World Experience',
                  description: 'Building enterprise applications for mining, fleet management, and charity organizations with production-grade quality.',
                  icon: Award,
                },
                {
                  title: 'Academic Excellence',
                  description: 'BSc Computer and Information Science (Cum Laude*) - 19 of 20 modules passed with distinctions.',
                  icon: GraduationCap,
                },
                {
                  title: 'Full-Stack Expertise',
                  description: 'Proficient across the entire development stack, from React UIs to ASP.NET backends and cloud deployments.',
                  icon: Zap,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:-translate-y-1 group">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </StaggerReveal>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

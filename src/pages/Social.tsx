import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { StravaIcon } from '@/components/icons/StravaIcon';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';

export function Social() {
  const socialProfiles = [
    {
      platform: 'GitHub',
      description: 'Check out my repositories, contributions, and open-source projects.',
      url: 'https://github.com/ThePedalingDev',
      icon: Github,
      color: 'hover:bg-slate-900/10 dark:hover:bg-slate-100/10',
      iconColor: 'text-slate-900 dark:text-slate-100',
    },
    {
      platform: 'LinkedIn',
      description: 'Connect with me professionally and view my full work experience.',
      url: 'https://www.linkedin.com/in/markus-fourie/',
      icon: Linkedin,
      color: 'hover:bg-blue-600/10',
      iconColor: 'text-blue-600',
    },
    {
      platform: 'Instagram',
      description: 'Follow my personal life, cycling adventures, and fitness journey.',
      url: 'https://www.instagram.com/markuss.fourie/',
      icon: Instagram,
      color: 'hover:bg-pink-600/10',
      iconColor: 'text-pink-600',
    },
    {
      platform: 'Strava',
      description: 'Track my cycling activities, training routes, and personal records.',
      url: 'https://www.strava.com/athletes/7756913',
      icon: StravaIcon,
      color: 'hover:bg-orange-600/10',
      iconColor: 'text-orange-600',
      isCustom: true,
    },
    {
      platform: 'Email',
      description: 'Send me an email directly for inquiries and business opportunities.',
      url: 'mailto:markusfourie@icloud.com',
      icon: Mail,
      color: 'hover:bg-red-600/10',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Social Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Connect With Me</h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                Find me across the web on various platforms. I'm active on social media and always happy to connect with fellow developers, cycling enthusiasts, and tech professionals.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Links Grid */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {socialProfiles.map((profile, index) => {
              const Icon = profile.icon;
              return (
                <a 
                  key={index} 
                  href={profile.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className={`hover:shadow-xl transition-all h-full cursor-pointer hover:-translate-y-2 ${profile.color}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {profile.platform}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {profile.description}
                          </CardDescription>
                        </div>
                        <div className={`p-3 rounded-lg bg-background border transition-all group-hover:scale-110 group-hover:rotate-6 ${profile.iconColor}`}>
                          {profile.isCustom ? (
                            <Icon className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform" variant="outline">
                        Visit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 md:p-12 text-center hover:scale-[1.01] transition-transform backdrop-blur-sm">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Build Something Together</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you have a project in mind, want to collaborate, or just want to chat about web development and cycling, feel free to reach out through any of the channels above.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

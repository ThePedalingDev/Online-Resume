import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import { StravaIcon } from '@/components/icons/StravaIcon';
import { useState } from 'react';
import SplitText from '@/components/animations/SplitText';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import { ScaleIn } from '@/components/animations/ScaleIn';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactDetails = [
    { icon: Mail, label: 'Email', value: 'markusfourie@icloud.com', href: 'mailto:markusfourie@icloud.com' },
    { icon: Phone, label: 'Phone', value: '+27 66 220 3312', href: 'tel:+27662203312' },
    { icon: MapPin, label: 'Location', value: 'Midstream Estate, Gauteng, South Africa', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/ThePedalingDev', username: '@ThePedalingDev' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/markus-fourie/', username: 'markus-fourie' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/markusfourie', username: '@markusfourie' },
    { icon: StravaIcon, label: 'Strava', href: 'https://www.strava.com/athletes/7756913', username: 'Markus Fourie', isCustom: true },
  ];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <SplitText
              text="Get in Touch" 
              className="text-4xl md:text-5xl font-bold"
              splitType="words"
              delay={120}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 60, scale: 0.8 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              tag="h1"
              threshold={0.2}
            />
            <FadeIn delay={0.3} direction="up">
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                I'm always interested in hearing about new projects, opportunities, and interesting ideas. Feel free to reach out through any of the channels below.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
            {contactDetails.map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <a
                  key={idx}
                  href={contact.href}
                  className="block"
                >
                  <Card className="hover:shadow-md transition h-full cursor-pointer hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{contact.label}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground hover:text-primary transition">{contact.value}</p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>I'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Tell me about your project, opportunity, or idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Social Links */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect on Social</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Follow me on social media to stay updated with my latest projects and insights
              </p>
            </div>
            <StaggerReveal className="flex justify-center gap-6 flex-wrap" stagger={0.1}>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg border bg-background hover:bg-primary/10 transition hover:scale-110 hover:rotate-6"
                    title={link.label}
                  >
                    {link.isCustom ? <Icon className="w-8 h-8 text-primary" /> : <Icon className="w-8 h-8 text-primary" />}
                  </a>
                );
              })}
            </StaggerReveal>
          </FadeIn>
        </div>
      </section>


      {/* CTA */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <ScaleIn delay={0.2} className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 md:p-12 text-center hover:scale-[1.01] transition-transform">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Collaborate</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Whether you have a project in mind, want to discuss opportunities, or just want to connect, I'm here for it. Let's create something amazing together.
            </p>
            <Button size="lg" onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}>
              Get in Touch
            </Button>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}

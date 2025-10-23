import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { useState } from 'react';
import SplitText from '@/components/animations/SplitText';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactDetails = [
    { icon: Mail, label: 'Email', value: 'markusfourie@icloud.com', href: 'mailto:markusfourie@icloud.com' },
    { icon: Phone, label: 'Phone', value: '+27 66 220 3312', href: 'tel:+27662203312' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Markus Fourie', href: 'https://linkedin.com/in/markus-fourie' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Global Scroll Indicator */}
      <ScrollIndicator variant="glossy" />
      {/* Header */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
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
      <section className="w-full px-[var(--container-padding)] py-8 md:py-12 bg-card/50">
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
      <section className="w-full px-[var(--container-padding)] py-8 md:py-12">
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

    </div>
  );
}

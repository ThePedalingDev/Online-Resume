import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import SplitText from '@/components/animations/SplitText';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EMAIL_TEMPLATE_PARAMS } from '@/config/emailjs';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactDetails = [
    { icon: Mail, label: 'Email', value: 'markusfourie@icloud.com', href: 'mailto:markusfourie@icloud.com' },
    { icon: Phone, label: 'Phone', value: '+27 66 220 3312', href: 'tel:+27662203312' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Markus Fourie', href: 'https://linkedin.com/in/markus-fourie' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if EmailJS is configured
      if (EMAILJS_CONFIG.serviceId === 'service_your_service_id') {
        // EmailJS not configured, simulate sending
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('EmailJS not configured. Simulating email send:', formData);
      } else {
        // Send email using EmailJS
        const templateParams = {
          ...EMAIL_TEMPLATE_PARAMS,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
        };

        const result = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );

        console.log('Email sent successfully:', result);
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Me a Message
                </CardTitle>
                <CardDescription>I'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      Sorry, there was an error sending your message. Please try again or contact me directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Alternative Contact Methods */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Prefer to contact me directly?
                  </p>
                  <div className="flex justify-center gap-4">
                    <a 
                      href="mailto:markusfourie@icloud.com"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-sm font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      Email Me
                    </a>
                    <a 
                      href="tel:+27662203312"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      Call Me
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

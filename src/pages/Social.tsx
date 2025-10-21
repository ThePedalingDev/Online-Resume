import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Social() {
  const socialProfiles = [
    {
      platform: 'GitHub',
      description: 'Check out my repositories, contributions, and open-source projects.',
      url: '#',
      icon: '🔗',
      color: 'bg-slate-900',
    },
    {
      platform: 'LinkedIn',
      description: 'Connect with me professionally and view my full work experience.',
      url: '#',
      icon: '💼',
      color: 'bg-blue-600',
    },
    {
      platform: 'Twitter/X',
      description: 'Follow me for updates on web development, tech trends, and insights.',
      url: '#',
      icon: '𝕏',
      color: 'bg-black',
    },
    {
      platform: 'Portfolio Blog',
      description: 'Read my technical articles and insights on web development.',
      url: '#',
      icon: '📝',
      color: 'bg-purple-600',
    },
    {
      platform: 'CodePen',
      description: 'Explore my interactive code examples and experiments.',
      url: '#',
      icon: '✏️',
      color: 'bg-orange-500',
    },
    {
      platform: 'Email',
      description: 'Send me an email directly for inquiries and business opportunities.',
      url: 'mailto:markus@example.com',
      icon: '📧',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Social Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Connect With Me</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Find me across the web on various platforms. I'm active on most social media and always happy to connect with fellow developers and enthusiasts.
          </p>
        </div>
      </section>

      {/* Social Links Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialProfiles.map((profile, index) => (
            <a key={index} href={profile.url} target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition h-full cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>{profile.platform}</CardTitle>
                      <CardDescription>{profile.description}</CardDescription>
                    </div>
                    <span className="text-2xl">{profile.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Visit
                  </Button>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-accent/10 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Build Something Together</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just want to chat about web development, feel free to reach out through any of the channels above.
          </p>
        </div>
      </section>
    </div>
  );
}

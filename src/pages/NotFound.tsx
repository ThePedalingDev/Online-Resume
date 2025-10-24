import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search, AlertTriangle, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import SplitText from '@/components/animations/SplitText';
import { ShinyText } from '@/components/animations/ShinyText';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

export function NotFound() {
  const quickLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Search },
    { name: 'Projects', path: '/projects', icon: Search },
    { name: 'Contact', path: '/contact', icon: Search },
  ];

  return (
    <div className="min-h-screen">
      {/* Scroll Indicator */}
      <ScrollIndicator variant="glossy" />
      
      {/* Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 text-center">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
            </FadeIn>
            
            <SplitText
              text="404 - Page Not Found"
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
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Oops! The page you're looking for seems to have vanished into the digital void. 
                Don't worry, even the best developers encounter missing pages from time to time.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-8" stagger={0.15}>
            {/* Error Details Card */}
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 group">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-red-600/10 transition-all group-hover:scale-110">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      What happened?
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Error Details
                    </p>
                  </div>
                </div>
                <CardDescription className="text-sm space-y-2">
                  <p>The requested page could not be found. This might happen because:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>The URL was typed incorrectly</li>
                    <li>The page has been moved or deleted</li>
                    <li>You followed a broken link</li>
                    <li>The page is temporarily unavailable</li>
                  </ul>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:scale-105 transition-transform"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 hover:scale-105 transition-transform"
                    asChild
                  >
                    <Link to="/">
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links Card */}
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 group">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 transition-all group-hover:scale-110">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Quick Navigation
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Popular Pages
                    </p>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  Here are some popular pages you might be looking for:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {quickLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm" 
                        className="hover:scale-105 transition-transform justify-start"
                        asChild
                      >
                        <Link to={link.path}>
                          <Icon className="w-4 h-4 mr-2" />
                          {link.name}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </StaggerReveal>
        </div>
      </section>

      {/* Fun Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 md:p-12 text-center hover:scale-[1.01] transition-transform backdrop-blur-sm">
              <ShinyText
                text="Lost in the Code?"
                className="text-2xl md:text-3xl font-bold mb-4"
                shimmerColor="hsl(var(--primary))"
                shimmerWidth={200}
                animationDuration={3}
              />
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Even the best developers encounter 404 errors. It's part of the journey! 
                Let's get you back on track.
              </p>
              <Button size="lg" asChild className="hover:scale-105 transition-transform">
                <Link to="/contact">
                  <Search className="w-5 h-5 mr-2" />
                  Need Help? Contact Me
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

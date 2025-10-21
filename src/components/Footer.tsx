import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { StravaIcon } from './icons/StravaIcon';

export function Footer() {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/ThePedalingDev', color: 'hover:text-gray-800 dark:hover:text-white' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/markus-fourie/', color: 'hover:text-blue-600' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/markuss.fourie/', color: 'hover:text-pink-600' },
    { icon: StravaIcon, label: 'Strava', href: 'https://www.strava.com/athletes/7756913', color: 'hover:text-orange-600', isCustom: true },
    { icon: Mail, label: 'Email', href: 'mailto:markusfourie@icloud.com', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-[var(--container-padding)] py-8 md:py-10">
        <div className="flex flex-col gap-6">
          {/* Social Links */}
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg border bg-background/50 hover:bg-primary/10 transition hover:scale-110 ${social.color}`}
                  title={social.label}
                  aria-label={social.label}
                >
                  {social.isCustom ? <Icon className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </a>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Markus Fourie
            </p>
            <p className="text-sm text-muted-foreground text-center md:text-right italic">
              "It never gets easier, you only get faster" - Greg LeMond
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

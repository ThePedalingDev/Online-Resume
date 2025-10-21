export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-[var(--container-padding)] py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Markus Fourie. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React + TypeScript + GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}

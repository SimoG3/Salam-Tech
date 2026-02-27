import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-6">
            <Link href="/homepage" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              SalamTech
            </Link>
            <span className="text-sm text-muted-foreground">
              © 2026 Tous droits réservés
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/homepage" className="text-muted-foreground hover:text-foreground transition-colors">
              À propos
            </Link>
            <Link href="/homepage" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/homepage" className="text-muted-foreground hover:text-foreground transition-colors">
              Conditions
            </Link>
            <Link href="/homepage" className="text-muted-foreground hover:text-foreground transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
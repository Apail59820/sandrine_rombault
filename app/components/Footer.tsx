import Link from "next/link";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Équipe", href: "/equipe" },
  { label: "Services", href: "/services" },
  { label: "Cabinets", href: "/cabinets" },
  { label: "Contact", href: "/contact" },
];

const infoLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "RGPD", href: "/rgpd" },
];

export function Footer() {
  return (
    <footer className="bg-surface-charcoal text-ink-inverse-muted">
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-ink-inverse-muted">
              Cabinet
            </p>
            <p className="text-2xl font-heading text-ink-inverse">
              Sandrine Rombaut
            </p>
            <p className="text-sm leading-[1.7] text-ink-inverse-muted">
              Ergothérapie pédiatrique à Carvin et Haisnes. Un accompagnement
              chaleureux, rigoureux et centré sur l&apos;enfant.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-ink-inverse-muted">
              Navigation
            </p>
            <nav
              className="flex flex-col gap-3"
              aria-label="Navigation du pied de page"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-ink-inverse-muted">
              Cabinets
            </p>
            <div className="space-y-4 text-sm leading-[1.7]">
              <div>
                <p className="text-ink-inverse">Carvin</p>
                <p>489 rue Buqueux, 62220 Carvin</p>
                <a href="tel:0321901010" className="footer-link">
                  03 21 90 10 10
                </a>
              </div>
              <div>
                <p className="text-ink-inverse">Haisnes</p>
                <p>5 impasse de la route de Béthune, 62138 Haisnes</p>
                <a href="tel:0321902020" className="footer-link">
                  03 21 90 20 20
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-ink-inverse-muted">
              Informations
            </p>
            <div className="flex flex-col gap-3">
              {infoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-xs leading-[1.6] text-ink-inverse-muted">
              Réponse sous 48h pour les demandes d&apos;information.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs uppercase tracking-[0.16em] text-ink-inverse-muted">
          <span>© 2025 Cabinet Sandrine Rombaut</span>
          <span>Site réalisé avec soin</span>
        </div>
      </div>
    </footer>
  );
}

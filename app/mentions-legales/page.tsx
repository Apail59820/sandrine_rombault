import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du cabinet d'ergothérapie.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="bg-surface-page py-12 md:py-16">
      <div className="container-site max-w-3xl space-y-6 text-ink-primary">
        <Link
          href="/"
          className="inline-flex text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
        >
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-heading text-3xl md:text-4xl">Mentions légales</h1>

        <p className="text-sm text-ink-muted">Dernière mise à jour : 8 mars 2026</p>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">Éditeur du site</h2>
          <p>Dénomination sociale : ROMBAUT Sandrine</p>
          <p>Forme juridique : Entreprise Individuelle</p>
          <p>Capital social : Non applicable</p>
          <p>Adresse du siège social : 489 RUE DE BUQUEUX, 62220 CARVIN</p>
          <p>Numéro SIRET : 81242108900085</p>
          <p>Numéro RCS + ville d&apos;immatriculation : Non applicable</p>
          <p>Numéro de TVA intracommunautaire : Non applicable</p>
          <p>Directeur / responsable de publication : ROMBAUT SANDRINE</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">Hébergement</h2>
          <p>Hébergeur : Vercel Inc.</p>
          <p>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
          <p>Site : https://vercel.com</p>
        </section>

        <Link
          href="/"
          className="inline-flex text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}

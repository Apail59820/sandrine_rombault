import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du cabinet d'ergothérapie.",
};

export default function ConfidentialitePage() {
  return (
    <main className="bg-surface-page py-12 md:py-16">
      <div className="container-site max-w-3xl space-y-6 text-ink-primary">
        <Link
          href="/"
          className="inline-flex text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
        >
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-heading text-3xl md:text-4xl">
          Politique de confidentialité
        </h1>

        <p className="text-sm text-ink-muted">Dernière mise à jour : 8 mars 2026</p>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">Données collectées</h2>
          <p>
            Le site ne collecte pas de données personnelles sans votre action.
            Si vous contactez le cabinet par email ou téléphone, les
            informations transmises (nom, coordonnées, message) sont utilisées
            uniquement pour répondre à votre demande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">Utilisation des données</h2>
          <p>
            Les données sont utilisées exclusivement pour la prise de contact,
            le suivi de votre demande et l'organisation des rendez-vous.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">Conservation</h2>
          <p>
            Les données sont conservées pendant la durée nécessaire au
            traitement de la demande, puis supprimées lorsqu&apos;elles ne sont
            plus utiles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">Vos droits</h2>
          <p>
            Conformément au RGPD, vous pouvez demander l&apos;accès, la
            rectification ou la suppression de vos données en écrivant à :
            {" "}
            <a className="underline" href="mailto:admin@nordkom.fr">
              admin@nordkom.fr
            </a>
            .
          </p>
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

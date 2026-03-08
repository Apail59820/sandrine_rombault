import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RGPD",
  description: "Informations RGPD du cabinet d'ergothérapie.",
};

export default function RgpdPage() {
  return (
    <main className="bg-surface-page py-12 md:py-16">
      <div className="container-site max-w-3xl space-y-8 text-ink-primary">
        <Link
          href="/"
          className="inline-flex text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
        >
          Retour à l&apos;accueil
        </Link>

        <header className="space-y-3">
          <h1 className="font-heading text-3xl md:text-4xl">
            Politique RGPD
          </h1>
          <p className="text-sm text-ink-muted">
            Dernière mise à jour : 8 mars 2026
          </p>
          <p>
            La présente page explique comment les données personnelles sont
            traitées dans le cadre de l&apos;activité du cabinet.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">1. Responsable du traitement</h2>
          <p>ROMBAUT Sandrine - Entreprise Individuelle</p>
          <p>Adresse : 489 RUE DE BUQUEUX, 62220 CARVIN</p>
          <p>SIRET : 81242108900085</p>
          <p>
            Contact :{" "}
            <a className="underline" href="mailto:srombaut.ergo@gmail.com">
              srombaut.ergo@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">2. Données traitées</h2>
          <p>Les catégories de données pouvant être traitées sont :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              données d&apos;identification et de contact communiquées par
              l&apos;utilisateur (nom, email, téléphone, contenu du message) ;
            </li>
            <li>
              données techniques liées à la navigation (adresse IP, logs
              techniques, date/heure de connexion) ;
            </li>
            <li>
              données communiquées lors d&apos;une prise de rendez-vous via une
              plateforme tierce (ex. Doctolib), selon la politique propre de ce
              service.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">
            3. Finalités et bases légales
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              répondre aux demandes de contact et organiser les rendez-vous
              (base légale : exécution de mesures précontractuelles / intérêt
              légitime) ;
            </li>
            <li>
              assurer le fonctionnement, la sécurité et la maintenance du site
              (base légale : intérêt légitime) ;
            </li>
            <li>
              respecter les obligations légales et réglementaires applicables
              (base légale : obligation légale).
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">4. Destinataires des données</h2>
          <p>
            Les données sont destinées au cabinet, et peuvent être transmises à
            des sous-traitants techniques strictement nécessaires au service
            (hébergement, outils techniques, prise de rendez-vous).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">5. Hébergement et sous-traitance</h2>
          <p>Hébergeur du site : Vercel Inc.</p>
          <p>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
          <p>Site : https://vercel.com</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">6. Durée de conservation</h2>
          <p>
            Les données sont conservées pendant la durée strictement nécessaire
            à la gestion de la demande, puis archivées ou supprimées selon les
            obligations légales applicables.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">7. Cookies</h2>
          <p>
            Le site utilise principalement des cookies et traceurs techniques
            nécessaires à son bon fonctionnement. En l&apos;absence de cookies
            non essentiels, aucun consentement préalable n&apos;est requis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">8. Vos droits</h2>
          <p>
            Vous disposez des droits suivants : accès, rectification,
            effacement, limitation, opposition, portabilité, et définition du
            sort de vos données après votre décès (dans les conditions prévues
            par la réglementation).
          </p>
          <p>
            Pour exercer vos droits :{" "}
            <a className="underline" href="mailto:srombaut.ergo@gmail.com">
              srombaut.ergo@gmail.com
            </a>{" "}
            ou par courrier à l&apos;adresse du siège social.
          </p>
          <p>
            En cas de difficulté, vous pouvez introduire une réclamation auprès
            de la CNIL (www.cnil.fr).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">9. Sécurité</h2>
          <p>
            Le cabinet met en œuvre des mesures techniques et organisationnelles
            raisonnables afin de protéger les données contre l&apos;accès non
            autorisé, la perte, l&apos;altération ou la divulgation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-xl">
            10. Mise à jour de la politique
          </h2>
          <p>
            Cette politique peut être modifiée à tout moment. La date de mise à
            jour affichée en haut de page fait foi.
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

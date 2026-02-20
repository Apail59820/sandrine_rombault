"use client";

import { useId, useState } from "react";
import styles from "./FaqShowcase.module.css";

interface FAQItem {
  id: string;
  question: string;
  paragraphs: string[];
  points?: string[];
  note?: string;
}

const faqItems: FAQItem[] = [
  {
    id: "ergotherapie",
    question: "Qu’est-ce que l’ergothérapie ?",
    paragraphs: [
      "L’ergothérapeute est un professionnel paramédical qui collabore avec de nombreux acteurs de terrain: orthophonistes, enseignants, médecins, pédiatres et autres professionnels de santé.",
      "Son rôle est de mener des actions concrètes pour améliorer ou maintenir l’autonomie et l’indépendance dans les actes de la vie quotidienne, à travers des activités de rééducation et de réadaptation.",
      "Les besoins sont ciblés à la suite d’un bilan d’évaluation complet et rigoureux.",
    ],
  },
  {
    id: "passation-bilan",
    question: "Passation d’un bilan",
    paragraphs: [
      "Un bilan d’évaluation prend une à deux heures en fonction du motif de consultation.",
      "Les bilans sont des évaluations basées sur des tests normés (NEPSY, MABC, DTVP3, etc.).",
      "Lors ou en amont du bilan, vous pouvez transmettre les éléments utiles suivants.",
    ],
    points: [
      "Comptes rendus de bilans déjà effectués",
      "Ordonnance médicale",
      "Extraits de cahier, photos ou vidéos",
      "Tout autre document pertinent",
    ],
    note:
      "Pour rappel, nous ne prenons pas la carte vitale. Merci de venir muni d’un moyen de paiement.",
  },
  {
    id: "bilan-pco",
    question: "Bilan PCO",
    paragraphs: [
      "L’ensemble des ergothérapeutes du cabinet sont conventionnés avec la PCO d’Arras et de Lille.",
      "Dans le cadre d’un bilan avec la PCO, merci de venir muni des documents suivants.",
    ],
    points: [
      "L’ordonnance indiquant la nécessité d’un bilan ergothérapique et de séances si nécessaire. Le bilan ne pourra pas être effectué sans cette ordonnance.",
      "L’attestation de droits (disponible sur le site Ameli).",
      "Tout autre document pertinent (compte rendu de bilan déjà effectué, photos, etc.).",
    ],
  },
  {
    id: "collaboration",
    question: "Collaboration interprofessionnelle",
    paragraphs: [
      "Au cabinet, nous avons fait le choix de fournir à votre enfant un cahier de liaison pour transmettre le contenu des séances et rester en contact avec les personnes qui l’accompagnent.",
      "Au besoin, nous réalisons des échanges avec les thérapeutes et l’équipe enseignante qui accompagne votre enfant.",
      "Nous avons la chance de travailler en collaboration avec des orthophonistes, psychomotriciennes, kinésithérapeutes, infirmières et thérapeutes familiales.",
    ],
  },
];

export function FaqShowcase() {
  const [openItemId, setOpenItemId] = useState(faqItems[0]?.id ?? "");
  const baseId = useId();

  return (
    <div id="faq" className={styles.shell}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>FAQ</p>
        <h2
          className={`${styles.title} section-title-effects section-title-effects--cool`}
        >
          <span className="section-title-effects__first">Questions</span>{" "}
          fréquentes des <span className="section-title-effects__last">familles</span>
        </h2>
        <p className={styles.intro}>
          Chaque réponse est pensée pour vous donner une vision claire de notre
          accompagnement, de la première évaluation jusqu’au suivi
          interprofessionnel.
        </p>
      </header>

      <div className={styles.surface}>
        <div className={styles.list}>
          {faqItems.map((item, index) => {
            const isOpen = openItemId === item.id;
            const triggerId = `${baseId}-faq-trigger-${item.id}`;
            const panelId = `${baseId}-faq-panel-${item.id}`;

            return (
              <article
                key={item.id}
                className={styles.item}
                data-open={isOpen ? "true" : "false"}
              >
                <h3 className={styles.questionHeading}>
                  <button
                    id={triggerId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenItemId((current) =>
                        current === item.id ? "" : item.id
                      )
                    }
                  >
                    <span className={styles.order}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.question}>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <span className={styles.iconHorizontal} />
                      <span className={styles.iconVertical} />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  className={styles.panel}
                  role="region"
                  aria-labelledby={triggerId}
                >
                  <div className={styles.panelInner}>
                    <div className={styles.answer}>
                      {item.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {item.points ? (
                        <ul className={styles.points}>
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      ) : null}

                      {item.note ? (
                        <p className={styles.note}>{item.note}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

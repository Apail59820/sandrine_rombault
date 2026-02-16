"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";
import styles from "./ServicesShowcase.module.css";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  tone: "warm" | "cool";
  items: ServiceItem[];
}

const INITIAL_VISIBLE_ITEMS = 2;

const serviceCategories: ServiceCategory[] = [
  {
    id: "pediatrie",
    title: "Pédiatrie",
    subtitle: "Enfants et adolescents",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Jeune enfant en activité d'apprentissage",
    tone: "warm",
    items: [
      {
        title: "Bilans en ergothérapie pédiatrique",
        description:
          "Évaluation fine des capacités motrices, sensorielles, cognitives et de l'autonomie de l'enfant.",
      },
      {
        title: "Troubles des apprentissages",
        description:
          "Soutien pour les troubles DYS, le TDC/dyspraxie et les difficultés de coordination dans les tâches scolaires.",
      },
      {
        title: "Régulation sensorielle",
        description:
          "Travail autour de l'intégration sensorielle pour améliorer la concentration, l'apaisement et la participation.",
      },
      {
        title: "Autonomie du quotidien",
        description:
          "Habillage, repas, hygiène, organisation des routines: chaque geste est entraîné de façon concrète et progressive.",
      },
      {
        title: "Graphisme et outils scolaires",
        description:
          "Amélioration du geste graphique, adaptation du matériel et stratégies facilitant les apprentissages.",
      },
      {
        title: "Guidance parentale et coordination",
        description:
          "Accompagnement des parents et échanges avec l'école ou les partenaires de soin pour un suivi cohérent.",
      },
    ],
  },
  {
    id: "adultes-seniors",
    title: "Adultes / Personnes âgées",
    subtitle: "Réadaptation et maintien à domicile",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Accompagnement en rééducation d'une personne âgée",
    tone: "cool",
    items: [
      {
        title: "Bilans fonctionnels adultes",
        description:
          "Évaluation des capacités motrices, cognitives et de l'impact des pathologies sur la vie quotidienne.",
      },
      {
        title: "Rééducation neurologique et orthopédique",
        description:
          "Accompagnement après AVC, traumatisme, chirurgie ou pathologie chronique pour retrouver des gestes efficaces.",
      },
      {
        title: "Mobilité et prévention des chutes",
        description:
          "Stratégies concrètes pour sécuriser les déplacements et limiter les risques à domicile ou à l'extérieur.",
      },
      {
        title: "Maintien à domicile",
        description:
          "Conseils d'aménagement de l'environnement pour faciliter les activités et conserver l'autonomie.",
      },
      {
        title: "Aides techniques et ergonomie",
        description:
          "Choix et apprentissage des aides techniques, adaptation du poste de travail et des gestes du quotidien.",
      },
      {
        title: "Accompagnement des aidants",
        description:
          "Transmission d'outils pratiques et coordination des intervenants pour un accompagnement durable.",
      },
    ],
  },
];

const withReveal = (
  delay: number,
  lane: "left" | "right" | "center" = "center"
): CSSProperties => {
  const revealX = lane === "left" ? "-36px" : lane === "right" ? "36px" : "0px";

  return {
    "--reveal-delay": `${delay}ms`,
    "--reveal-x": revealX,
  } as CSSProperties;
};

const getPanelId = (categoryId: string) => `services-panel-${categoryId}`;
const getListId = (categoryId: string) => `services-list-${categoryId}`;

export function ServicesShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openMobilePanel, setOpenMobilePanel] = useState("");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal='true']")
    );

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add(styles.isVisible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const toggleExpandedSection = (categoryId: string) => {
    setExpandedSections((current) => ({
      ...current,
      [categoryId]: !current[categoryId],
    }));
  };

  return (
    <div id="services" ref={rootRef} className={styles.shell}>
      <header
        className={cn(styles.header, styles.reveal)}
        data-reveal="true"
        style={withReveal(100)}
      >
        <p className={styles.headerEyebrow}>Champs d&apos;intervention</p>
        <h2 className={styles.headerTitle}>
          Deux parcours clairs, pensés pour chaque moment de vie
        </h2>
        <p className={styles.intro}>
          Une section plus lisible, plus respirante et progressive: vous découvrez
          d&apos;abord l&apos;essentiel, puis vous développez ce qui vous intéresse.
        </p>
      </header>

      <div className={styles.panelGrid}>
        {serviceCategories.map((category, categoryIndex) => {
          const panelId = getPanelId(category.id);
          const listId = getListId(category.id);
          const lane = categoryIndex % 2 === 0 ? "left" : "right";
          const orderLabel = String(categoryIndex + 1).padStart(2, "0");
          const isOpen = openMobilePanel === category.id;
          const isExpanded = Boolean(expandedSections[category.id]);
          const primaryItems = category.items.slice(0, INITIAL_VISIBLE_ITEMS);
          const extraItems = category.items.slice(INITIAL_VISIBLE_ITEMS);
          const remainingItems = extraItems.length;

          return (
            <article
              key={category.id}
              className={cn(
                styles.panel,
                category.tone === "warm" ? styles.panelWarm : styles.panelCool,
                styles.reveal
              )}
              data-reveal="true"
              data-open={isOpen ? "true" : "false"}
              data-lane={lane}
              style={withReveal(220 + categoryIndex * 120, lane)}
            >
              <div className={styles.desktopHeader}>
                <div className={styles.headerTopline}>
                  <span className={styles.panelOrder}>{orderLabel}</span>
                  <p className={styles.panelSubtitle}>{category.subtitle}</p>
                </div>
                <h3 className={styles.panelTitle}>{category.title}</h3>
              </div>

              <button
                type="button"
                className={styles.mobileToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenMobilePanel((current) =>
                    current === category.id ? "" : category.id
                  )
                }
              >
                <span className={styles.mobileOrder}>{orderLabel}</span>
                <span>
                  <small className={styles.mobileSubtitle}>{category.subtitle}</small>
                  <strong className={styles.mobileTitle}>{category.title}</strong>
                </span>
                <span className={styles.mobileChevron} aria-hidden="true" />
              </button>

              <div id={panelId} className={styles.panelBody}>
                <div className={styles.imageWrap}>
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 1120px) 100vw, 46vw"
                    className={styles.image}
                  />
                  <div className={styles.imageShade} aria-hidden="true" />
                </div>

                <p className={styles.servicesLabel}>Interventions clés</p>

                <div className={styles.serviceGrid}>
                  {primaryItems.map((item) => (
                    <article key={item.title} className={styles.serviceCard}>
                      <h4 className={styles.serviceTitle}>{item.title}</h4>
                      <p className={styles.serviceDescription}>
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>

                {extraItems.length > 0 && (
                  <div
                    id={listId}
                    className={styles.extraItems}
                    data-expanded={isExpanded ? "true" : "false"}
                    aria-hidden={!isExpanded}
                  >
                    <div className={styles.extraItemsInner}>
                      <div className={styles.serviceGrid}>
                        {extraItems.map((item, itemIndex) => (
                          <article
                            key={item.title}
                            className={cn(
                              styles.serviceCard,
                              styles.serviceCardExtra
                            )}
                            style={
                              {
                                "--card-delay": `${itemIndex * 55}ms`,
                              } as CSSProperties
                            }
                          >
                            <h4 className={styles.serviceTitle}>{item.title}</h4>
                            <p className={styles.serviceDescription}>
                              {item.description}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {extraItems.length > 0 && (
                  <button
                    type="button"
                    className={styles.expandButton}
                    data-expanded={isExpanded ? "true" : "false"}
                    aria-expanded={isExpanded}
                    aria-controls={listId}
                    onClick={() => toggleExpandedSection(category.id)}
                  >
                    <span>
                      {isExpanded
                        ? "Voir moins"
                        : `Voir plus (${remainingItems})`}
                    </span>
                    <span className={styles.expandButtonIcon} aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

import Image from "next/image";
import { cn } from "@/app/lib/utils";
import styles from "./ServicesShowcase.module.css";

interface ServiceItem {
  title: string;
  description: string;
  icon:
    | "clipboard"
    | "puzzle"
    | "sparkles"
    | "pencil"
    | "house"
    | "users"
    | "brain"
    | "pulse"
    | "shield"
    | "home"
    | "chair"
    | "heart";
}

interface ServiceCategory {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  tone: "warm" | "cool";
  items: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "pediatrie",
    title: "Pédiatrie",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Enfant accompagnée lors d'une activité pédagogique",
    tone: "warm",
    items: [
      {
        title: "Bilans pédiatriques",
        description:
          "Évaluation fine des capacités motrices, sensorielles et cognitives.",
        icon: "clipboard",
      },
      {
        title: "Troubles des apprentissages",
        description:
          "Soutien pour les troubles DYS, le TDC/dyspraxie et les difficultés de coordination dans les tâches scolaires.",
        icon: "puzzle",
      },
      {
        title: "Régulation sensorielle",
        description:
          "Travail autour de l'intégration sensorielle pour améliorer la concentration, l'apaisement et la participation.",
        icon: "sparkles",
      },
      {
        title: "Graphisme et outils scolaires",
        description:
          "Amélioration du geste graphique, adaptation du matériel et stratégies facilitant les apprentissages.",
        icon: "pencil",
      },
      {
        title: "Autonomie du quotidien",
        description:
          "Habillage, repas, hygiène et organisation des routines avec des mises en situation progressives.",
        icon: "house",
      },
      {
        title: "Guidance parentale et coordination",
        description:
          "Accompagnement des parents et échanges avec l'école ou les partenaires de soin pour un suivi cohérent.",
        icon: "users",
      },
    ],
  },
  {
    id: "adultes-seniors",
    title: "Adultes / Personnes âgées",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Mains âgées et accompagnement thérapeutique",
    tone: "cool",
    items: [
      {
        title: "Bilans fonctionnels adultes",
        description:
          "Évaluation des capacités motrices, cognitives et de l'impact des pathologies sur la vie quotidienne.",
        icon: "brain",
      },
      {
        title: "Rééducation neurologique et orthopédique",
        description:
          "Accompagnement après AVC, traumatisme, chirurgie ou pathologie chronique pour retrouver des gestes efficaces.",
        icon: "pulse",
      },
      {
        title: "Mobilité et prévention des chutes",
        description:
          "Stratégies concrètes pour sécuriser les déplacements et limiter les risques à domicile ou à l'extérieur.",
        icon: "shield",
      },
      {
        title: "Maintien à domicile",
        description:
          "Conseils d'aménagement de l'environnement pour faciliter les activités et conserver l'autonomie.",
        icon: "home",
      },
      {
        title: "Aides techniques et ergonomie",
        description:
          "Choix et apprentissage des aides techniques, adaptation du poste de travail et des gestes du quotidien.",
        icon: "chair",
      },
      {
        title: "Accompagnement des aidants",
        description:
          "Transmission d'outils pratiques et coordination des intervenants pour un accompagnement durable.",
        icon: "heart",
      },
    ],
  },
];

function ServiceIcon({ icon }: { icon: ServiceItem["icon"] }) {
  const sharedProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "clipboard":
      return (
        <svg {...sharedProps}>
          <rect x="6" y="5" width="12" height="15" rx="2.5" />
          <path d="M9 5.8h6" />
          <path d="M9 10h6M9 13.8h4.5" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...sharedProps}>
          <path d="M9.2 8.5V6.8A1.8 1.8 0 0 1 11 5h2a1.8 1.8 0 0 1 1.8 1.8v1.7h1.7A1.8 1.8 0 0 1 18.3 10v2a1.8 1.8 0 0 1-1.8 1.8h-1.7v1.7A1.8 1.8 0 0 1 13 17.3h-2a1.8 1.8 0 0 1-1.8-1.8v-1.7H7.5A1.8 1.8 0 0 1 5.7 12v-2a1.8 1.8 0 0 1 1.8-1.8h1.7Z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...sharedProps}>
          <path d="M12 4.8 13.5 8l3.3 1.5-3.3 1.5-1.5 3.2-1.5-3.2L7.2 9.5 10.5 8 12 4.8Z" />
          <path d="M6 14.4 6.7 16l1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z" />
          <path d="M18 13.4 18.6 15l1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...sharedProps}>
          <path d="M4.8 16.8 4 20l3.2-.8L18 8.5 15.5 6 4.8 16.8Z" />
          <path d="m14.8 6.7 2.5 2.5" />
          <path d="M8.6 18.7H20" />
        </svg>
      );
    case "house":
      return (
        <svg {...sharedProps}>
          <path d="M4.8 10.4 12 5l7.2 5.4V19a1 1 0 0 1-1 1h-4.5v-5.5H10.3V20H5.8a1 1 0 0 1-1-1v-8.6Z" />
        </svg>
      );
    case "users":
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="9" r="2.7" />
          <circle cx="15.3" cy="8.3" r="2.2" />
          <path d="M4.8 18a4.2 4.2 0 0 1 8.4 0" />
          <path d="M13.4 18a3.4 3.4 0 0 1 6.8 0" />
        </svg>
      );
    case "brain":
      return (
        <svg {...sharedProps}>
          <path d="M9 5.5a2.8 2.8 0 0 0-2.8 2.8v6.7A2.8 2.8 0 0 0 9 17.8" />
          <path d="M15 5.5a2.8 2.8 0 0 1 2.8 2.8v6.7a2.8 2.8 0 0 1-2.8 2.8" />
          <path d="M9 8.2h6M9 12h6M12 5.5v12.3" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...sharedProps}>
          <path d="M3.8 12h4l1.7-3.8 3.3 7 2.2-4.2h5.2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...sharedProps}>
          <path d="M12 4.7 18.3 7v5.1c0 3.6-2.4 6.2-6.3 7.2-3.9-1-6.3-3.6-6.3-7.2V7L12 4.7Z" />
          <path d="m9.3 12.4 1.9 1.9 3.7-3.7" />
        </svg>
      );
    case "home":
      return (
        <svg {...sharedProps}>
          <path d="M4.7 10.7 12 5l7.3 5.7" />
          <path d="M6.2 9.9V19a1 1 0 0 0 1 1h9.6a1 1 0 0 0 1-1V9.9" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "chair":
      return (
        <svg {...sharedProps}>
          <path d="M7 6.5h10v6H7z" />
          <path d="M7 12.5v6M17 12.5v6M5.5 18.5h13" />
        </svg>
      );
    case "heart":
      return (
        <svg {...sharedProps}>
          <path d="M12 19s-6.8-4.2-6.8-9a3.7 3.7 0 0 1 6.3-2.6L12 8l.5-.6A3.7 3.7 0 0 1 18.8 10c0 4.8-6.8 9-6.8 9Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function ServicesShowcase() {
  return (
    <section id="services" className={styles.shell} aria-labelledby="services-title">
      <header className={styles.header}>
        <h2
          id="services-title"
          className={`${styles.title} section-title-effects section-title-effects--cool`}
        >
          <span className="section-title-effects__first">Nos</span> champs{" "}
          <span className="section-title-effects__last">d&apos;intervention</span>
        </h2>
        <p className={styles.subtitle}>
          Découvrez nos champs d&apos;intervention adaptés à chaque patient, de
          l&apos;enfant à la personne âgée.
        </p>
      </header>

      <div className={styles.bentoGrid}>
        {serviceCategories.map((category) => (
          <article
            key={category.id}
            className={cn(
              styles.tile,
              category.tone === "warm" ? styles.tileWarm : styles.tileCool
            )}
          >
            <div className={styles.tileHeader}>
              <h3 className={styles.tileTitle}>{category.title}</h3>
            </div>

            <div className={styles.imageWrap}>
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(max-width: 599px) 100vw, (max-width: 979px) 88vw, 46vw"
                className={styles.image}
              />
              <div className={styles.imageShade} aria-hidden="true" />
            </div>

            <div className={styles.keyBlock}>
              <p className={styles.keyLabel}>Interventions clés</p>
              <div className={styles.itemsGrid}>
                {category.items.map((item) => (
                  <article key={item.title} className={styles.itemCard}>
                    <span className={styles.iconBadge} aria-hidden="true">
                      <ServiceIcon icon={item.icon} />
                    </span>
                    <div>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <p className={styles.itemDescription}>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

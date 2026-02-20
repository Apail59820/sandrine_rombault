import styles from "./TariffsShowcase.module.css";

interface TariffLine {
  label: string;
  price: string;
  note?: string;
}

const pediatricTariffs: TariffLine[] = [
  {
    label: "Bilan complet",
    price: "160€",
  },
  {
    label: "Bilan préconisation de matériel pédagogique adapté (MPA)",
    price: "100€",
  },
  {
    label: "Séance au cabinet de 30 min",
    price: "34€",
  },
];

const adultTariffs: TariffLine[] = [
  {
    label: "Visite à domicile",
    price: "À partir de 110€",
  },
  {
    label: "Bilan",
    price: "Tarif en fonction des besoins",
  },
];

function TariffList({ items }: { items: TariffLine[] }) {
  return (
    <dl className={styles.priceList}>
      {items.map((item) => (
        <div key={item.label} className={styles.priceRow}>
          <dt className={styles.priceLabel}>{item.label}</dt>
          <dd className={styles.priceMeta}>
            <span className={styles.priceValue}>{item.price}</span>
            {item.note ? (
              <span className={styles.priceNote}>{item.note}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TariffsShowcase() {
  return (
    <div id="tarifs" className={styles.shell}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Tarifs</p>
        <h2
          className={`${styles.title} section-title-effects section-title-effects--warm`}
        >
          <span className="section-title-effects__first">Des</span> tarifs
          clairs, humains et pensés pour accompagner chaque{" "}
          <span className="section-title-effects__last">parcours</span>
        </h2>
        <p className={styles.intro}>
          Une tarification lisible pour avancer sereinement, avec des modalités
          adaptées aux besoins de votre enfant comme à ceux des adultes.
        </p>
      </header>

      <article className={styles.commitment} aria-label="Engagement">
        <span className={styles.commitmentIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M12 20.5s-7-4.8-7-10.5a4 4 0 0 1 7-2.3A4 4 0 0 1 19 10c0 5.7-7 10.5-7 10.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <p className={styles.commitmentText}>
          Nous avons à cœur d’accompagner votre enfant dans ses différents lieux
          de vie. Sur ce principe, nous avons fait le choix de ne pas facturer
          nos présences en réunion ESS ou la rédaction de courrier le cas
          contraire.
        </p>
      </article>

      <div className={styles.grid}>
        <section
          className={`${styles.card} ${styles.cardPediatric}`}
          aria-labelledby="tarifs-pediatriques"
        >
          <div className={styles.cardHeader}>
            <p className={styles.cardTag}>Pédiatrie</p>
            <h3 id="tarifs-pediatriques" className={styles.cardTitle}>
              Tarifs enfants
            </h3>
            <p className={styles.cardLead}>
              Au cabinet, pour des séances progressives et un accompagnement
              régulier.
            </p>
          </div>
          <TariffList items={pediatricTariffs} />
        </section>

        <section
          className={`${styles.card} ${styles.cardAdult}`}
          aria-labelledby="tarifs-adultes"
        >
          <div className={styles.cardHeader}>
            <p className={styles.cardTag}>Adultes</p>
            <h3 id="tarifs-adultes" className={styles.cardTitle}>
              Tarifs adultes
            </h3>
            <p className={styles.cardLead}>
              Intervention à domicile et bilan construit en fonction des besoins
              réels.
            </p>
          </div>
          <TariffList items={adultTariffs} />
        </section>
      </div>
    </div>
  );
}

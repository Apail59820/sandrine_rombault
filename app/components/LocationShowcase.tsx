"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  type CabinetLocation,
  useCabinetLocation,
} from "@/app/context/CabinetLocationContext";
import styles from "./LocationShowcase.module.css";

interface CabinetDetails {
  label: CabinetLocation;
  mapQuery: string;
}

const cabinetDetails: Record<CabinetLocation, CabinetDetails> = {
  Carvin: {
    label: "Carvin",
    mapQuery: "489 rue Buqueux, 62220 Carvin, France",
  },
  Haisnes: {
    label: "Haisnes",
    mapQuery: "5 impasse de la route de Bethune, 62138 Haisnes, France",
  },
};

function getGoogleMapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=fr&z=16&output=embed`;
}

export function LocationShowcase() {
  const { location } = useCabinetLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const activeCabinet = useMemo(() => cabinetDetails[location], [location]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!("IntersectionObserver" in window)) {
      root.classList.add(styles.isVisible);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        root.classList.add(styles.isVisible);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="localisation"
      ref={rootRef}
      className={styles.shell}
      data-location={location.toLowerCase()}
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>Localisation</p>
        <h2 className={styles.title}>
          Deux adresses, une même énergie.
          <span className={styles.titleAccent}> Votre cabinet est déjà à portée de pas.</span>
        </h2>
        <p className={styles.intro}>
          Le sélecteur Carvin/Haisnes en haut de page pilote la carte en direct.
        </p>
      </header>

      <article className={styles.mapCard}>
        <iframe
          key={location}
          src={getGoogleMapEmbedUrl(activeCabinet.mapQuery)}
          title={`Carte interactive du cabinet de ${activeCabinet.label}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className={styles.map}
        />

        <div className={styles.mapOverlay} aria-hidden="true" />
      </article>
    </div>
  );
}

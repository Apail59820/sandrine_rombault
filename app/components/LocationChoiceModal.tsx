"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import type { CabinetLocation } from "@/app/context/CabinetLocationContext";
import styles from "./LocationChoiceModal.module.css";

interface LocationChoiceModalProps {
  open: boolean;
  currentLocation: CabinetLocation;
  onSelectLocation: (location: CabinetLocation) => void;
}

const locationOptions: Array<{
  location: CabinetLocation;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}> = [
  {
    location: "Carvin",
    title: "Carvin",
    description: "À proximité de Oignies, Libercourt et alentours.",
    imageSrc: "/carvin/bureau 1.webp",
    imageAlt: "Cabinet d'ergothérapie de Carvin",
  },
  {
    location: "Haisnes",
    title: "Haisnes",
    description: "À proximité de Douvrin, Wingles et alentours.",
    imageSrc: "/haines/haines_1.jpeg",
    imageAlt: "Cabinet d'ergothérapie de Haisnes",
  },
];

export function LocationChoiceModal({
  open,
  currentLocation,
  onSelectLocation,
}: LocationChoiceModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || typeof window === "undefined") {
      return;
    }

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialogNode = dialogRef.current;
    if (!dialogNode) {
      return;
    }

    const focusableButtons = dialogNode.querySelectorAll<HTMLButtonElement>(
      "button[data-location-option='true']"
    );
    focusableButtons[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const orderedButtons = Array.from(
        dialogNode.querySelectorAll<HTMLButtonElement>(
          "button[data-location-option='true']"
        )
      );
      if (orderedButtons.length === 0) {
        return;
      }

      const firstButton = orderedButtons[0];
      const lastButton = orderedButtons[orderedButtons.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstButton) {
        event.preventDefault();
        lastButton.focus();
      } else if (!event.shiftKey && activeElement === lastButton) {
        event.preventDefault();
        firstButton.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} role="presentation">
      <div className={styles.backdrop} aria-hidden="true" />

      <section
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className={styles.sparkle} aria-hidden="true" />
        <div className={styles.sparkleDelayed} aria-hidden="true" />

        <header className={styles.header}>
          <p className={styles.eyebrow}>Bienvenue</p>
          <h2 id={titleId} className={styles.title}>
            Choisissez votre cabinet
          </h2>
          <p id={descriptionId} className={styles.description}>
            Pour personnaliser votre visite, sélectionnez Carvin ou Haisnes.
          </p>
        </header>

        <div className={styles.grid}>
          {locationOptions.map((option) => (
            <button
              key={option.location}
              type="button"
              data-location-option="true"
              className={`${styles.card}${
                option.location === currentLocation ? ` ${styles.cardActive}` : ""
              }`}
              onClick={() => onSelectLocation(option.location)}
            >
              <span className={styles.media}>
                <Image
                  src={option.imageSrc}
                  alt={option.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className={styles.image}
                />
                <span className={styles.mediaShade} aria-hidden="true" />
              </span>

              <span className={styles.cardBody}>
                <span className={styles.cardTitle}>{option.title}</span>
                <span className={styles.cardDescription}>{option.description}</span>
              </span>
            </button>
          ))}
        </div>

        <p className={styles.hint}>
          Vous pourrez modifier ce choix à tout moment via le sélecteur en haut
          de page.
        </p>
      </section>
    </div>
  );
}

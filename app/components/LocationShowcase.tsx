"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type CabinetLocation,
  useCabinetLocation,
} from "@/app/context/CabinetLocationContext";
import styles from "./LocationShowcase.module.css";

interface CabinetDetails {
  label: CabinetLocation;
  mapQuery: string;
}

interface CabinetPhoto {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
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

const cabinetPhotos: Record<CabinetLocation, CabinetPhoto[]> = {
  Carvin: [
    {
      src: "/carvin/bureau 1.webp",
      alt: "Bureau du cabinet de Carvin avec bureau en bois et lumière naturelle",
      caption: "Bureau de consultation",
      width: 1200,
      height: 900,
    },
    {
      src: "/carvin/bureau 1-2.webp",
      alt: "Second angle du bureau principal du cabinet de Carvin",
      caption: "Espace de travail principal",
      width: 1080,
      height: 1360,
    },
    {
      src: "/carvin/bureau 2.webp",
      alt: "Deuxième salle de consultation du cabinet de Carvin",
      caption: "Deuxième bureau",
      width: 1200,
      height: 900,
    },
    {
      src: "/carvin/salle d'attente.webp",
      alt: "Salle d'attente du cabinet de Carvin",
      caption: "Salle d'attente",
      width: 1280,
      height: 960,
    },
    {
      src: "/carvin/salel attente 2.webp",
      alt: "Autre angle de la salle d'attente du cabinet de Carvin",
      caption: "Salle d'attente - autre vue",
      width: 1000,
      height: 1400,
    },
    {
      src: "/carvin/jardin.webp",
      alt: "Jardin du cabinet de Carvin",
      caption: "Extérieur du cabinet",
      width: 1280,
      height: 900,
    },
  ],
  Haisnes: [
    {
      src: "/haines/haines_1.jpeg",
      alt: "Cabinet de Haisnes vu depuis l'espace d'accueil",
      caption: "Cabinet de Haisnes - vue 1",
      width: 1280,
      height: 960,
    },
    {
      src: "/haines/haines_2.jpeg",
      alt: "Espace de consultation du cabinet de Haisnes",
      caption: "Cabinet de Haisnes - vue 2",
      width: 960,
      height: 1280,
    },
  ],
};

function getGoogleMapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=fr&z=16&output=embed`;
}

export function LocationShowcase() {
  const { location } = useCabinetLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const [activePhotoSrc, setActivePhotoSrc] = useState<string | null>(null);
  const activeCabinet = useMemo(() => cabinetDetails[location], [location]);
  const photos = useMemo(() => cabinetPhotos[location], [location]);
  const activePhotoIndex = useMemo(
    () => photos.findIndex((photo) => photo.src === activePhotoSrc),
    [photos, activePhotoSrc]
  );
  const activePhoto = activePhotoIndex === -1 ? null : photos[activePhotoIndex];

  const closeLightbox = useCallback(() => {
    setActivePhotoSrc(null);
  }, []);

  const showNextPhoto = useCallback(() => {
    if (activePhotoIndex === -1 || photos.length === 0) return;

    const nextPhoto = photos[(activePhotoIndex + 1) % photos.length];
    setActivePhotoSrc(nextPhoto.src);
  }, [activePhotoIndex, photos]);

  const showPreviousPhoto = useCallback(() => {
    if (activePhotoIndex === -1 || photos.length === 0) return;

    const previousPhoto =
      photos[(activePhotoIndex - 1 + photos.length) % photos.length];
    setActivePhotoSrc(previousPhoto.src);
  }, [activePhotoIndex, photos]);

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

  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowRight") {
        showNextPhoto();
        return;
      }

      if (event.key === "ArrowLeft") {
        showPreviousPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, closeLightbox, showNextPhoto, showPreviousPhoto]);

  useEffect(() => {
    if (!activePhoto) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [activePhoto]);

  return (
    <div
      id="localisation"
      ref={rootRef}
      className={styles.shell}
      data-location={location.toLowerCase()}
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>Localisation</p>
        <h2
          className={`${styles.title} section-title-effects section-title-effects--cool`}
        >
          <span className="section-title-effects__first">Deux</span> adresses,
          une même énergie.
          <span className={styles.titleAccent}>
            {" "}Votre cabinet est déjà à portée de{" "}
          </span>
          <span className={styles.titleAccentLast}>
            pas.
          </span>
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

      <section className={styles.gallerySection} aria-labelledby="cabinet-gallery-title">
        <div className={styles.galleryHeader}>
          <h3 id="cabinet-gallery-title" className={styles.galleryTitle}>
            Le cabinet de {activeCabinet.label} en images
          </h3>
          <p className={styles.galleryIntro}>
            Cliquez sur une photo pour l&apos;ouvrir en grand.
          </p>
        </div>

        <div className={styles.masonry} role="list" data-photo-count={photos.length}>
          {photos.map((photo) => (
            <button
              type="button"
              key={photo.src}
              className={styles.photoButton}
              onClick={() => setActivePhotoSrc(photo.src)}
              aria-label={`Ouvrir la photo : ${photo.caption}`}
              role="listitem"
            >
              <span className={styles.photoSurface}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 36rem) 92vw, (max-width: 64rem) 47vw, 33vw"
                  className={styles.galleryImage}
                />
              </span>
              <span className={styles.photoCaption}>{photo.caption}</span>
            </button>
          ))}
        </div>
      </section>

      {activePhoto &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Aperçu photo du cabinet de ${activeCabinet.label}`}
          >
            <button
              type="button"
              className={styles.lightboxBackdrop}
              onClick={closeLightbox}
              aria-label="Fermer l'aperçu photo"
            />

            <div className={styles.lightboxContent}>
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={closeLightbox}
                aria-label="Fermer la galerie"
              >
                Fermer
              </button>

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                    onClick={showPreviousPhoto}
                    aria-label="Photo précédente"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                    onClick={showNextPhoto}
                    aria-label="Photo suivante"
                  >
                    →
                  </button>
                </>
              )}

              <div className={styles.lightboxImageFrame}>
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  width={activePhoto.width}
                  height={activePhoto.height}
                  sizes="92vw"
                  className={styles.lightboxImage}
                  priority
                />
              </div>
              <p className={styles.lightboxCaption}>{activePhoto.caption}</p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

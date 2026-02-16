"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";
import styles from "./TeamShowcase.module.css";

interface TeamMember {
  id: string;
  name: string;
  photo: string;
  photoAlt: string;
  phone: string;
  phoneHref?: string;
  emailHref: string;
}

const rotatingTitles = [
  "une équipe attentive",
  "une équipe chaleureuse",
  "une équipe engagée",
] as const;

// Remplacer ces coordonnées par les informations réelles de chaque membre.
const teamMembers: TeamMember[] = [
  {
    id: "sandrine-rombaut",
    name: "Sandrine Rombaut",
    photo: "/sandrine_rombaut.webp",
    photoAlt: "Portrait de Sandrine Rombaut",
    phone: "06 XX XX XX XX",
    emailHref: "mailto:contact@cabinet-sandrine-rombaut.fr",
  },
  {
    id: "louise-thevel",
    name: "Louise Thével",
    photo: "/louise_thevel.jpg",
    photoAlt: "Portrait de Louise Thével",
    phone: "06 XX XX XX XX",
    emailHref: "mailto:contact@cabinet-sandrine-rombaut.fr",
  },
  {
    id: "corentin-smuerzinski",
    name: "Corentin Smuerzinski",
    photo: "/corentin_smuerzinski.jpeg",
    photoAlt: "Portrait de Corentin Smuerzinski",
    phone: "06 XX XX XX XX",
    emailHref: "mailto:contact@cabinet-sandrine-rombaut.fr",
  },
  {
    id: "tom-grebert",
    name: "Tom Grebert",
    photo: "/tom_grebert.webp",
    photoAlt: "Portrait de Tom Grebert",
    phone: "06 XX XX XX XX",
    emailHref: "mailto:contact@cabinet-sandrine-rombaut.fr",
  },
  {
    id: "marie-plichon",
    name: "Marie Plichon",
    photo: "/marie_plichon.webp",
    photoAlt: "Portrait de Marie Plichon",
    phone: "06 XX XX XX XX",
    emailHref: "mailto:contact@cabinet-sandrine-rombaut.fr",
  },
];

export function TeamShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openPhoneId, setOpenPhoneId] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!("IntersectionObserver" in window)) {
      root.classList.add(styles.isVisible);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.classList.toggle(styles.isVisible, entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTitleVisible(false);
    }, 3800);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (titleVisible) return;

    const timer = window.setTimeout(() => {
      setTitleIndex((current) => (current + 1) % rotatingTitles.length);
      setTitleVisible(true);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [titleVisible]);

  return (
    <div
      id="equipe"
      ref={rootRef}
      className={styles.shell}
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>L&apos;équipe</p>
        <h2 className={styles.title}>
          Découvrez{" "}
          <span
            className={cn(
              styles.rotatingTitle,
              titleVisible ? styles.rotatingTitleIn : styles.rotatingTitleOut
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {rotatingTitles[titleIndex]}
          </span>
        </h2>
        <p className={styles.intro}>
          Une équipe pluridisciplinaire, proche du terrain et des familles, pour
          accompagner chaque parcours avec douceur et précision.
        </p>
      </header>

      <div className={styles.grid}>
        {teamMembers.map((member, index) => {
          const phonePanelId = `team-phone-${member.id}`;
          const isPhoneOpen = openPhoneId === member.id;

          return (
            <article
              key={member.id}
              className={styles.card}
              data-open={isPhoneOpen ? "true" : "false"}
              style={
                {
                  "--card-delay": `${index * 90}ms`,
                } as CSSProperties
              }
            >
              <div className={styles.photoFrame}>
                <Image
                  src={member.photo}
                  alt={member.photoAlt}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 40vw, 24vw"
                  className={styles.photo}
                />
                <div className={styles.photoShade} aria-hidden="true" />
              </div>

              <div className={styles.cardHead}>
                <p className={styles.memberIndex}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>Ergothérapie</p>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.phoneButton}
                  aria-expanded={isPhoneOpen}
                  aria-controls={phonePanelId}
                  onClick={() =>
                    setOpenPhoneId((current) =>
                      current === member.id ? "" : member.id
                    )
                  }
                >
                  <PhoneIcon />
                  <span>{isPhoneOpen ? "Masquer" : "Afficher"} le numéro</span>
                </button>

                <a
                  href={`${member.emailHref}?subject=${encodeURIComponent(
                    `Prise de contact - ${member.name}`
                  )}`}
                  className={styles.mailButton}
                  aria-label={`Contacter ${member.name} par email`}
                >
                  <MailIcon />
                </a>
              </div>

              <div
                id={phonePanelId}
                className={styles.phonePanel}
                aria-hidden={!isPhoneOpen}
              >
                <div className={styles.phonePanelInner}>
                  {member.phoneHref ? (
                    <a href={member.phoneHref} className={styles.phoneValue}>
                      {member.phone}
                    </a>
                  ) : (
                    <span className={styles.phoneValue}>{member.phone}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.5 5.4c0-1 .8-1.9 1.9-1.9h2.2c.9 0 1.6.6 1.8 1.4l.8 3.3c.2.8-.1 1.6-.8 2l-1.4.8a14 14 0 0 0 4.3 4.3l.8-1.4c.4-.7 1.2-1 2-.8l3.3.8c.8.2 1.4 1 1.4 1.8v2.2c0 1-.8 1.9-1.9 1.9h-.9C10.6 20.4 3.6 13.4 3.6 6.3v-.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.8 6.5h16.4c.9 0 1.6.7 1.6 1.6v7.8c0 .9-.7 1.6-1.6 1.6H3.8c-.9 0-1.6-.7-1.6-1.6V8.1c0-.9.7-1.6 1.6-1.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m3.7 7.3 8.3 6.3 8.3-6.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

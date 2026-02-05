"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height))
      );
      const offset = (progress - 0.5) * 60;
      hero.style.setProperty("--parallax", `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <Image
          src="/happy_child.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__image"
        />
        <div className="hero__overlay" />
        <div className="hero__grain" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title" id="hero-title">
          Ergothérapie pédiatrique
          <span>pour révéler l'autonomie.</span>
        </h1>
        <p className="hero__lead">
          Depuis plus de 10 ans sur Carvin · Douvrin · Haines.
        </p>
        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href="#contact">
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </section>
  );
}

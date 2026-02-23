"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useCabinetLocation } from "@/app/context/CabinetLocationContext";
import { getDoctolibUrl, isDoctolibUrl } from "@/app/lib/doctolib";

interface HeroSlide {
  image: string;
  imageAlt: string;
  kicker?: string;
  headline: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  interval?: number;
}

export function Hero({
  slides,
  autoplay = false,
  interval = 5000,
}: HeroCarouselProps) {
  const { location } = useCabinetLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, isPaused, interval, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-[460px] md:min-h-[640px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Carousel d'images hero"
    >
      {slides.map((slide, index) => {
        const ctaHref = slide.cta
          ? isDoctolibUrl(slide.cta.href)
            ? getDoctolibUrl(location)
            : slide.cta.href
          : "";

        return (
          <div
            key={slide.headline}
            className={`absolute inset-0 transition-opacity duration-[900ms]  ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
                style={{
                  transform: `translateY(${scrollY * 0.25}px) scale(1.05)`,
                }}
              />
            </div>

            <div className="hero-overlay" />

            <div className="relative h-full flex items-center justify-center">
              <div className="container-site text-center">
                <div className="max-w-4xl mx-auto px-4">
                  {slide.kicker && (
                    <p
                      className="text-xs md:text-sm uppercase tracking-[0.28em] mb-4 text-white"
                      style={{
                        animation:
                          index === currentSlide
                            ? "heroFadeInUp 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 80ms backwards"
                            : "none",
                      }}
                    >
                      {slide.kicker}
                    </p>
                  )}

                  <h1
                    className="text-[clamp(2.6rem,5vw,4rem)] leading-[1.05] font-heading mb-8 !text-white text-shadow-hero"
                    style={{
                      animation:
                        index === currentSlide
                          ? "heroFadeInUp 850ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms backwards"
                          : "none",
                    }}
                  >
                    {slide.headline}
                  </h1>

                  {slide.cta && (
                    <div
                      style={{
                        animation:
                          index === currentSlide
                            ? "heroFadeInUp 950ms cubic-bezier(0.34, 1.56, 0.64, 1) 360ms backwards"
                            : "none",
                      }}
                    >
                      <a
                        href={ctaHref}
                        target={
                          ctaHref.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          ctaHref.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="btn-primary group px-8 md:px-12 py-4 md:py-5 text-base md:text-lg inline-flex items-center gap-2 shadow-[0_18px_40px_rgba(52,48,46,0.2)] hover:shadow-[0_22px_50px_rgba(52,48,46,0.25)]"
                      >
                        {slide.cta.label}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        className="carousel-arrow absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-transparent transition-all duration-[220ms] hover:bg-white/10 hover:scale-110 focus-visible:outline-2 focus-visible:outline-mist-blue focus-visible:outline-offset-2 z-10"
        aria-label="Slide précédent"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink-inverse"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="carousel-arrow absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-transparent transition-all duration-[220ms] hover:bg-white/10 hover:scale-110 focus-visible:outline-2 focus-visible:outline-mist-blue focus-visible:outline-offset-2 z-10"
        aria-label="Slide suivant"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink-inverse"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white/95 scale-125"
                : "bg-white/55 hover:bg-white/75"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}

        {autoplay && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-mist-blue focus-visible:outline-offset-2"
            aria-label={isPlaying ? "Mettre en pause" : "Lire"}
          >
            {isPlaying ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-ink-inverse"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-ink-inverse"
              >
                <polygon points="8 5 19 12 8 19" />
              </svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}

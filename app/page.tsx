import { Hero } from "./components/Hero";
import Topbar from "./components/Topbar";
import { heroSlides } from "@/app/constants/HeroSlides";
import { SectionHeading } from "@/app/components/SectionHeading";
import { Container } from "@/app/components/Container";
import { Section } from "@/app/components/Section";
import { SectionDivider } from "@/app/components/SectionDivider";
import { ServicesShowcase } from "@/app/components/ServicesShowcase";
import { TeamShowcase } from "@/app/components/TeamShowcase";
import { LocationShowcase } from "@/app/components/LocationShowcase";
import { TariffsShowcase } from "@/app/components/TariffsShowcase";
import { FaqShowcase } from "@/app/components/FaqShowcase";
import Image from "next/image";

export default function Home() {
  const appointmentUrl =
    "https://www.doctolib.fr/cabinet-paramedical/carvin/cabinet-ergotherapie-sandrine-rombaut?pid=practice-233594";
  const trainings = [
    {
      title: "TND : autisme, dys, TDAH, TDI - école des TND",
      provider: "CHU de Montpellier",
    },
    {
      title: "L'écriture et l'ergothérapie",
      provider: "Josiane Caron",
    },
    {
      title: "Trouble du spectre de l'autisme et adaptation de l'environnement",
      provider: "Edi Formation",
    },
    {
      title: "Trouble sensoriel dans les TND",
      provider: "Octopus Formation",
    },
    {
      title: "Trouble du processus sensoriel",
      provider: "Manche Santé Formation",
    },
    {
      title: "Métacognition - apprendre à apprendre",
      provider: "Octopus",
    },
    {
      title: "Ergothérapie et trouble alimentaire en pédiatrie",
      provider: "Hestia Formation",
    },
    {
      title: "Ergothérapie et TSA",
      provider: "Conseil Ergolib",
    },
    {
      title:
        "Évaluation et rééducation en ergothérapie des enfants présentant des troubles des apprentissages",
      provider: "ANFE",
    },
    {
      title:
        "Facteurs influençant l'écriture manuelle et moyens de rééducation de la dysgraphie",
      provider: "ANFE",
    },
    {
      title:
        "Outils numériques de compensation pour des enfants présentant des troubles des apprentissages et évaluation",
      provider: "Santé Formation",
    },
    {
      title: "Analyse modulaire appliquée au graphisme",
      provider: "Cabergo",
    },
    {
      title:
        "Accompagnement en ergothérapie de l'enfant présentant un trouble du spectre autistique",
      provider: "Santé Formation",
    },
    {
      title: "Trouble du processus sensoriel, niveau 1",
      provider: "Santé Formation",
    },
    {
      title: "D.U. Ergonomie système du travail",
      provider: "Université de Lille 2",
    },
  ];

  return (
    <>
      <Topbar />
      <main>
        <Hero slides={heroSlides} autoplay interval={6000} />

        <Section variant="warm" className="relative overflow-hidden !pt-20 !pb-20">
          <div
            className="absolute inset-0 pattern-lines-cool opacity-70"
            aria-hidden="true"
          />
          <div
            className="absolute -left-16 top-12 h-52 w-52 rounded-full bg-peach-primary/30 blur-3xl float-soft"
            aria-hidden="true"
          />
          <div
            className="absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-mist-blue/30 blur-3xl float-soft-delayed"
            aria-hidden="true"
          />

          <Container className="relative">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div
                className="space-y-6"
                style={{
                  animation:
                    "heroFadeInUp 860ms cubic-bezier(0.34, 1.56, 0.64, 1) 90ms backwards",
                }}
              >
                <p className="inline-flex items-center rounded-full border border-border-subtle-cool bg-surface-page px-4 py-2 text-[0.72rem] tracking-[0.15em] uppercase text-ink-secondary">
                  Un accompagnement humain et sur mesure
                </p>

                <h2 className="max-w-[21ch] font-heading text-[clamp(2rem,1.5rem+2.3vw,3.35rem)] leading-[1.08] text-ink-primary">
                  Une prise en charge douce et structurée pour faire grandir
                  l&apos;autonomie de votre enfant.
                </h2>

                <p className="max-w-[58ch] text-[1.02rem] leading-[1.8] text-ink-secondary">
                  Chaque séance est pensée comme un parcours progressif:
                  objectifs clairs, échanges réguliers avec les familles, et
                  activités adaptées aux besoins du quotidien, à Carvin comme à
                  Haisnes.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[0.75rem] uppercase tracking-[0.13em] text-ink-secondary">
                  <span className="rounded-full border border-border-subtle-warm bg-surface-page px-3 py-2">
                    Bilan personnalisé
                  </span>
                  <span className="rounded-full border border-border-subtle-cool bg-surface-page px-3 py-2">
                    Guidance parentale
                  </span>
                  <span className="rounded-full border border-border-subtle-cool bg-surface-page px-3 py-2">
                    Coordination école
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={appointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group px-8 py-4 text-base shadow-[0_18px_36px_rgba(52,48,46,0.18)] hover:shadow-[0_24px_44px_rgba(52,48,46,0.22)]"
                  >
                    Prendre rendez-vous
                    <span
                      className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>

                  <a
                    href="#services"
                    className="inline-flex items-center rounded-full border border-border-subtle-cool bg-surface-page px-6 py-3.5 text-sm text-ink-primary transition-all duration-[220ms] hover:-translate-y-0.5 hover:border-mist-blue hover:text-[#2b5562] focus-visible:outline-2 focus-visible:outline-mist-blue focus-visible:outline-offset-2"
                  >
                    Voir les services
                  </a>
                </div>
              </div>

              <div
                className="relative"
                style={{
                  animation:
                    "scaleIn 920ms cubic-bezier(0.22, 1, 0.36, 1) 220ms backwards",
                }}
              >
                <div
                  className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-peach-primary/35 via-transparent to-mist-blue/30 blur-2xl"
                  aria-hidden="true"
                />

                <div className="relative overflow-hidden rounded-[1.8rem] border border-border-subtle-white bg-surface-page shadow-[0_28px_65px_rgba(52,48,46,0.14)]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src="/haines/haines_1.jpeg"
                      alt="Salle de rééducation lumineuse au cabinet d'ergothérapie"
                      fill
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover transition-transform duration-[700ms] hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[rgba(24,22,21,0.38)] via-transparent to-[rgba(255,255,255,0.08)]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 left-5 rounded-2xl border border-border-subtle-white bg-surface-page/90 px-5 py-4 shadow-[0_18px_40px_rgba(52,48,46,0.14)] backdrop-blur"
                  style={{
                    animation:
                      "heroFadeInUp 880ms cubic-bezier(0.34, 1.56, 0.64, 1) 440ms backwards",
                  }}
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
                    Disponibilités
                  </p>
                  <p className="mt-1 font-heading text-[1.2rem] text-ink-primary">
                    Carvin et Haisnes
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section variant="warm" className="relative overflow-hidden">
          <div
            className="absolute inset-0 pattern-lines-cool opacity-70"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pattern-dots-warm opacity-60"
            aria-hidden="true"
          />
          <Container className="relative">
            <SectionHeading
              eyebrow="Nos services"
              title={
                <span className="section-title-effects section-title-effects--warm">
                  <span className="section-title-effects__first">
                    Depuis
                  </span>{" "}
                  plus de 10{" "}
                  <span className="section-title-effects__last">ans</span>
                </span>
              }
            />
            <p className="coverage-line">
              Nous intervenons sur les secteurs{" "}
              <span className="coverage-line__places">
                Carvin / Douvrin / Haisnes
              </span>{" "}
              pour accompagner vos enfants.
            </p>
          </Container>
        </Section>

        <SectionDivider
          variant="wave"
          className="text-surface-cool bg-surface-warm -mt-6"
        />

        <Section variant="cool" className="relative overflow-hidden">
          <div
            className="absolute inset-0 pattern-lines-cool opacity-70"
            aria-hidden="true"
          />
          <Container className="relative">
            <ServicesShowcase />
          </Container>
        </Section>

        <SectionDivider
          variant="steps"
          className="text-surface-warm bg-surface-cool -mt-6"
        />

        <Section variant="warm" className="relative overflow-hidden">
          <div
            className="absolute inset-0 pattern-lines-cool opacity-70"
            aria-hidden="true"
          />
          <Container className="relative">
            <TeamShowcase />
          </Container>
        </Section>

        <SectionDivider
          variant="steps"
          className="text-surface-cool bg-surface-warm -mt-6"
        />

        <Section variant="cool" className="relative overflow-hidden">
          <div
            className="absolute inset-0 pattern-lines-cool opacity-70"
            aria-hidden="true"
          />
          <LocationShowcase />
        </Section>

        <SectionDivider
          variant="wave"
          className="text-surface-warm bg-surface-cool -mt-6"
        />

        <Section variant="warm" className="relative overflow-hidden">
          <div
            className="absolute inset-0 pattern-lines-cool opacity-70"
            aria-hidden="true"
          />
          <Container className="relative">
            <TariffsShowcase />
          </Container>
        </Section>

        <SectionDivider
          variant="wave"
          className="text-surface-cool bg-surface-warm -mt-6"
        />

        <Section variant="cool" className="relative overflow-hidden">
          <div
            className="absolute inset-0 pattern-lines-cool opacity-70"
            aria-hidden="true"
          />
          <Container className="relative">
            <FaqShowcase />
          </Container>
        </Section>

        <SectionDivider
          variant="wave"
          className="text-surface-charcoal bg-surface-cool -mt-6"
        />

        <Section
          variant="charcoal"
          className="relative overflow-hidden !pt-[6.5rem] !pb-[6.5rem]"
        >
          <div
            className="absolute -left-14 top-10 h-52 w-52 rounded-full bg-mist-blue/25 blur-3xl float-soft"
            aria-hidden="true"
          />
          <div
            className="absolute -right-20 bottom-4 h-56 w-56 rounded-full bg-peach-primary/35 blur-3xl float-soft-delayed"
            aria-hidden="true"
          />

          <Container className="relative">
            <div className="mx-auto max-w-[50rem] text-center">
              <p
                className="text-[0.72rem] uppercase tracking-[0.2em] text-ink-inverse-muted"
                style={{ animation: "revealRise 700ms ease 40ms backwards" }}
              >
                Un accompagnement construit avec vous, pas à pas
              </p>

              <h2
                className="mt-4 font-heading text-[clamp(2.15rem,1.7rem+2vw,3.5rem)] leading-[1.08] !text-white text-shadow-soft"
                style={{
                  animation:
                    "heroFadeInUp 940ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms backwards",
                }}
              >
                Offrez à votre enfant un cadre bienveillant pour progresser en
                confiance.
              </h2>

              <p
                className="mx-auto mt-6 max-w-[52ch] text-[1.02rem] leading-[1.85] text-[#ECE7E4]"
                style={{ animation: "revealRise 780ms ease 240ms backwards" }}
              >
                Nous avançons avec vous, étape par étape, avec des objectifs
                concrets, des conseils pratiques et un suivi attentif.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
                style={{ animation: "revealRise 820ms ease 360ms backwards" }}
              >
                <a
                  href={appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group px-8 py-4 text-base shadow-[0_20px_42px_rgba(10,10,10,0.28)] hover:shadow-[0_24px_48px_rgba(10,10,10,0.35)]"
                >
                  Réserver une première consultation
                  <span
                    className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>

                <a
                  href="#localisation"
                  className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm text-white backdrop-blur transition-all duration-[220ms] hover:-translate-y-0.5 hover:border-white hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-mist-blue focus-visible:outline-offset-2"
                >
                  Voir nos cabinets
                </a>
              </div>
            </div>
          </Container>
        </Section>

        <SectionDivider
          variant="line"
          className="bg-surface-page text-[rgba(149,146,144,0.34)] [&_svg]:h-[2rem] md:[&_svg]:h-[2.2rem]"
        />

        <section
          aria-labelledby="formations-title"
          className="bg-surface-page py-8 md:py-10"
        >
          <Container>
            <div className="mx-auto max-w-[72rem]">
              <p
                id="formations-title"
                className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted"
              >
                Nos formations :
              </p>
              <div
                className="mt-3 h-px w-full bg-border-subtle-white"
                aria-hidden="true"
              />
              <ul className="mt-1 grid gap-x-8 md:grid-cols-2">
                {trainings.map((training) => (
                  <li
                    key={training.title}
                    className="flex items-start gap-2.5 border-b border-border-subtle-white py-3.5 text-[0.92rem] leading-[1.6] text-ink-secondary"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mist-blue"
                      aria-hidden="true"
                    />
                    <p>
                      <span className="text-ink-primary">{training.title}</span>
                      <span className="text-ink-muted">
                        {" "}
                        - {training.provider}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <SectionDivider
          variant="line"
          className="bg-surface-page text-[rgba(149,146,144,0.30)] [&_svg]:h-[2rem] md:[&_svg]:h-[2.2rem]"
        />
      </main>
    </>
  );
}

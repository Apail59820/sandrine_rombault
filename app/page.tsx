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

export default function Home() {
  return (
    <>
      <Topbar />
      <main>
        <Hero slides={heroSlides} autoplay interval={6000} />
        <Section variant="warm" className="relative overflow-hidden">
          <div
            className="absolute inset-0 pattern-dots-warm opacity-60"
            aria-hidden="true"
          />
          <Container className="relative">
            <SectionHeading
              eyebrow="Nos services"
              title="Depuis plus de 10 ans"
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
            className="absolute inset-0 pattern-dots-warm opacity-60"
            aria-hidden="true"
          />
          <LocationShowcase />
        </Section>
      </main>
    </>
  );
}

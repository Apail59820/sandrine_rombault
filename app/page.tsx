import { Hero } from "./components/Hero";
import Topbar from "./components/Topbar";
import { heroSlides } from "@/app/constants/HeroSlides";
import { SectionHeading } from "@/app/components/SectionHeading";
import { Container } from "@/app/components/Container";
import { Section } from "@/app/components/Section";

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
          </Container>
        </Section>
      </main>
    </>
  );
}

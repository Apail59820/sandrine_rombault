import { Hero } from "./components/Hero";
import Topbar from "./components/Topbar";
import { heroSlides } from "@/app/constants/HeroSlides";

export default function Home() {
  return (
    <>
      <Topbar />
      <main>
        <Hero slides={heroSlides} autoplay interval={6000}/>
      </main>
    </>
  );
}

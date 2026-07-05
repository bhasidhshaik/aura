import Capabilities from "@/components/Capabilities";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Process from "@/components/Process";

export default function Home() {
  return (
    <main>
      <Hero />
      <Capabilities />
      <Gallery />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}
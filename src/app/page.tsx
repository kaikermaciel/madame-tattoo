import AboutArtist from "../components/sections/AboutArtist";
import BentoGallery from "../components/sections/BentoGallery";
import ContactForm from "../components/sections/ContactForm";
import CoverUpSlider from "../components/sections/CoverUpSlider";
import CreationProcess from "../components/sections/CreationProcess";
import Hero from "../components/sections/Hero";
import { Analytics } from "@vercel/analytics/next"
import TattooGenerator from "../components/sections/TattooGenerator";
import FloatingCTA from "../components/ui/FloatingCTA";

export default function Home() {
  return (
    <main className="bg-studio-950 text-zinc-100 min-h-screen">
      {/* Aqui você pode colocar a Hero Section depois */}
      <div className="pt-10 text-center">
        <p className="text-xs text-icy font-mono tracking-widest uppercase">
          <Hero/>
        </p>
      </div>

      {/* Renderizando a nossa galeria Bento */}
      <Analytics />
      <AboutArtist />
      <BentoGallery />
      <CoverUpSlider />
      <CreationProcess />
      <ContactForm />
      <FloatingCTA/>
      
      {/* As outras seções (About, CoverUp, Contact) vão entrar aqui embaixo */}
    </main>
  );
}
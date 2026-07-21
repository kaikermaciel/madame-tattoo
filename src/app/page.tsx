import AboutArtist from "../components/sections/AboutArtist";
import BentoGallery from "../components/sections/BentoGallery";
import ContactForm from "../components/sections/ContactForm";
import CoverUpSlider from "../components/sections/CoverUpSlider";
import CreationProcess from "../components/sections/CreationProcess";
import Hero from "../components/sections/Hero";

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
      
      <AboutArtist />
      <BentoGallery />
      <CoverUpSlider />
      <CreationProcess />
      <ContactForm />
      
      {/* As outras seções (About, CoverUp, Contact) vão entrar aqui embaixo */}
    </main>
  );
}
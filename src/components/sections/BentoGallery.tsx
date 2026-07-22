'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { sanityClient, urlFor } from '../../lib/sanity';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Usando os ícones limpos

export interface SanityTattoo {
  _id: string;
  title: string;
  category: string;
  image: any;
  featured?: boolean;
  description?: string;
}

export default function BentoGallery() {
  const [tattoos, setTattoos] = useState<SanityTattoo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTattoo, setSelectedTattoo] = useState<SanityTattoo | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTattoos = async () => {
      try {
        const query = `*[_type == "tattoo"] | order(_createdAt desc) {
          _id,
          title,
          category,
          image,
          featured,
          description
        }`;
        const data = await sanityClient.fetch(query);
        setTattoos(data);
      } catch (error) {
        console.error('Erro ao carregar galeria do Sanity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTattoos();
  }, []);

  const filteredTattoos = activeCategory === 'all'
    ? tattoos
    : tattoos.filter(item => item.category === activeCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="portfolio" className="relative py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* Elemento de Fundo Sutil */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_20px_30px,#fff,transparent),radial-gradient(2px_2px_at_80px_120px,#0066FF,transparent)] bg-[size:300px_300px]" />
      </div>

      <div className="relative z-10">
        
        {/* Cabeçalho da Seção (Agora Limpo, Sem as Setas no Canto) */}
        <div className="text-center md:text-left mb-8">
          <span className="text-xs font-mono tracking-widest text-icy uppercase">
            // GALÁXIA DE TRABALHOS
          </span>
          <h2 className="text-3xl md:text-4xl font-mono font-black mt-1 tracking-tight uppercase">
            Galeria de <span className="text-icy">Artes</span>
          </h2>
          <p className="text-zinc-400 max-w-md text-sm mt-1 font-sans">
            Deslize para explorar. Clique no card para expandir o traço e ver em alta resolução.
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {[
            { id: 'all', label: 'Todos os Trabalhos' },
            { id: 'anime-geek', label: 'Anime & Geek' },
            { id: 'ornamental-flow', label: 'Ornamental & Flow' },
            { id: 'blackwork-bold', label: 'Blackwork & Bold' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 border uppercase tracking-wider",
                activeCategory === tab.id
                  ? "bg-icy text-studio-950 border-icy font-bold shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                  : "bg-studio-900/60 text-zinc-400 border-studio-800 hover:border-icy hover:text-white hover:shadow-[0_0_20px_rgba(0,102,255,0.3)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="flex gap-4 overflow-hidden py-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="w-[280px] h-[360px] rounded-2xl bg-studio-900/60 border border-studio-800 animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        ) : (
          /* ─── CONTAINER RELATIVO DO CARROSSEL COM SETAS FLUTUANTES NO PC ─── */
          <div className="relative group/carousel">
            
            {/* SETA ESQUERDA (Desktop/PC) */}
            <button
              onClick={() => handleScroll('left')}
              aria-label="Anterior"
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/80 border border-studio-800 text-zinc-300 hover:text-white hover:border-icy hover:bg-black hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300 items-center justify-center backdrop-blur-md opacity-0 group-hover/carousel:opacity-100"
            >
              <FiChevronLeft className="text-xl" />
            </button>

            {/* SETA DIREITA (Desktop/PC) */}
            <button
              onClick={() => handleScroll('right')}
              aria-label="Próximo"
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/80 border border-studio-800 text-zinc-300 hover:text-white hover:border-icy hover:bg-black hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300 items-center justify-center backdrop-blur-md opacity-0 group-hover/carousel:opacity-100"
            >
              <FiChevronRight className="text-xl" />
            </button>

            {/* CARROSSEL DE IMAGENS */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto overflow-y-hidden pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth touch-pan-x min-w-full"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {filteredTattoos.map((tattoo) => (
                <div
                  key={tattoo._id}
                  onClick={() => setSelectedTattoo(tattoo)}
                  className={cn(
                    "snap-start flex-shrink-0 relative overflow-hidden rounded-2xl bg-studio-900 border border-studio-800 group transition-all duration-300 cursor-pointer active:scale-98 hover:border-icy hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]",
                    tattoo.featured 
                      ? "w-[300px] sm:w-[480px] h-[360px]" 
                      : "w-[260px] sm:w-[320px] h-[360px]"
                  )}
                >
                  {tattoo.image && (
                    <Image
                      src={urlFor(tattoo.image).width(800).url()}
                      alt={tattoo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />
                  )}

                  {/* Overlay com Título e Categoria */}
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-icy font-bold">
                      // {tattoo.category.replace('-', ' ')}
                    </span>
                    <h3 className="text-base font-mono font-bold text-zinc-50 mt-1">{tattoo.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Zoom em Alta Resolução */}
      <AnimatePresence>
        {selectedTattoo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTattoo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-md cursor-zoom-out"
          >
            <button className="absolute top-6 right-6 text-zinc-400 hover:text-white text-xs font-mono tracking-widest bg-black px-4 py-2 rounded-full border border-studio-800">
              ESC // FECHAR
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                {selectedTattoo.image && (
                  <Image
                    src={urlFor(selectedTattoo.image).width(1600).url()}
                    alt={selectedTattoo.title}
                    fill
                    className="object-contain"
                    quality={95}
                  />
                )}
              </div>

              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <h4 className="text-zinc-200 text-base font-mono font-bold">{selectedTattoo.title}</h4>
                {selectedTattoo.description && (
                  <p className="text-zinc-400 text-xs mt-1 font-sans">{selectedTattoo.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && filteredTattoos.length === 0 && (
        <div className="text-center py-12 text-zinc-500 text-xs font-mono uppercase">
          [ Nenhuma tatuagem cadastrada nesta categoria ]
        </div>
      )}
    </section>
  );
}
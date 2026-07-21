'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { portfolioData, TattooItem } from '../../lib/data';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function BentoGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTattoo, setSelectedTattoo] = useState<TattooItem | null>(null);
  
  // Referência para controlar a rolagem do carrossel via botões
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTattoos = activeCategory === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === activeCategory);

  // Função para rolar o carrossel manualmente
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75; // Rola 75% da largura visível
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="portfolio" className="relative py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* ─── ELEMENTO STAR WARS SLOW FLYBY (FUNDO) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-10">
        <motion.svg
          animate={{ x: [-100, 1200], y: [0, 50] }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-0 w-16 h-16 text-studio-800"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <path d="M12 2L9 9h6l-3-7zM2 12h20M5 9l-3 6h4l-1-6zM19 9l3 6h-4l1-6z" />
        </motion.svg>
      </div>

      <div className="relative z-10">
        {/* Cabeçalho da Seção com Controles do Carrossel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-icy uppercase">
              // GALÁXIA DE TRABALHOS
            </span>
            <h2 className="text-3xl md:text-4xl font-mono font-black mt-1 tracking-tight uppercase">
              Galeria de <span className="text-icy">Artes</span>
            </h2>
            <p className="text-zinc-400 max-w-md text-sm mt-1">
              Deslize para explorar. Clique no card para expandir o traço e ver em alta resolução.
            </p>
          </div>

          {/* Botões de Navegação Manual (Setas) */}
          <div className="hidden sm:flex items-center justify-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Anterior"
              className="p-3 rounded-xl bg-studio-900 border border-studio-800 text-zinc-300 hover:text-white hover:border-icy hover:shadow-[0_0_15px_rgba(0,102,255,0.3)] transition-all duration-300"
            >
              ←
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Próximo"
              className="p-3 rounded-xl bg-studio-900 border border-studio-800 text-zinc-300 hover:text-white hover:border-icy hover:shadow-[0_0_15px_rgba(0,102,255,0.3)] transition-all duration-300"
            >
              →
            </button>
          </div>
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

        {/* ─── CARROSSEL INTERATIVO COM MODO BENTO ─── */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredTattoos.map((tattoo: TattooItem) => (
            <div
              key={tattoo.id}
              onClick={() => setSelectedTattoo(tattoo)}
              className={cn(
                "snap-start flex-shrink-0 relative overflow-hidden rounded-2xl bg-studio-900 border border-studio-800 group transition-all duration-500 cursor-zoom-in hover:border-icy hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]",
                // Mantém o visual Bento proporcional: Destaque fica mais largo
                tattoo.featured 
                  ? "w-[300px] sm:w-[480px] h-[360px]" 
                  : "w-[260px] sm:w-[320px] h-[360px]"
              )}
            >
              <Image
                src={tattoo.imagePath}
                alt={tattoo.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={tattoo.featured}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-wider text-icy font-bold">
                  // {tattoo.category.replace('-', ' ')}
                </span>
                <h3 className="text-base font-mono font-bold text-zinc-50 mt-1">{tattoo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MODAL DE ZOOM DINÂMICO (LIGHTBOX) ─── */}
      <AnimatePresence>
        {selectedTattoo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTattoo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-md cursor-zoom-out"
          >
            <button className="absolute top-6 right-6 text-zinc-400 hover:text-white text-xs font-mono tracking-widest bg-studio-900/80 px-4 py-2 rounded-full border border-studio-800">
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
                <Image
                  src={selectedTattoo.imagePath}
                  alt={selectedTattoo.title}
                  fill
                  className="object-contain"
                  quality={95}
                />
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

      {filteredTattoos.length === 0 && (
        <div className="text-center py-12 text-zinc-500 text-xs font-mono uppercase">
          [ Nenhuma tatuagem cadastrada nesta categoria ainda ]
        </div>
      )}
    </section>
  );
}
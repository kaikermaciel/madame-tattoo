'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece após passar 350px de rolagem (quando sai da área do Hero)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToOrcamento = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#orcamento');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-40 flex justify-center pointer-events-none"
        >
          <a
            href="#orcamento"
            onClick={handleScrollToOrcamento}
            className="pointer-events-auto bg-black/90 border border-icy/60 backdrop-blur-xl px-5 py-3.5 rounded-full shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.45)] hover:border-icy flex items-center gap-3 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          >
            {/* Ponto Pulsante HUD */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-icy opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-icy" />
            </span>

            <span className="font-bold tracking-widest text-zinc-100 group-hover:text-white">
              Pedir Orçamento
            </span>

            <div className="w-6 h-6 rounded-full bg-studio-900 border border-studio-700 flex items-center justify-center text-icy group-hover:bg-icy group-hover:text-studio-950 transition-colors">
              <FiSend className="text-[10px]" />
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
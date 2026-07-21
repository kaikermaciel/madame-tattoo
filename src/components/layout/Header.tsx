'use client';

import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import AbelEyes from '../ui/AbelEyes';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Galeria', href: '#portfolio', tag: '01' },
    { label: 'Coberturas', href: '#coberturas', tag: '02' },
    { label: 'O Processo', href: '#processo', tag: '03' },
  ];

  return (
    <header
      className={cn(
        // Removido qualquer backdrop-blur/transparência. Fixado bg-black (preto puro opaco)
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b bg-black border-studio-800/80 shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
      )}
    >
      {/* BARRA SUPERIOR FIXA DO HEADER (PRETO SÓLIDO OPACO) */}
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between relative z-20 bg-black">
        
        {/* LOGO AREA */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="text-xs sm:text-sm font-black tracking-tighter text-zinc-50 uppercase flex items-center font-mono">
            <span>MADAME.TATT</span>
            {/* Componente dos olhos interativos */}
            <AbelEyes />
          </div>

          <div className="hidden sm:flex flex-col border-l border-studio-800 pl-3">
            <span className="text-[10px] font-bold tracking-widest text-zinc-50 uppercase font-mono">
              MADAME
            </span>
            <span className="text-[8px] text-zinc-500 font-mono tracking-wider -mt-1">
              DESIGN AUTORAL
            </span>
          </div>
        </a>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase font-mono tracking-wider text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="#orcamento"
            className="bg-studio-900 border border-studio-800 text-zinc-200 font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-xl transition-all duration-300 hover:border-icy hover:text-white hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]"
          >
            [ Orçamento ]
          </a>
        </nav>

        {/* BOTÃO MOBILE */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-200 hover:text-white focus:outline-none px-3.5 py-1.5 border border-studio-800 bg-studio-900 rounded-xl font-mono text-xs uppercase tracking-wider transition-all active:border-icy"
            aria-label="Alternar Menu"
          >
            {mobileMenuOpen ? 'CLOSE //' : 'MENU //'}
          </button>
        </div>

      </div>

      {/* ─── GAVETA DROPDOWN PRETO SÓLIDO (100% OPACO) ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-black border-t border-studio-800/80 px-4 py-6 shadow-2xl"
          >
            <div className="max-w-md mx-auto space-y-3">
              <span className="block text-[10px] font-mono tracking-widest text-icy uppercase mb-2">
                // NAVEGAÇÃO
              </span>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-studio-900 border border-studio-800 text-zinc-100 active:border-icy transition-all"
                >
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-icy">
                    [{link.tag}]
                  </span>
                </a>
              ))}

              <div className="pt-2">
                <a
                  href="#orcamento"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-icy text-studio-950 font-mono font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
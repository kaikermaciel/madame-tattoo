'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-14 md:pt-36 md:pb-24 px-4 max-w-5xl mx-auto text-center overflow-hidden">
      
      {/* Vetor de Fundo Suavizado */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 flex items-center justify-center opacity-15 md:opacity-20">
        <svg 
          className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] text-studio-700" 
          viewBox="0 0 200 200" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
        >
          <circle cx="100" cy="100" r="80" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="50" />
          <line x1="100" y1="0" x2="100" y2="200" />
          <line x1="0" y1="100" x2="200" y2="100" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        
        {/* BADGE DE STATUS DA AGENDA */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-900/90 border border-studio-800 text-[10px] sm:text-xs font-mono tracking-wider text-zinc-300 uppercase backdrop-blur-md shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-icy opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-icy" />
            </span>
            Agenda Aberta // Orçamentos para Projetos Autorais
          </span>
        </motion.div>

        {/* TÍTULO PRINCIPAL */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-6xl font-mono font-black tracking-tighter text-zinc-50 uppercase leading-tight sm:leading-none max-w-3xl mx-auto"
        >
          A anatomia do corpo<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-50 via-icy to-zinc-400">
            traduzida em arte
          </span>
        </motion.h1>

        {/* PARÁGRAFO DE REFORÇO */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-sans leading-relaxed px-2"
        >
          Especialista em fusões de Blackwork Ilustrativo/Anime e a precisão fluida do Fineline Geométrico. Designs criados exclusivamente para a sua história.
        </motion.p>

        {/* BOTÕES DE AÇÃO DESTACADOS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-3 pt-2 max-w-xs sm:max-w-none mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Botão Primário em Alto Contraste (Icy Blue) */}
            <a
              href="#orcamento"
              onClick={(e) => handleScrollTo(e, '#orcamento')}
              className="w-full sm:w-auto bg-icy hover:bg-white-95 text-studio-950 font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(0,102,255,0.35)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] text-center flex items-center justify-center gap-2"
            >
              <span>Solicitar Orçamento</span>
              <span className="text-xs font-black">→</span>
            </a>

            {/* Botão Secundário */}
            <a
              href="#galeria"
              onClick={(e) => handleScrollTo(e, '#galeria')}
              className="w-full sm:w-auto bg-studio-950/60 border border-studio-800 text-zinc-400 hover:text-white font-mono text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-xl transition-all duration-300 hover:border-studio-700 hover:bg-studio-900/60 text-center backdrop-blur-sm"
            >
              [ Ver Galeria ]
            </a>
          </div>

          {/* Micro-aviso de resposta rápida */}
          <span className="text-[10px] font-mono text-zinc-600 tracking-wider uppercase">
            // Atendimento direto no WhatsApp
          </span>
        </motion.div>

      </div>
    </section>
  );
}
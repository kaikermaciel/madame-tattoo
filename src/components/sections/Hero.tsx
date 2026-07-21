'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 px-4 max-w-5xl mx-auto text-center overflow-hidden">
      
      {/* Vetor de Fundo Suavizado e Reduzido no Mobile */}
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
        
        {/* BADGE COMPACTA (1 Linha no Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-900/80 border border-studio-800 text-[10px] sm:text-xs font-mono tracking-wider text-zinc-300 uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-icy animate-pulse" />
            Manaus // Design Autoral & Coberturas
          </span>
        </motion.div>

        {/* TÍTULO PRINCIPAL (Fonte Mono e Tamanho Responsivo) */}
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

        {/* BOTÕES DE AÇÃO (Alinhados para o celular) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-xs sm:max-w-none mx-auto"
        >
          <a
            href="#orcamento"
            className="w-full sm:w-auto bg-studio-900/90 border border-studio-700 text-zinc-200 font-mono text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-xl transition-all duration-300 hover:border-icy hover:text-white hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] text-center backdrop-blur-sm"
          >
            Iniciar Meu Projeto
          </a>

          <a
            href="#portfolio"
            className="w-full sm:w-auto bg-studio-950/40 border border-studio-800 text-zinc-400 font-mono text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-xl transition-all duration-300 hover:border-icy hover:text-white hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] text-center backdrop-blur-sm"
          >
            [ Ver Galeria ]
          </a>
        </motion.div>

      </div>
    </section>
  );
}
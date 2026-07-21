'use client';

import { motion } from 'framer-motion';

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      
      {/* ─── CAMADA 1: CAMPO DE ESTRELAS DENSO (HIPERESPAÇO) ─── */}
      <div 
        className="absolute inset-0 opacity-30 bg-[radial-gradient(1px_1px_at_20px_30px,#fff,transparent),radial-gradient(1.5px_1.5px_at_75px_140px,#00E5FF,transparent),radial-gradient(1px_1px_at_120px_220px,#fff,transparent),radial-gradient(2px_2px_at_200px_80px,#00E5FF,transparent)] bg-[size:350px_350px]" 
      />
      
      {/* ─── CAMADA 2: ESTRELAS CADENTES / COMETAS DINÂMICOS ─── */}
      
      {/* Cometa 1: Cortando rápido da esquerda para a direita */}
      <motion.div
        animate={{ 
          x: ['-30vw', '130vw'], 
          y: ['10vh', '60vh'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          repeatDelay: 8, // Surge a cada 8 segundos
          ease: "linear" 
        }}
        className="absolute w-40 h-[1.5px] bg-gradient-to-r from-transparent via-icy/40 to-transparent rotate-[12deg]"
      />

      {/* Cometa 2: Mais longo e lento, cruzando a parte inferior */}
      <motion.div
        animate={{ 
          x: ['-40vw', '140vw'], 
          y: ['50vh', '95vh'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          repeatDelay: 14, 
          ease: "linear" 
        }}
        className="absolute w-60 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent rotate-[8deg]"
      />

      {/* Cometa 3: Cortando na diagonal inversa (Estilo cruzamento de lasers) */}
      <motion.div
        animate={{ 
          x: ['130vw', '-30vw'], 
          y: ['20vh', '85vh'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 4.5, 
          repeat: Infinity, 
          repeatDelay: 22, 
          ease: "linear" 
        }}
        className="absolute w-48 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent rotate-[-15deg]"
      />

      {/* Cometa 4: Rasgo rápido e sutil no topo da tela */}
      <motion.div
        animate={{ 
          x: ['-20vw', '120vw'], 
          y: ['5vh', '25vh'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatDelay: 5, 
          ease: "easeOut" 
        }}
        className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-icy/50 to-transparent rotate-[20deg]"
      />

    </div>
  );
}
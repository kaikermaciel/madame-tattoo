'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BoiCaprichosoEasterEgg() {
  const [active, setActive] = useState(false);
  const [inputPattern, setInputPattern] = useState<string[]>([]);
  
  // A palavra-chave secreta que o usuário precisa digitar
  const secretCode = ['c', 'a', 'p', 'r', 'i', 'c', 'h', 'o', 's', 'o'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Atualiza o histórico de teclas digitadas
      setInputPattern((prev) => {
        const newPattern = [...prev, key].slice(-secretCode.length);
        
        // Verifica se o padrão bate com a palavra "caprichoso"
        const isMatch = secretCode.every((char, index) => char === newPattern[index]);
        if (isMatch) {
          setActive(true);
          // O efeito dura 6 segundos e depois reseta
          setTimeout(() => setActive(false), 6000);
        }
        
        return newPattern;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden bg-blue-950/20 backdrop-blur-sm">
          
          {/* Efeito de Luz / Glow Azul e Estrelas cadentes do Caprichoso */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5.5 }}
            className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent"
          />

          {/* O Boi Caprichoso surgindo imponente da base da tela */}
          <motion.div
            initial={{ y: '100vh', scale: 0.8, opacity: 0 }}
            animate={{ 
              y: ['100vh', '10vh', '10vh', '100vh'], 
              scale: [0.8, 1, 1.05, 0.8],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 5.5, times: [0, 0.15, 0.85, 1], ease: "easeInOut" }}
            className="relative flex flex-col items-center justify-center text-center"
          >
            {/* Elemento Vetorial Simbolizando o Boi da Estrela na Testa */}
            <svg 
              className="w-64 h-64 text-blue-500 filter drop-shadow-[0_0_30px_rgba(0,229,255,0.6)]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
            >
              {/* Chifres e contorno estilizado do touro */}
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeDasharray="2 2" className="text-blue-900" />
              <path d="M12 7c-1.5-3-4-4-7-3 1 4 2 6 4 7M12 7c1.5-3 4-4 7-3-1 4-2 6-4 7" strokeWidth="1.5" />
              <path d="M8 14c1 2 3 3 4 3s3-1 4-3" strokeWidth="1.5" />
              
              {/* A icônica Estrela na Testa brilhando em Icy Blue */}
              <polygon 
                points="12,7 13.5,10 16.5,10 14,11.5 15,14.5 12,13 9,14.5 10,11.5 7.5,10 10.5,10" 
                fill="#00E5FF" 
                className="animate-pulse"
              />
            </svg>

            {/* Texto do Easter Egg */}
            <h2 className="text-2xl md:text-4xl font-black font-mono tracking-widest text-zinc-50 uppercase mt-4 drop-shadow-md">
              Boi <span className="text-icy">Caprichoso</span>
            </h2>
            <p className="text-xs font-mono text-blue-400 tracking-wider uppercase mt-1">
              // O campeão de Parintins na pele e na arte! //
            </p>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
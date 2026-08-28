"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutArtist() {
  return (
    <section id="sobre" className="relative py-20 px-4 bg-studio-950 overflow-hidden border-t border-studio-800">
      
      {/* ─── ELEMENTOS DE FUNDO (STAR WARS / HUD) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_20px_30px,#fff,transparent),radial-gradient(2px_2px_at_80px_120px,#00E5FF,transparent)] bg-[size:300px_300px] opacity-40" />
        
        <motion.svg 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 -bottom-10 w-[450px] h-[450px] text-studio-900" 
          viewBox="0 0 100 100"
        >
          <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.8" />
          <line x1="20" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="0.3" />
          <line x1="0" y1="80" x2="80" y2="0" stroke="currentColor" strokeWidth="0.3" />
          <polygon points="100,100 50,100 100,50" fill="currentColor" className="text-studio-900/10" />
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </motion.svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ─── FOTO COM MOLDURA HUD & DETALHES ICY BLUE ─── */}
        <div className="lg:col-span-5 flex justify-center relative w-full">
          <div className="relative w-full max-w-md bg-studio-900/50 border border-studio-800 rounded-2xl p-2.5 shadow-[0_0_50px_rgba(0,0,0,0.6)] group">
            
            {/* Imagem com corte proporcional */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black">
              <Image 
                src="/images/aline.webp"
                alt="Aline Escossio - Madame Tattoo" 
                fill 
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={95}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Cantoneira Superior Esquerda */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-icy/80 rounded-tl-lg pointer-events-none" />
            
            {/* Cantoneira Inferior Direita */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-icy/80 rounded-br-lg pointer-events-none" />

            {/* Tag técnica sutil no topo */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-studio-700/60 px-2 py-0.5 rounded text-[9px] font-mono text-icy tracking-wider uppercase">
              // Madame Tattoo
            </div>
          </div>

          {/* Glow Icy Blue difuso no fundo */}
          <div className="absolute -inset-4 bg-icy/10 rounded-3xl blur-2xl pointer-events-none -z-10" />
        </div>  

        {/* ─── BLOCO DE TEXTO PROPORCIONADO ─── */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono tracking-widest text-studio-700 uppercase block">
              // QUEM ESTÁ POR TRÁS DO TRAÇO
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-50 uppercase">
              Madame <span className="text-icy">Tattoo</span>
            </h3>
          </div>

          {/* Biografia */}
          <div className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
            <p>
              Prazer, sou a <strong className="text-zinc-200">Aline Escossio</strong>. Atuo há pouco mais de 4 anos no mercado da tatuagem e transformei o codinome <strong className="text-zinc-200">Madame Tattoo</strong> no meu espaço focado em designs autorais, cultura geek e o universo dos animes.
            </p>
            <p>
              Minha marca carrega uma história muito pessoal: a identidade visual do estúdio é inspirada nos olhos marcantes em tom âmbar do <strong className="text-icy">Abel</strong>, meu eterno companheiro felino de todas as criações, que deixei simbolizado.
            </p>
          </div>

          {/* Cards Técnicos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="border border-studio-800 bg-studio-900/30 p-4 rounded-xl space-y-1.5 hover:border-studio-700 transition-colors">
              <span className="font-mono text-[11px] text-icy font-bold block">// A MINHA SESSÃO</span>
              <p className="font-sans text-zinc-400 text-[11px] leading-relaxed">
                Reconhecida pela paciência e simpatia. Meu atendimento é sem pressa e mantenho o espaço aberto para conversas e descontração, garantindo uma sessão confortável do início ao fim.
              </p>
            </div>
            
            <div className="border border-studio-800 bg-studio-900/30 p-4 rounded-xl space-y-1.5 hover:border-studio-700 transition-colors">
              <span className="font-mono text-[11px] text-icy font-bold block">// MEU PROJETO & SUPORTE</span>
              <p className="font-sans text-zinc-400 text-[11px] leading-relaxed">
                Olhar clínico focado em ajustar cada arte à sua anatomia. Ofereço auxílio direto e acompanhamento dedicado em todo o pós-tatuagem até a cicatrização completa.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
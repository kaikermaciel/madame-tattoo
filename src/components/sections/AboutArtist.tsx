"use client";

import Image from 'next/image';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function AboutArtist() {
  return (
    <section id="sobre" className="relative py-24 px-4 bg-studio-950 overflow-hidden border-t border-studio-800">
      
      {/* ─── ELEMENTOS EXCLUSIVOS DE STAR WARS NO FUNDO ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_20px_30px,#fff,transparent),radial-gradient(2px_2px_at_80px_120px,#00E5FF,transparent)] bg-[size:300px_300px] opacity-40" />
        
        {/* Painel Angular Imperial Piscando/Pulsando como Sistemas de Navegação */}
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

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* ─── ESPAÇO PARA A FOTO DELA ─── */}
        <div className="md:col-span-5 flex justify-center">
        {/* Removido o aspect-[3/4] rígido para o contêiner se adaptar à altura real da imagem */}
        <div className="relative w-full max-w-sm bg-studio-900 border border-studio-800 rounded-3xl p-3 shadow-[0_0_40px_rgba(0,0,0,0.4)] group">
            <div className="relative w-full overflow-hidden rounded-2xl bg-studio-950 aspect-[4/6]">
            
            <Image 
                src="/images/aline.jpg" // Garanta que o arquivo está na public/images/aline.jpg
                alt="Aline Escossio - Madame Tattoo" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-102"
                priority
            />
            
            {/* Gradiente sutil na base da foto para suavizar o encontro com o fundo do card */}
            <div className="absolute inset-0 bg-gradient-to-t from-studio-900/40 via-transparent to-transparent z-10 pointer-events-none" />
            </div>
            
            {/* Detalhe de canto em Icy Blue perfeitamente alinhado na base do contêiner físico */}
            <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-2 border-r-2 border-icy/30 rounded-br-2xl pointer-events-none z-20" />
        </div>
        </div>  

        {/* ─── CONTEÚDO E ASSINATURA ─── */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-studio-700 uppercase block">
              // QUEM ESTÁ POR TRÁS DO TRAÇO
            </span>
            <h3 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-50 uppercase">
              Madame <span className="text-icy">Tattoo</span>
            </h3>
          </div>

          {/* Biografia em primeira pessoa */}
          <div className="space-y-4 font-sans text-sm md:text-base text-zinc-400 leading-relaxed">
            <p>
              Prazer, sou a <strong className="text-zinc-200">Aline Escossio</strong>. Atuo há pouco mais de 4 anos no mercado da tatuagem e transformei o codinome <strong className="text-zinc-200">Madame Tattoo</strong> no meu espaço focado em designs autorais, cultura geek e o universo dos animes. 
            </p>
            <p>
              Minha marca carrega uma história muito pessoal: a identidade visual do estúdio é inspirada nos olhos marcantes em tom âmbar do <strong className="text-icy">Abel</strong>, meu eterno companheiro felino de todas as criações, que deixei simbolizado na assinatura de navegação do site.
            </p>
          </div>

          {/* Foco na postura profissional e pós-venda em primeira pessoa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div className="border border-studio-800 bg-studio-900/30 p-5 rounded-2xl space-y-2">
              <span className="font-mono text-xs text-icy font-bold block">// A MINHA SESSÃO</span>
              <p className="font-sans text-zinc-400 text-xs leading-relaxed">
                Sou reconhecida pela paciência e simpatia com quem senta na minha maca. Meu atendimento é totalmente sem pressa e mantenho o espaço aberto para conversas e descontração (sim, eu vou querer saber de fofocas de pessoas que não conheço), garantindo que você passe pelo processo da maneira mais confortável possível.
              </p>
            </div>
            
            <div className="border border-studio-800 bg-studio-900/30 p-5 rounded-2xl space-y-2">
              <span className="font-mono text-xs text-icy font-bold block">// MEU PROJETO & SUPORTE</span>
              <p className="font-sans text-zinc-400 text-xs leading-relaxed">
                Tenho um olhar clínico focado em ajustar cada arte para que ela encaixe perfeitamente na sua anatomia. Minha consultoria vai muito além da aplicação: te ofereço auxílio direto e acompanhamento dedicado em todo o pós-tatuagem até a cicatrização completa.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
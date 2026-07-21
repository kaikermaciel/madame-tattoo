'use client';

import { cn } from '../../lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-studio-950 border-t border-studio-800 text-zinc-400 text-xs font-mono py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Coluna 1: Assinatura e Manifesto */}
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-widest text-zinc-50 uppercase">
              MADAME TATTOO
            </span>
            <span className="text-[10px] text-icy tracking-wider -mt-0.5">
              DESIGN AUTORAL & COBERTURAS
            </span>
          </div>
          <p className="text-zinc-500 max-w-xs leading-relaxed font-sans text-xs">
            Transformando ideias, histórias e conceitos em arte viva na pele. Atendimento com biossegurança e exclusividade.
          </p>
        </div>

        {/* Coluna 2: Localização e Horários */}
        <div className="space-y-3">
          <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">
            // O ESTÚDIO
          </h4>
          <div className="space-y-1.5 font-sans text-xs">
            <p className="text-zinc-400">
              Manaus — Amazonas, Brasil
            </p>
            <p className="text-zinc-500 text-[11px]">
              Atendimento exclusivo mediante agendamento prévio.
            </p>
            <a 
              href="https://maps.app.goo.gl/kwoq59NX7ivuRimq8" // Substituir pelo link real do Google Maps depois
              target="_blank"
              rel="noopener noreferrer"
              className="text-icy hover:underline font-mono text-[11px] block pt-1"
            >
              [ VER NO GOOGLE MAPS ]
            </a>
          </div>
        </div>

        {/* Coluna 3: Links Rápidos e Redes */}
        <div className="space-y-3">
          <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">
            // CONEXÕES
          </h4>
          <div className="flex flex-col space-y-2">
            <a 
              href="https://www.instagram.com/alline.tatto?igsh=d3g4MnI5NmY3enlr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-icy transition-colors duration-300 flex items-center gap-2"
            >
              <span>↳</span> INSTAGRAM
            </a>
            <a 
              href="https://wa.me/559299810140" // Substituir pelo número real dela depois
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-icy transition-colors duration-300 flex items-center gap-2"
            >
              <span>↳</span> WHATSAPP DIRECT
            </a>
          </div>
        </div>

      </div>

      {/* Linha Inferior de Direitos Autorais */}
      <div className="max-w-7xl mx-auto border-t border-studio-800/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[11px]">
        <div>
          © {currentYear} MADAME TATTOO. TODOS OS DIREITOS RESERVADOS.
        </div>
        <div className="font-sans text-[10px] tracking-wider">
          DESIGNED & CODED BY <span className="text-zinc-500 font-semibold hover:text-icy transition-colors cursor-pointer">KAIKE MACIEL</span>
        </div>
      </div>
    </footer>
  );
}
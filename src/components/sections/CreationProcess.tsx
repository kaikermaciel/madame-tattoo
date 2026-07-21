'use client';

import { processSteps } from '../../lib/data';

export default function CreationProcess() {
  return (
    <section id="processo" className="py-20 px-4 max-w-6xl mx-auto">
      
      {/* Cabeçalho da Seção */}
      <div className="text-center mb-16">
        <span className="text-xs font-mono tracking-widest text-icy uppercase">
          A Jornada da Arte
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
          Do Conceito <span className="text-icy">à Pele</span>
        </h2>
        <p className="text-zinc-400 max-w-md mx-auto text-sm">
          Entenda como funciona o processo de criação de um design totalmente exclusivo e seguro para você.
        </p>
      </div>

      {/* Grid do Processo (Passo a Passo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {/* Linha conectora decorativa sutil de fundo (Apenas para Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-4 right-4 h-[1px] bg-studio-800 -translate-y-12 z-0" />

        {processSteps.map((item, index) => (
          <div 
            key={item.step} 
            className="bg-studio-900 border border-studio-800 p-8 rounded-3xl relative z-10 flex flex-col space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-icy/20 transition-colors duration-300 group"
          >
            {/* Número da Etapa com efeito de Glow Neon */}
            <div className="text-4xl font-extrabold font-mono text-studio-800 group-hover:text-icy transition-colors duration-300 tracking-tighter">
              {item.step}
            </div>

            {/* Título da Etapa */}
            <h3 className="text-xl font-bold text-zinc-50 tracking-tight pt-2">
              {item.title}
            </h3>

            {/* Descrição */}
            <p className="text-sm text-zinc-400 leading-relaxed">
              {item.description}
            </p>

            {/* Detalhe visual na base do card para amarrar a identidade */}
            <div className="w-6 h-[2px] bg-studio-800 group-hover:w-12 group-hover:bg-icy transition-all duration-300 mt-2" />
          </div>
        ))}

      </div>

    </section>
  );
}
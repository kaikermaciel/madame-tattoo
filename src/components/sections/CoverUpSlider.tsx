'use client';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { coverUpData } from '../../lib/data';

export default function CoverUpSlider() {
  // Pegando o primeiro caso de estudo de cobertura do nosso mock
  const caseStudy = coverUpData[0];

  return (
    <section id="coberturas" className="py-20 px-4 bg-studio-900 border-y border-studio-800" suppressHydrationWarning>
      <div className="max-w-5xl mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-widest text-icy uppercase" suppressHydrationWarning>
            Especialidade Técnica
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight" suppressHydrationWarning>
            Dossiê de <span className="text-icy">Cobertura</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base" suppressHydrationWarning>
            Tem uma tatuagem antiga que já não faz mais sentido? Arraste a barra central para o lado e veja como o design autoral pode transformar completamente a sua pele.
          </p>
        </div>

        {/* Container do Slider + Descrição */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-studio-950 border border-studio-800 p-6 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)]" suppressHydrationWarning>
          
          {/* O Slider Interativo (Ocupa 2 colunas no desktop) */}
          <div className="md:col-span-2 relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden rounded-2xl border border-studio-800 bg-studio-900 group" suppressHydrationWarning>
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage 
                  src={caseStudy.beforeImage} 
                  alt="Antes - Tatuagem antiga" 
                  className="object-cover"
                />
              }
              itemTwo={
                <ReactCompareSliderImage 
                  src={caseStudy.afterImage} 
                  alt="Depois - Cobertura finalizada" 
                  className="object-cover"
                />
              }
              className="w-full h-full"
              // Customização da barra central para combinar com o Icy Blue
              handle={
                <div className="h-full w-0.5 bg-icy relative flex items-center justify-center cursor-ew-resize">
                  <div className="absolute w-8 h-8 rounded-full bg-studio-950 border-2 border-icy flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                    <span className="text-icy text-xs font-bold font-mono">↔</span>
                  </div>
                </div>
              }
            />
            
            {/* Badges de orientação fixas nas pontas */}
            <div className="absolute top-4 left-4 bg-studio-950/70 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono tracking-wider text-zinc-400 pointer-events-none" suppressHydrationWarning>
              ANTES
            </div>
            <div className="absolute top-4 right-4 bg-studio-950/70 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono tracking-wider text-icy pointer-events-none" suppressHydrationWarning>
              DEPOIS
            </div>
          </div>

          {/* Texto Explicativo (Ocupa 1 coluna no desktop) */}
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-xl font-bold text-zinc-50">{caseStudy.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {caseStudy.description}
            </p>
            
            <div className="pt-4 border-t border-studio-800 space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="text-icy font-mono">✔</span>
                <span>Blocagem de pigmento sem marcas escuras vazadas.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="text-icy font-mono">✔</span>
                <span>Estudo anatômico para usar o fluxo do corpo a favor do novo design.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
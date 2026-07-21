'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { coverUpData } from '../../lib/data';

export default function CoverUpSlider() {
  const caseStudy = coverUpData[0];

  // Posição da barra em porcentagem (0 a 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcula a posição da barra com base no toque ou clique
  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;

    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    setSliderPosition(percentage);
  }, []);

  // Eventos de movimento
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, [isDragging, updateSliderPosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Listeners globais enquanto o usuário arrasta
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  return (
    <section id="coberturas" className="py-20 px-4 bg-studio-900 border-y border-studio-800" suppressHydrationWarning>
      <div className="max-w-5xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-widest text-icy uppercase">
            // ESPECIALIDADE TÉCNICA
          </span>
          <h2 className="text-3xl md:text-4xl font-mono font-black mt-2 mb-4 tracking-tight uppercase">
            Dossiê de <span className="text-icy">Cobertura</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base font-sans">
            Tem uma tatuagem antiga que já não faz mais sentido? Arraste a barra central para o lado e veja como o design autoral pode transformar completamente a sua pele.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-studio-950 border border-studio-800 p-4 sm:p-6 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)]">
          
          {/* SLIDER COMPARATIVO NATIVO OTIMIZADO PARA MOBILE */}
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              updateSliderPosition(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              if (e.touches && e.touches[0]) {
                updateSliderPosition(e.touches[0].clientX);
              }
            }}
            className="md:col-span-2 relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden rounded-2xl border border-studio-800 bg-studio-900 select-none touch-none cursor-ew-resize"
          >
            {/* 1. Imagem do DEPOIS (Fundo total) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Image
                src={caseStudy.afterImage}
                alt="Depois - Cobertura finalizada"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            {/* 2. Imagem do ANTES (Recortada dinamicamente) */}
            <div
              className="absolute inset-y-0 left-0 h-full overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="relative h-full"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
              >
                <Image
                  src={caseStudy.beforeImage}
                  alt="Antes - Tatuagem antiga"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* 3. Divisor e Handle Central */}
            <div
              className="absolute inset-y-0 w-1 bg-icy pointer-events-none z-20 shadow-[0_0_15px_rgba(0,102,255,0.9)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-studio-950 border-2 border-icy flex items-center justify-center text-icy shadow-[0_0_20px_rgba(0,102,255,0.6)] font-mono text-xs font-bold">
                ↔
              </div>
            </div>

            {/* Badges de Orientação */}
            <div className="absolute top-4 left-4 bg-studio-950/80 border border-studio-800 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-zinc-400 pointer-events-none z-10 uppercase backdrop-blur-md">
              // ANTES
            </div>
            <div className="absolute top-4 right-4 bg-studio-950/80 border border-studio-800 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-icy pointer-events-none z-10 uppercase backdrop-blur-md">
              // DEPOIS
            </div>
          </div>

          {/* Descrição Explicativa */}
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-xl font-mono font-bold text-zinc-50">{caseStudy.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              {caseStudy.description}
            </p>
            
            <div className="pt-4 border-t border-studio-800/80 space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                <span className="text-icy font-mono font-bold">✔</span>
                <span>Blocagem de pigmento sem marcas escuras vazadas.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                <span className="text-icy font-mono font-bold">✔</span>
                <span>Estudo anatômico para usar o fluxo do corpo a favor do novo design.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
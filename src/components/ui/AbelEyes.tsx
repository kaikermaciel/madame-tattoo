'use client';

import { useEffect, useState, useRef } from 'react';

export default function AbelEyes() {
  const eyeLeftRef = useRef<HTMLSpanElement>(null);
  const eyeRightRef = useRef<HTMLSpanElement>(null);

  // Guarda as posições (x, y) de deslocamento das pupilas
  const [pupilLeftPos, setPupilLeftPos] = useState({ x: 0, y: 0 });
  const [pupilRightPos, setPupilRightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Função auxiliar para calcular a posição da pupila em relação ao olho
      const calculatePupilOffset = (eyeElement: HTMLSpanElement | null) => {
        if (!eyeElement) return { x: 0, y: 0 };

        const rect = eyeElement.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // Ângulo entre o centro do olho e a posição do mouse
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        
        // Raio máximo que a pupila pode se mover dentro do olho (em pixels)
        const maxDistance = 2.5;

        // Distância atual do mouse
        const distance = Math.min(
          maxDistance,
          Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 15
        );

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        };
      };

      setPupilLeftPos(calculatePupilOffset(eyeLeftRef.current));
      setPupilRightPos(calculatePupilOffset(eyeRightRef.current));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <span className="inline-flex items-center mx-0.5 select-none">
      {/* ─── OLHO ESQUERDO DO ABEL ─── */}
      <span
        ref={eyeLeftRef}
        className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 mx-[1px] inline-flex bg-black border border-studio-800 rounded-full overflow-hidden shadow-[0_0_6px_rgba(255,140,0,0.3)] items-center justify-center"
      >
        {/* Íris Laranja/Âmbar */}
        <span className="absolute inset-0.5 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center">
          {/* Pupila Fenda de Gato (Segue o Mouse) */}
          <span
            className="w-[1.5px] h-2.5 bg-black rounded-full transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${pupilLeftPos.x}px, ${pupilLeftPos.y}px)`,
            }}
          />
        </span>
        {/* Pálpebra / Animação de Piscar */}
        <span className="absolute inset-0 bg-black scale-y-0 origin-top animate-[blink_5s_infinite_1s]" />
      </span>

      {/* ─── OLHO DIREITO DO ABEL ─── */}
      <span
        ref={eyeRightRef}
        className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 mx-[1px] inline-flex bg-black border border-studio-800 rounded-full overflow-hidden shadow-[0_0_6px_rgba(255,140,0,0.3)] items-center justify-center"
      >
        {/* Íris Laranja/Âmbar */}
        <span className="absolute inset-0.5 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center">
          {/* Pupila Fenda de Gato (Segue o Mouse) */}
          <span
            className="w-[1.5px] h-2.5 bg-black rounded-full transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${pupilRightPos.x}px, ${pupilRightPos.y}px)`,
            }}
          />
        </span>
        {/* Pálpebra / Animação de Piscar */}
        <span className="absolute inset-0 bg-black scale-y-0 origin-top animate-[blink_5s_infinite_1.2s]" />
      </span>
    </span>
  );
}
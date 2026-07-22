'use client';

import { useEffect, useState, useRef } from 'react';
import AbelMemorialModal from './AbelMemorialModal';

export default function AbelEyes() {
  const eyeLeftRef = useRef<HTMLSpanElement>(null);
  const eyeRightRef = useRef<HTMLSpanElement>(null);

  const [pupilLeftPos, setPupilLeftPos] = useState({ x: 0, y: 0 });
  const [pupilRightPos, setPupilRightPos] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lógica do Easter Egg: 3 cliques em menos de 2 segundos abre a homenagem
  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (clickCount === 0) return;

    const timer = setTimeout(() => {
      if (clickCount >= 3) {
        setIsModalOpen(true);
      }
      setClickCount(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, [clickCount]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const calculatePupilOffset = (eyeElement: HTMLSpanElement | null) => {
        if (!eyeElement) return { x: 0, y: 0 };
        const rect = eyeElement.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const maxDistance = 2.5;
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
    <>
      <span
        onClick={handleEyeClick}
        title="Abel 🐾"
        className="inline-flex items-center mx-0.5 select-none cursor-pointer group/eyes"
      >
        {/* Olho Esquerdo */}
        <span
          ref={eyeLeftRef}
          className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 mx-[1px] inline-flex bg-black border border-studio-800 rounded-full overflow-hidden shadow-[0_0_6px_rgba(255,140,0,0.3)] items-center justify-center transition-transform group-hover/eyes:scale-110"
        >
          <span className="absolute inset-0.5 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center">
            <span
              className="w-[1.5px] h-2.5 bg-black rounded-full transition-transform duration-75 ease-out"
              style={{ transform: `translate(${pupilLeftPos.x}px, ${pupilLeftPos.y}px)` }}
            />
          </span>
          <span className="absolute inset-0 bg-black scale-y-0 origin-top animate-[blink_5s_infinite_1s]" />
        </span>

        {/* Olho Direito */}
        <span
          ref={eyeRightRef}
          className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 mx-[1px] inline-flex bg-black border border-studio-800 rounded-full overflow-hidden shadow-[0_0_6px_rgba(255,140,0,0.3)] items-center justify-center transition-transform group-hover/eyes:scale-110"
        >
          <span className="absolute inset-0.5 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center">
            <span
              className="w-[1.5px] h-2.5 bg-black rounded-full transition-transform duration-75 ease-out"
              style={{ transform: `translate(${pupilRightPos.x}px, ${pupilRightPos.y}px)` }}
            />
          </span>
          <span className="absolute inset-0 bg-black scale-y-0 origin-top animate-[blink_5s_infinite_1.2s]" />
        </span>
      </span>

      {/* Modal do Easter Egg */}
      <AbelMemorialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
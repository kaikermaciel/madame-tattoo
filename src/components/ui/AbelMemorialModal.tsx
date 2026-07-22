'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AbelMemorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AbelMemorialModal({ isOpen, onClose }: AbelMemorialModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-studio-950 border border-amber-500/30 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden"
          >
            {/* Brilho Âmbar de Fundo */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Moldura da Foto do Abel */}
            <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] mb-5">
              <Image
                src="/images/Abel.webp" // Coloque a foto dele na pasta public/images/abel.jpg
                alt="Abel"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Título & Mensagem */}
            <span className="text-[10px] font-mono tracking-widest text-amber-400 block mb-1">
              // MEMÓRIA ILUMINADA
            </span>
            <h3 className="text-xl font-mono font-bold text-zinc-100 tracking-tight mb-3">
              Abel
            </h3>

            <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
              “Entre estrelas, olhar de cor âmbar e suas tatuagens, continuo guardando e iluminando cada traço e cada passo que você faz. Estou bem, em paz, e cercado do amor que você me deu e nunca se apagará. Saudades para sempre.”
            </p>

            <div className="pt-2 border-t border-studio-800">
              <button
                onClick={onClose}
                className="text-[10px] font-mono tracking-widest text-zinc-500 hover:text-amber-400 transition-colors uppercase"
              >
                FECHAR E GUARDAR NO CORAÇÃO
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
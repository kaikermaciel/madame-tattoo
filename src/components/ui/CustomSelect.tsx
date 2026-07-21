'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  label,
  placeholder = 'Selecione uma opção',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Encontra a opção selecionada atualmente
  const selectedOption = options.find((opt) => opt.value === value);

  // Fecha o dropdown se o usuário clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col space-y-2 relative" ref={containerRef}>
      {label && (
        <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          {label}
        </label>
      )}

      {/* BOTÃO PRINCIPAL (GAIOLA DO SELECT) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-studio-950 border transition-all duration-300 text-xs font-mono tracking-wider text-left ${
          isOpen
            ? 'border-icy text-white shadow-[0_0_15px_rgba(0,102,255,0.3)]'
            : 'border-studio-800 text-zinc-200 hover:border-studio-700'
        }`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        {/* Setinha com animação de rotação */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-icy text-[10px] ml-2 font-bold"
        >
          ▼
        </motion.span>
      </button>

      {/* POP-UP CUSTOMIZADO (MENU FLUTUANTE DARK) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-studio-950 border border-studio-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden py-1.5"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono tracking-wider transition-all text-left ${
                    isSelected
                      ? 'bg-studio-900 text-icy font-bold border-l-2 border-icy'
                      : 'text-zinc-300 hover:bg-studio-900/80 hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <span className="text-icy text-[10px]">// SEL</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
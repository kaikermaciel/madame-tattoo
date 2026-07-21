import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // A base do estúdio agora cai para uma noite profunda, evitando distrações visuais
        studio: {
          50: '#f4f7fa',
          100: '#e6edf5',
          200: '#c7daf0',
          300: '#97bee6',
          400: '#609cd9',
          500: '#3b7ec9',
          600: '#2a63a8',
          700: '#224f87',
          800: '#1c3e6a',  // Azul escuro estrutural para bordas e inputs
          900: '#0b1326',  // Azul mais fechado e sóbrio para os cards do Bento e seções
          950: '#04060d',  // O fundo do site: um "quase preto" com nuance sutil de azul-noturno
        },
        // O tom de destaque agora assume a realeza de um Azul Escuro e imponente, mantendo o contraste
        icy: {
          DEFAULT: '#0044cc',       // Azul escorvado mais fechado e corporativo/estúdio
          hover: '#0055ff',         // O azul clássico brilhando no estado de passagem do mouse
          star: '#00e5ff',          // Mantemos o ciano místico apenas para os lasers finos e para a estrela na testa
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 96%, 100%': { transform: 'scaleY(0)' },
          '98%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        blink: 'blink 5s infinite',
      },
    },
  },
};

export default config;
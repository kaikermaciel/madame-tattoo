import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer"; // 1. Importa o Footer aqui
import GalaxyBackground from "../components/layout/GalaxyBackground";
import BoiCaprichosoEasterEgg from "../components/layout/BoiCaprichosoEasterEgg";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/nuxt/runtime";
import { Analytics } from "@vercel/analytics/nuxt/runtime";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madame Tattoo",
  description: "Estúdio especializado em tatuagens autorais, Fineline Ornamental, Blackwork Ilustrativo e coberturas (Cover-up). Venha fazer seu orçamento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-studio-950 text-zinc-100 flex flex-col">
        <GalaxyBackground /> 
        <BoiCaprichosoEasterEgg/>
        <Header />
        <Analytics />
        <SpeedInsights />

        {/* 
          O flex-1 garante que esta div ocupe todo o espaço disponível, 
          empurrando o Footer para a base da tela mesmo se a página tiver pouco conteúdo.
        */}
        <div className="flex-1 pt-24">
          {children}
        </div>

        {/* 2. Injeta o Footer global aqui */}
        <Footer />
      </body>
    </html>
  );
}
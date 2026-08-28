'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiCamera, FiImage, FiFileText, FiStar, FiInfo, FiRefreshCw, FiDownload } from 'react-icons/fi';
import CustomSelect from '../ui/CustomSelect';

export default function TattooGenerator() {
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('anime-geek');
  const [bodyPhoto, setBodyPhoto] = useState<File | null>(null);
  const [refPhoto, setRefPhoto] = useState<File | null>(null);
  
  const [bodyPhotoPreview, setBodyPhotoPreview] = useState<string | null>(null);
  const [refPhotoPreview, setRefPhotoPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  // Manipuladores de Imagem
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (f: File | null) => void,
    setPreview: (s: string | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('style', style);
      if (bodyPhoto) formData.append('bodyPhoto', bodyPhoto);
      if (refPhoto) formData.append('refPhoto', refPhoto);

      const res = await fetch('/api/generate-tattoo', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedResult(data.imageUrl);
      }
    } catch (err) {
      console.error('Erro ao gerar ideia:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedResult(null);
    setDescription('');
    setBodyPhoto(null);
    setRefPhoto(null);
    setBodyPhotoPreview(null);
    setRefPhotoPreview(null);
  };

  return (
    <section id="gerador" className="py-16 px-4">
      <div className="max-w-3xl mx-auto bg-studio-900 border border-studio-800 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
        
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono tracking-widest text-icy uppercase block mb-1">
            // INTELIGÊNCIA AUTORAL
          </span>
          <h3 className="text-2xl font-mono font-bold text-zinc-100 uppercase">
            Gerador de <span className="text-icy">Estudo & Fluxo</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
            Gere uma prévia conceitual da sua ideia antes de enviar o projeto para a Aline.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          
          {/* 1. SELEÇÃO DE ESTILO */}
          <CustomSelect
            label="ESTILO PRETENDIDO"
            options={[
              { value: 'anime-geek', label: 'Anime & Geek (Manga)' },
              { value: 'ornamental-flow', label: 'Ornamental & Flow (Fineline)' },
              { value: 'blackwork-bold', label: 'Blackwork & Bold' },
              { value: 'cover-up', label: 'Cobertura (Cover-up)' },
            ]}
            value={style}
            onChange={(val) => setStyle(val)}
          />

          {/* 2. UPLOADS OPCIONAIS (GRID DE 2 COLUNAS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Upload 1: Foto da Pele / Tattoo Antiga */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                <FiCamera className="text-icy" /> Foto do Local / Tattoo Antiga (Opcional)
              </label>
              
              <div className="relative h-32 border-2 border-dashed border-studio-800 hover:border-icy/60 rounded-2xl flex flex-col items-center justify-center p-2 text-center bg-black/40 transition-colors cursor-pointer overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setBodyPhoto, setBodyPhotoPreview)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {bodyPhotoPreview ? (
                  <Image src={bodyPhotoPreview} alt="Local" fill className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-500 group-hover:text-zinc-300">
                    <FiCamera className="text-xl mb-1 text-icy" />
                    <span className="text-[11px] font-mono">Tirar foto ou anexar pele</span>
                  </div>
                )}
              </div>
            </div>

            {/* Upload 2: Foto de Referência Visual */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                <FiImage className="text-icy" /> Referência Visual / Inspiração (Opcional)
              </label>

              <div className="relative h-32 border-2 border-dashed border-studio-800 hover:border-icy/60 rounded-2xl flex flex-col items-center justify-center p-2 text-center bg-black/40 transition-colors cursor-pointer overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setRefPhoto, setRefPhotoPreview)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {refPhotoPreview ? (
                  <Image src={refPhotoPreview} alt="Referência" fill className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-500 group-hover:text-zinc-300">
                    <FiImage className="text-xl mb-1 text-icy" />
                    <span className="text-[11px] font-mono">Anexar imagem de inspiração</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Aviso didático se for Cobertura */}
          {style === 'cover-up' && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 flex items-start gap-2">
              <FiInfo className="text-amber-400 text-base flex-shrink-0 mt-0.5" />
              <p className="font-sans leading-relaxed">
                <strong className="font-mono text-amber-400">Dica de Cobertura:</strong> Se você anexar a foto da tattoo antiga acima, a IA tentará simular o encaixe do novo fluxo de fumaça e blocagem escura diretamente na sua pele.
              </p>
            </div>
          )}

          {/* 3. DESCRIÇÃO DA IDEIA (TEXTO) */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
              <FiFileText className="text-icy" /> O que você deseja tatuar?
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Um dragão estilo manga serpenteando com fumaça e flores escuras..."
              className="bg-black border border-studio-800 rounded-xl p-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-icy transition-colors resize-none font-sans"
            />
          </div>

          {/* BOTÃO GERAR */}
          <button
            type="submit"
            disabled={loading || !description}
            className="w-full bg-studio-950 border border-studio-700 hover:border-icy text-white font-mono font-bold text-xs py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiStar className="text-icy" />
            {loading ? '[ PROCESSANDO FLUXO AUTORAL... ]' : 'Gerar Prévia de Ideia'}
          </button>
        </form>

        {/* ─── EXIBIÇÃO DA IMAGEM GERADA ─── */}
        {loading && (
          <div className="mt-8 p-8 border border-studio-800 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-10 h-10 border-2 border-icy border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Gerando estampa & estudo de linhas...
            </span>
          </div>
        )}

        {generatedResult && !loading && (
          <div className="mt-8 p-6 border border-icy/40 bg-black rounded-2xl flex flex-col items-center space-y-4 shadow-[0_0_30px_rgba(0,102,255,0.2)] animate-fadeIn">
            <div className="w-full flex items-center justify-between border-b border-studio-800 pb-3">
              <span className="text-[10px] font-mono text-icy tracking-wider uppercase">
                ✓ RESULTADO CONCEITUAL GERADO
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <FiRefreshCw /> Limpar
              </button>
            </div>

            {/* CONTAINER DA IMAGEM BASE64 */}
            <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border border-studio-800 bg-zinc-950 flex items-center justify-center">
              {/* Usando <img> nativo para garantir suporte imediato a strings Data URL Base64 */}
              <img
                src={generatedResult}
                alt="Prévia da Tatuagem"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[11px] text-zinc-400 text-center max-w-md font-sans">
              Esta imagem serve como estudo de referência. A arte final será desenhada e ajustada anatomicamente pela artista.
            </p>

            <a
              href={generatedResult}
              download="estudo-tattoo-madame.jpg"
              className="inline-flex items-center gap-2 px-4 py-2 bg-studio-800 hover:bg-studio-700 text-zinc-200 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <FiDownload /> Baixar Imagem de Estudo
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
'use client';

import { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 1. Removido o campo 'whatsapp' do estado inicial
  const [formData, setFormData] = useState({
    name: '',
    style: 'anime-geek',
    placement: '',
    size: '',
    description: '',
  });

  const handleReset = () => {
    // Limpa o input do navegador
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Limpa os estados do React
    setFile(null);
    setFormData({ name: '', style: 'anime-geek', placement: '', size: '', description: '' });
    setSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl = '';

      // 1. Upload da imagem caso tenha sido selecionada
      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          uploadedImageUrl = uploadData.url;
        }
      }

      // 2. Mapeamento dos estilos
      const styleLabels: Record<string, string> = {
        'anime-geek': 'Anime & Geek (Manga) 🌸',
        'ornamental-flow': 'Ornamental & Flow (Fineline) ✨',
        'blackwork-bold': 'Blackwork & Bold 🦅',
        'cover-up': 'Cobertura (Cover-up) 🔄',
      };

      // Trata a string do tamanho para não duplicar 'cm'
      const cleanSize = formData.size.toLowerCase().replace('cm', '').trim();

      // 3. Montagem do texto em UTF-8
      const messageLines = [
        `✨ *NOVO PROJETO VIA SITE* ✨\n`,
        `👤 *Cliente:* ${formData.name}`,
        `🎨 *Estilo:* ${styleLabels[formData.style] || formData.style}`,
        `📍 *Local do Corpo:* ${formData.placement}`,
        `📏 *Tamanho Aprox.:* ${cleanSize}cm\n`,
        `📝 *Descrição da Ideia:*\n${formData.description}`
      ];

      if (uploadedImageUrl) {
        messageLines.push(`\n🖼️ *Foto da Pele/Referência:*\n${uploadedImageUrl}`);
      }

      const messageText = messageLines.join('\n');
      const phone = '559299810140'; // Substituir pelo número oficial da Aline

      // 4. Detecção de Mobile para usar o protocolo ideal sem bloqueio de Pop-up
      const encodedText = encodeURIComponent(messageText);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // No mobile, wa.me redireciona direto pro App sem ser bloqueado
      const whatsappUrl = isMobile 
        ? `https://wa.me/${phone}?text=${encodedText}`
        : `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;

      setSuccess(true);

      // Limpa os estados do formulário
      setFormData({ name: '', style: 'anime-geek', placement: '', size: '', description: '' });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // 5. Redirecionamento imune a bloqueios de pop-up no celular
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, '_blank');
      }

    } catch (error) {
      console.error('Erro ao processar orçamento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="orcamento" className="relative py-20 px-4 max-w-4xl mx-auto overflow-hidden">
      
      {/* Elementos Star Wars de Fundo Sutil */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_20px_30px,#fff,transparent),radial-gradient(2px_2px_at_80px_120px,#0066FF,transparent)] bg-[size:300px_300px] opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-widest text-icy uppercase">
            Agendamento & Projetos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
            Solicitar <span className="text-icy">Orçamento</span>
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm">
            Traga sua ideia. Preencha os campos abaixo para darmos início ao desenvolvimento do seu design exclusivo.
          </p>
        </div>

        {/* Container do Formulário */}
        <div className="bg-studio-900 border border-studio-800 p-6 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.2)] relative">
          
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-studio-900 flex flex-col items-center justify-center text-center py-8 space-y-4 rounded-3xl z-20 px-6"
              >
                <div className="w-16 h-16 bg-icy/10 border border-icy/30 rounded-full flex items-center justify-center mx-auto text-icy text-2xl shadow-[0_0_15px_rgba(0,102,255,0.1)]">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-zinc-50">Redirecionando para o WhatsApp!</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  As informações foram processadas. Se a janela do WhatsApp não abriu, clique no botão abaixo para enviar sua mensagem.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset} 
                    className="text-xs text-icy hover:underline font-mono uppercase"
                  >
                    [ ENVIAR OUTRA IDEIA ]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className={cn("space-y-6 relative z-10", success && "opacity-0 pointer-events-none")}>
            
            {/* Linha 1: Nome (WhatsApp removido) */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Seu Nome</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Seu Nome"
                className="bg-studio-950 border border-studio-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-icy/50 transition-colors duration-300 text-sm"
              />
            </div>

            {/* Linha 2: Estilo, Local do Corpo e Tamanho */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="style" className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Estilo da Tattoo 🌸</label>
                <select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  className="bg-studio-950 border border-studio-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-icy/50 transition-colors duration-300 text-sm appearance-none cursor-pointer"
                >
                  <option value="anime-geek">Anime & Geek (Manga) 🌸</option>
                  <option value="ornamental-flow">Ornamental & Flow (Fineline) ✨</option>
                  <option value="blackwork-bold">Blackwork & Bold 🦅</option>
                  <option value="cover-up">Cobertura (Cover-up) 🔄</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="placement" className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Local do Corpo 📍</label>
                <input
                  required
                  type="text"
                  id="placement"
                  name="placement"
                  value={formData.placement}
                  onChange={handleChange}
                  placeholder="Ex: Antebraço, Costelas..."
                  className="bg-studio-950 border border-studio-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-icy/50 transition-colors duration-300 text-sm"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="size" className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Tamanho aprox. (em cm) 📏</label>
                <input
                  required
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Ex: 15cm"
                  className="bg-studio-950 border border-studio-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-icy/50 transition-colors duration-300 text-sm"
                />
              </div>
            </div>

            {/* Linha 3: Campo de Upload de Referência / Foto do Corpo */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="file" className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                Foto de Referência ou do Local do Corpo (Opcional) 🖼️
              </label>
              <input
                ref={fileInputRef} // <-- Adicione a ref aqui!
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-studio-950 border border-studio-800 rounded-xl px-4 py-2.5 text-zinc-400 text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-studio-800 file:text-zinc-200 hover:file:bg-studio-700 cursor-pointer transition-colors duration-300"
              />
              {file && (
                <span className="text-[10px] font-mono text-icy">
                  ✓ Arquivo selecionado: {file.name}
                </span>
              )}
            </div>

            {/* Linha 4: Descrição da Ideia */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Descrição da sua Ideia 📝</label>
              <textarea
                required
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Conte detalhadamente o que você quer tatuar, use emojis se quiser 📝. Tem elementos específicos, cores ou se é uma cobertura..."
                className="bg-studio-950 border border-studio-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-icy/50 transition-colors duration-300 text-sm resize-none"
              />
            </div>

            {/* Botão de Envio */}
            <div className="pt-2">
              <button
                disabled={loading}
                type="submit"
                className={cn(
                  "w-full bg-studio-900 border border-studio-700 text-zinc-200 font-bold py-4 px-6 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:border-icy hover:text-white hover:shadow-[0_0_30px_rgba(0,102,255,0.45)] hover:bg-studio-900/90",
                  loading && "opacity-50 cursor-not-allowed"
                )}
              >
                {loading ? '[ COMPRIMINDO IMAGEM & ENVIANDO... ]' : 'Enviar Proposta no WhatsApp'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
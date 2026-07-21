// Tipagem para as tatuagens do portfólio
export interface TattooItem {
  id: string;
  title: string;
  category: 'anime-geek' | 'ornamental-flow' | 'blackwork-bold';
  imagePath: string;
  featured: boolean;
  size?: 'normal' | 'tall' | 'wide'; // Nova propriedade opcional
  description?: string;
}

// Tipagem para os casos de Cover-up (Antes e Depois)
export interface CoverUpItem {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

// 1. Dados do Portfólio (Mapeados de acordo com os estilos enviados)
export const portfolioData: TattooItem[] = [
  {
    id: '1',
    title: 'Megumin Boom',
    category: 'anime-geek',
    imagePath: '/tattoo/49593.jpg', // Caminho baseado na imagem enviada (0)
    featured: true,
    description: 'Blackwork ilustrativo com sombreado denso e tipografia de impacto.'
  },
  {
    id: '2',
    title: 'Leopardo Ornamental',
    category: 'blackwork-bold',
    imagePath: '/tattoo/49590.jpg', // Imagem (1)
    featured: true,
    size: 'tall', 
    description: 'Fusão de realismo botânico com foco seletivo no olhar.'
  },
  {
    id: '3',
    title: 'Fluidez Ornamental nas Costas',
    category: 'ornamental-flow',
    imagePath: '/tattoo/49592.jpg', // Imagem (2)
    featured: true,
    description: 'Linhas finas e orgânicas que acompanham a curvatura da coluna.'
  },
  {
    id: '4',
    title: 'Simetria Sagrada no Ombro',
    category: 'ornamental-flow',
    imagePath: '/tattoo/49591.jpg', // Imagem (3)
    featured: false,
    description: 'Fineline geométrico com pontilhismo e alto contraste.'
  },
  {
    id: '5',
    title: 'Arise - Solo Leveling',
    category: 'anime-geek',
    imagePath: '/tattoo/49594.jpg', 
    featured: false,
  },
  {
    id: '6',
    title: 'Malenia - Elden Ring',
    category: 'anime-geek',
    imagePath: '/tattoo/49599.jpg',
    featured: false,
  },
  {
    id: '7',
    title: 'Olhar de Sangue',
    category: 'blackwork-bold',
    imagePath: '/tattoo/49597.jpg',
    featured: false,
    description: 'Uso cirúrgico de vermelho para criar profundidade e impacto visual.'
  },
  {
    id: '8',
    title: 'Devilish Heart',
    category: 'blackwork-bold',
    imagePath: '/tattoo/49595.jpg',
    featured: false,
  }
];

// 2. Dados de Cobertura (Antes/Depois)
export const coverUpData: CoverUpItem[] = [
  {
    id: 'c1',
    title: 'Projeto Renascimento',
    beforeImage: '/tattoo/antes_cobertura.png', // Exemplo conceitual do relógio antigo
    afterImage: '/tattoo/adepois_cobertura.png',             // Cobertura da Malenia por cima
    description: 'Trabalho de blocagem estratégica e sombreamento pesado para cobrir completamente a escrita e o relógio antigos, sem deixar rastros.'
  }
];

// 3. Etapas do Processo de Atendimento (Do Conceito à Pele)
export const processSteps = [
  {
    step: '01',
    title: 'A Ideia & Briefing',
    description: 'Você envia suas referências, tamanho aproximado e o local do corpo através do nosso formulário.'
  },
  {
    step: '02',
    title: 'Criação do Design Autoral',
    description: 'Eu desenvolvo uma arte exclusiva e sob medida para a sua anatomia, garantindo que o traço flua com o seu corpo.'
  },
  {
    step: '03',
    title: 'A Sessão',
    description: 'No dia agendado, realizamos a aplicação com materiais 100% descartáveis em um ambiente estúdio focado no seu conforto.'
  }
];
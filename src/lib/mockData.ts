export interface TransactionMock {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoticeMock {
  id: string;
  title: string;
  content: string;
  category: "GENERAL" | "EVENT" | "MEETING";
  date: Date;
  active: boolean;
  showPopup: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryPostMock {
  id: string;
  image: string;
  text: string;
  link: string | null;
  platform: string;
  likes: number;
  comments: number;
  date: Date;
  createdAt: Date;
}

export interface BlogPostMock {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  published: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FaqItemMock {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export interface FinancialGoalMock {
  id: string;
  month: number;
  year: number;
  target: number;
  current: number;
  updatedAt: Date;
}

export interface VolunteerCandidateMock {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string | null;
  status: string;
  createdAt: Date;
}

const now = new Date();

export const mockGalleryPosts: GalleryPostMock[] = [
  {
    id: "g1",
    image: "/gallery_event_1.png",
    text: "Hoje realizamos uma oficina especial de artes plásticas e pintura com as crianças da creche-escola! 🎨✨ Ver o sorriso e a criatividade de cada uma delas expressa nas telas nos mostra que a beleza e a educação de fato transformam vidas. Agradecemos a todos os voluntários e parceiros que apoiam esse sonho diariamente!",
    link: "https://facebook.com/beijaflor.massaranduba",
    platform: "facebook",
    likes: 124,
    comments: 18,
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "g2",
    image: "/parallax_bg.png",
    text: "Roda de Capoeira Especial no Projeto Beija-Flor! 🤸‍♂️ Nosso grupo de adolescentes realizou uma belíssima demonstração de respeito, cultura e disciplina física. A oficina de capoeira é gratuita e aberta a toda a comunidade de Massaranduba. Venha conhecer e apoiar nossos jovens guerreiros!",
    link: "https://instagram.com/beijaflor.massaranduba",
    platform: "instagram",
    likes: 98,
    comments: 12,
    date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
  },
];

export const mockBlogPosts: BlogPostMock[] = [
  {
    id: "b1",
    title: "Início do Semestre Letivo na Creche Beija-Flor com Novas Salas de Leitura",
    excerpt: "Com muita alegria e abraços calorosos, acolhemos mais de 80 crianças de Massaranduba para o início das atividades educacionais e lúdicas deste semestre.",
    content: `O semestre começou repleto de energia e novidades na Associação Beija-Flor da Massaranduba! Acolhemos mais de 80 crianças na nossa creche-escola comunitária com um ambiente renovado e repleto de afeto.

Graças às doações da comunidade e à dedicação dos nossos voluntários, inauguramos um novo cantinho da leitura equipado com livros infantis, almofadas confortáveis e brinquedos pedagógicos.

"O objetivo é proporcionar um ambiente estimulante onde as crianças sintam prazer em aprender e interagir desde cedo", destacou a coordenação pedagógica.

Seguimos firmes na nossa missão de oferecer educação integral, alimentação saudável diária e um porto seguro para as famílias de nossa região.`,
    image: "/gallery_event_1.png",
    category: "Creche & Educação",
    published: true,
    date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "b2",
    title: "Apresentação Cultural das Oficinas de Capoeira e Teatro Encanta Comunidade",
    excerpt: "Nossos alunos deram um show de talento, ritmo e expressão corporal durante o encontro cultural realizado no último final de semana.",
    content: `No último sábado, a quadra comunitária de Massaranduba foi palco de uma emocionante celebração de cultura e arte promovida pelos alunos do Projeto Beija-Flor.

Crianças e jovens participantes das oficinas gratuitas de Capoeira e Teatro apresentaram os frutos do trabalho desenvolvido ao longo dos últimos meses. A energia vibrante da roda de capoeira aliada à sensibilidade das esquetes teatrais levou pais e moradores às lágrimas e aplausos efusivos.

Além da demonstração artística, o evento contou com um lanche coletivo preparado carinhosamente pela equipe de voluntários. Agradecemos a presença de cada família e parceiro que faz essa engrenagem de amor acontecer!`,
    image: "/parallax_bg.png",
    category: "Cultura & Oficinas",
    published: true,
    date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
  },
];

export const mockFaqItems: FaqItemMock[] = [
  {
    id: "f1",
    question: "Como funciona o processo de matrícula para a creche?",
    answer: "As matrículas para a nossa creche-escola são voltadas para crianças de 2 a 5 anos residentes na região de Massaranduba e arredores. A prioridade é dada a famílias em situação de vulnerabilidade socioeconômica. As inscrições ocorrem geralmente no final de cada ano letivo, diretamente na nossa secretaria.",
    order: 1,
    active: true,
  },
  {
    id: "f2",
    question: "Quais oficinas são oferecidas para crianças e jovens?",
    answer: "Oferecemos oficinas de capoeira, teatro, circo, desenho artístico, reforço escolar e informática básica. As atividades ocorrem sempre no contra-turno escolar (inverso ao horário que a criança estuda na rede pública) para alunos de 6 a 18 anos.",
    order: 2,
    active: true,
  },
  {
    id: "f3",
    question: "Como posso doar mantimentos ou roupas?",
    answer: "Doações de alimentos não perecíveis, agasalhos, calçados e brinquedos em bom estado são super bem-vindas! Elas podem ser entregues diretamente na nossa sede física em Massaranduba de segunda a sexta-feira, das 08:00 às 17:00.",
    order: 3,
    active: true,
  },
  {
    id: "f4",
    question: "Como obter um recibo fiscal das doações financeiras?",
    answer: "Toda doação financeira gera um comprovante institucional. Caso precise de um recibo específico assinado pelo coordenador Padre Marco para abatimento no Imposto de Renda ou contabilidade de empresa, envie o comprovante de transferência para o e-mail beijaflor.massaranduba@gmail.com ou ligue no (71) 3014-1351.",
    order: 4,
    active: true,
  },
  {
    id: "f5",
    question: "Qual o horário de funcionamento da Associação?",
    answer: "Nossa sede e creche funcionam de segunda a sexta-feira, das 07:30 às 17:00, acolhendo as crianças em período integral.",
    order: 5,
    active: true,
  },
];

export const mockNotices: NoticeMock[] = [
  {
    id: "n1",
    title: "Reunião de Pais e Responsáveis - 2º Semestre",
    content: "Convidamos todos os pais e responsáveis para a reunião pedagógica onde apresentaremos o planejamento e as novidades das oficinas para este semestre.",
    category: "MEETING",
    date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    active: true,
    showPopup: false,
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "n2",
    title: "Inscrições Abertas para Voluntariado 2026",
    content: "Venha fazer parte da nossa equipe de voluntários! Estamos selecionando apoiadores para reforço escolar, oficinas de artes e apoio na cozinha comunitária.",
    category: "GENERAL",
    date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    active: true,
    showPopup: true,
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
  },
];

export const mockFinancialGoals: FinancialGoalMock[] = [
  {
    id: "fg1",
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    target: 12000.0,
    current: 8450.0,
    updatedAt: now,
  },
];

export const mockTransactions: TransactionMock[] = [
  {
    id: "t1",
    description: "Doação Coletiva via PIX - Campanha Alimentação",
    amount: 3200.0,
    type: "INCOME",
    category: "Doação PIX",
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "t2",
    description: "Aquisição de Insumos e Alimentos da Creche",
    amount: 1850.5,
    type: "EXPENSE",
    category: "Alimentação & Creche",
    date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "t3",
    description: "Subvenção Municipal Mensal",
    amount: 5250.0,
    type: "INCOME",
    category: "Subvenção",
    date: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: "t4",
    description: "Manutenção de Impressora e Materiais Pedagógicos",
    amount: 430.0,
    type: "EXPENSE",
    category: "Material Didático",
    date: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
  },
];

export const mockVolunteerCandidates: VolunteerCandidateMock[] = [
  {
    id: "v1",
    name: "Mariana Souza",
    email: "mariana.souza@email.com",
    phone: "(71) 98888-1234",
    area: "apoio-escolar",
    message: "Gostaria muito de ajudar no reforço escolar aos sábados de manhã.",
    status: "PENDING",
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "v2",
    name: "Lucas Oliveira",
    email: "lucas.oliveira@email.com",
    phone: "(71) 99999-4321",
    area: "artes",
    message: "Sou educador social e arte-educador, posso contribuir com oficinas de desenho.",
    status: "CONTACTED",
    createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
  },
];

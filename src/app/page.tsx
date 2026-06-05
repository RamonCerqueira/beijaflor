import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FableSection from "@/components/FableSection";
import ServicesGrid from "@/components/ServicesGrid";
import FraternitySection from "@/components/FraternitySection";
import EventsGallery from "@/components/EventsGallery";
import DonateSection from "@/components/DonateSection";
import NoticePopup from "@/components/NoticePopup";
import ImpactCounters from "@/components/ImpactCounters";
import HistoryTimeline from "@/components/HistoryTimeline";
import FaqAccordion from "@/components/FaqAccordion";
import VolunteerForm from "@/components/VolunteerForm";
import LatestNews from "@/components/LatestNews";
import { prisma } from "@/lib/db";

let isSeedingGallery = false;
let isSeedingFaq = false;
let hasCleanedDuplicates = false;

export const dynamic = "force-dynamic"; // Force dynamic rendering so admin updates reflect instantly

export default async function Home() {
  // Run once on boot/request to clean up any duplicates from concurrent seeds
  if (!hasCleanedDuplicates) {
    hasCleanedDuplicates = true;
    try {
      // Clean FAQ duplicates
      const allFaqs = await prisma.faqItem.findMany();
      const seenFaqQuestions = new Set<string>();
      const faqsToDelete: string[] = [];
      for (const faq of allFaqs) {
        if (seenFaqQuestions.has(faq.question)) {
          faqsToDelete.push(faq.id);
        } else {
          seenFaqQuestions.add(faq.question);
        }
      }
      if (faqsToDelete.length > 0) {
        await prisma.faqItem.deleteMany({
          where: { id: { in: faqsToDelete } },
        });
      }

      // Clean Gallery duplicates
      const allGallery = await prisma.galleryPost.findMany();
      const seenGalleryImages = new Set<string>();
      const galleryToDelete: string[] = [];
      for (const post of allGallery) {
        if (seenGalleryImages.has(post.image)) {
          galleryToDelete.push(post.id);
        } else {
          seenGalleryImages.add(post.image);
        }
      }
      if (galleryToDelete.length > 0) {
        await prisma.galleryPost.deleteMany({
          where: { id: { in: galleryToDelete } },
        });
      }
    } catch (e) {
      console.error("Erro ao limpar duplicatas do banco:", e);
      hasCleanedDuplicates = false; // Retry on next request if it failed
    }
  }

  const popupNotice = await prisma.notice.findFirst({
    where: {
      active: true,
      showPopup: true,
    },
  });

  // Query and auto-seed gallery posts if empty
  let galleryPosts = await prisma.galleryPost.findMany({
    orderBy: {
      date: "desc",
    },
  });

  if (galleryPosts.length === 0 && !isSeedingGallery) {
    isSeedingGallery = true;
    try {
      const doubleCheck = await prisma.galleryPost.count();
      if (doubleCheck === 0) {
        const defaultGallery = [
          {
            image: "/gallery_event_1.png",
            text: "Hoje realizamos uma oficina especial de artes plásticas e pintura com as crianças da creche-escola! 🎨✨ Ver o sorriso e a criatividade de cada uma delas expressa nas telas nos mostra que a beleza e a educação de fato transformam vidas. Agradecemos a todos os voluntários e parceiros que apoiam esse sonho diariamente!",
            link: "https://facebook.com/beijaflor.massaranduba",
            platform: "facebook",
            likes: 124,
            comments: 18,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          },
          {
            image: "/parallax_bg.png",
            text: "Roda de Capoeira Especial no Projeto Beija-Flor! 🤸‍♂️ Nosso grupo de adolescentes realizou uma belíssima demonstração de respeito, cultura e disciplina física. A oficina de capoeira é gratuita e aberta a toda a comunidade de Massaranduba. Venha conhecer e apoiar nossos jovens guerreiros!",
            link: "https://instagram.com/beijaflor.massaranduba",
            platform: "instagram",
            likes: 98,
            comments: 12,
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          },
        ];

        await prisma.galleryPost.createMany({ data: defaultGallery });
      }
    } finally {
      isSeedingGallery = false;
    }
    // Re-query to get the fresh data
    galleryPosts = await prisma.galleryPost.findMany({
      orderBy: {
        date: "desc",
      },
    });
  }
  const displayGalleryPosts = galleryPosts.slice(0, 4);

  // Query latest 3 published blog posts
  const blogPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    orderBy: {
      date: "desc",
    },
    take: 3,
  });

  // Query current month goal
  const now = new Date();
  const currentGoal = await prisma.financialGoal.findFirst({
    where: {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  });

  // Query and auto-seed FAQ items if empty
  let faqItems = await prisma.faqItem.findMany({
    orderBy: { order: "asc" },
  });

  if (faqItems.length === 0 && !isSeedingFaq) {
    isSeedingFaq = true;
    try {
      const doubleCheck = await prisma.faqItem.count();
      if (doubleCheck === 0) {
        const defaultFaqs = [
          {
            question: "Como funciona o processo de matrícula para a creche?",
            answer: "As matrículas para a nossa creche-escola são voltadas para crianças de 2 a 5 anos residentes na região de Massaranduba e arredores. A prioridade é dada a famílias em situação de vulnerabilidade socioeconômica. As inscrições ocorrem geralmente no final de cada ano letivo, diretamente na nossa secretaria.",
            order: 1,
            active: true,
          },
          {
            question: "Quais oficinas são oferecidas para crianças e jovens?",
            answer: "Oferecemos oficinas de capoeira, teatro, circo, desenho artístico, reforço escolar e informática básica. As atividades ocorrem sempre no contra-turno escolar (inverso ao horário que a criança estuda na rede pública) para alunos de 6 a 18 anos.",
            order: 2,
            active: true,
          },
          {
            question: "Como posso doar mantimentos ou roupas?",
            answer: "Doações de alimentos não perecíveis, agasalhos, calçados e brinquedos em bom estado são super bem-vindas! Elas podem ser entregues diretamente na nossa sede física em Massaranduba de segunda a sexta-feira, das 08:00 às 17:00.",
            order: 3,
            active: true,
          },
          {
            question: "Como obter um recibo fiscal das doações financeiras?",
            answer: "Toda doação financeira gera um comprovante institucional. Caso precise de um recibo específico assinado pelo coordenador Padre Marco para abatimento no Imposto de Renda ou contabilidade de empresa, envie o comprovante de transferência para o e-mail beijaflor.massaranduba@gmail.com ou ligue no (71) 3014-1351.",
            order: 4,
            active: true,
          },
          {
            question: "Qual o horário de funcionamento da Associação?",
            answer: "Nossa sede e creche funcionam de segunda a sexta-feira, das 07:30 às 17:00, acolhendo as crianças em período integral.",
            order: 5,
            active: true,
          },
        ];

        await prisma.faqItem.createMany({ data: defaultFaqs });
      }
    } finally {
      isSeedingFaq = false;
    }
    // Re-query to get the fresh data
    faqItems = await prisma.faqItem.findMany({
      orderBy: { order: "asc" },
    });
  }
  
  // Filter active FAQ items for landing page
  faqItems = faqItems.filter(item => item.active);

  return (
    <>
      <NoticePopup notice={popupNotice} />
      <Hero />
      <AboutSection />
      <ImpactCounters />
      <FableSection />
      <HistoryTimeline />
      <ServicesGrid />
      <FraternitySection />
      <EventsGallery initialPosts={displayGalleryPosts} />
      <LatestNews posts={blogPosts} />
      <FaqAccordion initialItems={faqItems} />
      
      {/* Volunteer Form Section */}
      <section id="volunteer" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-1.5 rounded-full mb-3 inline-block">
              Trabalho Voluntário
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
              Faça a Diferença Conosco
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Ofereça seu tempo, talento e carinho para apoiar a educação das crianças de Massaranduba. Toda ajuda é valiosa!
            </p>
          </div>
          <VolunteerForm />
        </div>
      </section>

      <DonateSection goal={currentGoal} />
    </>
  );
}

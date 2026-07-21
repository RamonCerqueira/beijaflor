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
// import { prisma } from "@/lib/db";
import { mockNotices, mockGalleryPosts, mockBlogPosts, mockFinancialGoals, mockFaqItems } from "@/lib/mockData";

export const dynamic = "force-dynamic"; // Force dynamic rendering so admin updates reflect instantly

export default async function Home() {
  /*
  // Database seed & cleanup disabled while database is paused
  if (!hasCleanedDuplicates) {
    ...
  }
  */

  // BANCO SUPABASE PAUSADO - Consultas originais comentadas abaixo:
  // const popupNotice = await prisma.notice.findFirst({
  //   where: { active: true, showPopup: true },
  // });
  const popupNotice = mockNotices.find((n) => n.active && n.showPopup) || null;

  // let galleryPosts = await prisma.galleryPost.findMany({
  //   orderBy: { date: "desc" },
  // });
  const displayGalleryPosts = mockGalleryPosts.slice(0, 4);

  // const blogPosts = await prisma.blogPost.findMany({
  //   where: { published: true },
  //   orderBy: { date: "desc" },
  //   take: 3,
  // });
  const blogPosts = mockBlogPosts.filter((p) => p.published).slice(0, 3);

  // const currentGoal = await prisma.financialGoal.findFirst({
  //   where: { month: now.getMonth() + 1, year: now.getFullYear() },
  // });
  const currentGoal = mockFinancialGoals[0] || null;

  // let faqItems = await prisma.faqItem.findMany({
  //   orderBy: { order: "asc" },
  // });
  const faqItems = mockFaqItems.filter((item) => item.active);

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

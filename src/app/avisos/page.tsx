import { prisma } from "@/lib/db";
import NoticeCard from "@/components/NoticeCard";

export const dynamic = "force-dynamic"; // Disable cache so data is fresh

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    where: {
      active: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex flex-col border-b border-slate-200/60 pb-8 text-center sm:text-left">
          <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest mb-2">
            Comunicados Gerais
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Mural de Avisos
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 max-w-xl">
            Acompanhe comunicados da secretaria, calendário de reuniões com o Padre Marco Pagliucci, eventos e avisos importantes para os pais e comunidade.
          </p>
        </div>

        {/* Notices List */}
        {notices.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
            <span className="text-3xl block mb-3">📢</span>
            <h3 className="font-display font-bold text-slate-800 text-lg mb-1">Mural Vazio</h3>
            <p className="text-sm text-slate-400">Não há avisos ativos publicados no momento.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

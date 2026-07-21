// import { prisma } from "@/lib/db";
import { mockTransactions, mockNotices } from "@/lib/mockData";
import Link from "next/link";
import { Wallet, Megaphone, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // BANCO SUPABASE PAUSADO - Consultas originais comentadas:
  // const transactionsCount = await prisma.transaction.count();
  // const noticesCount = await prisma.notice.count({ where: { active: true } });
  // const transactions = await prisma.transaction.findMany({
  //   orderBy: { date: "desc" },
  //   take: 3,
  // });

  const transactionsCount = mockTransactions.length;
  const noticesCount = mockNotices.filter((n) => n.active).length;
  const transactions = mockTransactions.slice(0, 3);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-brand-navy">Painel Administrativo</h1>
        <p className="text-slate-500 text-sm mt-1">
          Bem-vindo de volta! Gerencie aqui a transparência financeira e o mural de comunicados do Projeto Beija-Flor.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Finance Stats Card */}
        <div className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lançamentos</span>
                <span className="text-lg font-bold text-slate-800 mt-0.5">{transactionsCount} registros</span>
              </div>
            </div>
          </div>
          <Link
            href="/admin/financeiro"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover mt-6 uppercase tracking-wider"
          >
            <span>Gerenciar Lançamentos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Notices Stats Card */}
        <div className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Megaphone size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Avisos Ativos</span>
                <span className="text-lg font-bold text-slate-800 mt-0.5">{noticesCount} comunicados</span>
              </div>
            </div>
          </div>
          <Link
            href="/admin/avisos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover mt-6 uppercase tracking-wider"
          >
            <span>Gerenciar Mural</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white border border-slate-200/50 rounded-2xl shadow-sm p-6 flex flex-col">
        <h3 className="font-display text-base font-extrabold text-brand-navy mb-5">
          Atividade Financeira Recente
        </h3>
        
        {transactions.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">Nenhuma atividade registrada.</p>
        ) : (
          <div className="flex flex-col divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-3.5 text-sm">
                <div className="flex flex-col">
                  <strong className="text-slate-800 font-semibold">{tx.description}</strong>
                  <span className="text-xs text-slate-400">{tx.category}</span>
                </div>
                <strong className={`font-extrabold ${tx.type === "INCOME" ? "text-brand-green" : "text-slate-800"}`}>
                  {tx.type === "INCOME" ? "+" : "-"} {formatCurrency(tx.amount)}
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

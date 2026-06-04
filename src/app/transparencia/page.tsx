import { prisma } from "@/lib/db";
import FinanceSummaryCards from "@/components/FinanceSummaryCards";
import FinanceCharts from "@/components/FinanceCharts";
import TransactionTable from "@/components/TransactionTable";
import MonthSelector from "@/components/MonthSelector";

export const dynamic = "force-dynamic"; // Disable cache so data is fresh

export default async function TransparencyPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>;
}) {
  const params = await searchParams;
  
  const allTransactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  // Extract unique month/years
  const monthMap = new Map<string, { month: number; year: number; label: string }>();
  
  const now = new Date();
  const currentMonthKey = `${now.getMonth() + 1}-${now.getFullYear()}`;
  monthMap.set(currentMonthKey, {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    label: now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
  });

  allTransactions.forEach((tx) => {
    const d = new Date(tx.date);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    const key = `${m}-${y}`;
    if (!monthMap.has(key)) {
      monthMap.set(key, {
        month: m,
        year: y,
        label: d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      });
    }
  });

  const monthOptions = Array.from(monthMap.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  // Determine defaults
  const defaultMonth = allTransactions[0] 
    ? new Date(allTransactions[0].date).getMonth() + 1 
    : now.getMonth() + 1;
  const defaultYear = allTransactions[0] 
    ? new Date(allTransactions[0].date).getFullYear() 
    : now.getFullYear();

  const selectedMonth = params.month ? parseInt(params.month) : defaultMonth;
  const selectedYear = params.year ? parseInt(params.year) : defaultYear;

  // Filter transactions
  const filteredTransactions = allTransactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200/60 pb-8">
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest mb-2">
              Gestão Comunitária
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Portal de Transparência
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Nossa prestação de contas pública. Acompanhe abaixo as receitas (doações e subvenções) e despesas executadas mensalmente no Projeto Beija-Flor.
            </p>
          </div>

          <MonthSelector 
            options={monthOptions}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            basePath="/transparencia"
          />
        </div>

        {/* Totals Summary Cards */}
        <FinanceSummaryCards transactions={filteredTransactions} />

        {/* Charts Section */}
        <FinanceCharts transactions={filteredTransactions} />

        {/* Main Records Table */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-brand-navy px-1">
            Histórico Geral de Lançamentos
          </h2>
          <TransactionTable transactions={filteredTransactions} />
        </div>

      </div>
    </div>
  );
}

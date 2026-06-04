"use client";

import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: Date;
}

interface FinanceSummaryCardsProps {
  transactions: Transaction[];
}

export default function FinanceSummaryCards({ transactions }: FinanceSummaryCardsProps) {
  const totalIncome = transactions
    .filter((tx) => tx.type === "INCOME")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "EXPENSE")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Income Card */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green">
          <TrendingUp size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total de Receitas</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mt-1">
            {formatCurrency(totalIncome)}
          </h3>
        </div>
      </div>

      {/* Expense Card */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500">
          <TrendingDown size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total de Despesas</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mt-1">
            {formatCurrency(totalExpense)}
          </h3>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-5 hover:shadow-md transition-shadow">
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${balance >= 0 ? 'bg-brand-blue/10 text-brand-blue' : 'bg-amber-50 text-brand-gold'}`}>
          <Wallet size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Saldo em Caixa</span>
          <h3 className={`text-xl sm:text-2xl font-extrabold mt-1 ${balance >= 0 ? 'text-brand-blue' : 'text-brand-gold'}`}>
            {formatCurrency(balance)}
          </h3>
        </div>
      </div>
    </div>
  );
}

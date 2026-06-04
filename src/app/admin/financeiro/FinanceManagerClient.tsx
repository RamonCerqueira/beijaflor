"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Printer, Calendar, Target, Edit2, Loader2 } from "lucide-react";
import { deleteTransactionAction, updateFinancialGoalAction } from "@/lib/actions";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: Date;
}

interface FinancialGoal {
  id: string;
  month: number;
  year: number;
  target: number;
  current: number;
}

interface FinanceManagerClientProps {
  initialTransactions: Transaction[];
  initialGoals: FinancialGoal[];
}

export default function FinanceManagerClient({ initialTransactions, initialGoals }: FinanceManagerClientProps) {
  const [isPending, startTransition] = useTransition();

  // Generate unique monthly periods from transactions
  const periodsMap = new Map<string, { month: number; year: number; label: string }>();

  const now = new Date();
  const currentKey = `${now.getMonth() + 1}-${now.getFullYear()}`;
  periodsMap.set(currentKey, {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    label: now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
  });

  initialTransactions.forEach((tx) => {
    const d = new Date(tx.date);
    const key = `${d.getMonth() + 1}-${d.getFullYear()}`;
    if (!periodsMap.has(key)) {
      periodsMap.set(key, {
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        label: d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      });
    }
  });

  const periods = Array.from(periodsMap.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  // State for chosen period, default to first period (most recent)
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    initialTransactions[0]
      ? `${new Date(initialTransactions[0].date).getMonth() + 1}-${new Date(initialTransactions[0].date).getFullYear()}`
      : currentKey
  );

  const [selMonth, selYear] = selectedPeriod.split("-").map(Number);

  // States for Goal Edit
  const [goalTarget, setGoalTarget] = useState<string>("0");
  const [goalCurrent, setGoalCurrent] = useState<string>("0");

  useEffect(() => {
    const match = initialGoals.find(g => g.month === selMonth && g.year === selYear);
    setGoalTarget(match ? String(match.target) : "0");
    setGoalCurrent(match ? String(match.current) : "0");
  }, [selectedPeriod, initialGoals, selMonth, selYear]);

  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetVal = parseFloat(goalTarget);
    const currentVal = parseFloat(goalCurrent);

    if (isNaN(targetVal) || isNaN(currentVal)) {
      alert("Valores inválidos");
      return;
    }

    startTransition(async () => {
      const response = await updateFinancialGoalAction(selMonth, selYear, targetVal, currentVal);
      if (response && response.error) {
        alert(response.error);
      } else {
        alert("Meta de arrecadação do mês salva com sucesso!");
      }
    });
  };

  // Filter transactions for this month
  const filteredTransactions = initialTransactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getMonth() + 1 === selMonth && d.getFullYear() === selYear;
  });

  // Calculate totals for selected month
  const monthlyIncome = filteredTransactions
    .filter(tx => tx.type === "INCOME")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyExpense = filteredTransactions
    .filter(tx => tx.type === "EXPENSE")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyBalance = monthlyIncome - monthlyExpense;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  const formatDate = (dateVal: Date) => {
    return new Date(dateVal).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };



  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este lançamento financeiro?")) return;

    startTransition(async () => {
      const response = await deleteTransactionAction(id);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* 1. Dashboard Header (Hidden during print) */}
      <div className="flex justify-between items-center gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Gestão Financeira</h1>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">Adicione receitas ou despesas ao portal de transparência.</p>
        </div>

        <Link
          href="/admin/financeiro/novo"
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Novo Lançamento</span>
        </Link>
      </div>

      {/* 2. Monthly Filter & Stats (Hidden during print) */}
      <div className="bg-white border border-slate-200/50 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        {/* Selector */}
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-brand-blue" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Período:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs capitalize cursor-pointer focus:outline-none focus:border-brand-blue"
          >
            {periods.map(p => (
              <option key={`${p.month}-${p.year}`} value={`${p.month}-${p.year}`}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Statistics box */}
        <div className="flex items-center gap-6 text-xs font-bold text-slate-500 overflow-x-auto pb-1 md:pb-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-slate-400 uppercase tracking-wide">Receitas</span>
            <span className="text-sm font-extrabold text-brand-green">{formatCurrency(monthlyIncome)}</span>
          </div>
          <div className="border-r border-slate-100 h-8 hidden sm:block" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-slate-400 uppercase tracking-wide">Despesas</span>
            <span className="text-sm font-extrabold text-red-500">{formatCurrency(monthlyExpense)}</span>
          </div>
          <div className="border-r border-slate-100 h-8 hidden sm:block" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-slate-400 uppercase tracking-wide">Saldo Líquido</span>
            <span className={`text-sm font-extrabold ${monthlyBalance >= 0 ? "text-brand-blue" : "text-brand-gold"}`}>{formatCurrency(monthlyBalance)}</span>
          </div>
        </div>

        {/* Action buttons */}
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold px-4.5 py-2 rounded-xl cursor-pointer"
        >
          <Printer size={14} />
          <span>Imprimir Extrato</span>
        </button>
      </div>

      {/* 2.5 Meta Financeira do Mês (Hidden during print) */}
      <div className="bg-white border border-slate-200/50 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:hidden">
        <div className="flex flex-col">
          <h3 className="font-display text-sm font-extrabold text-brand-navy flex items-center gap-1.5">
            <Target size={16} className="text-brand-blue" />
            <span>Meta de Arrecadação de Doações</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            Defina o alvo e o total coletado manualmente para alimentar a barra pública de doações.
          </p>
        </div>

        <form onSubmit={handleSaveGoal} className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Target */}
          <div className="flex flex-col gap-1 w-full sm:w-36">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Meta Alvo (R$)</label>
            <input
              type="number"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="bg-slate-50 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-brand-blue"
            />
          </div>

          {/* Current */}
          <div className="flex flex-col gap-1 w-full sm:w-36">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Recebido (R$)</label>
            <input
              type="number"
              value={goalCurrent}
              onChange={(e) => setGoalCurrent(e.target.value)}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="bg-slate-50 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-brand-blue"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto self-end bg-brand-navy hover:bg-brand-navy-hover text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 h-8.5 mt-auto"
          >
            {isPending ? <Loader2 size={13} className="animate-spin" /> : null}
            <span>Salvar Meta</span>
          </button>
        </form>
      </div>

      {/* 3. Transactions List Table (Hidden during print) */}
      <div className="bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden print:hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Descrição</th>
                <th className="py-3.5 px-6">Categoria</th>
                <th className="py-3.5 px-6">Data</th>
                <th className="py-3.5 px-6 text-right">Valor</th>
                <th className="py-3.5 px-6 text-center w-20">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 font-medium">
                    Nenhum lançamento registrado neste mês.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-6.5 h-6.5 rounded-full flex-shrink-0 ${tx.type === "INCOME" ? "bg-brand-green/8 text-brand-green" : "bg-red-50 text-red-500"
                          }`}>
                          {tx.type === "INCOME" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        </div>
                        <span>{tx.description}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="inline-block bg-slate-100 text-slate-500 font-bold px-2.5 py-0.5 rounded text-[10px]">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 font-medium">{formatDate(tx.date)}</td>
                    <td className={`py-3.5 px-6 text-right font-bold ${tx.type === "INCOME" ? "text-brand-green" : "text-slate-800"
                      }`}>
                      {tx.type === "INCOME" ? "+" : "-"} {formatCurrency(tx.amount)}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/financeiro/editar/${tx.id}`}
                          className="text-slate-400 hover:text-brand-blue p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Editar Lançamento"
                        >
                          <Edit2 size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          disabled={isPending}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                          title="Excluir Lançamento"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Print-Only Monthly Report (Hidden on screen) */}
      <div className="hidden print:block text-slate-800 p-4 w-full font-sans">
        <div className="border-b-2 border-slate-800 pb-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">Associação Projeto Beija-Flor</h1>
            <p className="text-xs text-slate-500 mt-1">Massaranduba, Salvador - BA | CNPJ: 12.345.678/0001-90</p>
            <p className="text-xs text-slate-500">beijaflor.massaranduba@gmail.com | (71) 3014-1351</p>
          </div>
          <div className="text-right">
            <h2 className="text-base font-extrabold text-slate-800 tracking-wide uppercase">EXTRATO FINANCEIRO MENSAL</h2>
            <p className="text-xs font-bold text-slate-600 capitalize mt-1">
              Referência: {periods.find(p => `${p.month}-${p.year}` === selectedPeriod)?.label}
            </p>
          </div>
        </div>

        {/* Summary Card for Print */}
        <div className="grid grid-cols-3 border border-slate-300 rounded-xl p-4 mb-6 bg-slate-50 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Receitas:</span>
            <strong className="text-sm text-green-600">{formatCurrency(monthlyIncome)}</strong>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Despesas:</span>
            <strong className="text-sm text-red-600">{formatCurrency(monthlyExpense)}</strong>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Saldo Líquido do Mês:</span>
            <strong className="text-sm text-slate-800">{formatCurrency(monthlyBalance)}</strong>
          </div>
        </div>

        {/* Transaction details table for print */}
        <table className="w-full text-left border-collapse border border-slate-300 text-[11px]">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
              <th className="py-2.5 px-4 border border-slate-300">Data</th>
              <th className="py-2.5 px-4 border border-slate-300">Descrição</th>
              <th className="py-2.5 px-4 border border-slate-300">Categoria</th>
              <th className="py-2.5 px-4 border border-slate-300 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">Nenhum lançamento neste período.</td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-200">
                  <td className="py-2 px-4 border border-slate-200">{formatDate(tx.date)}</td>
                  <td className="py-2 px-4 border border-slate-200 font-medium">{tx.description}</td>
                  <td className="py-2 px-4 border border-slate-200">{tx.category}</td>
                  <td className={`py-2 px-4 border border-slate-200 text-right font-bold ${tx.type === "INCOME" ? "text-green-600" : "text-slate-800"}`}>
                    {tx.type === "INCOME" ? "+" : "-"} {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Signatures block */}
        <div className="mt-20 grid grid-cols-2 gap-12 text-center text-xs">
          <div className="flex flex-col items-center">
            <div className="border-t border-slate-400 w-48 mt-8 mb-1" />
            <span className="font-bold text-slate-700">Padre Marco Pagliucci</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Coordenador Geral</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="border-t border-slate-400 w-48 mt-8 mb-1" />
            <span className="font-bold text-slate-700">Responsável Administrativo</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Associação Beija-Flor</span>
          </div>
        </div>
      </div>
    </div>
  );
}

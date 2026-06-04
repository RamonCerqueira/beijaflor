"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: Date;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Get unique categories for dropdown
  const categories = useMemo(() => {
    const set = new Set(transactions.map((tx) => tx.category));
    return ["ALL", ...Array.from(set)];
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase()) ||
                          tx.category.toLowerCase().includes(search.toLowerCase());
      
      const matchType = typeFilter === "ALL" || tx.type === typeFilter;
      
      const matchCategory = categoryFilter === "ALL" || tx.category === categoryFilter;

      return matchSearch && matchType && matchCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  const formatDate = (dateVal: Date) => {
    const d = new Date(dateVal);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Filter Bar */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por descrição ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
            <Filter size={14} className="text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="ALL">Todos os Tipos</option>
              <option value="INCOME">Receitas (+)</option>
              <option value="EXPENSE">Despesas (-)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer max-w-[150px]"
            >
              <option value="ALL">Todas Categorias</option>
              {categories.filter(c => c !== "ALL").map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Descrição</th>
                <th className="py-4 px-6">Categoria</th>
                <th className="py-4 px-6">Data</th>
                <th className="py-4 px-6 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-slate-400 font-medium">
                    Nenhum lançamento encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/45 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                          tx.type === "INCOME" ? "bg-brand-green/8 text-brand-green" : "bg-red-50/70 text-red-500"
                        }`}>
                          {tx.type === "INCOME" ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                        </div>
                        <span className="font-semibold text-slate-800">{tx.description}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-md">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-medium">{formatDate(tx.date)}</td>
                    <td className={`py-4 px-6 text-right font-extrabold ${
                      tx.type === "INCOME" ? "text-brand-green" : "text-slate-800"
                    }`}>
                      {tx.type === "INCOME" ? "+" : "-"} {formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

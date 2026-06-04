"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { updateTransactionAction } from "@/lib/actions";

interface TransactionData {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE" | string;
  category: string;
  date: string; // YYYY-MM-DD
}

interface EditTransactionFormProps {
  transaction: TransactionData;
}

export default function EditTransactionForm({ transaction }: EditTransactionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      description: formData.get("description") as string,
      amount: formData.get("amount") as string,
      type: formData.get("type") as string,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
    };

    startTransition(async () => {
      const response = await updateTransactionAction(transaction.id, data);
      if (response && response.error) {
        setError(response.error);
      } else {
        router.push("/admin/financeiro");
        router.refresh();
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/admin/financeiro"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Voltar para Gestão Financeira</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-brand-navy font-display">Editar Lançamento Financeiro</h1>
        <p className="text-slate-500 text-xs mt-1 font-medium">
          Atualize os dados e categorias deste lançamento para manter o portal da transparência correto.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm animate-fade-in">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3.5 text-xs font-semibold mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Tipo de Operação
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="border border-slate-200 hover:border-brand-green/40 p-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5 has-[:checked]:text-brand-green transition-all">
                <input
                  type="radio"
                  name="type"
                  value="INCOME"
                  defaultChecked={transaction.type === "INCOME"}
                  className="accent-brand-green"
                />
                <ArrowUpRight size={16} />
                <span>Receita (+)</span>
              </label>
              <label className="border border-slate-200 hover:border-red-200 p-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold has-[:checked]:border-red-500 has-[:checked]:bg-red-50 has-[:checked]:text-red-500 transition-all">
                <input
                  type="radio"
                  name="type"
                  value="EXPENSE"
                  defaultChecked={transaction.type === "EXPENSE"}
                  className="accent-red-500"
                />
                <ArrowDownRight size={16} />
                <span>Despesa (-)</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Descrição / Detalhe
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              defaultValue={transaction.description}
              placeholder="Ex: Doação Mensal - Campanha de Padrinhos"
              className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-medium text-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="amount" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Valor (R$)
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                required
                defaultValue={transaction.amount}
                placeholder="0.00"
                className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold text-slate-700"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="date" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Data do Lançamento
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                defaultValue={transaction.date}
                className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold text-slate-700"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Categoria
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              defaultValue={transaction.category}
              placeholder="Ex: Doações Individuais, Alimentação, RH"
              className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-medium text-slate-700"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-6 border-t border-slate-100 pt-6">
            <Link
              href="/admin/financeiro"
              className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 rounded-xl text-center text-xs transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
            >
              {isPending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

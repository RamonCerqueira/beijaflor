"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, X, Loader2, HelpCircle, Eye, EyeOff, Edit3 } from "lucide-react";
import { createFaqItemAction, deleteFaqItemAction, updateFaqItemAction } from "@/lib/actions";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

interface FaqManagerClientProps {
  initialItems: FaqItem[];
}

export default function FaqManagerClient({ initialItems }: FaqManagerClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Handle Submit (Create or Edit)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      order: formData.get("order") as string || "0",
      active: formData.get("active") === "true",
    };

    startTransition(async () => {
      let response;
      if (editingItem) {
        response = await updateFaqItemAction(editingItem.id, data);
      } else {
        response = await createFaqItemAction(data);
      }

      if (response && response.error) {
        setError(response.error);
      } else {
        setIsModalOpen(false);
        setEditingItem(null);
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  // Open Edit Modal
  const handleEditClick = (item: FaqItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Handle Toggle Active
  const handleToggleActive = async (item: FaqItem) => {
    const data = {
      question: item.question,
      answer: item.answer,
      order: String(item.order),
      active: !item.active,
    };

    startTransition(async () => {
      const response = await updateFaqItemAction(item.id, data);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta pergunta do FAQ?")) return;

    startTransition(async () => {
      const response = await deleteFaqItemAction(id);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Gerenciar FAQ</h1>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">Cadastre perguntas frequentes que aparecem na Landing Page principal do site.</p>
        </div>
        
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Nova Pergunta</span>
        </button>
      </div>

      {/* Table view */}
      <div className="bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6 w-16 text-center">Ordem</th>
                <th className="py-3.5 px-6">Pergunta</th>
                <th className="py-3.5 px-6">Resposta</th>
                <th className="py-3.5 px-6 text-center w-28">Status</th>
                <th className="py-3.5 px-6 text-center w-28">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {initialItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 font-medium">
                    Nenhuma pergunta cadastrada. Clique em "Nova Pergunta" para começar.
                  </td>
                </tr>
              ) : (
                initialItems.map((item) => (
                  <tr key={item.id} className={`hover:bg-slate-50/50 transition-colors ${!item.active ? "opacity-60" : ""}`}>
                    <td className="py-3.5 px-6 text-center font-bold text-slate-500">{item.order}</td>
                    <td className="py-3.5 px-6 font-semibold text-slate-800">{item.question}</td>
                    <td className="py-3.5 px-6 text-slate-500 line-clamp-1 truncate max-w-xs">{item.answer}</td>
                    <td className="py-3.5 px-6 text-center">
                      <button
                        onClick={() => handleToggleActive(item)}
                        disabled={isPending}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors border ${
                          item.active
                            ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                            : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {item.active ? (
                          <>
                            <Eye size={12} />
                            <span>Ativo</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            <span>Oculto</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <div className="flex justify-center gap-1.5">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-slate-400 hover:text-brand-blue p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Editar Pergunta"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isPending}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                          title="Excluir Pergunta"
                        >
                          <Trash2 size={14} />
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

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-lg p-6 flex flex-col relative animate-fade-in">
            {/* Close */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
              className="absolute right-5 top-5 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-lg font-extrabold text-brand-navy mb-1.5 flex items-center gap-2">
              <HelpCircle size={18} className="text-brand-blue" />
              <span>{editingItem ? "Editar Pergunta do FAQ" : "Nova Pergunta no FAQ"}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">Escreva uma pergunta e sua respectiva resposta para tirar dúvidas dos usuários.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 text-xs font-semibold mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Question */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="question" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pergunta
                </label>
                <input
                  id="question"
                  name="question"
                  type="text"
                  required
                  defaultValue={editingItem?.question || ""}
                  placeholder="Ex: Como funciona o voluntariado?"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold text-slate-700"
                />
              </div>

              {/* Answer */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="answer" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Resposta Detalhada
                </label>
                <textarea
                  id="answer"
                  name="answer"
                  required
                  rows={5}
                  defaultValue={editingItem?.answer || ""}
                  placeholder="Escreva a resposta de forma clara..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors resize-none font-medium text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Order */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="order" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Ordem de Exibição
                  </label>
                  <input
                    id="order"
                    name="order"
                    type="number"
                    required
                    defaultValue={editingItem?.order !== undefined ? String(editingItem.order) : "0"}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold"
                  />
                </div>

                {/* Status Active */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Status Inicial
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="border border-slate-200 p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5 has-[:checked]:text-brand-green">
                      <input 
                        type="radio" 
                        name="active" 
                        value="true" 
                        defaultChecked={editingItem ? editingItem.active : true} 
                        className="accent-brand-green" 
                      />
                      <span>Ativo</span>
                    </label>
                    <label className="border border-slate-200 p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold has-[:checked]:border-slate-500 has-[:checked]:bg-slate-50 has-[:checked]:text-slate-500">
                      <input 
                        type="radio" 
                        name="active" 
                        value="false" 
                        defaultChecked={editingItem ? !editingItem.active : false} 
                        className="accent-slate-500" 
                      />
                      <span>Oculto</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <span>Salvar</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

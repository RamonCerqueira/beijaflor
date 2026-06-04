"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, X, Loader2, Megaphone, Calendar, Users, Eye, EyeOff, Sparkles } from "lucide-react";
import { createNoticeAction, deleteNoticeAction, toggleNoticeAction, toggleNoticePopupAction } from "@/lib/actions";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "GENERAL" | "EVENT" | "MEETING";
  date: Date;
  active: boolean;
  showPopup: boolean;
}

interface NoticesManagerClientProps {
  initialNotices: Notice[];
}

export default function NoticesManagerClient({ initialNotices }: NoticesManagerClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const getCategoryDetails = (cat: "GENERAL" | "EVENT" | "MEETING") => {
    switch (cat) {
      case "GENERAL":
        return { label: "Geral", bg: "bg-brand-blue/10 text-brand-blue" };
      case "EVENT":
        return { label: "Evento", bg: "bg-brand-green/10 text-brand-green" };
      case "MEETING":
        return { label: "Reunião", bg: "bg-brand-gold/10 text-brand-gold" };
    }
  };

  const formatDate = (dateVal: Date) => {
    return new Date(dateVal).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
      active: true,
      showPopup: formData.get("showPopup") === "true",
    };

    startTransition(async () => {
      const response = await createNoticeAction(data);
      if (response && response.error) {
        setError(response.error);
      } else {
        setIsModalOpen(false);
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  // Handle Status Toggle
  const handleToggle = async (id: string, currentActive: boolean) => {
    startTransition(async () => {
      const response = await toggleNoticeAction(id, currentActive);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  // Handle Popup Toggle
  const handleTogglePopup = async (id: string, currentShowPopup: boolean) => {
    startTransition(async () => {
      const response = await toggleNoticePopupAction(id, currentShowPopup);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este aviso permanentemente?")) return;

    startTransition(async () => {
      const response = await deleteNoticeAction(id);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Bar */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Mural de Avisos</h1>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">Gerencie os comunicados e eventos exibidos publicamente no mural.</p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Novo Aviso</span>
        </button>
      </div>

      {/* Notices Table */}
      <div className="bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Título do Aviso</th>
                <th className="py-3.5 px-6">Categoria</th>
                <th className="py-3.5 px-6">Data de Publicação</th>
                <th className="py-3.5 px-6 text-center w-28">Status</th>
                <th className="py-3.5 px-6 text-center w-28">Destaque Popup</th>
                <th className="py-3.5 px-6 text-center w-20">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {initialNotices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
                    Nenhum comunicado cadastrado. Clique em "Novo Aviso" para iniciar.
                  </td>
                </tr>
              ) : (
                initialNotices.map((notice) => {
                  const cat = getCategoryDetails(notice.category);
                  return (
                    <tr key={notice.id} className={`hover:bg-slate-50/50 transition-colors ${!notice.active ? "opacity-60" : ""}`}>
                      <td className="py-3.5 px-6 font-semibold text-slate-800">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 text-[13px]">{notice.title}</span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 font-normal mt-0.5">{notice.content}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className={`inline-block font-bold px-2.5 py-0.5 rounded text-[10px] ${cat.bg}`}>
                          {cat.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-slate-400 font-medium">{formatDate(notice.date)}</td>
                      <td className="py-3.5 px-6 text-center">
                        <button
                          onClick={() => handleToggle(notice.id, notice.active)}
                          disabled={isPending}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors border ${
                            notice.active
                              ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                              : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {notice.active ? (
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
                        <button
                          onClick={() => handleTogglePopup(notice.id, notice.showPopup)}
                          disabled={isPending}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors border ${
                            notice.showPopup
                              ? "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
                              : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                          }`}
                        >
                          <Sparkles size={11} className={notice.showPopup ? "animate-pulse fill-current text-amber-500" : ""} />
                          <span>{notice.showPopup ? "Ativo" : "Nenhum"}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <button
                          onClick={() => handleDelete(notice.id)}
                          disabled={isPending}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                          title="Excluir Aviso"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
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
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-lg font-extrabold text-brand-navy mb-1.5">
              Novo Comunicado / Aviso
            </h3>
            <p className="text-xs text-slate-400 mb-6">Cadastre um aviso importante para pais, alunos ou voluntários.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 text-xs font-semibold mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Categoria do Comunicado
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="border border-slate-200 hover:border-brand-blue/30 p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs font-semibold has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5 has-[:checked]:text-brand-blue">
                    <input type="radio" name="category" value="GENERAL" defaultChecked className="accent-brand-blue" />
                    <span>Geral</span>
                  </label>
                  <label className="border border-slate-200 hover:border-brand-green/30 p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs font-semibold has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5 has-[:checked]:text-brand-green">
                    <input type="radio" name="category" value="EVENT" className="accent-brand-green" />
                    <span>Evento</span>
                  </label>
                  <label className="border border-slate-200 hover:border-brand-gold/30 p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs font-semibold has-[:checked]:border-brand-gold has-[:checked]:bg-brand-gold/5 has-[:checked]:text-brand-gold">
                    <input type="radio" name="category" value="MEETING" className="accent-brand-gold" />
                    <span>Reunião</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="title" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Título do Aviso
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Ex: Entrega de Boletins / Reunião Geral"
                  className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="date" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Data de Publicação
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors"
                />
              </div>

              {/* Content Textarea */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="content" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Conteúdo do Comunicado
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={4}
                  placeholder="Escreva os detalhes do aviso..."
                  className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors resize-none"
                />
              </div>

              {/* Popup Switcher Checkbox */}
              <div className="flex items-center gap-2 pl-1 py-1">
                <input
                  id="showPopup"
                  name="showPopup"
                  type="checkbox"
                  value="true"
                  className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue accent-brand-blue cursor-pointer"
                />
                <label htmlFor="showPopup" className="text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  Exibir como Popup (Destaque principal ao recarregar o site)
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
                    <span>Publicar</span>
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

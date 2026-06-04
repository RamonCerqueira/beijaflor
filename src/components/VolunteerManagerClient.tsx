"use client";

import { useState, useTransition } from "react";
import { Trash2, MessageCircle, Mail, Phone, Calendar, Heart, ArrowRight, Check, Archive, Clock } from "lucide-react";
import { updateVolunteerCandidateStatusAction, deleteVolunteerCandidateAction } from "@/lib/actions";

interface VolunteerCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string | null;
  status: string; // PENDING, CONTACTED, ARCHIVED
  createdAt: Date;
}

interface VolunteerManagerClientProps {
  initialCandidates: VolunteerCandidate[];
}

export default function VolunteerManagerClient({ initialCandidates }: VolunteerManagerClientProps) {
  const [filter, setFilter] = useState<string>("ALL"); // ALL, PENDING, CONTACTED, ARCHIVED
  const [isPending, startTransition] = useTransition();

  const getAreaLabel = (area: string) => {
    switch (area) {
      case "pedagogia": return "Apoio Pedagógico & Creche";
      case "reforco": return "Apoio Escolar & Reforço";
      case "esporte": return "Oficinas / Esporte / Dança";
      case "cozinha": return "Cozinha / Merenda";
      case "admin": return "Administrativo / Marketing";
      default: return "Outros / Serviços Gerais";
    }
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "Pendente", bg: "bg-amber-50 border-amber-200 text-amber-600", icon: <Clock size={12} /> };
      case "CONTACTED":
        return { label: "Contatado", bg: "bg-blue-50 border-blue-200 text-brand-blue", icon: <Check size={12} /> };
      default:
        return { label: "Arquivado", bg: "bg-slate-100 border-slate-200 text-slate-500", icon: <Archive size={12} /> };
    }
  };

  const formatDate = (dateVal: Date) => {
    return new Date(dateVal).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle Update Status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    startTransition(async () => {
      const response = await updateVolunteerCandidateStatusAction(id, newStatus);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta inscrição permanentemente?")) return;

    startTransition(async () => {
      const response = await deleteVolunteerCandidateAction(id);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  // Filter candidates
  const filteredCandidates = initialCandidates.filter((cand) => {
    if (filter === "ALL") return true;
    return cand.status === filter;
  });

  // Generate WhatsApp link
  const getWhatsAppLink = (cand: VolunteerCandidate) => {
    const cleanPhone = cand.phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
    const text = encodeURIComponent(
      `Olá, ${cand.name}!\n\nVi a sua inscrição no formulário de voluntariado do site da Associação Projeto Beija-Flor. Ficamos muito felizes com o seu interesse em apoiar a nossa atuação na área de "${getAreaLabel(
        cand.area
      )}".\n\nGostaria de agendar uma breve conversa com você. Qual seria o melhor dia e horário?`
    );
    return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${text}`;
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy flex items-center gap-2">
            <Heart size={24} className="text-red-500 fill-current" />
            <span>Candidatos a Voluntário</span>
          </h1>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">Faça a triagem das pessoas que se inscreveram para colaborar voluntariamente com a creche e oficinas.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        {[
          { key: "ALL", label: "Todos" },
          { key: "PENDING", label: "Pendentes" },
          { key: "CONTACTED", label: "Contatados" },
          { key: "ARCHIVED", label: "Arquivados" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 border-b-2 font-display text-xs font-bold transition-all cursor-pointer ${
              filter === tab.key
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List / Table */}
      <div className="bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Candidato</th>
                <th className="py-3.5 px-6">Área de Interesse</th>
                <th className="py-3.5 px-6">Data de Inscrição</th>
                <th className="py-3.5 px-6 text-center w-28">Status</th>
                <th className="py-3.5 px-6 text-center w-40">Mudar Status</th>
                <th className="py-3.5 px-6 text-center w-36">Ações / Contato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
                    Nenhum candidato encontrado nesta categoria.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((cand) => {
                  const stat = getStatusDetails(cand.status);
                  return (
                    <tr key={cand.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Name / Contact detail block */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-extrabold text-[13px] text-slate-800">{cand.name}</span>
                          <div className="flex flex-col gap-0.5 text-[10px] text-slate-400 font-semibold">
                            <span className="flex items-center gap-1">
                              <Mail size={11} className="text-slate-300" /> {cand.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone size={11} className="text-slate-300" /> {cand.phone}
                            </span>
                          </div>
                          {cand.message && (
                            <p className="text-[10px] text-slate-500 bg-slate-50 border border-slate-100 p-2.5 rounded-lg italic font-medium max-w-sm mt-1">
                              "{cand.message}"
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Area */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded text-[10px]">
                          {getAreaLabel(cand.area)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-slate-400 font-medium">{formatDate(cand.createdAt)}</td>

                      {/* Status badge */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border ${stat.bg}`}>
                          {stat.icon}
                          <span>{stat.label}</span>
                        </span>
                      </td>

                      {/* Action dropdown or quick toggle */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col gap-1 max-w-[130px] mx-auto">
                          {cand.status !== "PENDING" && (
                            <button
                              onClick={() => handleUpdateStatus(cand.id, "PENDING")}
                              disabled={isPending}
                              className="text-[9px] font-bold py-1 px-2 border border-amber-200 text-amber-600 rounded bg-amber-50/50 hover:bg-amber-50 cursor-pointer"
                            >
                              Marcar Pendente
                            </button>
                          )}
                          {cand.status !== "CONTACTED" && (
                            <button
                              onClick={() => handleUpdateStatus(cand.id, "CONTACTED")}
                              disabled={isPending}
                              className="text-[9px] font-bold py-1 px-2 border border-blue-200 text-brand-blue rounded bg-blue-50/50 hover:bg-blue-50 cursor-pointer"
                            >
                              Marcar Contatado
                            </button>
                          )}
                          {cand.status !== "ARCHIVED" && (
                            <button
                              onClick={() => handleUpdateStatus(cand.id, "ARCHIVED")}
                              disabled={isPending}
                              className="text-[9px] font-bold py-1 px-2 border border-slate-200 text-slate-500 rounded bg-slate-50 hover:bg-slate-100 cursor-pointer"
                            >
                              Arquivar
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Ações / Contato */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={getWhatsAppLink(cand)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl shadow-xs transition-colors flex items-center justify-center cursor-pointer"
                            title="Conversar no WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>
                          <button
                            onClick={() => handleDelete(cand.id)}
                            disabled={isPending}
                            className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                            title="Excluir Inscrição"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

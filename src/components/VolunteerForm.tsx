"use client";

import { useState, useTransition } from "react";
import { createVolunteerCandidateAction } from "@/lib/actions";
import { Loader2, Heart, CheckCircle2, AlertCircle } from "lucide-react";

export default function VolunteerForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      area: formData.get("area") as string,
      message: formData.get("message") as string,
    };

    startTransition(async () => {
      const response = await createVolunteerCandidateAction(data);
      if (response && response.error) {
        setError(response.error);
      } else {
        setSuccess(true);
      }
    });
  };

  if (success) {
    return (
      <div className="bg-white border border-slate-200/60 p-8 sm:p-10 rounded-3xl shadow-xl max-w-xl mx-auto text-center flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 border border-green-200 flex items-center justify-center shadow-sm">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-black text-brand-navy mt-2">
          Candidatura Enviada!
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
          Agradecemos de coração o seu interesse em fazer a sua parte. Nossa equipe entrará em contato por e-mail ou WhatsApp em breve para agendar uma conversa.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/50 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shadow-xs">
          <Heart size={20} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-display text-lg sm:text-xl font-extrabold text-brand-navy leading-none">
            Seja um Voluntário
          </h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 inline-block">
            Faça parte da nossa rede de solidariedade
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3.5 text-xs font-semibold mb-6 flex items-center gap-2">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Nome Completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ex: Maria Souza Santos"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-medium text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              E-mail para Contato
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="exemplo@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-medium text-slate-800"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              WhatsApp / Celular
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="(71) 99999-9999"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-medium text-slate-800"
            />
          </div>
        </div>

        {/* Area of Interest */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="area" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Área de Interesse de Atuação
          </label>
          <select
            id="area"
            name="area"
            required
            defaultValue=""
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold text-slate-700 bg-white cursor-pointer"
          >
            <option value="" disabled>Selecione uma área...</option>
            <option value="pedagogia">Apoio Pedagógico & Creche (Crianças de 2 a 5 anos)</option>
            <option value="reforco">Apoio Escolar & Reforço (Turno oposto)</option>
            <option value="esporte">Oficinas Recreativas / Esporte / Dança / Capoeira</option>
            <option value="cozinha">Cozinha / Preparação de Refeições</option>
            <option value="admin">Apoio Administrativo / Marketing / Eventos</option>
            <option value="outros">Outros Projetos / Serviços Gerais</option>
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Por que você quer ser voluntário? (Opcional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Conte um pouco sobre suas habilidades, motivação e tempo disponível..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue/60 transition-colors resize-none font-medium text-slate-800"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Enviando Candidatura...</span>
            </>
          ) : (
            <>
              <Heart size={16} fill="currentColor" />
              <span>Quero Fazer Minha Parte</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

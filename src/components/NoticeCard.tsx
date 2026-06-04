"use client";

import { Calendar, Megaphone, Users, Award } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "GENERAL" | "EVENT" | "MEETING";
  date: Date;
  active: boolean;
}

interface NoticeCardProps {
  notice: Notice;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  const getCategoryDetails = (cat: "GENERAL" | "EVENT" | "MEETING") => {
    switch (cat) {
      case "GENERAL":
        return {
          label: "Aviso Geral",
          colors: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
          icon: <Megaphone size={14} />,
        };
      case "EVENT":
        return {
          label: "Evento",
          colors: "bg-brand-green/10 text-brand-green border-brand-green/20",
          icon: <Award size={14} />,
        };
      case "MEETING":
        return {
          label: "Reunião de Pais",
          colors: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
          icon: <Users size={14} />,
        };
    }
  };

  const catDetails = getCategoryDetails(notice.category);

  const formatDate = (dateVal: Date) => {
    const d = new Date(dateVal);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-slate-200/50 p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-start gap-4 hover:shadow-md hover:border-slate-300 transition-all duration-300 w-full relative overflow-hidden">
      {/* Category Tag */}
      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${catDetails.colors}`}>
        {catDetails.icon}
        <span>{catDetails.label}</span>
      </span>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mt-1">
        <Calendar size={14} />
        <span>Publicado em: {formatDate(notice.date)}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg sm:text-xl font-extrabold text-brand-navy leading-snug">
        {notice.title}
      </h3>

      {/* Content */}
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {notice.content}
      </p>
    </div>
  );
}

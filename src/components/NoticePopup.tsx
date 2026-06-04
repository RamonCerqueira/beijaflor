"use client";

import { useState, useEffect } from "react";
import { X, Megaphone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "GENERAL" | "EVENT" | "MEETING";
  date: Date;
}

interface NoticePopupProps {
  notice: Notice | null;
}

export default function NoticePopup({ notice }: NoticePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (notice) {
      const isDismissed = localStorage.getItem(`notice_popup_dismissed_${notice.id}`);
      if (!isDismissed) {
        setIsOpen(true);
      }
    }
  }, [notice]);

  if (!notice) return null;

  const handleDismiss = () => {
    localStorage.setItem(`notice_popup_dismissed_${notice.id}`, "true");
    setIsOpen(false);
  };

  const getCategoryLabel = (cat: "GENERAL" | "EVENT" | "MEETING") => {
    switch (cat) {
      case "GENERAL":
        return "Comunicado Geral";
      case "EVENT":
        return "Evento Importante";
      case "MEETING":
        return "Reunião de Pais";
    }
  };

  const formatDate = (dateVal: Date) => {
    const d = new Date(dateVal);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-lg p-6 sm:p-8 flex flex-col relative z-10 overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green via-brand-blue to-brand-gold" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute right-5 top-5 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Fechar aviso"
            >
              <X size={20} />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-4 mt-2">
              <span className="flex items-center gap-1.5 bg-brand-navy/5 text-brand-navy border border-brand-navy/10 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                <Megaphone size={13} className="text-brand-blue" />
                <span>{getCategoryLabel(notice.category)}</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-bold">
                <Calendar size={12} />
                <span>{formatDate(notice.date)}</span>
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-navy leading-snug mb-4">
              {notice.title}
            </h3>

            {/* Scrollable Content */}
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-2 mb-6 scrollbar-thin">
              {notice.content}
            </div>

            {/* Actions / Footer Button */}
            <button
              onClick={handleDismiss}
              className="w-full bg-brand-navy hover:bg-brand-navy-hover text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors cursor-pointer text-center"
            >
              Entendi, obrigado!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

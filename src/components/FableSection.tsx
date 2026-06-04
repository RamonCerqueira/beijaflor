"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Droplets, MessageSquare, Heart, Quote, HelpingHand, Image as ImageIcon, LayoutGrid } from "lucide-react";

export default function FableSection() {
  const [viewMode, setViewMode] = useState<"image" | "cards">("image");

  const storyPanels = [
    {
      icon: <Flame size={28} />,
      title: "O Incêndio",
      text: "Um grande incêndio começa a destruir a floresta. Assustados, todos os animais correm tentando salvar a própria pele.",
      color: "border-orange-500 text-orange-500 bg-orange-50/90",
      delay: 0.1,
    },
    {
      icon: <Droplets size={28} />,
      title: "A Atitude",
      text: "No meio do pânico, um beija-flor voa rapidamente até o rio, pega uma gota de água no bico e a joga sobre o fogaréu.",
      color: "border-brand-blue text-brand-blue bg-blue-50/90",
      delay: 0.2,
    },
    {
      icon: <MessageSquare size={28} />,
      title: "A Dúvida",
      text: "O leão, rei da floresta, o indaga: 'Você acha que sozinho vai apagar esse fogaréu todo?'",
      color: "border-brand-gold text-brand-gold bg-amber-50/90",
      delay: 0.3,
    },
    {
      icon: <Heart size={28} />,
      title: "A Resposta",
      text: "O beija-flor responde sem hesitar: 'Sei que não posso apagar esse fogo sozinho, estou apenas fazendo a minha parte.'",
      color: "border-brand-green text-brand-green bg-green-50/90",
      delay: 0.4,
    },
    {
      icon: <HelpingHand size={28} />,
      title: "A Solidariedade",
      text: "Como ensina o Padre Marco Pagliucci, a união de pequenas gotas constrói a educação e acolhe 170 crianças na creche.",
      color: "border-purple-500 text-purple-500 bg-purple-50/90",
      delay: 0.5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="fable"
      className="relative py-20 bg-fixed bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/parallax_bg.png')" }}
    >
      {/* Heavy light watermark cover overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/96 via-slate-50/93 to-white/96 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-10">
          <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-1.5 rounded-full mb-3">
            <Heart size={12} fill="currentColor" />
            <span>A Fábula Inspiradora</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">
            A Fábula do Beija-Flor
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Inspirados pela clássica metáfora de solidariedade descrita por Herbert de Souza (Betinho), compreendemos que cada pequena contribuição gera um impacto grandioso.
          </p>
        </div>

        {/* Discrete Toggle Switch */}
        <div className="flex items-center justify-center mb-10 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 shadow-sm max-w-sm mx-auto">
          <button
            onClick={() => setViewMode("image")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              viewMode === "image"
                ? "bg-white text-brand-navy shadow-sm scale-100 font-extrabold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <ImageIcon size={14} />
            <span>Visualizar Ilustração</span>
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              viewMode === "cards"
                ? "bg-white text-brand-navy shadow-sm scale-100 font-extrabold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <LayoutGrid size={14} />
            <span>Visualizar em Cards</span>
          </button>
        </div>

        {/* Main Content Area: Fable Illustration or Storyboard Cards */}
        <div className="w-full flex justify-center mb-10">
          <AnimatePresence mode="wait">
            {viewMode === "image" ? (
              <motion.div
                key="image"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl bg-white border border-slate-200/50 p-2 sm:p-4 rounded-3xl shadow-xl flex items-center justify-center"
              >
                <div className="relative w-full h-auto rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src="/fabula.png"
                    alt="História em Quadrinhos da Fábula do Beija-Flor"
                    width={1600}
                    height={900}
                    className="w-full h-auto object-contain rounded-xl"
                    priority
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                variants={containerVariants}
                className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-5 gap-6 w-full scrollbar-none pb-6 px-2 lg:mx-0 lg:px-0"
              >
                {storyPanels.map((panel, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{
                      y: -10,
                      scale: 1.03,
                      rotate: idx % 2 === 0 ? 1 : -1,
                      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                    }}
                    className={`p-6 rounded-2xl border-2 ${panel.color} shadow-md flex flex-col items-center text-center transition-all duration-300 group cursor-pointer relative overflow-hidden snap-center flex-shrink-0 min-w-[280px] sm:min-w-[320px] lg:min-w-0`}
                  >
                    {/* Decorative circle */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white/40 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
                    
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                      {panel.icon}
                    </div>
                    
                    {/* Comic Box Header */}
                    <h3 className="font-display text-base font-extrabold text-slate-800 mb-3.5 tracking-tight">
                      {panel.title}
                    </h3>
                    
                    {/* Body text */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {panel.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-2xl w-full bg-white p-6.5 rounded-2xl border border-slate-200/50 shadow-md text-center flex flex-col items-center gap-3.5"
        >
          <div className="text-brand-green/20">
            <Quote size={28} fill="currentColor" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 italic font-medium">
            "Sei que não posso apagar esse fogo sozinho, estou apenas fazendo a minha parte."
          </p>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-brand-navy">Herbert de Souza (Betinho)</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">A fábula inspiradora do Projeto Beija-Flor</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

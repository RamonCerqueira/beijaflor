"use client";

import { motion } from "framer-motion";
import { Award, Compass, Heart, Star, Sparkles, Trophy } from "lucide-react";

export default function HistoryTimeline() {
  const milestones = [
    {
      year: "1993",
      icon: <Compass className="text-white" size={18} />,
      title: "Fundação & Início do Sonho",
      desc: "Padre Marco Pagliucci e voluntários iniciam a assistência social e alfabetização de crianças na comunidade de Massaranduba, Salvador - BA.",
      bgColor: "bg-brand-blue",
    },
    {
      year: "1998",
      icon: <Heart className="text-white" size={18} fill="currentColor" />,
      title: "Inauguração da Creche",
      desc: "Construção do primeiro espaço físico dedicado a acolher crianças em período integral, garantindo educação e alimentação enquanto os pais trabalhavam.",
      bgColor: "bg-brand-green",
    },
    {
      year: "2005",
      icon: <Star className="text-white" size={18} fill="currentColor" />,
      title: "Ampliação com Oficinas Sociais",
      desc: "Lançamento das oficinas no turno oposto ao escolar. Aulas de capoeira, circo, teatro e pintura para manter os adolescentes longe da violência urbana.",
      bgColor: "bg-brand-gold",
    },
    {
      year: "2012",
      icon: <Trophy className="text-white" size={18} />,
      title: "Nutrição Qualificada",
      desc: "Reestruturação da cozinha comunitária, passando a fornecer alimentação saudável diária balanceada por nutricionista para todas as crianças e jovens.",
      bgColor: "bg-purple-600",
    },
    {
      year: "2020",
      icon: <Sparkles className="text-white" size={18} />,
      title: "Solidariedade na Pandemia",
      desc: "Diante da crise, a Associação estende sua rede de apoio direto, distribuindo cestas básicas, produtos de higiene e suporte social a 135 famílias locais.",
      bgColor: "bg-red-500",
    },
    {
      year: "Hoje",
      icon: <Award className="text-white" size={18} />,
      title: "Referência Comunitária",
      desc: "Consolidada como um farol de esperança na Península de Itapagipe, a Associação Beija-Flor atende atualmente mais de 170 alunos da creche ao pós-escola.",
      bgColor: "bg-brand-navy",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full mb-3 inline-block">
            Nossa Trajetória
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            A História do Projeto Beija-Flor
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Mais de três décadas plantando sementes de solidariedade, educação e cidadania nas vidas de milhares de famílias baianas.
          </p>
        </div>

        {/* Timeline Line & Items */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central line (desktop) / left line (mobile) */}
          <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Badge (Circle icon) */}
                  <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 shadow-md z-10 border-4 border-white bg-slate-50 group">
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${item.bgColor}`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Spacer or Card Container */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                      className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-shadow relative"
                    >
                      {/* Year tag */}
                      <span className={`inline-block font-display text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-full mb-3 ${item.bgColor}`}>
                        {item.year}
                      </span>
                      
                      {/* Milestone Title */}
                      <h3 className="font-display text-base font-extrabold text-brand-navy leading-snug mb-2">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Dummy spacer for other side on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

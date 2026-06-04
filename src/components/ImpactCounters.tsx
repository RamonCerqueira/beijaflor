"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Users, Utensils, Award, Heart } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
}

function AnimatedNumber({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateNumber(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * end);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }

    requestAnimationFrame(updateNumber);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-black text-brand-navy tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function ImpactCounters() {
  const stats = [
    {
      icon: <Users className="text-brand-blue" size={26} />,
      value: 170,
      suffix: "+",
      label: "Crianças Acolhidas",
      desc: "Atendidas diariamente na creche e projetos educacionais.",
      bgColor: "bg-blue-50/70 border-blue-100",
    },
    {
      icon: <Utensils className="text-brand-green" size={26} />,
      value: 340,
      suffix: "+",
      label: "Refeições Diárias",
      desc: "Alimentação saudável, balanceada e nutritiva oferecida gratuitamente.",
      bgColor: "bg-green-50/70 border-green-100",
    },
    {
      icon: <Award className="text-brand-gold" size={26} />,
      value: 15,
      suffix: "+",
      label: "Oficinas & Cursos",
      desc: "Artes, capoeira, informática e circo para jovens e adolescentes.",
      bgColor: "bg-amber-50/70 border-amber-100",
    },
    {
      icon: <Heart className="text-red-500" size={26} />,
      value: 135,
      suffix: "+",
      label: "Famílias Assistidas",
      desc: "Acompanhamento social e distribuição de mantimentos na comunidade.",
      bgColor: "bg-red-50/70 border-red-100",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-1.5 rounded-full mb-3 inline-block">
            Nosso Impacto em Números
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Resultados que Transformam Massaranduba
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Cada pequena contribuição se multiplica em sorrisos, pratos de comida e oportunidades de futuro para nossa comunidade.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 12px 20px rgba(0, 0, 0, 0.05)" }}
              className={`p-6 rounded-2xl border ${item.bgColor} shadow-xs flex flex-col items-start gap-4 transition-all`}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs border border-slate-100">
                {item.icon}
              </div>

              {/* Number and Label */}
              <div className="flex flex-col">
                <AnimatedNumber value={item.value} suffix={item.suffix} />
                <span className="font-display text-sm font-extrabold text-slate-800 mt-1">
                  {item.label}
                </span>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

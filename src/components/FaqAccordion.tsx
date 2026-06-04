"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  initialItems: FaqItem[];
}

export default function FaqAccordion({ initialItems }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const defaultFaq = [
    {
      id: "def-1",
      question: "Como funciona o processo de matrícula para a creche?",
      answer: "As matrículas para a nossa creche-escola são voltadas para crianças de 2 a 5 anos residentes na região de Massaranduba e arredores. A prioridade é dada a famílias em situação de vulnerabilidade socioeconômica. As inscrições ocorrem geralmente no final de cada ano letivo, diretamente na nossa secretaria.",
    },
    {
      id: "def-2",
      question: "Quais oficinas são oferecidas para crianças e jovens?",
      answer: "Oferecemos oficinas de capoeira, teatro, circo, desenho artístico, reforço escolar e informática básica. As atividades ocorrem sempre no contra-turno escolar (inverso ao horário que a criança estuda na rede pública) para alunos de 6 a 18 anos.",
    },
    {
      id: "def-3",
      question: "Como posso doar mantimentos ou roupas?",
      answer: "Doações de alimentos não perecíveis, agasalhos, calçados e brinquedos em bom estado são super bem-vindas! Elas podem ser entregues diretamente na nossa sede física em Massaranduba de segunda a sexta-feira, das 08:00 às 17:00.",
    },
    {
      id: "def-4",
      question: "Como obter um recibo fiscal das doações financeiras?",
      answer: "Toda doação financeira gera um comprovante institucional. Caso precise de um recibo específico assinado pelo coordenador Padre Marco para abatimento no Imposto de Renda ou contabilidade de empresa, envie o comprovante de transferência para o e-mail beijaflor.massaranduba@gmail.com ou ligue no (71) 3014-1351.",
    },
    {
      id: "def-5",
      question: "Qual o horário de funcionamento da Associação?",
      answer: "Nossa sede e creche funcionam de segunda a sexta-feira, das 07:30 às 17:00, acolhendo as crianças em período integral.",
    },
  ];

  const items = initialItems.length > 0 ? initialItems : defaultFaq;

  const toggleItem = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-1.5 rounded-full mb-3 inline-block">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Esclareça suas principais dúvidas sobre matrículas, oficinas, parcerias e doações para o Projeto Beija-Flor.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {items.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? "border-brand-blue/30 bg-blue-50/10 shadow-md shadow-brand-blue/5" 
                    : "border-slate-200/80 hover:border-slate-300 bg-white"
                }`}
              >
                {/* Accordion Title / Toggle Button */}
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className={isOpen ? "text-brand-blue" : "text-slate-400"} />
                    <span className="font-display text-sm sm:text-base font-extrabold text-brand-navy">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`flex-shrink-0 p-1 rounded-lg ${isOpen ? "bg-brand-blue/10 text-brand-blue" : "text-slate-400"}`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-medium">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

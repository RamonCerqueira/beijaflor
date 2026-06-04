"use client";

import { motion } from "framer-motion";
import { Heart, Users, Quote, ShieldCheck } from "lucide-react";

export default function FraternitySection() {
  return (
    <section
      className="relative py-28 flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/solidarity_bg.png')" }}
    >
      {/* High-contrast premium dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/92 via-brand-navy/82 to-brand-navy/95 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 w-full flex flex-col items-center">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-1.5 rounded-full mb-4">
            <Users size={12} fill="currentColor" />
            <span>Impacto Social & Fraternidade</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Mais que Educação, <br />
            <span className="bg-gradient-to-r from-brand-green to-brand-blue bg-clip-text text-transparent">
              Um Lar de Fraternidade
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            O Projeto Beija-Flor representa um farol de esperança e dignidade para as famílias de Massaranduba. Proporcionamos um ambiente seguro e amoroso para que as mães e pais trabalhem com tranquilidade, sabendo que seus filhos são nutridos de afeto, conhecimento e valores cristãos.
          </p>
        </div>

        {/* Dynamic Cards Grid: Fraternity Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/8 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center mb-4">
              <Heart size={22} fill="currentColor" />
            </div>
            <h3 className="text-white font-display font-bold text-base mb-2">Acolhimento Integral</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Recebemos crianças e adolescentes em vulnerabilidade, cobrindo educação, alimentação balanceada diária e acompanhamento contínuo dos 2 aos 18 anos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/8 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-4">
              <Users size={22} />
            </div>
            <h3 className="text-white font-display font-bold text-base mb-2">Apoio às Famílias</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Fortalecemos a comunidade de Itapagipe com escuta ativa, reuniões informativas, distribuição de donativos e apoio espiritual constante do Padre Marco.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/8 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-brand-gold flex items-center justify-center mb-4">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-white font-display font-bold text-base mb-2">Segurança Comunitária</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Retiramos crianças e jovens da ociosidade das ruas através de oficinas de capoeira, desenho, teatro e circo em turnos inversos ao escolar.
            </p>
          </motion.div>
        </div>

        {/* Bottom Quote Card: Padre Marco Pagliucci */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-2xl w-full bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/20 shadow-2xl text-center flex flex-col items-center gap-4 mt-8"
        >
          <div className="text-brand-green/20">
            <Quote size={32} fill="currentColor" />
          </div>
          <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed">
            "A fraternidade não é um sentimento abstrato, mas um abraço concreto. Quando acolhemos uma criança na creche e caminhamos ao lado da família até sua juventude, estamos fazendo resplandecer a dignidade que Deus deu a cada um de nós."
          </p>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-brand-navy">Padre Marco Pagliucci</span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Coordenador Geral do Projeto Beija-Flor</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

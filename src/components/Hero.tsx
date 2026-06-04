"use client";

import Image from "next/image";
import { ArrowRight, Heart, Sparkles, Leaf, Droplets } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15, delay: 0.3 },
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-108px)] flex items-center justify-center bg-gradient-to-tr from-brand-green/12 via-brand-blue/6 to-white py-16 lg:py-24 overflow-hidden">

      {/* Animated background particles */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-brand-green/20 hidden md:block"
      >
        <Leaf size={48} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-24 left-[20%] text-brand-blue/15 hidden md:block"
      >
        <Droplets size={40} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[15%] w-72 h-72 bg-brand-green/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-[5%] bottom-[15%] w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          {/* Tagline */}
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles size={14} className="text-brand-green" />
            <span>A beleza salvará o mundo</span>
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.1] mb-6"
          >
            Associação Projeto <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-green to-brand-blue bg-clip-text text-transparent">
              Beija-Flor
            </span> <br />
            <span className="text-slate-800 text-3xl sm:text-4xl lg:text-5xl font-bold">
              da Massaranduba
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
          >
            Uma creche-escola e projeto socioeducativo acolhendo crianças, adolescentes e jovens de Salvador - BA. Sob a direção comunitária e coordenação paroquial do <strong>Padre Marco Pagliucci</strong>, unimos a comunidade para construir caminhos de dignidade, educação e esperança.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 flex-wrap justify-center lg:justify-start"
          >
            <a
              href="#donate"
              className="flex items-center gap-2 bg-gradient-to-r from-brand-green to-brand-blue text-white px-7 py-3.5 rounded-full font-bold text-base shadow-[0_8px_24px_rgba(42,157,73,0.2)] hover:shadow-[0_12px_30px_rgba(42,157,73,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Heart size={18} fill="currentColor" />
              <span>Como Ajudar</span>
            </a>
            <a
              href="#about"
              className="flex items-center gap-2 bg-white text-brand-navy border border-slate-200 px-7 py-3.5 rounded-full font-bold text-base shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Nossa História</span>
              <ArrowRight size={18} className="text-brand-blue" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating Logo & Visual Backdrop */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex items-center justify-center relative py-6 lg:py-0 order-1 lg:order-2"
        >
          {/* Ripple glowing backdrop */}
          <div className="absolute w-72 h-72 rounded-full bg-brand-green/4 border border-brand-green/10 animate-ping opacity-25" style={{ animationDuration: '4s' }} />
          <div className="absolute w-60 h-60 rounded-full bg-brand-blue/3 border border-brand-blue/5 animate-pulse" />

          {/* Logo container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-[0_15px_30px_rgba(11,42,74,0.14)] animate-float z-10">
            <Image
              src="/logo.png"
              alt="Logo Beija-Flor"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              priority
            />
          </div>
        </motion.div>

      </div>

      {/* Wave bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative block w-[calc(100%+1.3px)] h-16 sm:h-20">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}

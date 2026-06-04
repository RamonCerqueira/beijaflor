"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: Date;
}

interface LatestNewsProps {
  posts: BlogPost[];
}

export default function LatestNews({ posts }: LatestNewsProps) {
  const formatDate = (dateVal: Date) => {
    return new Date(dateVal).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-1.5 rounded-full mb-3 inline-block">
              Fique por Dentro
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Últimas Notícias & Novidades
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Acompanhe as ações da Associação Beija-Flor. Veja as últimas novidades sobre a creche, oficinas e eventos comunitários.
            </p>
          </div>
          
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all duration-300"
          >
            <span>Ver Todas as Notícias</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white border border-slate-200/50 rounded-3xl shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image Cover */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized
                />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-brand-navy/80 backdrop-blur-md border border-white/10 text-white font-display text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                  <Calendar size={12} className="text-brand-blue" />
                  <span>{formatDate(post.date)}</span>
                </div>

                <h3 className="font-display text-base font-black text-brand-navy group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-medium flex-1">
                  {post.excerpt}
                </p>

                <div className="border-t border-slate-100 pt-4 mt-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-xs font-bold text-brand-navy hover:text-brand-blue inline-flex items-center gap-1 transition-colors group/link"
                  >
                    <span>Ler Matéria Completa</span>
                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
// import { prisma } from "@/lib/db";
import { mockBlogPosts } from "@/lib/mockData";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic"; // Fresh posts always

export default async function BlogPage() {
  // BANCO SUPABASE PAUSADO - Consulta original comentada:
  // const posts = await prisma.blogPost.findMany({
  //   where: { published: true },
  //   orderBy: { date: "desc" },
  // });
  const posts = mockBlogPosts.filter((p) => p.published);

  const formatDate = (dateVal: Date) => {
    return new Date(dateVal).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col gap-12">
        
        {/* Header */}
        <div className="border-b border-slate-200/60 pb-8">
          <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-1.5 rounded-full mb-3 inline-block">
            Mural de Novidades
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Blog & Notícias
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl font-medium">
            Acompanhe o dia a dia da Associação Beija-Flor. Veja fotos de eventos, relatórios de atividades, conquistas de nossos alunos e novidades sobre as oficinas.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-3xl p-16 text-center flex flex-col items-center gap-4 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 shadow-inner">
              <BookOpen size={28} />
            </div>
            <h3 className="font-display text-lg font-extrabold text-brand-navy">
              Nenhuma Publicação Ainda
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Estamos preparando conteúdos incríveis sobre as atividades da creche e oficinas. Volte em breve para acompanhar as atualizações!
            </p>
            <Link
              href="/"
              className="mt-2 bg-brand-navy hover:bg-brand-navy-hover text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors"
            >
              Voltar para o Início
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-200/50 rounded-2xl shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all group duration-300"
              >
                {/* Image Wrap */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-brand-navy/80 backdrop-blur-md border border-white/10 text-white font-display text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                    <Calendar size={12} className="text-brand-blue" />
                    <span>{formatDate(post.date)}</span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-black text-brand-navy group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
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
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ChevronLeft, BookOpen, Share2 } from "lucide-react";

export const dynamic = "force-dynamic"; // Force dynamic rendering

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for social media tags
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  if (!id || id === "%5Bid%5D" || id === "[id]") {
    return {
      title: "Notícia - Projeto Beija-Flor",
    };
  }

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    return {
      title: "Notícia Não Encontrada - Projeto Beija-Flor",
    };
  }

  return {
    title: `${post.title} - Projeto Beija-Flor`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: `${post.title} - Projeto Beija-Flor`,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
      publishedTime: post.date.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Projeto Beija-Flor`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  if (!id || id === "%5Bid%5D" || id === "[id]") {
    notFound();
  }

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post || !post.published) {
    notFound();
  }

  const formatDate = (dateVal: Date) => {
    return new Date(dateVal).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col gap-6">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-navy transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Voltar para Notícias</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <article className="bg-white border border-slate-200/50 rounded-3xl shadow-md overflow-hidden flex flex-col gap-6">
          
          {/* Cover image */}
          <div className="relative h-64 sm:h-96 w-full bg-slate-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
              unoptimized
            />
            {/* Category badge */}
            <span className="absolute top-6 left-6 bg-brand-navy/90 backdrop-blur-md border border-white/10 text-white font-display text-[9px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
              {post.category}
            </span>
          </div>

          {/* Details */}
          <div className="px-6 sm:px-10 pb-10 flex flex-col gap-6">
            
            {/* Date and actions */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                <Calendar size={13} className="text-brand-blue" />
                <span>Publicado em: {formatDate(post.date)}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] text-brand-green font-bold bg-green-50 px-2.5 py-1 border border-green-100 rounded-lg flex items-center gap-1.5">
                  <BookOpen size={11} />
                  <span>Artigo Verificado</span>
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl font-black text-brand-navy leading-snug tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt/Subtitle */}
            <p className="text-slate-500 text-xs sm:text-sm font-semibold border-l-4 border-brand-blue pl-4 py-1.5 leading-relaxed bg-slate-50/50 rounded-r-xl pr-2">
              {post.excerpt}
            </p>

            {/* Main content body paragraphs */}
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed flex flex-col gap-5 whitespace-pre-line font-medium pr-1">
              {post.content}
            </div>

          </div>
        </article>

      </div>
    </div>
  );
}

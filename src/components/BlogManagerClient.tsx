"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Loader2, Calendar, Eye, EyeOff, Sparkles, BookOpen } from "lucide-react";
import { createBlogPostAction, deleteBlogPostAction, toggleBlogPostPublishAction, uploadFileAction } from "@/lib/actions";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  published: boolean;
  date: Date;
}

interface BlogManagerClientProps {
  initialPosts: BlogPost[];
}

export default function BlogManagerClient({ initialPosts }: BlogManagerClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const formatDate = (dateVal: Date) => {
    return new Date(dateVal).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
      published: true,
    };

    startTransition(async () => {
      const response = await createBlogPostAction(data);
      if (response && response.error) {
        setError(response.error);
      } else {
        setIsModalOpen(false);
        setImagePreview("");
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  // Handle Toggle Publish
  const handleTogglePublish = async (id: string, currentPublished: boolean) => {
    startTransition(async () => {
      const response = await toggleBlogPostPublishAction(id, currentPublished);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta notícia permanentemente?")) return;

    startTransition(async () => {
      const response = await deleteBlogPostAction(id);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Gerenciar Notícias / Blog</h1>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">Escreva e publique novidades, relatos e relatórios de atividades da creche e oficinas.</p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Escrever Post</span>
        </button>
      </div>

      {/* Grid of posts */}
      {initialPosts.length === 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center text-slate-400 font-medium">
          Nenhuma publicação cadastrada no blog. Clique em "Escrever Post" para começar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden flex flex-col group relative ${
                !post.published ? "opacity-60" : ""
              }`}
            >
              {/* Photo preview */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized
                />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-brand-navy/80 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>

                {/* Actions overlay */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(post.id, post.published)}
                    disabled={isPending}
                    className={`p-1.5 rounded-lg shadow-md cursor-pointer transition-colors ${
                      post.published 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "bg-slate-600 hover:bg-slate-700 text-white"
                    }`}
                    title={post.published ? "Despublicar" : "Publicar"}
                  >
                    {post.published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={isPending}
                    className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md cursor-pointer transition-colors"
                    title="Excluir Post"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                  <Calendar size={11} className="text-brand-blue" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <h3 className="font-display text-sm font-black text-brand-navy leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1 font-medium">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-xl p-6 flex flex-col relative animate-fade-in">
            {/* Close */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setImagePreview("");
              }}
              className="absolute right-5 top-5 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-lg font-extrabold text-brand-navy mb-1.5 flex items-center gap-2">
              <BookOpen size={18} className="text-brand-blue" />
              <span>Escrever Nova Publicação</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">Publique uma nova notícia ou relatório no blog.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 text-xs font-semibold mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-1.5 scrollbar-thin">
              
              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Categoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white cursor-pointer"
                  >
                    <option value="Creche">Creche Escola</option>
                    <option value="Oficinas">Oficinas e Cursos</option>
                    <option value="Eventos">Eventos e Campanhas</option>
                    <option value="Transparência">Gestão e Relatórios</option>
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="date" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Data da Publicação
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="title" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Título da Notícia
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Ex: Alunos de Capoeira Recebem Novas Cordas"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold"
                />
              </div>

              {/* Excerpt */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="excerpt" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Resumo / Descrição Curta
                </label>
                <input
                  id="excerpt"
                  name="excerpt"
                  type="text"
                  required
                  placeholder="Escreva uma frase curta chamativa que aparecerá no card..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-medium text-slate-700"
                />
              </div>

              {/* Image path & Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Imagem de Capa (URL ou Arquivo Local)
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    required
                    placeholder="Cole a URL ou selecione um arquivo..."
                    value={imagePreview}
                    onChange={(e) => setImagePreview(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-medium text-slate-700"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append("file", file);
                        
                        setIsUploading(true);
                        try {
                          const res = await uploadFileAction(formData);
                          if (res.error) {
                            alert(res.error);
                          } else if (res.url) {
                            setImagePreview(res.url);
                          }
                        } catch (err) {
                          alert("Erro ao enviar a imagem.");
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all w-full h-full flex items-center justify-center gap-1.5"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <span>Escolher Arquivo</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image preview box */}
              {imagePreview && (
                <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Capa Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Imagem+Nao+Carregada";
                    }}
                  />
                </div>
              )}

              {/* Content Body */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="content" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Conteúdo Completo
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={8}
                  placeholder="Escreva a matéria detalhada da notícia..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors resize-none font-medium text-slate-700"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setImagePreview("");
                  }}
                  className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-brand-navy hover:bg-brand-navy-hover text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <span>Publicar Notícia</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

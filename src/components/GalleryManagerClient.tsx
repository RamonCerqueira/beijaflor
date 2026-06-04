"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Loader2, Link as LinkIcon, Heart, MessageCircle } from "lucide-react";
import { createGalleryPostAction, deleteGalleryPostAction, uploadFileAction } from "@/lib/actions";

interface GalleryPost {
  id: string;
  image: string;
  text: string;
  link: string | null;
  platform: string;
  likes: number;
  comments: number;
  date: Date;
}

interface GalleryManagerClientProps {
  initialPosts: GalleryPost[];
}

export default function GalleryManagerClient({ initialPosts }: GalleryManagerClientProps) {
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

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      image: formData.get("image") as string,
      text: formData.get("text") as string,
      link: formData.get("link") as string,
      platform: formData.get("platform") as string,
      likes: formData.get("likes") as string || "0",
      comments: formData.get("comments") as string || "0",
      date: formData.get("date") as string,
    };

    startTransition(async () => {
      const response = await createGalleryPostAction(data);
      if (response && response.error) {
        setError(response.error);
      } else {
        setIsModalOpen(false);
        setImagePreview("");
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta foto da galeria?")) return;

    startTransition(async () => {
      const response = await deleteGalleryPostAction(id);
      if (response && response.error) {
        alert(response.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Bar */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Galeria de Redes Sociais</h1>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">Controle quais publicações do Facebook/Instagram aparecem na galeria do site.</p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Nova Foto</span>
        </button>
      </div>

      {/* Grid view of gallery posts in admin */}
      {initialPosts.length === 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center text-slate-400 font-medium">
          Nenhuma publicação cadastrada na galeria. Clique em "Nova Foto" para começar.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {initialPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden flex flex-col group relative"
            >
              {/* Photo preview in admin */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt="Ação Social"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized // Allow pasting external links without Next.js domain block warnings in dev
                />
                
                {/* Platform Badge */}
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white shadow-sm ${
                  post.platform === "facebook" ? "bg-blue-600" : "bg-pink-600"
                }`}>
                  {post.platform}
                </span>

                {/* Delete overlay button */}
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={isPending}
                  className="absolute top-3 right-3 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md cursor-pointer transition-colors disabled:opacity-50"
                  title="Excluir da Galeria"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">{formatDate(post.date)}</span>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 flex-1 font-medium">{post.text}</p>
                
                {/* Engagement stats */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold border-t border-slate-100 pt-3 mt-1">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart size={12} className="text-red-500 fill-current" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} className="text-brand-blue" /> {post.comments}
                    </span>
                  </div>
                  {post.link && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline inline-flex items-center gap-1"
                    >
                      <LinkIcon size={10} />
                      <span>Post Original</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-lg p-6 flex flex-col relative animate-fade-in">
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

            <h3 className="font-display text-lg font-extrabold text-brand-navy mb-1.5">
              Nova Publicação na Galeria
            </h3>
            <p className="text-xs text-slate-400 mb-6">Insira os detalhes e a foto da publicação para exibir no site.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 text-xs font-semibold mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Platform */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Rede Social
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="border border-slate-200 p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-600">
                      <input type="radio" name="platform" value="facebook" defaultChecked className="accent-blue-600" />
                      <span>Facebook</span>
                    </label>
                    <label className="border border-slate-200 p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold has-[:checked]:border-pink-600 has-[:checked]:bg-pink-50 has-[:checked]:text-pink-600">
                      <input type="radio" name="platform" value="instagram" className="accent-pink-600" />
                      <span>Instagram</span>
                    </label>
                  </div>
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
                    className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold"
                  />
                </div>
              </div>

              {/* Image URL path & Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Caminho da Imagem ou URL (URL ou Arquivo Local)
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
                    className="flex-1 px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors text-slate-700 font-medium"
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

              {/* Image Preview Window */}
              {imagePreview && (
                <div className="relative h-32 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Imagem+Nao+Carregada";
                    }}
                  />
                </div>
              )}

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="text" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Legenda / Texto do Post
                </label>
                <textarea
                  id="text"
                  name="text"
                  required
                  rows={3}
                  placeholder="Escreva a legenda que aparecerá no card..."
                  className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors resize-none font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Original Post Link */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="link" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Link do Post Original
                  </label>
                  <input
                    id="link"
                    name="link"
                    type="url"
                    placeholder="https://facebook.com/..."
                    className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors"
                  />
                </div>

                {/* Likes Mock */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="likes" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Curtidas
                  </label>
                  <input
                    id="likes"
                    name="likes"
                    type="number"
                    defaultValue="50"
                    min="0"
                    className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue/60 transition-colors font-semibold"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
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
                    <span>Adicionar</span>
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

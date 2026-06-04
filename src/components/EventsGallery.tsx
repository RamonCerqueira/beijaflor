"use client";

import Image from "next/image";
import { MessageCircle, ThumbsUp, Share2 } from "lucide-react";

// Custom Facebook Icon SVG
function FacebookIcon({ size = 18, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// Custom Instagram Icon SVG
function InstagramIcon({ size = 18, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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

interface EventsGalleryProps {
  initialPosts?: GalleryPost[];
}

export default function EventsGallery({ initialPosts = [] }: EventsGalleryProps) {
  const socialPosts = initialPosts.length > 0 ? initialPosts.map(post => ({
    avatar: "/logo.png",
    author: "Projeto Beija-Flor da Massaranduba",
    date: new Date(post.date).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }),
    platform: post.platform,
    image: post.image,
    text: post.text,
    link: post.link || undefined,
    likes: post.likes,
    comments: post.comments,
  })) : [
    {
      avatar: "/logo.png",
      author: "Projeto Beija-Flor da Massaranduba",
      date: "Há 2 dias",
      platform: "facebook",
      image: "/gallery_event_1.png",
      text: "Hoje realizamos uma oficina especial de artes plásticas e pintura com as crianças da creche-escola! 🎨✨ Ver o sorriso e a criatividade de cada uma delas expressa nas telas nos mostra que a beleza e a educação de fato transformam vidas. Agradecemos a todos os voluntários e parceiros que apoiam esse sonho diariamente!",
      link: "https://facebook.com/beijaflor.massaranduba",
      likes: 124,
      comments: 18,
    },
    {
      avatar: "/logo.png",
      author: "Projeto Beija-Flor da Massaranduba",
      date: "Há 1 semana",
      platform: "instagram",
      image: "/parallax_bg.png",
      text: "Roda de Capoeira Especial no Projeto Beija-Flor! 🤸‍♂️ Nosso grupo de adolescentes realizou uma belíssima demonstração de respeito, cultura e disciplina física. A oficina de capoeira é gratuita e aberta a toda a comunidade de Massaranduba. Venha conhecer e apoiar nossos jovens guerreiros!",
      link: "https://instagram.com/beijaflor.massaranduba",
      likes: 98,
      comments: 12,
    },
  ];

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest mb-3 block">
            Redes Sociais
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">
            Acompanhe Nossos Momentos
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed">
            Estamos sempre compartilhando fotos dos nossos eventos, conquistas e atividades diárias no Facebook e no Instagram. Veja abaixo algumas de nossas publicações recentes!
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {socialPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {/* Post Header */}
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                    <Image
                      src={post.avatar}
                      alt={post.author}
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-display text-sm font-bold text-slate-800 leading-tight">
                      {post.author}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                  </div>
                </div>
                
                {post.platform === "facebook" ? (
                  <FacebookIcon size={20} className="text-blue-600" />
                ) : (
                  <InstagramIcon size={20} className="text-pink-600" />
                )}
              </div>

              {/* Post Text */}
              <div className="px-5 pb-4">
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
                  {post.text}
                </p>
              </div>

              {/* Post Image */}
              <div className="relative h-64 sm:h-80 w-full bg-slate-100 overflow-hidden group cursor-pointer">
                {post.link ? (
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={post.image}
                      alt="Foto do Evento"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </a>
                ) : (
                  <Image
                    src={post.image}
                    alt="Foto do Evento"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                )}
              </div>

              {/* Post Actions & Engagements */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 hover:text-brand-green transition-colors cursor-pointer">
                    <ThumbsUp size={15} />
                    <strong>{post.likes}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-brand-blue transition-colors cursor-pointer">
                    <MessageCircle size={15} />
                    <strong>{post.comments}</strong>
                  </span>
                </div>
                <span className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer">
                  <Share2 size={15} />
                  <span>Compartilhar</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <a
            href="https://facebook.com/beijaflor.massaranduba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-blue text-brand-blue font-bold px-6 py-3 rounded-full hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <FacebookIcon size={18} />
            <span>Ver Álbum Completo no Facebook</span>
          </a>
        </div>

      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-16 text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-12">
        {/* About column */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-5 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
              <Image
                src="/logo.png"
                alt="Logo Beija-Flor"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span className="font-display text-xl font-extrabold text-brand-navy">
              Projeto Beija-Flor
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-5 leading-relaxed">
            Um projeto sócio-educativo, com gestão comunitária, sob a coordenação do <strong>Padre Marco Pagliucci</strong> (Igreja Católica). Acolhemos crianças e adolescentes do bairro de Massaranduba em Salvador-BA, proporcionando educação integral e oficinas culturais gratuitas.
          </p>
          <div className="bg-white border-l-4 border-brand-green p-4 rounded-r-xl shadow-sm">
            <p className="text-xs italic text-brand-navy leading-relaxed mb-1">
              "Sei que não posso apagar esse fogo sozinho, estou apenas fazendo a minha parte."
            </p>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">— Fábula do Beija-Flor (Betinho)</span>
          </div>
        </div>

        {/* Navigation column */}
        <div className="flex flex-col lg:pl-10">
          <h3 className="font-display text-base font-extrabold text-brand-navy mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-blue">
            Links Rápidos
          </h3>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li>
              <Link href="/#about" className="text-slate-500 hover:text-brand-green hover:translate-x-1 inline-block transition-all">
                Quem Somos
              </Link>
            </li>
            <li>
              <Link href="/#services" className="text-slate-500 hover:text-brand-green hover:translate-x-1 inline-block transition-all">
                O que Fazemos
              </Link>
            </li>
            <li>
              <Link href="/#events" className="text-slate-500 hover:text-brand-green hover:translate-x-1 inline-block transition-all">
                Galeria de Eventos
              </Link>
            </li>
            <li>
              <Link href="/transparencia" className="text-slate-500 hover:text-brand-green hover:translate-x-1 inline-block transition-all">
                Transparência Financeira
              </Link>
            </li>
            <li>
              <Link href="/avisos" className="text-slate-500 hover:text-brand-green hover:translate-x-1 inline-block transition-all">
                Mural de Avisos
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-slate-500 hover:text-brand-green hover:translate-x-1 inline-block transition-all">
                Blog & Notícias
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-slate-500 hover:text-brand-green hover:translate-x-1 inline-block transition-all">
                Área do Administrador
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="flex flex-col">
          <h3 className="font-display text-base font-extrabold text-brand-navy mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-blue">
            Contato e Localização
          </h3>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-blue flex-shrink-0 mt-0.5" />
              <span className="text-slate-500 leading-relaxed">
                Rua Lopes Trovão, 115 - Massaranduba, Salvador - BA, CEP: 40435-000
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-brand-blue flex-shrink-0 mt-0.5" />
              <a href="tel:7130141351" className="text-slate-500 hover:text-brand-blue transition-colors">
                (71) 3014-1351
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-brand-blue flex-shrink-0 mt-0.5" />
              <a href="mailto:beijaflor.massaranduba@gmail.com" className="text-slate-500 hover:text-brand-blue transition-colors">
                beijaflor.massaranduba@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://facebook.com/beijaflor.massaranduba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 shadow-sm hover:bg-brand-blue hover:border-brand-blue hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,150,199,0.25)] transition-all"
              aria-label="Facebook"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://instagram.com/beijaflor.massaranduba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 shadow-sm hover:bg-brand-blue hover:border-brand-blue hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,150,199,0.25)] transition-all"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-100 border-t border-slate-200 py-6 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-500 leading-normal">
            © {currentYear} Associação Projeto Beija-Flor da Massaranduba. Todos os direitos reservados.
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <span>Feito por <strong className="text-slate-700">Ramon Cerqueira Desenvolvedor WEB</strong></span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-0.5">Com <Heart size={12} className="text-red-500" fill="currentColor" /> para a comunidade de Salvador.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

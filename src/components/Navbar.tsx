"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ShieldAlert, Heart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md border-b border-slate-200/80 py-3"
          : "bg-white/85 backdrop-blur-md border-b border-slate-200/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <div className="relative w-15 h-15 lg:w-20 lg:h-20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo Beija-Flor"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 60px, 80px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-navy leading-none">
              Beija-Flor
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-brand-blue tracking-[1.5px] uppercase mt-1">
              Massaranduba
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/"
            className={`font-semibold text-[15px] transition-colors relative py-1.5 ${
              isActive("/")
                ? "text-brand-green after:w-full"
                : "text-slate-600 hover:text-brand-green after:w-0"
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:height-[2px] after:bg-brand-green after:transition-all after:duration-200 hover:after:w-full`}
          >
            Início
          </Link>
          <Link
            href={isHome ? "#about" : "/#about"}
            className="font-semibold text-[15px] text-slate-600 hover:text-brand-green transition-colors py-1.5"
          >
            Quem Somos
          </Link>
          <Link
            href={isHome ? "#services" : "/#services"}
            className="font-semibold text-[15px] text-slate-600 hover:text-brand-green transition-colors py-1.5"
          >
            O que Fazemos
          </Link>
          <Link
            href={isHome ? "#events" : "/#events"}
            className="font-semibold text-[15px] text-slate-600 hover:text-brand-green transition-colors py-1.5"
          >
            Galeria
          </Link>
          <Link
            href="/transparencia"
            className={`font-semibold text-[15px] transition-colors relative py-1.5 ${
              isActive("/transparencia")
                ? "text-brand-green after:w-full"
                : "text-slate-600 hover:text-brand-green after:w-0"
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:height-[2px] after:bg-brand-green after:transition-all after:duration-200 hover:after:w-full`}
          >
            Transparência
          </Link>
          <Link
            href="/avisos"
            className={`font-semibold text-[15px] transition-colors relative py-1.5 ${
              isActive("/avisos")
                ? "text-brand-green after:w-full"
                : "text-slate-600 hover:text-brand-green after:w-0"
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:height-[2px] after:bg-brand-green after:transition-all after:duration-200 hover:after:w-full`}
          >
            Avisos
          </Link>
          <Link
            href="/blog"
            className={`font-semibold text-[15px] transition-colors relative py-1.5 ${
              isActive("/blog")
                ? "text-brand-green after:w-full"
                : "text-slate-600 hover:text-brand-green after:w-0"
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:height-[2px] after:bg-brand-green after:transition-all after:duration-200 hover:after:w-full`}
          >
            Notícias
          </Link>
          
          <Link
            href={isHome ? "#donate" : "/#donate"}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-green to-brand-blue text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(42,157,73,0.25)] hover:shadow-[0_6px_18px_rgba(42,157,73,0.35)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Heart size={15} fill="currentColor" />
            <span>Como Ajudar</span>
          </Link>

          <Link
            href="/login"
            className={`flex items-center justify-center w-9.5 h-9.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-brand-navy hover:bg-slate-100 hover:border-slate-300 transition-colors ${
              pathname.startsWith("/admin") ? "bg-slate-100 text-brand-navy border-slate-300" : ""
            }`}
            title="Acesso Administrativo"
          >
            <ShieldAlert size={18} />
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-1.5 text-brand-navy hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          onClick={toggleMenu}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-[84px] left-0 w-full h-[calc(100vh-84px)] bg-white z-[99] px-8 py-8 transition-transform duration-300 lg:hidden border-t border-slate-100 shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-5">
          <Link
            href="/"
            className={`font-semibold text-lg py-2 border-b border-slate-100 ${
              isActive("/") ? "text-brand-green" : "text-slate-800"
            }`}
            onClick={closeMenu}
          >
            Início
          </Link>
          <Link
            href={isHome ? "#about" : "/#about"}
            className="font-semibold text-lg py-2 border-b border-slate-100 text-slate-800"
            onClick={closeMenu}
          >
            Quem Somos
          </Link>
          <Link
            href={isHome ? "#services" : "/#services"}
            className="font-semibold text-lg py-2 border-b border-slate-100 text-slate-800"
            onClick={closeMenu}
          >
            O que Fazemos
          </Link>
          <Link
            href={isHome ? "#events" : "/#events"}
            className="font-semibold text-lg py-2 border-b border-slate-100 text-slate-800"
            onClick={closeMenu}
          >
            Galeria
          </Link>
          <Link
            href="/transparencia"
            className={`font-semibold text-lg py-2 border-b border-slate-100 ${
              isActive("/transparencia") ? "text-brand-green" : "text-slate-800"
            }`}
            onClick={closeMenu}
          >
            Transparência
          </Link>
          <Link
            href="/avisos"
            className={`font-semibold text-lg py-2 border-b border-slate-100 ${
              isActive("/avisos") ? "text-brand-green" : "text-slate-800"
            }`}
            onClick={closeMenu}
          >
            Avisos
          </Link>
          <Link
            href="/blog"
            className={`font-semibold text-lg py-2 border-b border-slate-100 ${
              isActive("/blog") ? "text-brand-green" : "text-slate-800"
            }`}
            onClick={closeMenu}
          >
            Notícias
          </Link>
          
          <div className="flex flex-col gap-3 mt-6">
            <Link
              href={isHome ? "#donate" : "/#donate"}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-green to-brand-blue text-white py-3.5 rounded-xl font-bold text-base shadow-[0_4px_12px_rgba(42,157,73,0.25)]"
              onClick={closeMenu}
            >
              <Heart size={16} fill="currentColor" />
              <span>Como Ajudar</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-slate-50 text-brand-navy border border-slate-200 py-3.5 rounded-xl font-semibold text-base"
              onClick={closeMenu}
            >
              <ShieldAlert size={16} />
              <span>Painel Admin</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

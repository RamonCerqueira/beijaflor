"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Megaphone, Home, Menu, X, Image as ImageIcon, BookOpen, HelpCircle, Heart } from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
  logoutButton: React.ReactNode;
}

export default function AdminShell({ children, logoutButton }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true;
    if (path !== "/admin" && pathname === path) return true;
    return false;
  };

  const navLinks = [
    {
      href: "/admin",
      label: "Dashboard Geral",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/admin/financeiro",
      label: "Financeiro",
      icon: <Wallet size={18} />,
    },
    {
      href: "/admin/avisos",
      label: "Mural de Avisos",
      icon: <Megaphone size={18} />,
    },
    {
      href: "/admin/galeria",
      label: "Galeria de Fotos",
      icon: <ImageIcon size={18} />,
    },
    {
      href: "/admin/blog",
      label: "Notícias / Blog",
      icon: <BookOpen size={18} />,
    },
    {
      href: "/admin/faq",
      label: "Gerenciar FAQ",
      icon: <HelpCircle size={18} />,
    },
    {
      href: "/admin/voluntarios",
      label: "Voluntários",
      icon: <Heart size={18} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Mobile Top Header Bar */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-brand-navy text-white flex items-center justify-between px-6 z-40 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-white p-1">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain p-1"
              sizes="32px"
            />
          </div>
          <span className="font-display text-sm font-extrabold tracking-tight">Painel Beija-Flor</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-brand-navy text-white flex-shrink-0 flex flex-col border-r border-slate-800 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-white p-1">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain p-1"
                sizes="36px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-extrabold leading-none">Painel Beija-Flor</span>
              <span className="text-[9px] text-brand-blue font-bold uppercase tracking-wider mt-1.5">Admin</span>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 flex flex-col gap-1.5 text-sm font-semibold">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="border-t border-slate-800 my-4" />

          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
          >
            <Home size={18} />
            <span>Ir para o Site</span>
          </Link>
        </nav>

        {/* Sidebar Footer (Logout) */}
        <div className="p-4 border-t border-slate-800">
          {logoutButton}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

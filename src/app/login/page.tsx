"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, User, Lock, Loader2, ArrowLeft } from "lucide-react";
import { loginAdminAction } from "@/lib/actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const response = await loginAdminAction(null, formData);
      if (response && response.error) {
        setError(response.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/3 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/3 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-navy mb-6 uppercase tracking-wider transition-colors">
          <ArrowLeft size={14} />
          <span>Voltar ao Site</span>
        </Link>

        {/* Card */}
        <div className="bg-white border border-slate-200/60 p-8 rounded-3xl shadow-xl flex flex-col relative">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative w-14 h-14 mb-4">
              <Image
                src="/logo.png"
                alt="Logo Beija-Flor"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <h2 className="font-display text-xl font-extrabold text-brand-navy">
              Painel do Administrador
            </h2>
            <p className="text-xs text-slate-400 mt-1.5">
              Insira suas credenciais para gerenciar a plataforma
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 text-xs font-semibold mb-6 flex items-center gap-2">
              <ShieldAlert size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                Nome de Usuário
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Ex: admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue/60 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="bg-brand-navy hover:bg-brand-navy-hover text-white text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-2"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Acessando...</span>
                </>
              ) : (
                <span>Entrar no Painel</span>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

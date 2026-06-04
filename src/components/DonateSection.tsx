"use client";

import { useState } from "react";
import { Heart, Copy, Check, Info, Target, Coins, TrendingUp } from "lucide-react";
import PixGenerator from "./PixGenerator";

interface DonateSectionProps {
  goal?: {
    target: number;
    current: number;
  } | null;
}

export default function DonateSection({ goal }: DonateSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY || "beijaflor.massaranduba@gmail.com";

  // Fallback defaults if no database goal exists
  const target = goal ? goal.target : 30000;
  const current = goal ? goal.current : 18500;
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleCopyBank = () => {
    navigator.clipboard.writeText("Agência 3456-7 Conta 12345-6 Banco do Brasil");
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  const handlePredefinedClick = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    setSelectedAmount(isNaN(parsed) || parsed <= 0 ? 0 : parsed);
  };

  return (
    <section id="donate" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-green/3 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-blue/3 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Call to Action & Goal Dashboard */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="font-display text-xs font-bold text-brand-green uppercase tracking-widest mb-3 inline-block">
              Como Ajudar
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy leading-tight">
              Seja Você Também o Beija-Flor da Nossa Floresta
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-4">
              Na fábula inspiradora do nosso projeto, o pequeno beija-flor carrega gotas de água no bico para apagar o incêndio florestal, respondendo ao leão que está apenas fazendo a sua parte.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-4">
              Cada doação recebida é uma gota de esperança que se converte em alimentação saudável para a creche, material didático para as salas de aula, figurinos de teatro, berimbau de capoeira e manutenção predial das nossas salas de Massaranduba.
            </p>
          </div>

          {/* Gamified Monthly Goal Dashboard */}
          <div className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-md flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-display text-xs font-extrabold text-brand-navy">
                <Target size={16} className="text-brand-blue" />
                <span>Meta de Sobrevivência do Mês</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Referência Mensal</span>
            </div>

            {/* Goal Progress bar */}
            <div className="relative">
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-green rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="absolute right-0 -top-6 text-xs font-black text-brand-green bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                {percentage}% alcançado
              </span>
            </div>

            {/* Metrics detail */}
            <div className="grid grid-cols-3 gap-2 text-center mt-2 border-t border-slate-100 pt-3">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Arrecadado</span>
                <strong className="text-xs sm:text-sm font-black text-brand-navy">{formatCurrency(current)}</strong>
              </div>
              <div className="flex flex-col border-x border-slate-100">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Meta</span>
                <strong className="text-xs sm:text-sm font-black text-slate-500">{formatCurrency(target)}</strong>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Restante</span>
                <strong className="text-xs sm:text-sm font-black text-brand-gold">
                  {formatCurrency(Math.max(target - current, 0))}
                </strong>
              </div>
            </div>

            <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-100 text-[10px] text-slate-500 font-medium">
              <TrendingUp size={14} className="text-brand-green flex-shrink-0" />
              <span>O administrador atualiza os valores arrecadados periodicamente conforme os extratos oficiais do banco são conciliados.</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <h4 className="font-display text-sm font-extrabold text-brand-navy flex items-center gap-2">
              <Info size={16} className="text-brand-blue" />
              <span>Transparência Garantida</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Todos os recursos recebidos são auditados e publicados mensalmente na nossa <a href="/transparencia" className="text-brand-blue hover:underline font-bold">Página de Transparência</a> de forma totalmente aberta e pública. Qualquer cidadão ou benfeitor tem acesso aos relatórios fiscais das receitas e despesas.
            </p>
          </div>
        </div>

        {/* Right Side: Dynamic Interactive Donation Widget */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full max-w-lg bg-white border border-slate-200/60 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col gap-6 relative">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-brand-green to-brand-blue text-white shadow-lg">
              <Heart size={24} fill="currentColor" />
            </div>

            <div className="text-center mt-4">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-brand-navy">
                Faça uma Doação
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-semibold">
                Sua ajuda se transforma em oportunidades e nutrição qualificada
              </p>
            </div>

            {/* Donation Amount selector */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Selecione ou insira um valor:
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {[20, 50, 100, 200].map((val) => (
                  <button
                    key={val}
                    onClick={() => handlePredefinedClick(val)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedAmount === val && !customAmount
                        ? "bg-brand-blue border-brand-blue text-white shadow-sm font-extrabold"
                        : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    R$ {val}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="relative flex items-center border border-slate-200 rounded-xl overflow-hidden px-3.5 py-1.5 focus-within:border-brand-blue/60 transition-colors">
                <span className="text-xs font-bold text-slate-400 pr-1">R$</span>
                <input
                  type="number"
                  placeholder="Outro valor..."
                  value={customAmount}
                  onChange={handleCustomChange}
                  min="1"
                  className="bg-transparent focus:outline-none w-full text-xs font-semibold text-slate-700"
                />
                <Coins size={14} className="text-slate-400 flex-shrink-0" />
              </div>
            </div>

            {/* Dynamic Pix Generator component integration */}
            <PixGenerator amount={selectedAmount} />

            {/* Standard Bank Transfer alternative */}
            <div className="border-t border-slate-100 pt-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Transferência Bancária Tradicional:
                </span>
                <button
                  onClick={handleCopyBank}
                  className="text-[10px] font-bold text-brand-blue hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedBank ? "Copiado!" : "Copiar Dados"}
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-xs text-slate-500 flex flex-col gap-1 font-medium">
                <div className="flex justify-between">
                  <span>Beneficiário:</span>
                  <strong className="text-slate-700">Associação Beija-Flor</strong>
                </div>
                <div className="flex justify-between">
                  <span>Banco:</span>
                  <strong className="text-slate-700">Banco do Brasil S.A.</strong>
                </div>
                <div className="flex justify-between">
                  <span>Agência:</span>
                  <strong className="text-slate-700">3456-7</strong>
                </div>
                <div className="flex justify-between">
                  <span>Conta Corrente:</span>
                  <strong className="text-slate-700">12345-6</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

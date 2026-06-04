"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, Type, Accessibility, X } from "lucide-react";

export default function AccessibilityToolbar() {
  const [fontSizeScale, setFontSizeScale] = useState(0); // -1, 0, 1, 2
  const [highContrast, setHighContrast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read from localStorage on mount
    const savedContrast = localStorage.getItem("a11y_high_contrast") === "true";
    const savedScale = parseInt(localStorage.getItem("a11y_font_scale") || "0");
    
    setHighContrast(savedContrast);
    setFontSizeScale(savedScale);

    if (savedContrast) {
      document.documentElement.classList.add("high-contrast");
    }
    
    adjustHtmlFontSize(savedScale);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const adjustHtmlFontSize = (scale: number) => {
    // 0 = 100% (default), 1 = 110%, 2 = 120%, -1 = 90%
    const percentage = 100 + scale * 10;
    document.documentElement.style.fontSize = `${percentage}%`;
  };

  const toggleContrast = () => {
    const newVal = !highContrast;
    setHighContrast(newVal);
    localStorage.setItem("a11y_high_contrast", String(newVal));
    
    if (newVal) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  const changeFontSize = (direction: "up" | "down" | "reset") => {
    let newScale = fontSizeScale;
    if (direction === "up" && fontSizeScale < 2) {
      newScale += 1;
    } else if (direction === "down" && fontSizeScale > -1) {
      newScale -= 1;
    } else if (direction === "reset") {
      newScale = 0;
    }

    setFontSizeScale(newScale);
    localStorage.setItem("a11y_font_scale", String(newScale));
    adjustHtmlFontSize(newScale);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 left-6 z-[90] flex flex-col items-start gap-2.5 print:hidden"
    >
      {/* Popover Accessibility Panel */}
      <div 
        className={`absolute bottom-16 left-0 flex flex-col gap-4 bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-2xl shadow-2xl transition-all duration-300 w-64 origin-bottom-left ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <Accessibility size={16} className="text-brand-navy" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Acessibilidade</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Fechar menu"
          >
            <X size={14} />
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          {/* Font size control */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tamanho do texto</span>
            <div className="flex items-center justify-between bg-slate-50 p-1 rounded-xl border border-slate-100">
              <button
                onClick={() => changeFontSize("down")}
                disabled={fontSizeScale === -1}
                className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  fontSizeScale === -1 
                    ? "bg-brand-navy text-brand-gold shadow-sm"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-800"
                }`}
                title="Diminuir Fonte (A-)"
              >
                A-
              </button>
              <button
                onClick={() => changeFontSize("reset")}
                className={`flex-1 py-1.5 px-2 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                  fontSizeScale === 0 
                    ? "bg-brand-navy text-brand-gold shadow-sm"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-800"
                }`}
                title="Resetar Fonte"
              >
                <Type size={14} />
              </button>
              <button
                onClick={() => changeFontSize("up")}
                disabled={fontSizeScale === 2}
                className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  fontSizeScale > 0 
                    ? "bg-brand-navy text-brand-gold shadow-sm"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-800"
                }`}
                title="Aumentar Fonte (A+)"
              >
                A+
              </button>
            </div>
            {fontSizeScale !== 0 && (
              <span className="text-[10px] text-slate-500 text-center">
                Ajustado em {fontSizeScale > 0 ? `+${fontSizeScale * 10}%` : `${fontSizeScale * 10}%`}
              </span>
            )}
          </div>

          {/* Contrast toggle */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Visualização</span>
            <button
              onClick={toggleContrast}
              className={`w-full py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                highContrast 
                  ? "bg-brand-navy text-brand-gold border-brand-navy shadow-inner font-semibold" 
                  : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 hover:text-slate-800"
              }`}
              title="Alternar Alto Contraste"
            >
              <div className="flex items-center gap-2">
                <Eye size={15} />
                <span className="text-xs uppercase tracking-wider">Alto Contraste</span>
              </div>
              <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors relative ${highContrast ? "bg-brand-gold" : "bg-slate-300"}`}>
                <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${highContrast ? "translate-x-3.5" : "translate-x-0"}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg border transition-all duration-300 cursor-pointer ${
          isOpen
            ? "bg-brand-navy text-brand-gold border-brand-navy scale-105"
            : highContrast
              ? "bg-brand-navy text-brand-gold border-brand-navy hover:scale-110"
              : "bg-white/90 backdrop-blur-md border-slate-200/80 text-slate-600 hover:text-brand-navy hover:bg-white hover:scale-110 shadow-slate-300/50"
        }`}
        title={isOpen ? "Fechar opções de acessibilidade" : "Opções de acessibilidade"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Accessibility size={20} />}
      </button>
    </div>
  );
}

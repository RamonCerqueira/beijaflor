"use client";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: Date;
}

interface FinanceChartsProps {
  transactions: Transaction[];
}

export default function FinanceCharts({ transactions }: FinanceChartsProps) {
  const expenses = transactions.filter((tx) => tx.type === "EXPENSE");
  const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);

  // Group by category
  const categoryMap: { [key: string]: number } = {};
  expenses.forEach((tx) => {
    categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
  });

  const categories = Object.entries(categoryMap)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpense > 0 ? (value / totalExpense) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);

  // Color palette for chart categories
  const colors = [
    "bg-brand-navy",
    "bg-brand-blue",
    "bg-brand-green",
    "bg-brand-gold",
    "bg-red-500",
    "bg-purple-500",
    "bg-slate-400",
  ];

  const strokeColors = [
    "#0b2a4a", // brand-navy
    "#0096c7", // brand-blue
    "#2a9d49", // brand-green
    "#d97706", // brand-gold
    "#ef4444", // red-500
    "#a855f7", // purple-500
    "#94a3b8", // slate-400
  ];

  // SVG Donut calculation
  let cumulativePercent = 0;
  const donutSlices = categories.map((cat, index) => {
    const strokeDasharray = `${cat.percentage} ${100 - cat.percentage}`;
    const strokeDashoffset = 100 - cumulativePercent + 25; // 25 is to start from 12 o'clock
    cumulativePercent += cat.percentage;
    return {
      strokeDasharray,
      strokeDashoffset,
      color: strokeColors[index % strokeColors.length],
      name: cat.name,
    };
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {/* SVG Donut Chart Card */}
      <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center">
        <h3 className="font-display text-base font-extrabold text-brand-navy mb-6 self-start">
          Distribuição de Despesas
        </h3>
        
        {totalExpense === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            Sem despesas registradas para o período
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-10 w-full justify-center">
            {/* SVG Donut */}
            <div className="relative w-44 h-44 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Background Circle */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                
                {/* Slices */}
                {donutSlices.map((slice, index) => (
                  <circle
                    key={index}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="4"
                    strokeDasharray={slice.strokeDasharray}
                    strokeDashoffset={slice.strokeDashoffset}
                    className="transition-all duration-500 ease-in-out"
                  />
                ))}
              </svg>
              {/* Inner content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Pago</span>
                <span className="text-sm font-extrabold text-brand-navy mt-0.5">
                  {formatCurrency(totalExpense)}
                </span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-col gap-3 flex-1 w-full sm:w-auto">
              {categories.slice(0, 4).map((cat, index) => (
                <div key={index} className="flex items-center justify-between text-xs w-full">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                    <span className="text-slate-600 font-medium truncate max-w-[120px]">{cat.name}</span>
                  </div>
                  <strong className="text-brand-navy">{cat.percentage.toFixed(1)}%</strong>
                </div>
              ))}
              {categories.length > 4 && (
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider text-center sm:text-left mt-1">
                  + {categories.length - 4} outras categorias
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Category Progress Bars Card */}
      <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col">
        <h3 className="font-display text-base font-extrabold text-brand-navy mb-6">
          Detalhamento por Categoria
        </h3>
        
        {totalExpense === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            Sem despesas registradas para o período
          </div>
        ) : (
          <div className="flex flex-col gap-5 overflow-y-auto max-h-64 pr-2">
            {categories.map((cat, index) => (
              <div key={index} className="flex flex-col gap-1.5 w-full">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">{cat.name}</span>
                  <span className="text-brand-navy">{formatCurrency(cat.value)}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

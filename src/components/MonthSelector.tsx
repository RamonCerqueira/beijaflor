"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

interface MonthOption {
  month: number;
  year: number;
  label: string;
}

interface MonthSelectorProps {
  options: MonthOption[];
  selectedMonth: number;
  selectedYear: number;
  basePath?: string;
}

export default function MonthSelector({
  options,
  selectedMonth,
  selectedYear,
  basePath = "/transparencia",
}: MonthSelectorProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [m, y] = e.target.value.split("-");
    router.push(`${basePath}?month=${m}&year=${y}`);
  };

  const selectedValue = `${selectedMonth}-${selectedYear}`;

  return (
    <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">
      <Calendar size={16} className="text-brand-blue flex-shrink-0" />
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden sm:inline">Referência:</span>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="bg-transparent focus:outline-none cursor-pointer text-slate-800 font-bold pr-1 capitalize"
      >
        {options.map((opt) => (
          <option key={`${opt.month}-${opt.year}`} value={`${opt.month}-${opt.year}`}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

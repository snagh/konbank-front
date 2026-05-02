import type { SelectHTMLAttributes, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  registration?: UseFormRegisterReturn;
  options: { value: string; label: string }[];
}

export function Select({ label, error, icon, registration, options, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative group flex gap-2">
        <div className="relative w-full">
          <select
            {...registration}
            {...props}
            className={`
              w-full px-3.5 py-2.5 bg-white border rounded-lg outline-none appearance-none
              transition-all duration-200 ease-in-out text-slate-900
              ${error 
                ? "border-red-500 bg-red-50/30 focus:ring-4 focus:ring-red-100" 
                : "border-slate-200 border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 group-hover:border-slate-300"
              }
            `}
          >
            <option value="" disabled hidden>Selecione</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Seta customizada */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-600 transition-colors">
            {icon || (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </div>
        </div>
      </div>
      {error && (
        <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
}

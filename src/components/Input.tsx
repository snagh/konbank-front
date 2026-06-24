import type { InputHTMLAttributes, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  registration?: UseFormRegisterReturn;
}

export function Input({ label, error, icon, registration, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative group">
        <input
          {...props}
          {...registration}
          className={`
            w-full px-3.5 py-2.5 bg-white border rounded-lg outline-none
            transition-all duration-200 ease-in-out text-slate-900 placeholder:text-slate-400
            ${error 
              ? "border-red-500 bg-red-50/30 focus:ring-4 focus:ring-red-100" 
              : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 group-hover:border-slate-300"
            }
          `}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-600 transition-colors">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
}

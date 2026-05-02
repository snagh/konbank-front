import type { ReactNode } from "react";

interface ReviewCardProps {
  title: string;
  children: ReactNode;
  onEdit?: () => void;
}

export function ReviewCard({ title, children, onEdit }: ReviewCardProps) {
  return (
    <div className="w-full border border-slate-200 rounded-xl overflow-hidden bg-white mb-4 shadow-sm hover:border-slate-300 transition-colors">
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col gap-1 text-slate-800 font-medium">
          {children}
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}

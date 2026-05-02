import type { ReactNode } from "react";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

interface DocumentUploadCardProps {
  title: string;
  icon: ReactNode;
  status: UploadStatus;
  onRetry?: () => void;
  onClick?: () => void;
}

export function DocumentUploadCard({ title, icon, status, onRetry, onClick }: DocumentUploadCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "success": return "border-green-500 bg-green-50/30";
      case "error": return "border-red-500 bg-red-50/30";
      case "uploading": return "border-blue-400 bg-blue-50/30";
      default: return "border-slate-200 hover:border-blue-400 cursor-pointer";
    }
  };

  const renderStatus = () => {
    switch (status) {
      case "uploading":
        return (
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 mt-2">
            <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </div>
        );
      case "success":
        return (
          <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-green-600 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Upload Concluído!
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Erro no envio
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onRetry?.(); }}
              className="mt-1 w-full py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={status === 'idle' ? onClick : undefined}
      className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center ${getStatusStyles()}`}
    >
      <div className="w-16 h-12 mb-3 text-slate-400 flex items-center justify-center relative">
        {icon}
        {status === 'success' && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        )}
        {status === 'error' && (
          <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-0.5 border-2 border-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-semibold text-slate-800 leading-tight min-h-[40px] flex items-center justify-center">
        {title}
      </h3>
      
      <div className="w-full h-px bg-slate-100 my-2" />
      
      <div className="min-h-[24px] w-full">
        {renderStatus() || (
           <span className="text-sm text-slate-400 font-medium hover:text-blue-600 transition-colors">
             Clique para enviar
           </span>
        )}
      </div>
    </div>
  );
}

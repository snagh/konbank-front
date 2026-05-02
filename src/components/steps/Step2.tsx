import { DocumentUploadCard } from "../DocumentUploadCard";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export function Step2({ onNext, onBack }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DocumentUploadCard
          title="Documento (Frente)"
          status="uploading"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <rect width="18" height="14" x="3" y="5" rx="2" ry="2"/>
              <path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>
              <circle cx="9" cy="9" r="2"/>
            </svg>
          }
        />
        
        <DocumentUploadCard
          title="Documento (Verso)"
          status="success"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <rect width="18" height="14" x="3" y="5" rx="2" ry="2"/>
              <path d="M7 15h10M7 11h10M7 7h10"/>
            </svg>
          }
        />

        <DocumentUploadCard
          title="Selfie"
          status="error"
          onRetry={() => console.log('Retrying selfie...')}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
              <circle cx="12" cy="10" r="3"/>
              <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
            </svg>
          }
        />
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] transition-all"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
